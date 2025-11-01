// Backend tracking API: /api/track
// Receives events, hashes PII, forwards to AppsFlyer and Meta CAPI

import crypto from 'node:crypto';

const AF_ENDPOINT = (appId) => `https://api2.appsflyer.com/inappevent/${appId}`;
const META_ENDPOINT = (pixelId, token) =>
  `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`;

// Normalize PII: lowercase, trim, remove spaces/dashes
function norm(value) {
  if (!value || typeof value !== 'string') return '';
  return value.toLowerCase().trim().replace(/[\s\-]/g, '');
}

// Hash PII with SHA-256
function hashPII(value) {
  const normalized = norm(value);
  if (!normalized) return undefined;
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

// Get origin from request
const getOrigin = (event) => {
  const headers = event.headers || {};
  const origin = headers.origin || headers.Origin || headers['x-forwarded-origin'] || '*';
  // Only allow specific origins
  const allowedOrigins = [
    'https://www.itgiftcard.com',
    'http://localhost:5174',
    'http://localhost:5173',
  ];
  return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
};

const ok = (data, origin) => ({
  statusCode: 200,
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, x-consent',
  },
  body: JSON.stringify({ ok: true, ...data }),
});

const bad = (code, msg, origin) => ({
  statusCode: code,
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, x-consent',
  },
  body: JSON.stringify({ ok: false, error: msg }),
});

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod;
  const origin = getOrigin(event);
  
  // Preflight - return CORS headers
  if (method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'content-type, x-consent',
      },
      body: '',
    };
  }
  
  if (method !== 'POST') return bad(405, 'method_not_allowed', origin);

  // Check feature flag
  if (process.env.TRACKING_ENABLED !== 'true') {
    return ok({ tracking_disabled: true }, origin);
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return bad(400, 'invalid_json', origin);
  }

  const { event_name, pii = {}, page, ref, cta_id, form_type, timestamp, client_id } = body;

  // Validate event_name
  if (!['af_link_click', 'af_lead'].includes(event_name)) {
    return bad(400, 'invalid_event_name', origin);
  }

  // Enrich with IP and UA (handle header case variations)
  const headers = event.headers || {};
  const getHeader = (name) => {
    const lower = name.toLowerCase();
    // Check exact match first, then case-insensitive
    return headers[name] || headers[lower] || Object.keys(headers).find((k) => k.toLowerCase() === lower) ? headers[Object.keys(headers).find((k) => k.toLowerCase() === lower)] : undefined;
  };

  const clientIp =
    event.requestContext?.http?.sourceIp ||
    event.requestContext?.identity?.sourceIp ||
    (getHeader('x-forwarded-for') || '').split(',')[0].trim() ||
    '';
  const userAgent = getHeader('user-agent') || '';

  // Consent check
  const consentHeader = getHeader('x-consent') === '1';
  const consentMode = process.env.CONSENT_MODE || 'implicit';
  const hasConsent = consentMode !== 'opt_out' && (consentMode === 'implicit' || consentHeader);

  // Build user_data for Meta (hash PII only if consented)
  const userData = {
    client_ip_address: clientIp,
    client_user_agent: userAgent,
  };

  if (hasConsent) {
    if (pii.email) userData.em = [hashPII(pii.email)];
    if (pii.phone) userData.ph = [hashPII(pii.phone)];
    if (pii.name) userData.fn = [hashPII(pii.name)];
    // Remove undefined fields
    Object.keys(userData).forEach((key) => {
      if (userData[key] === undefined) delete userData[key];
    });
  }

  // Build AppsFlyer payload
  const afAppId = process.env.AF_APP_ID;
  const afDevKey = process.env.AF_DEV_KEY;
  const afBody = {
    appsflyer_id: client_id,
    customer_user_id: client_id,
    eventName: event_name,
    eventTime: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString(),
    eventValue: {
      page: page || '',
      form_type: form_type || '',
      cta_id: cta_id || '',
    },
  };

  // Build Meta CAPI payload
  const metaPixelId = process.env.FB_PIXEL_ID;
  const metaToken = process.env.FB_ACCESS_TOKEN;
  // Meta standard events: Lead for form submission, Contact for button clicks (inquiry/contact intent)
  const metaEventName = event_name === 'af_lead' ? 'Lead' : 'Contact';

  const metaBody = {
    data: [
      {
        event_name: metaEventName,
        event_time: timestamp ? Math.floor(timestamp / 1000) : Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: userData,
        custom_data: {
          page: page || '',
          form_type: form_type || '',
          cta_id: cta_id || '',
        },
      },
    ],
  };

  const results = {
    af: null,
    meta: null,
  };

  // Fan-out to AppsFlyer
  if (afAppId && afDevKey) {
    try {
      const afResp = await fetch(AF_ENDPOINT(afAppId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authentication: afDevKey,
        },
        body: JSON.stringify(afBody),
      });
      results.af = {
        status: afResp.status,
        ok: afResp.ok,
      };
    } catch (err) {
      results.af = { error: String(err) };
    }
  }

  // Fan-out to Meta CAPI
  if (metaPixelId && metaToken) {
    try {
      const metaResp = await fetch(META_ENDPOINT(metaPixelId, metaToken), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metaBody),
      });
      const metaJson = await metaResp.json().catch(() => ({}));
      results.meta = {
        status: metaResp.status,
        ok: metaResp.ok,
        events_received: metaJson.events_received,
      };
    } catch (err) {
      results.meta = { error: String(err) };
    }
  }

  // Log (without PII)
  console.log('Tracking event:', {
    event_name,
    page,
    client_id,
    has_consent: hasConsent,
    af_status: results.af?.status,
    meta_status: results.meta?.status,
  });

  return ok({ results }, origin);
};


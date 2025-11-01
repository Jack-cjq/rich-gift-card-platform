# Web Conversion Tracking Setup Guide

## Overview
This system tracks user interactions (link clicks and form submissions) and sends events to AppsFlyer (AF) and Meta Conversions API (CAPI).

## Architecture
- **Frontend**: Captures UI events, manages consent, client_id, deduplication
- **Backend**: `/api/track` Lambda function receives events, hashes PII, forwards to AF and Meta

## Environment Variables

### Frontend (Amplify Environment Variables)
```
VITE_LEADS_ENDPOINT=https://your-lambda-function-url-for-leads/
VITE_CAPI_ENDPOINT=https://your-lambda-function-url-for-capi/
```

### Backend Lambda Function (`/api/track`)
Create a new Lambda function for tracking with the following environment variables:

```
# AppsFlyer Configuration
AF_DEV_KEY=your_af_dev_key
AF_APP_ID=your_af_app_id_or_website_id

# Meta CAPI Configuration
FB_PIXEL_ID=1756204411760542
FB_ACCESS_TOKEN=your_server_side_system_user_token

# Feature Flags
TRACKING_ENABLED=true
CONSENT_MODE=implicit  # Options: opt_in | opt_out | implicit
```

## Deployment Steps

### 1. Deploy Tracking Lambda Function

1. Create new Lambda function (Node.js 18+)
2. Upload `backend/tracking/index.mjs` as handler code
3. Set handler: `index.handler`
4. Create Function URL:
   - Auth type: None
   - CORS:
     - Allow origins: `https://www.itgiftcard.com` (and `http://localhost:5174` for dev)
     - Allow methods: `POST, OPTIONS`
     - Allow headers: `content-type`
5. Set environment variables (see above)
6. Set IAM permissions (if needed for external APIs)

### 2. Update Frontend Environment Variables

In AWS Amplify console:
```
VITE_TRACK_ENDPOINT=https://your-tracking-lambda-function-url/
```

### 3. Update Tracker Endpoint

Update `src/utils/tracker.ts`:
```typescript
const TRACK_ENDPOINT = import.meta.env.VITE_TRACK_ENDPOINT || '/api/track';
```

## Event Types

### af_link_click
Triggered when user clicks any element with `data-track="jump"` or `id="jumpButton"`.

**Payload sent to `/api/track`**:
```json
{
  "event_name": "af_link_click",
  "page": "/contact",
  "ref": "https://google.com",
  "cta_id": "whatsapp-nav",
  "timestamp": 1698765432000,
  "client_id": "uuid-v4",
  "pii": {}
}
```

**Forwarded to**:
- AppsFlyer: `af_link_click`
- Meta CAPI: `Button_Click`

### af_lead
Triggered when lead form (`form[data-track="lead"]` or `#contactForm`) is successfully submitted.

**Payload sent to `/api/track`**:
```json
{
  "event_name": "af_lead",
  "page": "/contact",
  "form_type": "contact",
  "timestamp": 1698765432000,
  "client_id": "uuid-v4",
  "pii": {
    "email": "user@example.com",
    "phone": "+1234567890",
    "name": "John Doe"
  }
}
```

**Forwarded to**:
- AppsFlyer: `af_lead`
- Meta CAPI: `Lead`

## Privacy & Consent

### Consent Management
- Check `window.__consent` (boolean) or cookie `consent=1`
- If no consent, PII fields are sent as empty object `{}`
- Server-side: Only hashes PII if consent is granted

### PII Hashing
- **Normalization**: lowercase, trim, remove spaces/dashes
- **Hashing**: SHA-256 UTF-8 hex digest
- **Server-only**: Never hash on client side

## Testing

### Manual Test (Local)

1. Set consent (browser console):
   ```javascript
   window.__consent = true;
   // or
   document.cookie = 'consent=1;path=/';
   ```

2. Click a jump button or submit form

3. Check Network tab → should see POST to `/api/track`

4. Check Lambda CloudWatch Logs for:
   - Event received
   - AF/Meta status codes
   - **No raw PII in logs**

### Test with curl
```bash
curl -X POST https://your-track-endpoint/ \
  -H "Content-Type: application/json" \
  -H "X-Consent: 1" \
  -d '{
    "event_name": "af_link_click",
    "page": "/test",
    "cta_id": "test-button",
    "client_id": "test-123",
    "timestamp": 1698765432000
  }'
```

## Feature Flags

Set `TRACKING_ENABLED=false` to disable fan-out but keep endpoint returning 200 OK (for app stability).

## Consent Modes

- `implicit`: Consent assumed unless explicitly denied
- `opt_in`: Requires `X-Consent: 1` header
- `opt_out`: Requires explicit consent (default: no consent)

## Deduplication

- Same `client_id + event_name + cta_id` within 5 seconds → only first event sent
- Debounce: 300ms delay before sending

## Retry Logic

- Max 2 retries on network failure
- Exponential backoff: 1s, 2s delays

## AppsFlyer API

Endpoint: `https://api2.appsflyer.com/inappevent/{AF_APP_ID}`
Headers: `authentication: {AF_DEV_KEY}`

## Meta CAPI API

Endpoint: `https://graph.facebook.com/v19.0/{FB_PIXEL_ID}/events?access_token={FB_ACCESS_TOKEN}`

## Troubleshooting

- **No events received**: Check `TRACKING_ENABLED=true` and Lambda logs
- **CORS errors**: Check Function URL CORS settings
- **AF/Meta errors**: Check credentials and API endpoints
- **PII in logs**: Ensure hashing is server-side only


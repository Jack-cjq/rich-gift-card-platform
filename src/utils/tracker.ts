// Web conversion tracker for AF + Meta CAPI
// Vanilla TypeScript, consent-aware, debounced, deduped

type TrackingEvent = {
  event_name: 'af_link_click' | 'af_lead';
  page: string;
  ref?: string;
  cta_id?: string;
  form_type?: string;
  timestamp: number;
  client_id: string;
  pii?: {
    email?: string;
    phone?: string;
    name?: string;
  };
};

type ConsentState = boolean | null;

const TRACK_ENDPOINT = (import.meta.env.VITE_TRACK_ENDPOINT as string) || '/api/track';
const DEBOUNCE_MS = 300;
const DEDUPE_WINDOW_MS = 5000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

// Client ID management
function getOrCreateClientId(): string {
  const cookieName = '_cid';
  const existing = getCookie(cookieName);
  if (existing) return existing;

  const newId = generateUUID();
  setCookie(cookieName, newId, 365);
  return newId;
}

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

function generateUUID(): string {
  if (typeof crypto !== 'undefined') {
    const c = crypto as Crypto & { randomUUID?: () => string };
    if (typeof c.randomUUID === 'function') {
      return c.randomUUID();
    }
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${Math.random().toString(36).slice(2, 10)}`;
}

// Consent management
function getConsent(): ConsentState {
  // Check window.__consent or cookie consent=1
  if (typeof window !== 'undefined') {
    const win = window as typeof window & { __consent?: boolean };
    if (win.__consent !== undefined) return win.__consent;
  }
  const consentCookie = getCookie('consent');
  return consentCookie === '1';
}

// Deduplication tracking
const recentEvents = new Map<string, number>(); // key: client_id + event_name + cta_id, value: timestamp

function shouldDedupe(event: TrackingEvent): boolean {
  const key = `${event.client_id}:${event.event_name}:${event.cta_id || ''}`;
  const lastSent = recentEvents.get(key);
  if (lastSent && Date.now() - lastSent < DEDUPE_WINDOW_MS) {
    return true;
  }
  recentEvents.set(key, Date.now());
  // Clean old entries (simple cleanup every 100 events)
  if (recentEvents.size > 100) {
    const now = Date.now();
    for (const [k, v] of recentEvents.entries()) {
      if (now - v > DEDUPE_WINDOW_MS * 2) recentEvents.delete(k);
    }
  }
  return false;
}

// Retry logic with exponential backoff
async function sendWithRetry(
  endpoint: string,
  payload: TrackingEvent,
  retries = MAX_RETRIES
): Promise<void> {
  const hasConsent = getConsent();
  const cleanPayload = hasConsent
    ? payload
    : { ...payload, pii: {} }; // Remove PII if no consent

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Consent': hasConsent ? '1' : '0',
      },
      body: JSON.stringify(cleanPayload),
      keepalive: true,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    if (retries > 0) {
      const delay = RETRY_DELAY_MS * (MAX_RETRIES - retries + 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return sendWithRetry(endpoint, payload, retries - 1);
    }
    // Silently fail after max retries
    console.warn('Tracking failed after retries:', error);
  }
}

// Main tracking function
export async function trackEvent(event: Omit<TrackingEvent, 'client_id' | 'timestamp' | 'page' | 'ref'>): Promise<void> {
  if (typeof window === 'undefined') return;

  const clientId = getOrCreateClientId();
  const page = window.location.pathname;
  const ref = document.referrer || undefined;

  const fullEvent: TrackingEvent = {
    ...event,
    client_id: clientId,
    timestamp: Date.now(),
    page,
    ref,
  };

  if (shouldDedupe(fullEvent)) return;

  // Debounce
  setTimeout(() => {
    sendWithRetry(TRACK_ENDPOINT, fullEvent);
  }, DEBOUNCE_MS);

  return Promise.resolve();
}

// Track link click
export function trackLinkClick(ctaId: string): void {
  trackEvent({
    event_name: 'af_link_click',
    cta_id: ctaId,
  });
}

// Track lead form submission
export function trackLead(formType: string, pii?: { email?: string; phone?: string; name?: string }): void {
  trackEvent({
    event_name: 'af_lead',
    form_type: formType,
    pii: pii || {},
  });
}

// Auto-initialize tracker for elements with data-track attributes
export function initTracker(): void {
  if (typeof document === 'undefined') return;

  // Track jump buttons
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const jumpEl = target.closest('[data-track="jump"], #jumpButton');
    if (jumpEl) {
      const ctaId = (jumpEl as HTMLElement).id || (jumpEl as HTMLElement).getAttribute('data-id') || 'unknown';
      trackLinkClick(ctaId);
    }
  }, true);

  // Track lead forms (handled in form submit handler, but ensure forms are marked)
  // Forms should have data-track="lead" or id="contactForm"
}

// Initialize on load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracker);
  } else {
    initTracker();
  }
}


// Facebook Pixel & Conversions API helpers

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function getCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export function generateEventId(): string {
  if (typeof crypto !== 'undefined') {
    const c = crypto as Crypto & { randomUUID?: () => string };
    if (typeof c.randomUUID === 'function') {
      return c.randomUUID();
    }
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getFacebookClickId(): { fbp?: string; fbc?: string } {
  return {
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc'),
  };
}

export function trackPixel(eventName: string, params?: Record<string, unknown>, eventId?: string) {
  const fbq = window.fbq;
  if (!fbq) return;
  if (eventId) {
    fbq('track', eventName, params || {}, { eventID: eventId });
  } else {
    fbq('track', eventName, params || {});
  }
}

type CapiPayload = {
  event_name: string;
  event_time?: number;
  event_id: string;
  event_source_url?: string;
  action_source?: 'website';
  fbp?: string;
  fbc?: string;
  user_data?: {
    em?: string[];
    ph?: string[];
    client_user_agent?: string;
    client_ip_address?: string;
  };
  custom_data?: Record<string, unknown>;
};

export async function sendToCapi(payload: CapiPayload) {
  const endpoint = import.meta.env.VITE_CAPI_ENDPOINT as string | undefined;
  if (!endpoint) return; // 未配置时静默跳过

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // noop: 网络失败时静默忽略，避免影响用户流程
  }
}



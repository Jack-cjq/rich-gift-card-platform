// Simple helper to submit lead form data to backend Function URL

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
};

function getCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export async function submitLead(payload: LeadPayload) {
  const endpoint = import.meta.env.VITE_LEADS_ENDPOINT as string | undefined;
  if (!endpoint) throw new Error('Missing VITE_LEADS_ENDPOINT');

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      source: payload.source || 'contact',
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json?.ok) {
    throw new Error(json?.error || 'submit_failed');
  }
  return json.data as { id: string; createdAt: string };
}



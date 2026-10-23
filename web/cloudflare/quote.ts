/**
 * POST /api/quote: validates a quote request from the website form and emails it to Serhii
 * through Resend (https://resend.com/docs/api-reference/emails/send-email).
 *
 * Configuration (Worker secrets / vars, not committed):
 *   RESEND_API_KEY  Resend API key                         (wrangler secret put RESEND_API_KEY)
 *   QUOTE_TO        Serhii's inbox for quote requests      (wrangler secret put QUOTE_TO)
 *   QUOTE_FROM      verified sender, e.g. "Royal Prestige Towing <quotes@your-domain>"
 * Until all three are set the endpoint answers 503 and nothing is sent.
 */

export interface QuoteEnv {
  RESEND_API_KEY?: string;
  QUOTE_TO?: string;
  QUOTE_FROM?: string;
}

const LANGS = ['en', 'uk', 'ru'];
const LOAD_TYPES = ['everyday', 'exotic', 'van', 'machinery'];
const CONDITIONS = ['runs', 'rolls', 'static', 'unsure'];
const TIMINGS = ['flexible', 'week', 'date'];
const PREFS = ['phone', 'text'];

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const str = (v: unknown, max: number, required = false): string | null => {
  if (v === undefined || v === null || v === '') return required ? null : '';
  if (typeof v !== 'string') return null;
  const s = v.trim();
  return (required && !s) || s.length > max ? null : s;
};

const oneOf = (v: unknown, list: string[]) => (typeof v === 'string' && list.includes(v) ? v : null);

export async function handleQuote(request: Request, env: QuoteEnv): Promise<Response> {
  if (request.method !== 'POST') return json(405, { error: 'method_not_allowed' });
  if (!env.RESEND_API_KEY || !env.QUOTE_TO || !env.QUOTE_FROM) return json(503, { error: 'not_configured' });

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  const lang = oneOf(body?.lang, LANGS);
  const loadType = oneOf(body?.loadType, LOAD_TYPES);
  const pickup = str(body?.pickup, 80, true);
  const destination = str(body?.destination, 80, true);
  const item = str(body?.item, 120);
  const condition = oneOf(body?.condition, CONDITIONS);
  const timing = oneOf(body?.timing, TIMINGS);
  const date = timing === 'date' ? str(body?.date, 10, true) : '';
  const notes = str(body?.notes, 1000);
  const name = str(body?.contact?.name, 80);
  const phone = typeof body?.contact?.phone === 'string' && /^[2-9]\d{2}[2-9]\d{6}$/.test(body.contact.phone) ? body.contact.phone : null;
  const preference = oneOf(body?.contact?.preference, PREFS);
  // Consent to be called or texted about this request is required, not just assumed by the browser.
  const consent = body?.consent?.contact === true;

  const invalid = Object.entries({ lang, loadType, pickup, destination, item, condition, timing, date, notes, name, phone, preference })
    .filter(([, v]) => v === null)
    .map(([k]) => k);
  if (!consent) invalid.push('consent');
  if (invalid.length) return json(422, { error: 'invalid', fields: invalid });

  const formatted = `(${phone!.slice(0, 3)}) ${phone!.slice(3, 6)}-${phone!.slice(6)}`;
  const text = [
    'New transport request from the website',
    '',
    `Load type: ${loadType}`,
    `Pickup: ${pickup}`,
    `Drop-off: ${destination}`,
    item ? `Vehicle / item: ${item}` : null,
    `Condition: ${condition}`,
    `Timing: ${timing}${date ? ` (${date})` : ''}`,
    notes ? `Notes: ${notes}` : null,
    '',
    `Name: ${name || '—'}`,
    `Phone: ${formatted}`,
    `Prefers: ${preference === 'text' ? 'text' : 'call'}`,
    `Site language: ${lang}`,
    '',
    'Contact consent: YES — the customer agreed that Serhii may call or text them using the contact',
    'information provided, to respond to this request (not for marketing).',
    `Received: ${new Date().toISOString()}`,
  ]
    .filter((l) => l !== null)
    .join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.QUOTE_FROM,
      to: [env.QUOTE_TO],
      subject: `Transport request: ${pickup} → ${destination}`,
      text,
    }),
  });
  if (!res.ok) return json(502, { error: 'send_failed' });
  return json(200, { ok: true });
}

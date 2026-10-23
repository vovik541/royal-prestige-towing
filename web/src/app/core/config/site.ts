import config from '../../../../site.config.json';

/** Deployment settings (see web/site.config.json). */
export const SITE = {
  url: config.siteUrl.replace(/\/+$/, ''),
  indexable: config.indexable,
  staticPages: config.staticPages,
  servicePages: config.servicePages,
} as const;

const PHONE_E164 = '+19164705605';

/** The business telephone, confirmed by the owner. Every call/SMS link and display reads from here. */
export const PHONE = {
  display: '+1 (916) 470-5605',
  /** E.164 form for tel:/sms: links and structured data. */
  e164: PHONE_E164,
  href: `tel:${PHONE_E164}`,
  /** Native SMS link (opens the visitor's messaging app; no prefilled text, no SMS service). */
  sms: `sms:${PHONE_E164}`,
} as const;

/**
 * Business facts. Only confirmed details are published; email is deliberately not a public
 * contact method (phone and the quote form only).
 */
export const BUSINESS = {
  name: 'Royal Prestige Towing',
  shortName: 'RPT',
  owner: 'Serhii Hoida',
  city: 'Sacramento',
  region: 'CA',
  country: 'US',
  phone: PHONE,
  /** Home base and confirmed destinations; other places are quoted route by route. */
  confirmedArea: ['Sacramento', 'San Francisco'],
} as const;

export interface PriceTier {
  /** Distance band in miles; `to: null` means "and beyond". */
  from: number;
  to: number | null;
  /** Starting price in USD; null = custom quote. */
  price: number | null;
}

/**
 * Local transport starting rates, confirmed by the owner. They are estimates, shown with the
 * `approxPrefix` (~$60) and a disclaimer — never as guaranteed final quotes. This is the only place
 * prices live; set `status: 'provisional'` to hide them from production builds again.
 */
export const PRICING = {
  status: 'confirmed' as 'provisional' | 'confirmed',
  currency: 'USD',
  /** Marks every numeric price as approximate. */
  approxPrefix: '~',
  tiers: [
    { from: 0, to: 5, price: 60 },
    { from: 5, to: 10, price: 80 },
    { from: 10, to: 15, price: 100 },
    { from: 15, to: null, price: null },
  ] as readonly PriceTier[],
};

/** Payment is arranged directly with the business; there is no online checkout. */
export const PAYMENT_METHODS = ['zelle', 'cash'] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

/** Developer credit shown in the footer. Plain text: no confirmed ReIskra URL exists yet. */
export const DEVELOPER = { brand: 'ReIskra', person: 'Volodymyr Khymych', url: 'https://reiskra.com/' } as const;

/** Where quote requests are POSTed once a backend exists. null = submission unavailable. */
export const QUOTE_ENDPOINT: string | null = null;

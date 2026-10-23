import config from '../../../../site.config.json';

/** Deployment settings (see web/site.config.json). */
export const SITE = {
  url: config.siteUrl.replace(/\/+$/, ''),
  indexable: config.indexable,
  staticPages: config.staticPages,
  servicePages: config.servicePages,
} as const;

/** The business telephone, confirmed by the owner. Every phone link and display reads from here. */
export const PHONE = {
  display: '+1 (916) 470-5606',
  /** E.164 form for tel: links and structured data. */
  e164: '+19164705606',
  href: 'tel:+19164705606',
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
  /** Only the home base is confirmed; everything else is provisional. */
  confirmedArea: ['Sacramento'],
} as const;

/** Where quote requests are POSTed once a backend exists. null = submission unavailable. */
export const QUOTE_ENDPOINT: string | null = null;

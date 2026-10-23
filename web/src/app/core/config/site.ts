import config from '../../../../site.config.json';

/** Deployment settings (see web/site.config.json). */
export const SITE = {
  url: config.siteUrl.replace(/\/+$/, ''),
  indexable: config.indexable,
  staticPages: config.staticPages,
  servicePages: config.servicePages,
} as const;

/**
 * Business facts. Anything not yet confirmed by the owner is null and rendered as
 * "pending confirmation" — never as a guessed value.
 */
export const BUSINESS = {
  name: 'Royal Prestige Towing',
  shortName: 'RPT',
  owner: 'Serhii Hoida',
  city: 'Sacramento',
  region: 'CA',
  country: 'US',
  /** Unverified: a handwritten note may list (916) 470-5606. Do not publish until confirmed. */
  phone: null as string | null,
  email: null as string | null,
  /** Only the home base is confirmed; everything else is provisional. */
  confirmedArea: ['Sacramento'],
} as const;

/** Where quote requests are POSTed once a backend exists. null = submission unavailable. */
export const QUOTE_ENDPOINT: string | null = null;

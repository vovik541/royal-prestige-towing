import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BUSINESS, SITE } from '../config/site';
import { DEFAULT_LANG, I18n, LANGS, LANG_TAG, Lang } from '../i18n/i18n';

export interface PageSeo {
  title: string;
  description: string;
  /** Language-neutral path, e.g. '' for home or 'services/vehicle-transport'. */
  path: string;
  image?: string;
  imageAlt?: string;
  /** Additional Schema.org nodes for this page (the organisation and website are always added). */
  schema?: object[];
  noindex?: boolean;
}

const OG_LOCALE: Record<Lang, string> = { en: 'en_US', uk: 'uk_UA', ru: 'ru_RU' };
const DEFAULT_IMAGE = '/images/og-default.jpg';

/** Absolute URL for a language and language-neutral path, without a trailing slash: /en, /en/services */
export function pageUrl(lang: Lang, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `${SITE.url}/${lang}/${clean}` : `${SITE.url}/${lang}`;
}

export const ORG_ID = `${SITE.url}/#business`;

/** The business node. Only confirmed facts: telephone yes; no email, address, hours or ratings. */
export function businessSchema(lang: Lang): object {
  return {
    '@type': 'AutomotiveBusiness',
    '@id': ORG_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.shortName,
    url: pageUrl(lang, ''),
    image: SITE.url + DEFAULT_IMAGE,
    logo: SITE.url + '/favicon.svg',
    telephone: BUSINESS.phone.e164,
    areaServed: { '@type': 'City', name: 'Sacramento', containedInPlace: { '@type': 'State', name: 'California' } },
    employee: { '@type': 'Person', name: BUSINESS.owner, jobTitle: 'Owner' },
  };
}

export function breadcrumbSchema(lang: Lang, items: { name: string; path: string }[]): object {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: pageUrl(lang, item.path) })),
  };
}

export function faqSchema(items: { q: string; a: string }[]): object {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18n = inject(I18n);

  set(page: PageSeo): void {
    const lang = this.i18n.lang();
    const url = pageUrl(lang, page.path);
    const image = SITE.url + (page.image ?? DEFAULT_IMAGE);
    const robots = !SITE.indexable || page.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

    this.doc.documentElement.lang = LANG_TAG[lang];
    this.title.setTitle(page.title);
    this.tag('name', 'description', page.description);
    this.tag('name', 'robots', robots);

    this.tag('property', 'og:type', 'website');
    this.tag('property', 'og:site_name', BUSINESS.name);
    this.tag('property', 'og:title', page.title);
    this.tag('property', 'og:description', page.description);
    this.tag('property', 'og:url', url);
    this.tag('property', 'og:image', image);
    this.tag('property', 'og:image:alt', page.imageAlt ?? page.title);
    this.tag('property', 'og:locale', OG_LOCALE[lang]);
    this.meta.getTags('property="og:locale:alternate"').forEach((t) => this.meta.removeTagElement(t));
    LANGS.filter((l) => l !== lang).forEach((l) => this.meta.addTag({ property: 'og:locale:alternate', content: OG_LOCALE[l] }));

    this.tag('name', 'twitter:card', 'summary_large_image');
    this.tag('name', 'twitter:title', page.title);
    this.tag('name', 'twitter:description', page.description);
    this.tag('name', 'twitter:image', image);

    this.links(page, url);
    this.jsonLd(lang, page, url);
  }

  private tag(attr: 'name' | 'property', key: string, content: string): void {
    this.meta.updateTag({ [attr]: key, content }, `${attr}="${key}"`);
  }

  private links(page: PageSeo, url: string): void {
    const head = this.doc.head;
    head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((n) => n.remove());
    const add = (attrs: Record<string, string>) => {
      const link = this.doc.createElement('link');
      Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
      head.appendChild(link);
    };
    if (page.noindex) return;
    add({ rel: 'canonical', href: url });
    LANGS.forEach((l) => add({ rel: 'alternate', hreflang: LANG_TAG[l], href: pageUrl(l, page.path) }));
    add({ rel: 'alternate', hreflang: 'x-default', href: pageUrl(DEFAULT_LANG, page.path) });
  }

  private jsonLd(lang: Lang, page: PageSeo, url: string): void {
    this.doc.getElementById('ld-json')?.remove();
    if (page.noindex) return;
    const graph = [
      businessSchema(lang),
      { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: BUSINESS.name, inLanguage: LANGS.map((l) => LANG_TAG[l]), publisher: { '@id': ORG_ID } },
      { '@type': 'WebPage', '@id': url, url, name: page.title, description: page.description, inLanguage: LANG_TAG[lang], isPartOf: { '@id': `${SITE.url}/#website` } },
      ...(page.schema ?? []),
    ];
    const script = this.doc.createElement('script');
    script.id = 'ld-json';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    this.doc.head.appendChild(script);
  }
}

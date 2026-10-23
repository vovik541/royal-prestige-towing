// Writes public/sitemap.xml and public/robots.txt from site.config.json.
// Runs automatically before `npm run build` (prebuild). The domain comes from site.config.json only,
// so canonical URLs in the pages and the sitemap always agree.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(join(root, 'site.config.json'), 'utf8'));
const site = config.siteUrl.replace(/\/+$/, '');
const tag = { en: 'en-US', uk: 'uk', ru: 'ru' };

const paths = [...config.staticPages, ...config.servicePages.map((s) => `services/${s}`)];
const url = (lang, path) => (path ? `${site}/${lang}/${path}` : `${site}/${lang}/`);
const lastmod = new Date().toISOString().slice(0, 10);

const entries = paths.flatMap((path) =>
  config.langs.map((lang) => {
    const alternates = config.langs
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${tag[l]}" href="${url(l, path)}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url(config.defaultLang, path)}"/>`)
      .join('\n');
    return `  <url>\n    <loc>${url(lang, path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`;
  }),
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

const robots = config.indexable
  ? `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`
  : `User-agent: *\nDisallow: /\n`;

writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap);
writeFileSync(join(root, 'public', 'robots.txt'), robots);
console.log(`sitemap.xml: ${entries.length} URLs for ${site}; robots.txt: ${config.indexable ? 'indexable' : 'noindex'}`);

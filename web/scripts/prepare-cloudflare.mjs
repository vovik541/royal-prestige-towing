// Finishes dist/web/browser for Cloudflare static assets after `ng build`:
//  - turns the prerendered /{lang}/404 pages into {lang}/404.html (and a root 404.html in English),
//    which Workers serves with HTTP 404 via not_found_handling: "404-page";
//  - hides files that must not be public (the CSR fallback shell) via .assetsignore.
import { copyFileSync, existsSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const browser = join(root, 'dist', 'web', 'browser');
const langs = ['en', 'uk', 'ru'];

if (!existsSync(browser)) throw new Error('dist/web/browser not found: run `ng build` first.');

for (const lang of langs) {
  const page = join(browser, lang, '404', 'index.html');
  if (!existsSync(page)) throw new Error(`Missing prerendered 404 page: ${page}`);
  copyFileSync(page, join(browser, lang, '404.html'));
  if (lang === 'en') copyFileSync(page, join(browser, '404.html'));
  rmSync(join(browser, lang, '404'), { recursive: true });
}

writeFileSync(join(browser, '.assetsignore'), 'index.csr.html\n');
console.log('Cloudflare assets ready: 404.html for en/uk/ru, .assetsignore written.');

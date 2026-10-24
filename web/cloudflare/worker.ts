/**
 * Cloudflare Worker for the Royal Prestige Towing site.
 *
 * Every public page is prerendered by Angular into dist/web/browser and served as static
 * assets (see ../wrangler.jsonc), so Angular's Node/Express SSR server is not used here.
 * This script only handles what static files cannot:
 *   - "/" redirects to the visitor's last chosen language (cookie set by the language
 *     switcher) or to English, mirroring src/server.ts;
 *   - everything else is passed to the assets binding, which serves the localized
 *     404.html files with a real 404 status for unknown URLs.
 */

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const LANGS = ['en', 'uk', 'ru'];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      const match = /(?:^|;\s*)rpt_lang=(\w+)/.exec(request.headers.get('Cookie') ?? '');
      const lang = match && LANGS.includes(match[1]) ? match[1] : 'en';
      return new Response(null, {
        status: 302,
        headers: { Location: `/${lang}${url.search}`, Vary: 'Cookie', 'Cache-Control': 'private, no-store' },
      });
    }

    return env.ASSETS.fetch(request);
  },
};

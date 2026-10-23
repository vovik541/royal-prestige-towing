import { RenderMode, ServerRoute } from '@angular/ssr';
import { LANGS } from './core/i18n/i18n';
import { SITE } from './core/config/site';

const perLang = async () => LANGS.map((lang) => ({ lang }));

/** Every public page is prerendered to static HTML in all three languages. */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: ':lang', renderMode: RenderMode.Prerender, getPrerenderParams: perLang },
  ...['services', 'our-work', 'about', 'service-areas', 'contact'].map(
    (page): ServerRoute => ({ path: `:lang/${page}`, renderMode: RenderMode.Prerender, getPrerenderParams: perLang }),
  ),
  {
    path: ':lang/services/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => LANGS.flatMap((lang) => SITE.servicePages.map((slug) => ({ lang, slug }))),
  },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];

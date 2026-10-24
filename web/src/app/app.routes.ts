import { inject } from '@angular/core';
import { CanMatchFn, ResolveFn, Routes, UrlSegment } from '@angular/router';
import { DEFAULT_LANG, I18n, Lang, isLang } from './core/i18n/i18n';
import { isServiceSlug } from './content/services';
import { Shell } from './layout/shell';

/** Only /en, /uk and /ru match the language shell. */
const langMatch: CanMatchFn = (_route, segments: UrlSegment[]) => isLang(segments[0]?.path);

/** Activates the language before any page renders, on the server and in the browser alike. */
const langResolve: ResolveFn<Lang> = async (route) => {
  const lang = route.paramMap.get('lang');
  const value = isLang(lang) ? lang : DEFAULT_LANG;
  await inject(I18n).use(value);
  return value;
};

const serviceMatch: CanMatchFn = (_route, segments: UrlSegment[]) => isServiceSlug(segments[1]?.path);

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: DEFAULT_LANG },
  {
    path: ':lang',
    canMatch: [langMatch],
    resolve: { lang: langResolve },
    runGuardsAndResolvers: 'paramsChange',
    component: Shell,
    children: [
      { path: '', loadComponent: () => import('./features/home/home').then((m) => m.HomePage) },
      { path: 'services', loadComponent: () => import('./features/services/services').then((m) => m.ServicesPage) },
      {
        path: 'services/:slug',
        canMatch: [serviceMatch],
        loadComponent: () => import('./features/services/service-detail').then((m) => m.ServiceDetailPage),
      },
      { path: 'our-work', loadComponent: () => import('./features/work/work').then((m) => m.WorkPage) },
      { path: 'about', loadComponent: () => import('./features/about/about').then((m) => m.AboutPage) },
      { path: 'service-areas', loadComponent: () => import('./features/areas/areas').then((m) => m.AreasPage) },
      { path: 'contact', loadComponent: () => import('./features/contact/contact-page').then((m) => m.ContactPage) },
      // Prerendered as the localized 404.html for static hosting; also used for any unknown path.
      { path: '404', loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFoundPage) },
      { path: '**', loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFoundPage) },
    ],
  },
  // Unknown language prefix: render the English shell's 404.
  {
    path: '**',
    resolve: { lang: langResolve },
    component: Shell,
    children: [{ path: '**', loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFoundPage) }],
  },
];

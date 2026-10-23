import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { I18n, fmt } from '../../core/i18n/i18n';
import { Seo, breadcrumbSchema, pageUrl } from '../../core/seo/seo';
import { LOAD_TYPES, LoadType, PORTFOLIO, photoSources } from '../../content/photos';
import { SITE } from '../../core/config/site';
import { Breadcrumbs } from '../../shared/breadcrumbs';
import { DeckLine } from '../../shared/deck-line';
import { FinalCta } from '../../shared/final-cta';
import { Lightbox } from '../../shared/lightbox';
import { Photo } from '../../shared/photo';

/** Full portfolio: every real load photo, filterable by category, with an accessible viewer. */
@Component({
  selector: 'app-work',
  imports: [Breadcrumbs, DeckLine, FinalCta, Lightbox, Photo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <header class="page-head">
      <div class="wrap">
        <app-breadcrumbs [items]="[{ name: t.nav.home, path: '' }, { name: t.nav.work, path: 'our-work' }]" />
        <h1 class="display-h">{{ t.work.title }}</h1>
        <app-deck-line />
        <p class="lede">{{ t.work.intro }}</p>
      </div>
    </header>

    <section class="section work" [attr.aria-label]="t.work.title">
      <div class="wrap">
        <div class="bar">
          <div class="filters" role="group" [attr.aria-label]="t.work.filterLabel">
            <button type="button" [attr.aria-pressed]="filter() === null" (click)="filter.set(null)">{{ t.work.all }}</button>
            @for (c of categories(); track c) {
              <button type="button" [attr.aria-pressed]="filter() === c" (click)="filter.set(c)">{{ t.work.categories[c] }}</button>
            }
          </div>
          <p class="count" aria-live="polite">{{ count() }}</p>
        </div>
        <ul class="grid">
          @for (p of shown(); track p.id; let i = $index) {
            <li>
              <button type="button" (click)="viewer().open(i)" [attr.aria-label]="t.common.enlarge.replace('{name}', t.photos[p.id].caption)">
                <app-photo [id]="p.id" [ties]="true" sizes="(max-width: 640px) 92vw, (max-width: 1000px) 46vw, 31vw" />
              </button>
              <p><strong>{{ t.photos[p.id].caption }}</strong><span>{{ t.work.categories[p.category!] }}</span></p>
            </li>
          }
        </ul>
      </div>
    </section>

    <app-final-cta [loadType]="filter()" />
    <app-lightbox [items]="ids()" />
  `,
  styles: `
    .work { padding-top: 0; }
    .bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 28px; }
    .filters { display: flex; flex-wrap: wrap; gap: 8px; }
    .filters button { min-height: 40px; padding: 0 16px; border: 1px solid var(--line-2); border-radius: 2px; background: none; font-size: var(--t-sm); font-weight: 500; color: var(--silver-2); transition: border-color .2s, color .2s, background-color .2s; }
    .filters button:hover { color: var(--silver); border-color: var(--silver-2); }
    .filters button[aria-pressed='true'] { border-color: var(--copper); color: var(--silver); background: rgba(197, 138, 84, .08); }
    .count { font-size: var(--t-sm); color: var(--silver-2); }
    .grid { list-style: none; display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px 16px; }
    .grid button { display: block; width: 100%; padding: 0; border: 0; background: none; }
    app-photo { aspect-ratio: 4 / 3; }
    app-photo ::ng-deep img { transition: transform 1s var(--ease); }
    button:hover app-photo ::ng-deep img { transform: scale(1.03); }
    .grid p { display: flex; justify-content: space-between; gap: 12px; margin-top: 10px; font-size: var(--t-xs); color: var(--silver-2); }
    .grid strong { color: var(--silver); font-weight: 600; font-size: var(--t-sm); }
    @media (max-width: 1000px) {
      .grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 640px) {
      .grid { grid-template-columns: 1fr; gap: 28px; }
      .filters { width: 100%; }
    }
  `,
})
export class WorkPage {
  protected readonly i18n = inject(I18n);
  protected readonly filter = signal<LoadType | null>(null);
  protected readonly viewer = viewChild.required(Lightbox);

  /** Only categories that actually have photos. */
  protected readonly categories = computed(() => LOAD_TYPES.filter((c) => PORTFOLIO.some((p) => p.category === c)));
  protected readonly shown = computed(() => PORTFOLIO.filter((p) => !this.filter() || p.category === this.filter()));
  protected readonly ids = computed(() => this.shown().map((p) => p.id));
  protected readonly count = computed(() => fmt(this.i18n.t().work.showing, { n: this.shown().length }));

  constructor() {
    const seo = inject(Seo);
    effect(() => {
      const t = this.i18n.t();
      const lang = this.i18n.lang();
      seo.set({
        title: t.work.seo.title,
        description: t.work.seo.description,
        path: 'our-work',
        schema: [
          breadcrumbSchema(lang, [{ name: t.nav.home, path: '' }, { name: t.nav.work, path: 'our-work' }]),
          {
            '@type': 'ImageGallery',
            name: t.work.title,
            url: pageUrl(lang, 'our-work'),
            image: PORTFOLIO.map((p) => ({ '@type': 'ImageObject', contentUrl: SITE.url + photoSources(p.id).largest, caption: t.photos[p.id].caption, description: t.photos[p.id].alt })),
          },
        ],
      });
    });
  }
}

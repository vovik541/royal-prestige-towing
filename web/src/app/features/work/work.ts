import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
import { I18n, fmt } from '../../core/i18n/i18n';
import { Seo, breadcrumbSchema, pageUrl } from '../../core/seo/seo';
import { LOAD_TYPES, LoadType, PORTFOLIO, photoSources } from '../../content/photos';
import { SITE } from '../../core/config/site';
import { Breadcrumbs } from '../../shared/breadcrumbs';
import { DeckLine } from '../../shared/deck-line';
import { FinalCta } from '../../shared/final-cta';
import { Lightbox } from '../../shared/lightbox';
import { Photo } from '../../shared/photo';

const PAGE_SIZE = 6;

/** Full portfolio: every real load photo, filterable by category, paginated, with the shared viewer. */
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
      <div class="wrap" #top>
        <div class="bar">
          <div class="filters" role="group" [attr.aria-label]="t.work.filterLabel">
            <button type="button" [attr.aria-pressed]="filter() === null" (click)="setFilter(null)">{{ t.work.all }}</button>
            @for (c of categories(); track c) {
              <button type="button" [attr.aria-pressed]="filter() === c" (click)="setFilter(c)">{{ t.work.categories[c] }}</button>
            }
          </div>
          <p class="count" aria-live="polite">{{ count() }}</p>
        </div>
        <ul class="grid">
          @for (p of pageItems(); track p.id; let i = $index) {
            <li>
              <button type="button" (click)="viewer().open(offset() + i)" [attr.aria-label]="t.common.enlarge.replace('{name}', t.photos[p.id].caption)">
                <app-photo [id]="p.id" [ties]="true" sizes="(max-width: 640px) 46vw, (max-width: 1000px) 46vw, 31vw" />
              </button>
              <p><strong>{{ t.photos[p.id].caption }}</strong><span>{{ t.work.categories[p.category!] }}</span></p>
            </li>
          }
        </ul>
        @if (pages() > 1) {
          <nav class="pager" [attr.aria-label]="t.work.pagination">
            <button type="button" class="btn btn--ghost btn--sm" (click)="go(page() - 1)" [disabled]="page() === 0">{{ t.work.prevPage }}</button>
            <ol>
              @for (n of pageList(); track n) {
                <li>
                  <button type="button" class="num" [attr.aria-current]="n === page() ? 'page' : null" [attr.aria-label]="pageLabel(n)" (click)="go(n)">{{ n + 1 }}</button>
                </li>
              }
            </ol>
            <button type="button" class="btn btn--ghost btn--sm" (click)="go(page() + 1)" [disabled]="page() === pages() - 1">{{ t.work.nextPage }}</button>
            <p class="sr-only" aria-live="polite">{{ pageStatus() }}</p>
          </nav>
        }
      </div>
    </section>

    <app-final-cta />
    <app-lightbox [items]="ids()" />
  `,
  styles: `
    .work { padding-top: 0; }
    .bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 28px; scroll-margin-top: calc(var(--bar-h) + 16px); }
    .filters { display: flex; flex-wrap: wrap; gap: 8px; }
    .filters button { min-height: 40px; padding: 0 16px; border: 1px solid var(--line-2); border-radius: 2px; background: none; font-size: var(--t-sm); font-weight: 500; color: var(--silver-2); transition: border-color .2s, color .2s, background-color .2s; }
    .filters button:hover { color: var(--silver); border-color: var(--silver-2); }
    .filters button[aria-pressed='true'] { border-color: var(--copper); color: var(--silver); background: rgba(197, 138, 84, .08); }
    .count { font-size: var(--t-sm); color: var(--silver-2); }
    .grid { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px 16px; }
    .grid button { display: block; width: 100%; padding: 0; border: 0; background: none; }
    app-photo { aspect-ratio: 4 / 3; }
    app-photo ::ng-deep img { transition: transform 1s var(--ease); }
    button:hover app-photo ::ng-deep img { transform: scale(1.03); }
    .grid p { display: flex; justify-content: space-between; gap: 12px; margin-top: 10px; font-size: var(--t-xs); color: var(--silver-2); }
    .grid strong { color: var(--silver); font-weight: 600; font-size: var(--t-sm); }
    .pager { display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 40px; }
    .pager ol { list-style: none; display: flex; gap: 6px; }
    .num { width: 44px; height: 44px; border: 1px solid var(--line-2); border-radius: 2px; background: none; font-weight: 600; color: var(--silver-2); transition: border-color .2s, color .2s; }
    .num:hover { color: var(--silver); border-color: var(--silver-2); }
    .num[aria-current='page'] { border-color: var(--copper); color: var(--silver); background: rgba(197, 138, 84, .08); }
    @media (max-width: 1000px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 640px) {
      .grid { gap: 20px 10px; }
      app-photo { aspect-ratio: 1; }
      app-photo ::ng-deep .tie { display: none; }
      .grid p { flex-direction: column; gap: 2px; margin-top: 8px; }
      .grid strong { font-size: var(--t-xs); }
      .filters button { padding: 0 12px; }
      .pager { gap: 8px; }
    }
  `,
})
export class WorkPage {
  protected readonly i18n = inject(I18n);
  protected readonly filter = signal<LoadType | null>(null);
  protected readonly page = signal(0);
  protected readonly viewer = viewChild.required(Lightbox);
  private readonly top = viewChild.required<ElementRef<HTMLElement>>('top');

  /** Only categories that actually have photos, in the site-wide order (everyday first). */
  protected readonly categories = computed(() => LOAD_TYPES.filter((c) => PORTFOLIO.some((p) => p.category === c)));
  protected readonly shown = computed(() => PORTFOLIO.filter((p) => !this.filter() || p.category === this.filter()));
  protected readonly pages = computed(() => Math.max(1, Math.ceil(this.shown().length / PAGE_SIZE)));
  protected readonly pageList = computed(() => Array.from({ length: this.pages() }, (_, i) => i));
  protected readonly offset = computed(() => this.page() * PAGE_SIZE);
  protected readonly pageItems = computed(() => this.shown().slice(this.offset(), this.offset() + PAGE_SIZE));
  /** The viewer steps through the whole filtered set, not just the visible page. */
  protected readonly ids = computed(() => this.shown().map((p) => p.id));
  protected readonly count = computed(() => fmt(this.i18n.t().work.showing, { n: this.shown().length }));
  protected readonly pageStatus = computed(() => fmt(this.i18n.t().work.page, { i: this.page() + 1, n: this.pages() }));

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

  protected pageLabel(n: number): string {
    return fmt(this.i18n.t().work.pageN, { i: n + 1 });
  }

  protected setFilter(c: LoadType | null): void {
    this.filter.set(c);
    this.page.set(0);
  }

  protected go(n: number): void {
    if (n < 0 || n >= this.pages() || n === this.page()) return;
    this.page.set(n);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.top().nativeElement.querySelector('.bar')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
}

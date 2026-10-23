import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n';
import { Seo, breadcrumbSchema } from '../../core/seo/seo';
import { AreaMap } from '../../shared/area-map';
import { Breadcrumbs } from '../../shared/breadcrumbs';
import { DeckLine } from '../../shared/deck-line';
import { FinalCta } from '../../shared/final-cta';
import { Reveal } from '../../shared/reveal';

/** Sacramento base and how coverage beyond it is confirmed route by route. */
@Component({
  selector: 'app-areas',
  imports: [RouterLink, AreaMap, Breadcrumbs, DeckLine, FinalCta, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    @let a = t.areas;
    <header class="page-head">
      <div class="wrap">
        <app-breadcrumbs [items]="[{ name: t.nav.home, path: '' }, { name: t.nav.areas, path: 'service-areas' }]" />
        <h1 class="display-h">{{ a.title }}</h1>
        <app-deck-line />
        <p class="lede">{{ a.intro }}</p>
      </div>
    </header>

    <section class="section top" aria-labelledby="cov-h">
      <div class="grid wrap">
        <div>
          <h2 id="cov-h" class="section-h" appReveal>{{ a.legendTitle }}</h2>
          <ul class="regions">
            @for (r of a.regions; track r.name; let i = $index) {
              <li [appReveal]="i * 70">
                <span class="status status--{{ r.status }}">{{ statusLabel(r.status) }}</span>
                <h3>{{ r.name }}</h3>
                <p>{{ r.text }}</p>
              </li>
            }
          </ul>
        </div>
        <app-area-map appReveal />
      </div>
    </section>

    <section class="section band" aria-labelledby="cor-h">
      <div class="corr wrap">
        <h2 id="cor-h" class="section-h" appReveal>{{ a.corridorsTitle }}</h2>
        <div appReveal="70">
          <p class="lede">{{ a.corridors }}</p>
          <a class="btn btn--line" [routerLink]="i18n.link('services/long-distance-transport')">{{ t.services.items['long-distance-transport'].name }}</a>
        </div>
      </div>
    </section>

    <app-final-cta />
  `,
  styles: `
    .top { padding-top: 0; }
    .grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(32px, 5vw, 80px); align-items: start; }
    .regions { list-style: none; margin-top: 28px; border-top: 1px solid var(--line); }
    .regions li { padding: 20px 0; border-bottom: 1px solid var(--line); display: grid; gap: 6px; }
    .regions h3 { font: 600 var(--t-h3)/1.2 var(--text); }
    .regions p { color: var(--silver-2); font-size: var(--t-sm); }
    .status { justify-self: start; font-size: var(--t-xs); font-weight: 600; letter-spacing: .06em; text-transform: uppercase; padding: 4px 8px; border-radius: 2px; border: 1px solid var(--line-2); color: var(--silver-2); }
    .status--home { border-color: var(--copper); color: var(--copper-hi); }
    .status--near { border-color: var(--steel); color: var(--steel); }
    .corr { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(28px, 5vw, 80px); align-items: start; }
    .corr .lede { margin-bottom: 28px; max-width: 36em; }
    @media (max-width: 900px) { .grid, .corr { grid-template-columns: minmax(0, 1fr); } }
  `,
})
export class AreasPage {
  protected readonly i18n = inject(I18n);

  constructor() {
    const seo = inject(Seo);
    effect(() => {
      const t = this.i18n.t();
      seo.set({
        title: t.areas.seo.title,
        description: t.areas.seo.description,
        path: 'service-areas',
        schema: [breadcrumbSchema(this.i18n.lang(), [{ name: t.nav.home, path: '' }, { name: t.nav.areas, path: 'service-areas' }])],
      });
    });
  }

  protected statusLabel(status: string): string {
    const s = this.i18n.t().areas.statuses;
    return status === 'home' ? s.home : status === 'near' ? s.near : s.tbc;
  }
}

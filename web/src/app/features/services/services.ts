import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { I18n } from '../../core/i18n/i18n';
import { Seo, breadcrumbSchema, pageUrl } from '../../core/seo/seo';
import { SERVICES } from '../../content/services';
import { Breadcrumbs } from '../../shared/breadcrumbs';
import { DeckLine } from '../../shared/deck-line';
import { FinalCta } from '../../shared/final-cta';
import { Reveal } from '../../shared/reveal';
import { ServiceCard } from '../../shared/service-card';

@Component({
  selector: 'app-services',
  imports: [Breadcrumbs, DeckLine, FinalCta, Reveal, ServiceCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <header class="page-head">
      <div class="wrap">
        <app-breadcrumbs [items]="[{ name: t.nav.home, path: '' }, { name: t.nav.services, path: 'services' }]" />
        <h1 class="display-h">{{ t.services.title }}</h1>
        <app-deck-line />
        <p class="lede">{{ t.services.intro }}</p>
      </div>
    </header>
    <section class="section list" [attr.aria-label]="t.services.title">
      <ul class="grid wrap">
        @for (s of services; track s.slug; let i = $index) {
          <li [appReveal]="(i % 3) * 80"><app-service-card [service]="s" /></li>
        }
      </ul>
    </section>
    <app-final-cta />
  `,
  styles: `
    .list { padding-top: 0; }
    .grid { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 56px 32px; }
    @media (max-width: 1000px) { .grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
    @media (max-width: 640px) { .grid { grid-template-columns: minmax(0, 1fr); gap: 48px; } }
  `,
})
export class ServicesPage {
  protected readonly i18n = inject(I18n);
  protected readonly services = SERVICES;

  constructor() {
    const seo = inject(Seo);
    effect(() => {
      const t = this.i18n.t();
      const lang = this.i18n.lang();
      seo.set({
        title: t.services.seo.title,
        description: t.services.seo.description,
        path: 'services',
        schema: [
          breadcrumbSchema(lang, [{ name: t.nav.home, path: '' }, { name: t.nav.services, path: 'services' }]),
          {
            '@type': 'ItemList',
            itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: pageUrl(lang, 'services/' + s.slug), name: t.services.items[s.slug].name })),
          },
        ],
      });
    });
  }
}

import { ChangeDetectionStrategy, Component, computed, effect, inject, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n';
import { AREA_SERVED, ORG_ID, Seo, breadcrumbSchema, faqSchema } from '../../core/seo/seo';
import { photoSources } from '../../content/photos';
import { SERVICES, ServiceSlug, service } from '../../content/services';
import { AuctionPickup } from '../../shared/auction-pickup';
import { Breadcrumbs } from '../../shared/breadcrumbs';
import { CallText } from '../../shared/call-text';
import { DeckLine } from '../../shared/deck-line';
import { Faq } from '../../shared/faq';
import { FinalCta } from '../../shared/final-cta';
import { Lightbox } from '../../shared/lightbox';
import { Photo } from '../../shared/photo';
import { Reveal } from '../../shared/reveal';
import { ServiceCard } from '../../shared/service-card';

/** One template for every service page; copy comes from the dictionary, photos from content/services. */
@Component({
  selector: 'app-service-detail',
  imports: [RouterLink, AuctionPickup, Breadcrumbs, CallText, DeckLine, Faq, FinalCta, Lightbox, Photo, Reveal, ServiceCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.css',
})
export class ServiceDetailPage {
  protected readonly i18n = inject(I18n);

  /** Route param (component input binding). The route only matches known slugs. */
  readonly slug = input.required<ServiceSlug>();

  protected readonly meta = computed(() => service(this.slug()));
  protected readonly copy = computed(() => this.i18n.t().services.items[this.slug()]);
  protected readonly others = computed(() => SERVICES.filter((s) => s.slug !== this.slug()).slice(0, 3));
  protected readonly photos = computed(() => [this.meta().hero, ...this.meta().gallery]);
  private readonly viewer = viewChild.required(Lightbox);

  constructor() {
    const seo = inject(Seo);
    effect(() => {
      const t = this.i18n.t();
      const lang = this.i18n.lang();
      const c = this.copy();
      const path = 'services/' + this.slug();
      seo.set({
        title: c.seo.title,
        description: c.seo.description,
        path,
        image: photoSources(this.meta().hero).largest,
        imageAlt: t.photos[this.meta().hero].alt,
        schema: [
          {
            '@type': 'Service',
            name: c.name,
            serviceType: c.name,
            description: c.seo.description,
            provider: { '@id': ORG_ID },
            areaServed: AREA_SERVED,
          },
          breadcrumbSchema(lang, [
            { name: t.nav.home, path: '' },
            { name: t.nav.services, path: 'services' },
            { name: c.name, path },
          ]),
          faqSchema(c.faq),
        ],
      });
    });
  }

  protected open(i: number): void {
    this.viewer().open(i);
  }
}

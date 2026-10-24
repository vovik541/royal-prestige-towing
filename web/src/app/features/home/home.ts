import { ChangeDetectionStrategy, Component, effect, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n';
import { Seo, faqSchema } from '../../core/seo/seo';
import { PhotoId } from '../../content/photos';
import { AreaMap } from '../../shared/area-map';
import { AuctionPickup } from '../../shared/auction-pickup';
import { CallText } from '../../shared/call-text';
import { DeckLine } from '../../shared/deck-line';
import { Faq } from '../../shared/faq';
import { FinalCta } from '../../shared/final-cta';
import { Lightbox } from '../../shared/lightbox';
import { OwnerProfile } from '../../shared/owner-profile';
import { Photo } from '../../shared/photo';
import { Pricing, pricingVisible } from '../../shared/pricing';
import { Reveal } from '../../shared/reveal';

const FEATURED = ['mclaren-front', 'lamborghini-urus', 'lathe-forklift'] as const;
const STRIP: PhotoId[] = ['bmw-alpina', 'mercedes-sedan', 'milling-machine', 'vw-beetle', 'volvo-c70', 'vintage-microtruck', 'lathe-secured'];

@Component({
  selector: 'app-home',
  imports: [RouterLink, AreaMap, AuctionPickup, CallText, DeckLine, Faq, FinalCta, Lightbox, OwnerProfile, Photo, Pricing, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage {
  protected readonly i18n = inject(I18n);
  /** The strip under the hero: one link per service, everyday vehicles first. */
  protected readonly indexItems = [
    { key: 'everyday', slug: 'vehicle-transport' },
    { key: 'auction', slug: 'auto-auction-transport' },
    { key: 'exotic', slug: 'exotic-car-transport' },
    { key: 'machinery', slug: 'equipment-machinery-hauling' },
  ] as const;
  protected readonly showPricing = pricingVisible();
  protected readonly featured = FEATURED;
  protected readonly strip = STRIP;
  /** Photos the viewer can step through: the three featured loads, then the strip. */
  protected readonly viewerItems: PhotoId[] = [...FEATURED, ...STRIP];
  private readonly viewer = viewChild.required(Lightbox);

  constructor() {
    const seo = inject(Seo);
    effect(() => {
      const t = this.i18n.t();
      seo.set({ title: t.home.seo.title, description: t.home.seo.description, path: '', imageAlt: t.photos['mclaren-side'].alt, schema: [faqSchema(t.faq)] });
    });
  }


  protected statusLabel(status: string): string {
    const s = this.i18n.t().areas.statuses;
    return status === 'home' ? s.home : status === 'near' ? s.near : s.tbc;
  }

  protected openViewer(id: PhotoId): void {
    this.viewer().open(this.viewerItems.indexOf(id));
  }

  protected scrollStrip(el: HTMLElement, dir: 1 | -1): void {
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
}

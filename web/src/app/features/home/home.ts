import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n';
import { Seo, faqSchema } from '../../core/seo/seo';
import { LOAD_TYPES, LoadType, PhotoId } from '../../content/photos';
import { Configurator } from '../quote/configurator';
import { AreaMap } from '../../shared/area-map';
import { DeckLine } from '../../shared/deck-line';
import { Faq } from '../../shared/faq';
import { FinalCta } from '../../shared/final-cta';
import { Lightbox } from '../../shared/lightbox';
import { OwnerProfile } from '../../shared/owner-profile';
import { Photo } from '../../shared/photo';
import { Reveal } from '../../shared/reveal';

const FEATURED = ['mclaren-front', 'lamborghini-urus', 'lathe-forklift'] as const;
const STRIP: PhotoId[] = ['bmw-alpina', 'cargo-van', 'mercedes-sedan', 'milling-machine', 'vw-beetle', 'volvo-c70', 'vintage-microtruck', 'lathe-secured'];

@Component({
  selector: 'app-home',
  imports: [RouterLink, Configurator, AreaMap, DeckLine, Faq, FinalCta, Lightbox, OwnerProfile, Photo, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage {
  protected readonly i18n = inject(I18n);
  private readonly router = inject(Router);

  protected readonly loadTypes = LOAD_TYPES;
  protected readonly featured = FEATURED;
  protected readonly strip = STRIP;
  /** Photos the viewer can step through: the three featured loads, then the strip. */
  protected readonly viewerItems: PhotoId[] = [...FEATURED, ...STRIP];
  protected readonly loadType = signal<LoadType>('exotic');
  private readonly viewer = viewChild.required(Lightbox);

  constructor() {
    const seo = inject(Seo);
    effect(() => {
      const t = this.i18n.t();
      seo.set({ title: t.home.seo.title, description: t.home.seo.description, path: '', imageAlt: t.photos['mclaren-side'].alt, schema: [faqSchema(t.faq)] });
    });
  }

  protected pick(type: LoadType): void {
    this.loadType.set(type);
    this.router.navigate([], { fragment: 'configurator' });
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

import { SITE } from '../core/config/site';
import { PhotoId } from './photos';

export type ServiceSlug =
  | 'vehicle-transport'
  | 'auto-auction-transport'
  | 'exotic-car-transport'
  | 'equipment-machinery-hauling'
  | 'long-distance-transport';

export interface ServiceMeta {
  slug: ServiceSlug;
  hero: PhotoId;
  gallery: PhotoId[];
}

/** Order matters: everyday vehicles first, auction pickups second; exotics are one service among several. */
export const SERVICES: readonly ServiceMeta[] = [
  { slug: 'vehicle-transport', hero: 'volvo-c70', gallery: ['vw-beetle', 'mercedes-sedan', 'bmw-alpina'] },
  // No auction-yard photo exists; the hero is an everyday car on the deck, not an auction pickup.
  { slug: 'auto-auction-transport', hero: 'mercedes-sedan', gallery: [] },
  { slug: 'exotic-car-transport', hero: 'mclaren-side', gallery: ['mclaren-rear', 'lamborghini-urus', 'mclaren-front'] },
  { slug: 'equipment-machinery-hauling', hero: 'lathe-forklift', gallery: ['lathe-secured', 'milling-machine'] },
  { slug: 'long-distance-transport', hero: 'vw-beetle', gallery: [] },
];

// Keep the TypeScript list and the sitemap list in site.config.json in step.
if (SERVICES.map((s) => s.slug).join() !== SITE.servicePages.join()) {
  throw new Error('SERVICES and site.config.json servicePages are out of sync');
}

export const isServiceSlug = (v: unknown): v is ServiceSlug => SERVICES.some((s) => s.slug === v);
export const service = (slug: ServiceSlug): ServiceMeta => SERVICES.find((s) => s.slug === slug)!;

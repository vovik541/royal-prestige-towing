import { SITE } from '../core/config/site';
import { LoadType, PhotoId } from './photos';

export type ServiceSlug =
  | 'exotic-car-transport'
  | 'vehicle-transport'
  | 'commercial-vehicle-transport'
  | 'equipment-machinery-hauling'
  | 'long-distance-transport';

export interface ServiceMeta {
  slug: ServiceSlug;
  /** Preselected load type when starting a quote from this service (null = choose). */
  loadType: LoadType | null;
  hero: PhotoId;
  gallery: PhotoId[];
}

/** Order matters: everyday vehicle transport is the main service, exotic transport the premium one. */
export const SERVICES: readonly ServiceMeta[] = [
  { slug: 'vehicle-transport', loadType: 'everyday', hero: 'volvo-c70', gallery: ['vw-beetle', 'mercedes-sedan', 'bmw-alpina'] },
  { slug: 'exotic-car-transport', loadType: 'exotic', hero: 'mclaren-side', gallery: ['mclaren-rear', 'lamborghini-urus', 'mclaren-front'] },
  { slug: 'commercial-vehicle-transport', loadType: 'commercial', hero: 'cargo-van', gallery: [] },
  { slug: 'equipment-machinery-hauling', loadType: 'machinery', hero: 'lathe-forklift', gallery: ['lathe-secured', 'milling-machine'] },
  { slug: 'long-distance-transport', loadType: null, hero: 'mercedes-sedan', gallery: [] },
];

// Keep the TypeScript list and the sitemap list in site.config.json in step.
if (SERVICES.map((s) => s.slug).join() !== SITE.servicePages.join()) {
  throw new Error('SERVICES and site.config.json servicePages are out of sync');
}

export const isServiceSlug = (v: unknown): v is ServiceSlug => SERVICES.some((s) => s.slug === v);
export const service = (slug: ServiceSlug): ServiceMeta => SERVICES.find((s) => s.slug === slug)!;

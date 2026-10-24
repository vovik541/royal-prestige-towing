import { PHOTO_SIZES, PhotoId } from './photo-sizes';

export type { PhotoId };
/** Portfolio categories, in filter order: everyday vehicles first. */
export type LoadType = 'everyday' | 'exotic' | 'machinery' | 'special';
export const LOAD_TYPES: readonly LoadType[] = ['everyday', 'exotic', 'machinery', 'special'];

export interface PhotoMeta {
  id: PhotoId;
  /** Portfolio category; the owner portrait has none. */
  category: LoadType | null;
  /** CSS object-position that keeps the load in frame when cropped. */
  focus: string;
}

/**
 * Every real client photograph, in portfolio order: everyday vehicles lead, interleaved with the
 * exotic and machinery work that proves the standard. Alt text and captions live in the dictionaries.
 */
export const PHOTOS: readonly PhotoMeta[] = [
  { id: 'mercedes-sedan', category: 'everyday', focus: '45% 60%' },
  { id: 'mclaren-front', category: 'exotic', focus: '45% 58%' },
  { id: 'vw-beetle', category: 'everyday', focus: '40% 55%' },
  { id: 'lamborghini-urus', category: 'exotic', focus: '55% 60%' },
  { id: 'cargo-van', category: 'special', focus: '60% 50%' },
  { id: 'lathe-forklift', category: 'machinery', focus: '40% 55%' },
  { id: 'volvo-c70', category: 'everyday', focus: '50% 60%' },
  { id: 'mclaren-side', category: 'exotic', focus: '52% 60%' },
  { id: 'bmw-alpina', category: 'special', focus: '50% 55%' },
  { id: 'milling-machine', category: 'machinery', focus: '50% 50%' },
  { id: 'mclaren-rear', category: 'exotic', focus: '50% 40%' },
  { id: 'vintage-microtruck', category: 'special', focus: '40% 50%' },
  { id: 'lathe-secured', category: 'machinery', focus: '45% 45%' },
  { id: 'owner-serhii', category: null, focus: '50% 30%' },
];

export const photo = (id: PhotoId): PhotoMeta => PHOTOS.find((p) => p.id === id)!;
export const PORTFOLIO = PHOTOS.filter((p) => p.category !== null);

const BASE = '/images/photos/';

/** Responsive sources for a photo: src (mid size), srcset of every real width, intrinsic size. */
export function photoSources(id: PhotoId) {
  const sizes = PHOTO_SIZES[id];
  const largest = sizes[sizes.length - 1];
  const mid = sizes[Math.min(1, sizes.length - 1)];
  return {
    src: `${BASE}${id}-${mid[0]}.webp`,
    srcset: sizes.map(([w]) => `${BASE}${id}-${w}.webp ${w}w`).join(', '),
    largest: `${BASE}${id}-${largest[0]}.webp`,
    width: largest[0],
    height: largest[1],
  };
}

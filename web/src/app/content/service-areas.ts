import { Lang } from '../core/i18n/i18n';

/** Coverage tiers on the Service Areas page (each region in `areas.regions` names its tier). */
export type AreaTier = 'sacramento' | 'norcal' | 'bay' | 'longer';

/**
 * - base: the home base (Sacramento);
 * - confirmed: a destination the owner has confirmed (San Francisco);
 * - pending: a candidate area, shown as "can be considered" until Serhii reviews it.
 */
export type CityStatus = 'base' | 'confirmed' | 'pending';

export interface City {
  tier: AreaTier;
  status: CityStatus;
  name: Record<Lang, string>;
}

/**
 * Every place named on the Service Areas page, in display order. Owner review: delete a line to
 * remove a city everywhere, or change `pending` to `confirmed` once Serhii has confirmed it.
 * The status is internal only: the page shows every city the same way. Structured data does not
 * read this list (it lists Sacramento, San Francisco and the wider regions, see core/seo/seo.ts).
 */
export const CITIES: readonly City[] = [
  // Greater Sacramento — local transport
  { tier: 'sacramento', status: 'base', name: { en: 'Sacramento', uk: 'Сакраменто', ru: 'Сакраменто' } },
  { tier: 'sacramento', status: 'pending', name: { en: 'West Sacramento', uk: 'Вест-Сакраменто', ru: 'Уэст-Сакраменто' } },
  { tier: 'sacramento', status: 'pending', name: { en: 'Roseville', uk: 'Розвілл', ru: 'Розвилл' } },
  { tier: 'sacramento', status: 'pending', name: { en: 'Rocklin', uk: 'Роклін', ru: 'Роклин' } },
  { tier: 'sacramento', status: 'pending', name: { en: 'Folsom', uk: 'Фолсом', ru: 'Фолсом' } },
  { tier: 'sacramento', status: 'pending', name: { en: 'Elk Grove', uk: 'Елк-Гроув', ru: 'Элк-Гроув' } },
  { tier: 'sacramento', status: 'pending', name: { en: 'Rancho Cordova', uk: 'Ранчо-Кордова', ru: 'Ранчо-Кордова' } },
  { tier: 'sacramento', status: 'pending', name: { en: 'Citrus Heights', uk: 'Сітрус-Гайтс', ru: 'Ситрус-Хайтс' } },
  { tier: 'sacramento', status: 'pending', name: { en: 'Carmichael', uk: 'Кармайкл', ru: 'Кармайкл' } },
  { tier: 'sacramento', status: 'pending', name: { en: 'Fair Oaks', uk: 'Фер-Оукс', ru: 'Фэр-Окс' } },
  // Northern California — regional routes, quoted per route
  { tier: 'norcal', status: 'pending', name: { en: 'Davis', uk: 'Девіс', ru: 'Дейвис' } },
  { tier: 'norcal', status: 'pending', name: { en: 'Woodland', uk: 'Вудленд', ru: 'Вудленд' } },
  { tier: 'norcal', status: 'pending', name: { en: 'Vacaville', uk: 'Вакавілл', ru: 'Вакавилл' } },
  { tier: 'norcal', status: 'pending', name: { en: 'Fairfield', uk: 'Ферфілд', ru: 'Фэрфилд' } },
  { tier: 'norcal', status: 'pending', name: { en: 'Vallejo', uk: 'Вальєхо', ru: 'Вальехо' } },
  { tier: 'norcal', status: 'pending', name: { en: 'Auburn', uk: 'Оберн', ru: 'Оберн' } },
  { tier: 'norcal', status: 'pending', name: { en: 'Placerville', uk: 'Плейсервілл', ru: 'Плейсервилл' } },
  { tier: 'norcal', status: 'pending', name: { en: 'Yuba City', uk: 'Юба-Сіті', ru: 'Юба-Сити' } },
  { tier: 'norcal', status: 'pending', name: { en: 'Stockton', uk: 'Стоктон', ru: 'Стоктон' } },
  // San Francisco Bay Area — scheduled longer-distance transport by arrangement
  { tier: 'bay', status: 'confirmed', name: { en: 'San Francisco', uk: 'Сан-Франциско', ru: 'Сан-Франциско' } },
  { tier: 'bay', status: 'pending', name: { en: 'Oakland', uk: 'Окленд', ru: 'Окленд' } },
  { tier: 'bay', status: 'pending', name: { en: 'Berkeley', uk: 'Берклі', ru: 'Беркли' } },
  { tier: 'bay', status: 'pending', name: { en: 'San Jose', uk: 'Сан-Хосе', ru: 'Сан-Хосе' } },
  { tier: 'bay', status: 'pending', name: { en: 'Fremont', uk: 'Фремонт', ru: 'Фремонт' } },
  { tier: 'bay', status: 'pending', name: { en: 'Hayward', uk: 'Гейворд', ru: 'Хейуорд' } },
  { tier: 'bay', status: 'pending', name: { en: 'Concord', uk: 'Конкорд', ru: 'Конкорд' } },
  { tier: 'bay', status: 'pending', name: { en: 'Walnut Creek', uk: 'Волнат-Крік', ru: 'Уолнат-Крик' } },
];

export const citiesIn = (tier: AreaTier): readonly City[] => CITIES.filter((c) => c.tier === tier);

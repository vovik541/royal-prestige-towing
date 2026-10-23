import { Injectable, signal } from '@angular/core';
import { en, Dict } from '../../content/i18n/en';

export const LANGS = ['en', 'uk', 'ru'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

/** BCP 47 tags for hreflang and <html lang>. */
export const LANG_TAG: Record<Lang, string> = { en: 'en-US', uk: 'uk', ru: 'ru' };

/** Each language's own name, for the switcher (available without loading that dictionary). */
export const LANG_NAME: Record<Lang, string> = { en: 'English', uk: 'Українська', ru: 'Русский' };

export const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang);

/*
 * English ships in the main bundle; Ukrainian and Russian load on demand. The language
 * resolver awaits the dictionary before any page renders, and hydration waits for that
 * first navigation, so server and browser always render the same text (no flicker).
 */
const LOADERS: Record<Exclude<Lang, 'en'>, () => Promise<Dict>> = {
  uk: () => import('../../content/i18n/uk').then((m) => m.uk),
  ru: () => import('../../content/i18n/ru').then((m) => m.ru),
};

/** Fill {placeholders}: fmt('Photo {i} of {n}', { i: 1, n: 8 }). */
export function fmt(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (m, key: string) => (key in values ? String(values[key]) : m));
}

@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly cache = new Map<Lang, Dict>([['en', en]]);
  private readonly dict = signal<Dict>(en);

  readonly lang = signal<Lang>(DEFAULT_LANG);
  readonly t = this.dict.asReadonly();
  readonly langs = LANGS;

  /** Load (if needed) and activate a language. */
  async use(lang: Lang): Promise<void> {
    let dict = this.cache.get(lang);
    if (!dict) {
      dict = await LOADERS[lang as Exclude<Lang, 'en'>]();
      this.cache.set(lang, dict);
    }
    this.dict.set(dict);
    this.lang.set(lang);
  }

  /** Language-prefixed link, e.g. link('services') -> /uk/services */
  link(path = ''): string {
    const clean = path.replace(/^\/+/, '');
    return `/${this.lang()}${clean ? '/' + clean : ''}`;
  }
}

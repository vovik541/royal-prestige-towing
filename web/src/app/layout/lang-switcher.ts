import { ChangeDetectionStrategy, Component, DOCUMENT, computed, inject, input } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { I18n, LANG_NAME, LANG_TAG, Lang } from '../core/i18n/i18n';

const SHORT: Record<Lang, string> = { en: 'EN', uk: 'UA', ru: 'RU' };

/** Links to the same page in each language, and remembers the choice in a cookie. */
@Component({
  selector: 'app-lang-switcher',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul [class.full]="full()" [attr.aria-label]="i18n.t().nav.language">
      @for (l of i18n.langs; track l) {
        <li>
          <a
            [routerLink]="'/' + l + rest()"
            [queryParams]="query()"
            [attr.hreflang]="tag[l]"
            [attr.lang]="tag[l]"
            [attr.aria-current]="l === i18n.lang() ? 'true' : null"
            [attr.title]="names[l]"
            (click)="remember(l)"
          >{{ full() ? names[l] : short[l] }}</a>
        </li>
      }
    </ul>
  `,
  styles: `
    ul { list-style: none; display: flex; gap: 2px; }
    a { display: block; padding: 6px 7px; font-size: 12px; font-weight: 600; letter-spacing: .06em; color: var(--silver-2); border-radius: 2px; text-decoration: none; transition: color .2s, background-color .2s; }
    a:hover { color: var(--silver); }
    a[aria-current] { color: var(--silver); background: var(--graphite-2); }
    .full { gap: 6px; flex-wrap: wrap; }
    .full a { font-size: var(--t-sm); letter-spacing: 0; padding: 8px 12px; border: 1px solid var(--line); }
    .full a[aria-current] { border-color: var(--copper); background: transparent; }
  `,
})
export class LangSwitcher {
  protected readonly i18n = inject(I18n);
  private readonly router = inject(Router);
  private readonly doc = inject(DOCUMENT);

  /** Full language names (mobile menu) instead of short codes. */
  readonly full = input(false);

  protected readonly short = SHORT;
  protected readonly names = LANG_NAME;
  protected readonly tag = LANG_TAG;

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** Current path without its language prefix, e.g. '/services/vehicle-transport'. */
  protected readonly rest = computed(() => {
    const path = this.url().split(/[?#]/)[0];
    return path.replace(/^\/(en|uk|ru)(?=\/|$)/, '');
  });

  protected readonly query = computed(() => this.router.parseUrl(this.url()).queryParams);

  protected remember(lang: Lang): void {
    this.doc.cookie = `rpt_lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }
}

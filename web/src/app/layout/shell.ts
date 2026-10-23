import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { PHONE } from '../core/config/site';
import { I18n, fmt } from '../core/i18n/i18n';
import { PhoneIcon } from '../shared/phone-icon';
import { Header } from './header';
import { Footer } from './footer';

const TYPING = 'input:not([type=radio]):not([type=checkbox]), textarea, select';

/**
 * Language-scoped layout: header, page outlet, footer and, on phones, a fixed two-action
 * contact bar (Call Now / Get a Quote). The bar steps aside while a form field has focus so
 * it never covers inputs or the on-screen keyboard; styles.css reserves its height at the
 * bottom of the page.
 */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, Header, Footer, PhoneIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:focusin)': 'onFocus($event)', '(document:focusout)': 'typing.set(false)' },
  template: `
    @let t = i18n.t();
    <a class="skip" href="#main">{{ t.meta.skip }}</a>
    <app-header />
    <main id="main" tabindex="-1"><router-outlet /></main>
    <app-footer />
    <nav class="dock" [class.is-away]="typing()" [attr.aria-label]="t.common.callNow + ' / ' + t.common.getQuote">
      <a class="btn btn--copper dock__call" [href]="phone.href" [attr.aria-label]="callAria()"><app-phone-icon />{{ t.common.callNow }}</a>
      @if (!onContact()) {
        <a class="btn btn--ghost dock__quote" [routerLink]="i18n.link('contact')">{{ t.common.getQuote }}</a>
      }
    </nav>
  `,
  styles: `
    main:focus { outline: none; }
    .dock { display: none; }
    @media (max-width: 640px) {
      .dock { display: flex; gap: 8px; position: fixed; left: 0; right: 0; bottom: 0; z-index: 40; padding: 10px var(--gut) max(10px, env(safe-area-inset-bottom)); background: rgba(15, 17, 20, .97); border-top: 1px solid var(--line); transition: transform .3s var(--ease); }
      .dock.is-away { transform: translateY(110%); }
      .dock .btn { flex: 1 1 0; min-width: 0; min-height: 52px; padding: 4px 10px; gap: 8px; font-size: var(--t-md); white-space: normal; line-height: 1.15; }
      .dock__quote { background: var(--carbon); }
    }
    @media (max-width: 380px) {
      .dock .btn { font-size: 15px; padding-inline: 8px; }
    }
  `,
})
export class Shell {
  protected readonly i18n = inject(I18n);
  private readonly router = inject(Router);

  protected readonly phone = PHONE;
  protected readonly callAria = computed(() => fmt(this.i18n.t().common.callAria, { phone: PHONE.display }));
  protected readonly typing = signal(false);

  private readonly url = toSignal(
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd), map(() => this.router.url)),
    { initialValue: this.router.url },
  );
  protected readonly onContact = computed(() => /^\/\w+\/contact/.test(this.url()));

  protected onFocus(e: FocusEvent): void {
    this.typing.set(e.target instanceof Element && e.target.matches(TYPING));
  }
}

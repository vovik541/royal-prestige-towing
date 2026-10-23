import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PHONE } from '../core/config/site';
import { ContactBar } from '../core/contact-bar';
import { I18n, fmt } from '../core/i18n/i18n';
import { MessageIcon } from '../shared/message-icon';
import { PhoneIcon } from '../shared/phone-icon';
import { Header } from './header';
import { Footer } from './footer';

const TYPING = 'input:not([type=radio]):not([type=checkbox]), textarea, select';

/**
 * Language-scoped layout: header, page outlet, footer and, on phones, a floating Call / Text bar.
 * ContactBar decides when the bar is useful (no contact zone on screen, no menu, viewer or
 * keyboard); while hidden it is inert, so it cannot take focus. The footer ends with room for it
 * (styles.css), so the last lines of the page are never left under it.
 */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Header, Footer, PhoneIcon, MessageIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:focusin)': 'onFocus($event)', '(document:focusout)': 'bar.typing.set(false)' },
  template: `
    @let t = i18n.t();
    <a class="skip" href="#main">{{ t.meta.skip }}</a>
    <app-header />
    <main id="main" tabindex="-1"><router-outlet /></main>
    <app-footer />
    <nav class="dock" [class.is-on]="bar.show()" [attr.inert]="bar.show() ? null : ''" [attr.aria-hidden]="bar.show() ? null : 'true'" [attr.aria-label]="t.common.contactActions">
      <a class="btn btn--copper" [href]="phone.href" [attr.aria-label]="callAria()"><app-phone-icon />{{ t.common.callNow }}</a>
      <a class="btn btn--ghost dock__sms" [href]="phone.sms" [attr.aria-label]="smsAria()"><app-message-icon />{{ t.common.textUs }}</a>
    </nav>
  `,
  styles: `
    main:focus { outline: none; }
    .dock { display: none; }
    @media (max-width: 640px) {
      .dock { display: flex; gap: 8px; position: fixed; left: 0; right: 0; bottom: 0; z-index: 40; padding: 10px var(--gut) max(10px, env(safe-area-inset-bottom)); background: rgba(15, 17, 20, .97); border-top: 1px solid var(--line);
        transform: translateY(110%); visibility: hidden; transition: transform .3s var(--ease), visibility 0s linear .3s; }
      .dock.is-on { transform: none; visibility: visible; transition: transform .3s var(--ease), visibility 0s; }
      .dock .btn { flex: 1 1 0; min-width: 0; min-height: 52px; padding: 4px 10px; gap: 8px; font-size: var(--t-md); white-space: normal; line-height: 1.15; }
      .dock .btn:first-child { flex-grow: 1.3; }
      .dock__sms { background: var(--carbon); }
      .dock__sms app-message-icon { color: var(--copper); }
    }
    @media (max-width: 380px) {
      .dock .btn { font-size: 15px; padding-inline: 8px; }
    }
    @media (max-width: 360px) {
      .dock app-phone-icon, .dock app-message-icon { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      .dock, .dock.is-on { transition: none; }
    }
  `,
})
export class Shell {
  protected readonly i18n = inject(I18n);
  protected readonly bar = inject(ContactBar);
  protected readonly phone = PHONE;
  protected readonly callAria = computed(() => fmt(this.i18n.t().common.callAria, { phone: PHONE.display }));
  protected readonly smsAria = computed(() => fmt(this.i18n.t().common.smsAria, { phone: PHONE.display }));

  protected onFocus(e: FocusEvent): void {
    this.bar.typing.set(e.target instanceof Element && e.target.matches(TYPING));
  }
}

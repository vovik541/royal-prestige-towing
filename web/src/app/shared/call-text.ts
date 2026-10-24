import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { PHONE } from '../core/config/site';
import { ContactZone } from '../core/contact-bar';
import { I18n, fmt } from '../core/i18n/i18n';
import { MessageIcon } from './message-icon';
import { PhoneIcon } from './phone-icon';

/**
 * The site's only way to get in touch: a copper Call button and a Text (SMS) button, both from
 * PHONE. Every instance is a contact zone, so the floating mobile bar steps aside while it is visible.
 */
@Component({
  selector: 'app-call-text',
  imports: [PhoneIcon, MessageIcon],
  hostDirectives: [ContactZone],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'group', '[attr.aria-label]': 'i18n.t().common.contactActions', '[class.lg]': "size() === 'lg'", '[class.num]': 'withNumber()' },
  template: `
    @let c = i18n.t().common;
    <a class="btn btn--copper btn--wrap" [class.btn--lg]="size() === 'lg'" [href]="phone.href" [attr.aria-label]="callAria()">
      <app-phone-icon />
      @if (withNumber()) {
        <span>{{ quote() ? c.callQuote : c.callSerhii }} · <span class="nowrap">{{ phone.display }}</span></span>
      } @else {
        <span>{{ quote() ? c.callQuote : c.callNow }}</span>
      }
    </a>
    <a class="btn btn--ghost btn--wrap sms" [class.btn--lg]="size() === 'lg'" [href]="phone.sms" [attr.aria-label]="smsAria()">
      <app-message-icon /><span>{{ quote() ? c.textQuote : c.textUs }}</span>
    </a>
  `,
  styles: `
    :host { display: flex; flex-wrap: wrap; gap: 10px; }
    .sms app-message-icon { color: var(--copper); }
    @media (max-width: 640px) {
      :host { flex-direction: column; align-items: stretch; width: 100%; }
      .btn { width: 100%; }
    }
  `,
})
export class CallText {
  protected readonly i18n = inject(I18n);
  protected readonly phone = PHONE;

  readonly size = input<'md' | 'lg'>('md');
  /** Show the number inside the call button. */
  readonly withNumber = input(false);
  /** "Call for a Quote / Text for a Quote" instead of "Call Now / Text Us". */
  readonly quote = input(false);

  protected readonly callAria = computed(() => fmt(this.i18n.t().common.callAria, { phone: PHONE.display }));
  protected readonly smsAria = computed(() => fmt(this.i18n.t().common.smsAria, { phone: PHONE.display }));
}

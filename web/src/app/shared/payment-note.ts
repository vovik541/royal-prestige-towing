import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PAYMENT_METHODS } from '../core/config/site';
import { I18n } from '../core/i18n/i18n';

/** "Payment: Zelle · Cash — arranged directly with Serhii." Facts only; no checkout or recipient details. */
@Component({
  selector: 'app-payment-note',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let p = i18n.t().payment;
    <span class="label">{{ p.label }}</span>
    <ul class="methods">
      @for (m of methods(); track m) { <li>{{ m }}</li> }
    </ul>
    <span class="note">{{ p.note }}</span>
  `,
  styles: `
    :host { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 12px; font-size: var(--t-sm); }
    .label { font-size: var(--t-xs); font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--steel); }
    .methods { list-style: none; display: flex; gap: 6px; }
    .methods li { font-weight: 600; color: var(--silver); padding: 2px 10px; border: 1px solid var(--line-2); border-radius: 2px; }
    .note { color: var(--silver-2); }
  `,
})
export class PaymentNote {
  protected readonly i18n = inject(I18n);
  protected readonly methods = computed(() => PAYMENT_METHODS.map((m) => this.i18n.t().payment.methods[m]));
}

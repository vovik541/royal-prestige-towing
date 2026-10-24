import { ChangeDetectionStrategy, Component, computed, inject, input, isDevMode } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHONE, PRICING } from '../core/config/site';
import { I18n, fmt } from '../core/i18n/i18n';
import { PaymentNote } from './payment-note';
import { PhoneIcon } from './phone-icon';

/**
 * Local transport starting rates (PRICING in core/config/site.ts), shown as approximate
 * values (~$60) with a disclaimer. Confirmed rates render everywhere; if the status is ever set
 * back to 'provisional' they appear only in development builds.
 */
export const pricingVisible = (): boolean => PRICING.status === 'confirmed' || isDevMode();

@Component({
  selector: 'app-pricing',
  imports: [RouterLink, PaymentNote, PhoneIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.compact]': 'compact()' },
  template: `
    @let t = i18n.t();
    <div class="head">
      @if (compact()) {
        <h2 class="title-sm">{{ t.pricing.title }}</h2>
      } @else {
        <h2 class="section-h" id="pricing-h">{{ t.pricing.title }}</h2>
      }
    </div>
    @if (!compact()) { <p class="intro">{{ t.pricing.intro }}</p> }
    <ul class="tiers">
      @for (tier of tiers(); track tier.label) {
        <li>
          <span class="dist">{{ tier.label }}</span>
          <span class="price" [class.custom]="tier.custom">{{ tier.price }}</span>
        </li>
      }
    </ul>
    <p class="note">{{ t.pricing.note }}</p>
    <div class="foot">
      <app-payment-note />
      @if (!compact()) {
        <div class="actions">
          <a class="btn btn--copper" [href]="phone.href" [attr.aria-label]="callAria()"><app-phone-icon />{{ t.common.callNow }}</a>
          <a class="btn btn--ghost" [routerLink]="i18n.link('contact')">{{ t.common.getQuote }}</a>
        </div>
      }
    </div>
  `,
  styles: `
    :host { display: block; }
    .head { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px 24px; }
    .title-sm { font: 600 var(--t-h3)/1.2 var(--text); }
    .intro { margin-top: 10px; color: var(--silver-2); }
    /*
     * One spacing rule for every cell: --cell-x on both sides of each divider, nothing at the
     * outer edges. Four columns on wide screens; two columns (compact, and on phones) use the
     * odd/even rules below. Only padding-block changes per layout, so the sides never conflict.
     */
    .tiers { --cell-x: 20px; list-style: none; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 28px; border-top: 1px solid var(--line-2); }
    .tiers li { display: grid; gap: 6px; align-content: start; padding: 18px var(--cell-x) 4px; }
    .tiers li:first-child { padding-left: 0; }
    .tiers li:last-child { padding-right: 0; }
    .tiers li:not(:first-child) { border-left: 1px solid var(--line); }
    .dist { font-size: var(--t-xs); font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--steel); }
    .price { font: 600 clamp(34px, 3.4vw, 48px)/1 var(--display); letter-spacing: .01em; color: var(--silver); }
    .price.custom { font-size: clamp(22px, 2vw, 28px); line-height: 1.15; color: var(--copper-hi); hyphens: auto; }
    .note { margin-top: 20px; color: var(--silver-2); font-size: var(--t-sm); max-width: 52em; }
    .foot { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px 32px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--line); }
    .actions { display: flex; flex-wrap: wrap; gap: 10px; }
    :host(.compact) .tiers { --cell-x: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 16px; }
    :host(.compact) .tiers li { padding-block: 14px 12px; }
    :host(.compact) .tiers li:nth-child(odd) { padding-left: 0; border-left: 0; }
    :host(.compact) .tiers li:nth-child(even) { padding-right: 0; }
    :host(.compact) .tiers li:nth-child(n + 3) { border-top: 1px solid var(--line); }
    :host(.compact) .price { font-size: 32px; }
    :host(.compact) .price.custom { font-size: 20px; }
    :host(.compact) .foot { margin-top: 16px; padding-top: 14px; }
    @media (max-width: 760px) {
      .tiers { --cell-x: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .tiers li { padding-block: 16px 14px; }
      .tiers li:nth-child(odd) { padding-left: 0; border-left: 0; }
      .tiers li:nth-child(even) { padding-right: 0; }
      .tiers li:nth-child(n + 3) { border-top: 1px solid var(--line); }
      .actions { width: 100%; }
      .actions .btn { flex: 1 1 0; }
    }
    /* Phones already have the fixed Call Now / Get a Quote bar; don't repeat it in the same view. */
    @media (max-width: 640px) { .actions { display: none; } }
    /* Long Cyrillic "custom quote" labels must fit a half-width cell on 320px phones. */
    @media (max-width: 380px) {
      .price.custom { font-size: 17px; }
      :host(.compact) .price.custom { font-size: 16px; }
      .tiers, :host(.compact) .tiers { --cell-x: 12px; }
    }
  `,
})
export class Pricing {
  protected readonly i18n = inject(I18n);
  readonly compact = input(false);

  protected readonly phone = PHONE;
  protected readonly callAria = computed(() => fmt(this.i18n.t().common.callAria, { phone: PHONE.display }));

  protected readonly tiers = computed(() => {
    const t = this.i18n.t().pricing;
    // US-dollar prices read as "$60" in every language (uk/ru locales would print "60 USD" / "60 $").
    const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: PRICING.currency, maximumFractionDigits: 0 });
    return PRICING.tiers.map((tier) => ({
      label: tier.to === null ? fmt(t.over, { from: tier.from }) : fmt(t.range, { from: tier.from, to: tier.to }),
      price: tier.price === null ? t.custom : PRICING.approxPrefix + money.format(tier.price),
      custom: tier.price === null,
    }));
  });
}

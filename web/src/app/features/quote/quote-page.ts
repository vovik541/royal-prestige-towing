import { ChangeDetectionStrategy, Component, computed, effect, inject, input, linkedSignal } from '@angular/core';
import { PHONE } from '../../core/config/site';
import { I18n, fmt } from '../../core/i18n/i18n';
import { Seo, breadcrumbSchema } from '../../core/seo/seo';
import { LoadType, isLoadType } from '../../content/photos';
import { Breadcrumbs } from '../../shared/breadcrumbs';
import { PaymentNote } from '../../shared/payment-note';
import { PhoneIcon } from '../../shared/phone-icon';
import { Pricing, pricingVisible } from '../../shared/pricing';
import { QuoteForm } from './quote-form';

/** Contact / get a quote. `?type=machinery` preselects a load type (from the configurator or a service page). */
@Component({
  selector: 'app-quote-page',
  imports: [Breadcrumbs, PaymentNote, PhoneIcon, Pricing, QuoteForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <header class="page-head head">
      <div class="wrap">
        <app-breadcrumbs [items]="[{ name: t.nav.home, path: '' }, { name: t.nav.contact, path: 'contact' }]" />
        <h1 class="display-h">{{ t.quote.title }}</h1>
        <p class="lede">{{ t.quote.intro }}</p>
      </div>
    </header>
    <section class="section body" [attr.aria-label]="t.quote.formLabel">
      <div class="grid wrap">
        <app-quote-form [(loadType)]="loadType" />
        <aside class="aside">
          <div class="call">
            <p>{{ t.common.preferToTalk }}</p>
            <a class="call__tel" [href]="phone.href" [attr.aria-label]="callAria()"><app-phone-icon />{{ phone.display }}</a>
          </div>
          @if (showPricing) {
            <app-pricing [compact]="true" />
          } @else {
            <app-payment-note />
          }
        </aside>
      </div>
    </section>
  `,
  styles: `
    .head { padding-bottom: clamp(24px, 3vw, 40px); }
    .head h1 { margin-top: 20px; }
    .head .lede { margin-top: 14px; color: var(--silver-2); }
    .body { padding-top: 0; }
    .grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: clamp(24px, 3.4vw, 56px); align-items: start; }
    .aside { display: grid; gap: 28px; position: sticky; top: calc(var(--bar-h) + 24px); }
    .call { display: grid; gap: 4px; justify-items: start; padding-left: 16px; border-left: 1px solid var(--copper); }
    .call p { color: var(--silver-2); font-size: var(--t-sm); }
    .call__tel { display: inline-flex; align-items: center; gap: 10px; font: 600 clamp(26px, 2.4vw, 34px)/1.2 var(--display); letter-spacing: .02em; text-decoration: none; }
    .call__tel app-phone-icon { color: var(--copper); width: 22px; height: 22px; transform: translateY(-3px); }
    .call__tel:hover { color: #fff; }
    @media (max-width: 900px) {
      .grid { grid-template-columns: minmax(0, 1fr); }
      .aside { position: static; }
    }
  `,
})
export class QuotePage {
  protected readonly i18n = inject(I18n);
  protected readonly phone = PHONE;
  protected readonly showPricing = pricingVisible();
  protected readonly callAria = computed(() => fmt(this.i18n.t().common.callAria, { phone: PHONE.display }));

  /** Query parameter ?type= (component input binding). */
  readonly type = input<string | undefined>();
  protected readonly loadType = linkedSignal<LoadType>(() => {
    const t = this.type();
    return isLoadType(t) ? t : 'everyday';
  });

  constructor() {
    const seo = inject(Seo);
    effect(() => {
      const t = this.i18n.t();
      seo.set({
        title: t.quote.seo.title,
        description: t.quote.seo.description,
        path: 'contact',
        schema: [breadcrumbSchema(this.i18n.lang(), [{ name: t.nav.home, path: '' }, { name: t.nav.contact, path: 'contact' }])],
      });
    });
  }
}

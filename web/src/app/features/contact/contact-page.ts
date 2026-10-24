import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHONE } from '../../core/config/site';
import { ContactZone } from '../../core/contact-bar';
import { I18n, fmt } from '../../core/i18n/i18n';
import { Seo, breadcrumbSchema } from '../../core/seo/seo';
import { Breadcrumbs } from '../../shared/breadcrumbs';
import { CallText } from '../../shared/call-text';
import { DeckLine } from '../../shared/deck-line';
import { PaymentNote } from '../../shared/payment-note';
import { PhoneIcon } from '../../shared/phone-icon';
import { Pricing, pricingVisible } from '../../shared/pricing';

/** Contact: phone and SMS only. Lists what to tell Serhii; nothing is collected on the site. */
@Component({
  selector: 'app-contact-page',
  imports: [RouterLink, Breadcrumbs, CallText, ContactZone, DeckLine, PaymentNote, PhoneIcon, Pricing],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    @let c = t.contact;
    <header class="page-head">
      <div class="wrap">
        <app-breadcrumbs [items]="[{ name: t.nav.home, path: '' }, { name: t.nav.contact, path: 'contact' }]" />
        <h1 class="display-h">{{ c.title }}</h1>
        <app-deck-line />
        <p class="lede">{{ c.intro }}</p>
      </div>
    </header>
    <section class="section body" [attr.aria-label]="c.title">
      <div class="grid wrap">
        <div class="reach">
          <a class="number" [href]="phone.href" [attr.aria-label]="callAria()" appContactZone><app-phone-icon />{{ phone.display }}</a>
          <app-call-text size="lg" [quote]="true" />
          <div class="include">
            <h2 class="title-sm">{{ c.includeTitle }}</h2>
            <ul class="dash-list">
              @for (item of c.include; track item) { <li>{{ item }}</li> }
            </ul>
            <p class="muted">{{ c.includeNote }}</p>
          </div>
        </div>
        <aside class="aside">
          <div class="block">
            <h2 class="title-sm">{{ c.coverageTitle }}</h2>
            <p>{{ c.coverage }}</p>
            <a class="link" [routerLink]="i18n.link('service-areas')">{{ t.nav.areas }} <span aria-hidden="true">→</span></a>
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
    .body { padding-top: 0; }
    .grid { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: clamp(32px, 5vw, 80px); align-items: start; }
    .reach { display: grid; gap: 28px; align-content: start; }
    .number { display: inline-flex; align-items: center; gap: 14px; justify-self: start; font: 600 clamp(34px, 4vw, 52px)/1.1 var(--display); letter-spacing: .02em; text-decoration: none; }
    .number app-phone-icon { color: var(--copper); width: 28px; height: 28px; }
    .number:hover { color: #fff; }
    .title-sm { font: 600 var(--t-h3)/1.2 var(--text); }
    .include { display: grid; gap: 14px; padding-top: 28px; border-top: 1px solid var(--line); }
    .include .muted { font-size: var(--t-sm); }
    .aside { display: grid; gap: 32px; }
    .block { display: grid; gap: 10px; justify-items: start; padding-left: 16px; border-left: 1px solid var(--copper); }
    .block p { color: var(--silver-2); font-size: var(--t-sm); }
    @media (max-width: 900px) { .grid { grid-template-columns: minmax(0, 1fr); } }
    @media (max-width: 380px) { .number { font-size: 30px; gap: 10px; } }
  `,
})
export class ContactPage {
  protected readonly i18n = inject(I18n);
  protected readonly phone = PHONE;
  protected readonly showPricing = pricingVisible();
  protected readonly callAria = computed(() => fmt(this.i18n.t().common.callAria, { phone: PHONE.display }));

  constructor() {
    const seo = inject(Seo);
    effect(() => {
      const t = this.i18n.t();
      seo.set({
        title: t.contact.seo.title,
        description: t.contact.seo.description,
        path: 'contact',
        schema: [breadcrumbSchema(this.i18n.lang(), [{ name: t.nav.home, path: '' }, { name: t.nav.contact, path: 'contact' }])],
      });
    });
  }
}

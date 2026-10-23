import { ChangeDetectionStrategy, Component, computed, effect, inject, input, linkedSignal } from '@angular/core';
import { PHONE } from '../../core/config/site';
import { I18n, fmt } from '../../core/i18n/i18n';
import { Seo, breadcrumbSchema } from '../../core/seo/seo';
import { LoadType, isLoadType } from '../../content/photos';
import { Breadcrumbs } from '../../shared/breadcrumbs';
import { DeckLine } from '../../shared/deck-line';
import { PhoneIcon } from '../../shared/phone-icon';
import { QuoteForm } from './quote-form';

/** Contact / get a quote. `?type=machinery` preselects a load type (from the configurator or a service page). */
@Component({
  selector: 'app-quote-page',
  imports: [Breadcrumbs, DeckLine, PhoneIcon, QuoteForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <header class="page-head">
      <div class="wrap">
        <app-breadcrumbs [items]="[{ name: t.nav.home, path: '' }, { name: t.nav.contact, path: 'contact' }]" />
        <h1 class="display-h">{{ t.quote.title }}</h1>
        <app-deck-line />
        <p class="lede">{{ t.quote.intro }}</p>
        <div class="contact">
          <p>{{ t.common.preferToTalk }}</p>
          <a class="contact__tel" [href]="phone.href" [attr.aria-label]="callAria()"><app-phone-icon />{{ phone.display }}</a>
        </div>
      </div>
    </header>
    <section class="section form" [attr.aria-label]="t.quote.title">
      <div class="wrap"><app-quote-form [(loadType)]="loadType" /></div>
    </section>
  `,
  styles: `
    .contact { display: grid; gap: 4px; justify-items: start; margin-top: 28px; padding-left: 16px; border-left: 1px solid var(--copper); }
    .contact p { color: var(--silver-2); font-size: var(--t-sm); }
    .contact__tel { display: inline-flex; align-items: center; gap: 10px; font: 600 clamp(24px, 2.4vw, 32px)/1.2 var(--display); letter-spacing: .02em; text-decoration: none; }
    .contact__tel app-phone-icon { color: var(--copper); width: 22px; height: 22px; transform: translateY(-3px); }
    .contact__tel:hover { color: #fff; }
    .form { padding-top: 0; }
  `,
})
export class QuotePage {
  protected readonly i18n = inject(I18n);
  protected readonly phone = PHONE;
  protected readonly callAria = computed(() => fmt(this.i18n.t().common.callAria, { phone: PHONE.display }));

  /** Query parameter ?type= (component input binding). */
  readonly type = input<string | undefined>();
  protected readonly loadType = linkedSignal<LoadType>(() => {
    const t = this.type();
    return isLoadType(t) ? t : 'exotic';
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

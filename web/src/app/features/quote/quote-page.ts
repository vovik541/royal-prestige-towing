import { ChangeDetectionStrategy, Component, effect, inject, input, linkedSignal } from '@angular/core';
import { I18n } from '../../core/i18n/i18n';
import { Seo, breadcrumbSchema } from '../../core/seo/seo';
import { LoadType, isLoadType } from '../../content/photos';
import { Breadcrumbs } from '../../shared/breadcrumbs';
import { DeckLine } from '../../shared/deck-line';
import { QuoteForm } from './quote-form';

/** Contact / get a quote. `?type=machinery` preselects a load type (from the configurator or a service page). */
@Component({
  selector: 'app-quote-page',
  imports: [Breadcrumbs, DeckLine, QuoteForm],
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
          <div><span class="kicker">{{ t.common.phone }}</span><span class="tbc">{{ t.common.pending }}</span></div>
          <div><span class="kicker">{{ t.common.email }}</span><span class="tbc">{{ t.common.pending }}</span></div>
        </div>
      </div>
    </header>
    <section class="section form" [attr.aria-label]="t.quote.title">
      <div class="wrap"><app-quote-form [(loadType)]="loadType" /></div>
    </section>
  `,
  styles: `
    .contact { display: flex; flex-wrap: wrap; gap: 16px 40px; margin-top: 28px; }
    .contact div { display: grid; gap: 2px; padding-left: 16px; border-left: 1px solid var(--line-2); }
    .form { padding-top: 0; }
  `,
})
export class QuotePage {
  protected readonly i18n = inject(I18n);

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

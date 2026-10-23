import { ChangeDetectionStrategy, Component, RESPONSE_INIT, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n';
import { Seo } from '../../core/seo/seo';
import { DeckLine } from '../../shared/deck-line';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, DeckLine],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <section class="nf wrap">
      <app-deck-line />
      <h1 class="display-h">{{ t.notFound.title }}</h1>
      <p class="lede muted">{{ t.notFound.text }}</p>
      <div class="actions">
        <a class="btn btn--copper btn--lg" [routerLink]="i18n.link()">{{ t.notFound.home }}</a>
        <a class="btn btn--ghost btn--lg" [routerLink]="i18n.link('contact')">{{ t.nav.quote }}</a>
      </div>
    </section>
  `,
  styles: `
    .nf { padding-block: clamp(80px, 12vw, 180px); display: grid; gap: 28px; justify-items: start; }
    h1 { max-width: 14em; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; }
  `,
})
export class NotFoundPage {
  protected readonly i18n = inject(I18n);

  constructor() {
    // Real 404 status when rendered on the server.
    const init = inject(RESPONSE_INIT, { optional: true });
    if (init) init.status = 404;
    const seo = inject(Seo);
    effect(() => {
      const t = this.i18n.t();
      seo.set({ title: t.notFound.seo.title, description: t.notFound.seo.description, path: '', noindex: true });
    });
  }
}

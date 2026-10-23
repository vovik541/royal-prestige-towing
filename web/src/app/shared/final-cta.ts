import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n/i18n';
import { LoadType } from '../content/photos';
import { DeckLine } from './deck-line';
import { Photo } from './photo';
import { Reveal } from './reveal';

/** The closing moment of every page: dark, one copper action, contact details marked pending. */
@Component({
  selector: 'app-final-cta',
  imports: [RouterLink, DeckLine, Photo, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <section class="final" aria-labelledby="final-h">
      <app-photo class="final__img" id="mclaren-front" sizes="60vw" [decorative]="true" position="40% 55%" />
      <div class="final__in wrap">
        <app-deck-line class="final__deck" />
        <h2 id="final-h" class="display-h" appReveal>{{ t.finalCta.titleA }}<br />{{ t.finalCta.titleB }}</h2>
        <p class="lede" appReveal="70">{{ t.finalCta.lede }}</p>
        <div class="actions" appReveal="140">
          <a class="btn btn--copper btn--lg" [routerLink]="i18n.link('contact')" [queryParams]="loadType() ? { type: loadType() } : {}">{{ t.common.planTransport }}</a>
          <div class="pending"><span class="kicker">{{ t.common.phone }}</span><span class="tbc">{{ t.common.pending }}</span></div>
          <div class="pending"><span class="kicker">{{ t.common.email }}</span><span class="tbc">{{ t.common.pending }}</span></div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .final { position: relative; overflow: hidden; padding-block: clamp(104px, 12vw, 180px); background: var(--carbon-2); border-top: 1px solid var(--line); }
    .final__img { position: absolute; right: 0; top: 0; width: 58%; height: 100%; opacity: .32; filter: grayscale(.4); -webkit-mask-image: linear-gradient(90deg, transparent, #000 55%); mask-image: linear-gradient(90deg, transparent, #000 55%); background: none; }
    .final__in { position: relative; }
    .final__deck { margin-bottom: 32px; }
    h2 { max-width: 12em; }
    .lede { margin-top: 24px; max-width: 32em; }
    .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 20px 40px; margin-top: 40px; }
    .pending { display: grid; gap: 2px; padding-left: 20px; border-left: 1px solid var(--line-2); }
    @media (max-width: 640px) {
      .final { padding-block: 88px; }
      .final__img { width: 100%; height: 60%; opacity: .2; -webkit-mask-image: linear-gradient(180deg, #000, transparent 75%); mask-image: linear-gradient(180deg, #000, transparent 75%); }
      .actions { flex-direction: column; align-items: stretch; }
      .actions .btn { width: 100%; }
    }
  `,
})
export class FinalCta {
  protected readonly i18n = inject(I18n);
  /** Preselect a load type in the quote request. */
  readonly loadType = input<LoadType | null>(null);
}

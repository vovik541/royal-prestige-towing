import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { PHONE } from '../core/config/site';
import { I18n, fmt } from '../core/i18n/i18n';
import { PhoneIcon } from './phone-icon';
import { Photo } from './photo';
import { Reveal } from './reveal';

/** Serhii Hoida: portrait, the "you'll deal with Serhii" promise and his three-step handover. */
@Component({
  selector: 'app-owner-profile',
  imports: [Photo, PhoneIcon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <div class="grid wrap">
      <figure class="photo" appReveal>
        <app-photo id="owner-serhii" sizes="(max-width: 640px) 92vw, (max-width: 900px) 420px, 34vw" />
        <figcaption><strong>{{ t.photos['owner-serhii'].caption }}</strong><span>{{ t.owner.role }}</span></figcaption>
      </figure>
      <div>
        @if (headingLevel() === 1) {
          <h1 class="display-h" appReveal>{{ t.owner.title }}</h1>
        } @else {
          <h2 class="display-h" appReveal>{{ t.owner.title }}</h2>
        }
        <p class="lede" appReveal="70">{{ t.owner.lede }}</p>
        <ol class="handover">
          @for (s of t.owner.steps; track s.title; let i = $index) {
            <li [appReveal]="i * 70"><span class="handover__t">{{ s.title }}</span><span>{{ s.text }}</span></li>
          }
        </ol>
        <p class="note">{{ t.owner.note }}</p>
        <a class="btn btn--line btn--wrap call" [href]="phone.href" [attr.aria-label]="callAria()"><app-phone-icon /><span>{{ t.common.callSerhii }} · <span class="nowrap">{{ phone.display }}</span></span></a>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }
    .grid { display: grid; grid-template-columns: 4fr 7fr; gap: clamp(32px, 6vw, 104px); align-items: center; }
    .photo app-photo { aspect-ratio: 4 / 5; border-radius: 2px; }
    .photo ::ng-deep img { filter: saturate(.8) contrast(1.03); }
    figcaption { display: flex; justify-content: space-between; gap: 12px; margin-top: 14px; font-size: var(--t-xs); color: var(--silver-2); }
    figcaption strong { color: var(--silver); font-weight: 600; }
    .lede { margin-top: 24px; max-width: 34em; }
    .handover { list-style: none; margin-top: 36px; border-top: 1px solid var(--line); }
    .handover li { display: grid; grid-template-columns: 160px 1fr; gap: 24px; padding: 18px 0; border-bottom: 1px solid var(--line); }
    .handover__t { font: 600 22px/1.1 var(--display); text-transform: uppercase; letter-spacing: .02em; color: var(--copper); }
    .handover li > span:last-child { color: var(--silver-2); font-size: var(--t-sm); }
    .note { margin-top: 24px; color: var(--silver-2); font-size: var(--t-sm); }
    .call { margin-top: 28px; }
    .call app-phone-icon { color: var(--copper); }
    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
      .photo { max-width: 420px; }
    }
    @media (max-width: 640px) {
      .photo { max-width: none; }
      .photo app-photo { aspect-ratio: 1; }
      .handover li { grid-template-columns: 1fr; gap: 4px; }
    }
  `,
})
export class OwnerProfile {
  protected readonly i18n = inject(I18n);
  readonly headingLevel = input<1 | 2>(2);
  protected readonly phone = PHONE;
  protected readonly callAria = computed(() => fmt(this.i18n.t().common.callAria, { phone: PHONE.display }));
}

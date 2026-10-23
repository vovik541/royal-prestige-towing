import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { PHONE } from '../core/config/site';
import { ContactZone } from '../core/contact-bar';
import { I18n, fmt } from '../core/i18n/i18n';
import { MessageIcon } from './message-icon';
import { PhoneIcon } from './phone-icon';
import { Photo } from './photo';
import { Reveal } from './reveal';

/** Serhii Hoida: portrait, the "you'll deal with Serhii" promise and his three-step handover. */
@Component({
  selector: 'app-owner-profile',
  imports: [ContactZone, MessageIcon, Photo, PhoneIcon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <div class="grid wrap">
      <figure class="photo" appReveal>
        <app-photo id="owner-serhii" sizes="(max-width: 640px) 92vw, (max-width: 900px) 420px, 34vw" />
        <figcaption><strong>{{ t.photos['owner-serhii'].caption }}</strong><span>{{ t.owner.role }}</span></figcaption>
      </figure>
      <div class="copy">
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
        <div class="call" appContactZone>
          <a class="btn btn--line btn--wrap" [href]="phone.href" [attr.aria-label]="callAria()"><app-phone-icon /><span>{{ t.common.callSerhii }} · <span class="nowrap">{{ phone.display }}</span></span></a>
          <a class="btn btn--line" [href]="phone.sms" [attr.aria-label]="smsAria()"><app-message-icon />{{ t.common.textUs }}</a>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }
    .grid { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: clamp(32px, 6vw, 104px); align-items: center; }
    .photo app-photo { aspect-ratio: 4 / 5; border-radius: 2px; }
    .photo ::ng-deep img { filter: saturate(.8) contrast(1.03); }
    figcaption { display: flex; justify-content: space-between; gap: 12px; margin-top: 14px; font-size: var(--t-xs); color: var(--silver-2); }
    figcaption strong { color: var(--silver); font-weight: 600; }
    .lede { margin-top: 24px; max-width: 34em; }
    .handover { list-style: none; margin-top: 36px; border-top: 1px solid var(--line); }
    .handover li { display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 24px; padding: 18px 0; border-bottom: 1px solid var(--line); }
    .handover__t { font: 600 22px/1.1 var(--display); text-transform: uppercase; letter-spacing: .02em; color: var(--copper); }
    .handover li > span:last-child { color: var(--silver-2); font-size: var(--t-sm); }
    .note { margin-top: 24px; color: var(--silver-2); font-size: var(--t-sm); }
    .call { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
    .call app-phone-icon, .call app-message-icon { color: var(--copper); }
    @media (max-width: 900px) {
      .grid { grid-template-columns: minmax(0, 1fr); }
      .photo { max-width: 420px; }
    }
    @media (max-width: 640px) {
      /* Editorial phone layout: title across, a compact 4:5 portrait beside the introduction. */
      .grid { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); grid-template-areas: 'title title' 'photo lede' 'steps steps' 'note note' 'call call'; gap: 18px 16px; align-items: start; }
      .copy { display: contents; }
      .copy > h1, .copy > h2 { grid-area: title; }
      .photo { grid-area: photo; max-width: none; }
      .photo app-photo { aspect-ratio: 4 / 5; }
      .photo ::ng-deep img { object-position: 50% 24%; }
      figcaption { flex-direction: column; gap: 2px; margin-top: 8px; font-size: 12px; }
      .lede { grid-area: lede; margin-top: 0; font-size: 15px; line-height: 1.55; }
      .handover { grid-area: steps; margin-top: 6px; }
      .handover li { grid-template-columns: minmax(0, 1fr); gap: 4px; padding: 14px 0; }
      .note { grid-area: note; margin-top: 0; }
      .call { grid-area: call; margin-top: 0; }
      .call .btn { flex: 1 1 auto; }
    }
  `,
})
export class OwnerProfile {
  protected readonly i18n = inject(I18n);
  readonly headingLevel = input<1 | 2>(2);
  protected readonly phone = PHONE;
  protected readonly callAria = computed(() => fmt(this.i18n.t().common.callAria, { phone: PHONE.display }));
  protected readonly smsAria = computed(() => fmt(this.i18n.t().common.smsAria, { phone: PHONE.display }));
}

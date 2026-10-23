import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DEVELOPER, PHONE } from '../core/config/site';
import { I18n, fmt } from '../core/i18n/i18n';
import { SERVICES } from '../content/services';
import { DeckLine } from '../shared/deck-line';
import { LangSwitcher } from './lang-switcher';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, DeckLine, LangSwitcher],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <footer class="foot">
      <div class="foot__grid wrap">
        <div class="foot__brand">
          <span class="rpt">RPT<app-deck-line class="rpt__deck" /></span>
          <p>Royal Prestige Towing<br />{{ t.footer.tagline }}<br />{{ t.footer.location }}</p>
        </div>
        <nav class="foot__col" [attr.aria-label]="t.footer.services">
          <h2>{{ t.footer.services }}</h2>
          @for (s of services; track s.slug) {
            <a [routerLink]="i18n.link('services/' + s.slug)">{{ t.services.items[s.slug].name }}</a>
          }
        </nav>
        <nav class="foot__col" [attr.aria-label]="t.footer.company">
          <h2>{{ t.footer.company }}</h2>
          <a [routerLink]="i18n.link('about')">{{ t.nav.about }}</a>
          <a [routerLink]="i18n.link('our-work')">{{ t.nav.work }}</a>
          <a [routerLink]="i18n.link('service-areas')">{{ t.nav.areas }}</a>
          <a [routerLink]="i18n.link('contact')">{{ t.nav.contact }}</a>
        </nav>
        <div class="foot__col">
          <h2>{{ t.footer.contact }}</h2>
          <a class="tel" [href]="phone.href" [attr.aria-label]="callAria()">{{ phone.display }}</a>
          <a [routerLink]="i18n.link('contact')">{{ t.common.getQuote }}</a>
          <h2 class="foot__langs">{{ t.footer.languages }}</h2>
          <app-lang-switcher [full]="true" />
        </div>
      </div>
      <div class="foot__base wrap">
        <p>© {{ year }} {{ t.footer.rights }} · {{ t.footer.location }}</p>
        <p class="credit">{{ t.footer.developedBy }} <span lang="en">{{ dev.brand }} — {{ dev.person }}</span></p>
      </div>
    </footer>
  `,
  styles: `
    .foot { border-top: 1px solid var(--line); padding: 64px 0 40px; }
    .foot__grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1.2fr); gap: 32px; }
    .rpt { position: relative; display: inline-block; font: 600 44px/1 var(--display); letter-spacing: .04em; padding-bottom: 10px; }
    .rpt__deck { position: absolute; left: 0; bottom: 0; width: 100%; height: 9px; }
    .foot__brand p { margin-top: 20px; font-size: var(--t-sm); color: var(--silver-2); }
    .foot__col { display: grid; gap: 10px; align-content: start; font-size: var(--t-sm); }
    h2 { font-size: var(--t-xs); font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--steel); margin-bottom: 4px; }
    .foot__langs { margin-top: 16px; }
    .foot__col a { text-decoration: none; color: var(--silver-2); transition: color .2s; }
    .foot__col a:hover { color: var(--silver); }
    .foot__col .tel { color: var(--silver); font-weight: 600; font-size: var(--t-md); }
    .credit { color: #7e868f; }
    .foot__base { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 56px; padding-top: 22px; border-top: 1px solid var(--line); font-size: var(--t-xs); color: var(--silver-2); }
    @media (max-width: 1000px) { .foot__grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
    @media (max-width: 640px) {
      .foot__brand, .foot__col:last-child { grid-column: 1 / -1; }
    }
  `,
})
export class Footer {
  protected readonly i18n = inject(I18n);
  protected readonly services = SERVICES;
  protected readonly year = new Date().getFullYear();
  protected readonly phone = PHONE;
  protected readonly dev = DEVELOPER;
  protected readonly callAria = () => fmt(this.i18n.t().common.callAria, { phone: PHONE.display });
}

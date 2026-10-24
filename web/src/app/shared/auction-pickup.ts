import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n/i18n';
import { AUCTION_AREAS, AuctionArea, yardsIn } from '../content/auctions';
import { CallText } from './call-text';
import { Reveal } from './reveal';

/**
 * Auto auction pickup: what we do, Call / Text, and the auction yards near Sacramento grouped by
 * area (content/auctions.ts). `compact` (service page) shows only the yard list, because the page
 * around it already explains the service.
 */
@Component({
  selector: 'app-auction-pickup',
  imports: [RouterLink, CallText, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.compact]': 'compact()' },
  template: `
    @let a = i18n.t().auction;
    @if (!compact()) {
      <div class="intro">
        <p class="kicker" appReveal>{{ a.kicker }}</p>
        <h2 class="display-h" [id]="headingId()" appReveal>{{ a.title }}</h2>
        <p class="lede" appReveal="70">{{ a.lede }}</p>
        <ul class="steps" appReveal="140">
          @for (p of a.points; track p.title) { <li><strong>{{ p.title }}</strong><span>{{ p.text }}</span></li> }
        </ul>
        <app-call-text [quote]="true" />
        @if (moreLink()) {
          <a class="link" [routerLink]="i18n.link('services/auto-auction-transport')">{{ a.more }} <span aria-hidden="true">→</span></a>
        }
      </div>
    }
    <div class="yards">
      @if (compact()) {
        <h2 class="section-h" [id]="headingId()">{{ a.yardsTitle }}</h2>
      } @else {
        <h3 class="yards__h">{{ a.yardsTitle }}</h3>
      }
      <div class="groups">
        @for (area of areas; track area) {
          <div class="group">
            <h4>{{ a.areas[area] }}</h4>
            <ul>
              @for (y of yards(area); track y.name) {
                <li><span class="name">{{ y.name }}</span><span class="addr">{{ y.street }}, {{ y.city }}</span></li>
              }
            </ul>
          </div>
        }
      </div>
      <p class="note">{{ a.note }}</p>
    </div>
  `,
  styles: `
    :host { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(32px, 5vw, 80px); align-items: start; }
    .intro { display: grid; gap: 22px; justify-items: start; }
    .intro .lede { max-width: 32em; }
    .steps { list-style: none; display: grid; gap: 12px; border-top: 1px solid var(--line); padding-top: 18px; width: 100%; }
    .steps li { display: grid; gap: 2px; }
    .steps strong { font-weight: 600; }
    .steps span { color: var(--silver-2); font-size: var(--t-sm); }
    .yards { display: grid; gap: 20px; padding: clamp(20px, 2.6vw, 32px); border: 1px solid var(--line); border-radius: 2px; background: rgba(15, 17, 20, .45); }
    .yards__h { font: 600 var(--t-h3)/1.2 var(--text); }
    .groups { display: grid; gap: 22px; }
    .group h4 { font-size: var(--t-xs); font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--copper-hi); margin-bottom: 8px; }
    .group ul { list-style: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 24px; }
    .group li { display: grid; gap: 1px; min-width: 0; }
    .name { font-weight: 600; font-size: var(--t-sm); }
    .addr { font-size: var(--t-xs); color: var(--silver-2); }
    .note { font-size: var(--t-xs); color: var(--silver-2); border-top: 1px solid var(--line); padding-top: 14px; }
    :host(.compact) { grid-template-columns: minmax(0, 1fr); }
    :host(.compact) .yards { padding: 0; border: 0; background: none; gap: 28px; }
    :host(.compact) .groups { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; }
    :host(.compact) .group ul { grid-template-columns: minmax(0, 1fr); }
    @media (max-width: 1000px) {
      :host { grid-template-columns: minmax(0, 1fr); }
      :host(.compact) .groups { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
    }
    @media (max-width: 560px) {
      .group ul, :host(.compact) .groups { grid-template-columns: minmax(0, 1fr); }
    }
  `,
})
export class AuctionPickup {
  protected readonly i18n = inject(I18n);
  readonly headingId = input.required<string>();
  /** Link to the auction service page (home page). */
  readonly moreLink = input(false);
  readonly compact = input(false);

  protected readonly areas = AUCTION_AREAS;
  protected readonly yards = (area: AuctionArea) => yardsIn(area);
}

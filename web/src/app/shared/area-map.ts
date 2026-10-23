import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n/i18n';

/**
 * Schematic (not geographic) map of routes out of Sacramento. Only Sacramento is drawn as
 * confirmed; nearby towns are "ask to confirm" and the Bay Area is "being confirmed".
 */
@Component({
  selector: 'app-area-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().areas;
    <figure>
      <svg viewBox="0 0 600 500" role="img" [attr.aria-label]="t.mapLabel">
        <g class="rt">
          <path d="M360 220 L285 235 L200 330 L150 350" /><path d="M360 220 L375 390" /><path d="M360 220 L445 150" />
          <path d="M360 220 L490 250" /><path d="M360 220 L335 85" /><path d="M200 330 L240 450" />
        </g>
        <g class="pin tbc"><circle cx="150" cy="350" r="6" /><text x="138" y="378" text-anchor="middle">{{ t.places.sf }}</text></g>
        <g class="pin tbc"><circle cx="200" cy="330" r="6" /><text x="186" y="318" text-anchor="end">{{ t.places.oakland }}</text></g>
        <g class="pin tbc"><circle cx="240" cy="450" r="6" /><text x="256" y="456">{{ t.places.sanjose }}</text></g>
        <g class="pin near"><circle cx="285" cy="235" r="5" /><text x="285" y="262" text-anchor="middle">{{ t.places.davis }}</text></g>
        <g class="pin near"><circle cx="375" cy="390" r="5" /><text x="390" y="396">{{ t.places.stockton }}</text></g>
        <g class="pin near"><circle cx="445" cy="150" r="5" /><text x="458" y="155">{{ t.places.auburn }}</text></g>
        <g class="pin near"><circle cx="490" cy="250" r="5" /><text x="490" y="276" text-anchor="middle">{{ t.places.placerville }}</text></g>
        <g class="pin near"><circle cx="335" cy="85" r="5" /><text x="348" y="90">{{ t.places.yuba }}</text></g>
        <g class="pin home"><circle cx="360" cy="220" r="11" /><circle cx="360" cy="220" r="22" class="halo" /><text x="384" y="212">{{ t.places.sacramento }}</text></g>
      </svg>
      <figcaption>{{ t.mapCaption }}</figcaption>
    </figure>
  `,
  styles: `
    figure { border: 1px solid var(--line); border-radius: 2px; padding: clamp(12px, 2.4vw, 32px); background: rgba(15, 17, 20, .45); }
    svg { width: 100%; height: auto; display: block; }
    .rt path { fill: none; stroke: var(--line-2); stroke-width: 2; stroke-dasharray: 6 6; }
    text { fill: var(--silver-2); font: 500 15px var(--text); }
    .home circle { fill: var(--copper); }
    .home .halo { fill: none; stroke: var(--copper); stroke-width: 1; opacity: .5; }
    .home text { fill: var(--silver); font-size: 19px; font-weight: 700; }
    .near circle { fill: var(--steel); }
    .tbc circle { fill: var(--graphite); stroke: var(--silver-2); stroke-width: 1.5; }
    figcaption { font-size: var(--t-xs); color: var(--silver-2); margin-top: 10px; }
  `,
})
export class AreaMap {
  protected readonly i18n = inject(I18n);
}

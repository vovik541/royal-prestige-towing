import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * The signature motif: the trailer's side profile — a flat deck that drops away down the
 * loading ramp, with two tie-down points. Size it with CSS width/height on the host.
 */
@Component({
  selector: 'app-deck-line',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 240 16" preserveAspectRatio="xMinYMid meet" focusable="false">
      <path d="M0 3.5 H196 L238 14" fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke" />
      <circle cx="28" cy="3.5" r="2.5" fill="currentColor" />
      <circle cx="168" cy="3.5" r="2.5" fill="currentColor" />
    </svg>
  `,
  styles: `
    :host { display: block; color: var(--copper); width: 180px; height: 12px; }
    svg { display: block; width: 100%; height: 100%; overflow: visible; }
  `,
})
export class DeckLine {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Line handset icon for call actions; inherits the text colour. */
@Component({
  selector: 'app-phone-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M6.6 3.5h2.7l1.4 4.1-2 1.4a12.4 12.4 0 0 0 6.3 6.3l1.4-2 4.1 1.4v2.7c0 1-.8 1.8-1.8 1.8A16.9 16.9 0 0 1 4.8 5.3c0-1 .8-1.8 1.8-1.8z" />
    </svg>
  `,
  styles: `
    :host { display: inline-block; width: 18px; height: 18px; flex: none; }
    svg { width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linejoin: round; }
  `,
})
export class PhoneIcon {}

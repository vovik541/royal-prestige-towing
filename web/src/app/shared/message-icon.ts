import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Line speech-bubble icon for SMS actions; inherits the text colour. */
@Component({
  selector: 'app-message-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M4.5 5.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 3.5v-3.5h-1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  `,
  styles: `
    :host { display: inline-block; width: 18px; height: 18px; flex: none; }
    svg { width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linejoin: round; stroke-linecap: round; }
  `,
})
export class MessageIcon {}

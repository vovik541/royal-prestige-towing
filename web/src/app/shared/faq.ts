import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface FaqItem { q: string; a: string }

/** Accessible FAQ built on native <details>; the first answer starts open. */
@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (item of items(); track item.q; let first = $first) {
      <details [open]="first && openFirst()">
        <summary><span>{{ item.q }}</span></summary>
        <p>{{ item.a }}</p>
      </details>
    }
  `,
  styles: `
    :host { display: block; border-top: 1px solid var(--line); }
    details { border-bottom: 1px solid var(--line); }
    summary { list-style: none; cursor: pointer; padding: 22px 48px 22px 0; font-weight: 600; font-size: var(--t-lg); position: relative; transition: color .2s; }
    summary::-webkit-details-marker { display: none; }
    summary::before, summary::after { content: ''; position: absolute; right: 6px; top: 50%; width: 16px; height: 1.5px; background: var(--copper); transition: transform .3s var(--ease); }
    summary::after { transform: rotate(90deg); }
    details[open] summary::after { transform: rotate(0); }
    summary:hover { color: #fff; }
    p { padding: 0 48px 24px 0; color: var(--silver-2); max-width: 44em; }
    @media (max-width: 640px) { summary { font-size: var(--t-md); } p { padding-right: 0; } }
  `,
})
export class Faq {
  readonly items = input.required<readonly FaqItem[]>();
  readonly openFirst = input(true);
}

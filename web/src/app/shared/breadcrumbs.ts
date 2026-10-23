import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n/i18n';

export interface Crumb { name: string; path: string }

/** Visible breadcrumb trail; the last item is the current page. */
@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [attr.aria-label]="i18n.t().nav.breadcrumb">
      <ol>
        @for (c of items(); track c.path; let last = $last) {
          <li>
            @if (last) {
              <span aria-current="page">{{ c.name }}</span>
            } @else {
              <a [routerLink]="i18n.link(c.path)">{{ c.name }}</a>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: `
    ol { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; font-size: var(--t-xs); color: var(--silver-2); }
    li + li::before { content: '/'; margin-right: 6px; color: var(--line-2); }
    a { text-decoration: none; transition: color .2s; }
    a:hover { color: var(--silver); }
    [aria-current] { color: var(--silver); }
  `,
})
export class Breadcrumbs {
  protected readonly i18n = inject(I18n);
  readonly items = input.required<readonly Crumb[]>();
}

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n/i18n';
import { ServiceMeta } from '../content/services';
import { Photo } from './photo';

/** A service as an editorial row/tile: real photo, name, one-line summary. */
@Component({
  selector: 'app-service-card',
  imports: [RouterLink, Photo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [routerLink]="i18n.link('services/' + service().slug)">
      <app-photo [id]="service().hero" [ties]="true" sizes="(max-width: 640px) 92vw, (max-width: 1000px) 46vw, 30vw" />
      <span class="body">
        <span class="name">{{ copy().name }}</span>
        <span class="short">{{ copy().short }}</span>
        <span class="more">{{ i18n.t().services.cardCta }} <span aria-hidden="true">→</span></span>
      </span>
    </a>
  `,
  styles: `
    :host { display: block; }
    a { display: grid; gap: 18px; text-decoration: none; height: 100%; }
    app-photo { aspect-ratio: 4 / 3; }
    app-photo ::ng-deep img { transition: transform 1s var(--ease); }
    a:hover app-photo ::ng-deep img { transform: scale(1.03); }
    .body { display: grid; gap: 8px; align-content: start; }
    .name { font: 600 var(--t-h3)/1.2 var(--text); letter-spacing: -.01em; }
    .short { color: var(--silver-2); font-size: var(--t-sm); }
    .more { font-size: var(--t-sm); font-weight: 600; color: var(--copper); margin-top: 4px; }
  `,
})
export class ServiceCard {
  protected readonly i18n = inject(I18n);
  readonly service = input.required<ServiceMeta>();
  protected readonly copy = computed(() => this.i18n.t().services.items[this.service().slug]);
}

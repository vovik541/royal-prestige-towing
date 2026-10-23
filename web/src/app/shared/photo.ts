import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { I18n } from '../core/i18n/i18n';
import { PhotoId, photo, photoSources } from '../content/photos';

/**
 * A real client photograph with responsive WebP sources.
 * `ties` adds the four tie-down points (the signature frame); `priority` is for the LCP image.
 */
@Component({
  selector: 'app-photo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'frame' },
  template: `
    <img
      [src]="sources().src"
      [attr.srcset]="sources().srcset"
      [attr.sizes]="sizes()"
      [width]="sources().width"
      [height]="sources().height"
      [alt]="decorative() ? '' : altText()"
      [style.object-position]="focus()"
      [attr.loading]="priority() ? 'eager' : 'lazy'"
      [attr.fetchpriority]="priority() ? 'high' : null"
      decoding="async"
    />
    @if (ties()) {
      <span class="tie tie--tl"></span><span class="tie tie--tr"></span>
      <span class="tie tie--bl"></span><span class="tie tie--br"></span>
    }
  `,
})
export class Photo {
  private readonly i18n = inject(I18n);

  readonly id = input.required<PhotoId>();
  /** The `sizes` attribute: how wide the image is rendered at each breakpoint. */
  readonly sizes = input('100vw');
  readonly priority = input(false);
  readonly ties = input(false);
  readonly decorative = input(false);
  readonly position = input<string | null>(null);

  protected readonly sources = computed(() => photoSources(this.id()));
  protected readonly altText = computed(() => this.i18n.t().photos[this.id()].alt);
  protected readonly focus = computed(() => this.position() ?? photo(this.id()).focus);
}

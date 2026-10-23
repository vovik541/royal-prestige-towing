import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, model, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n';
import { LOAD_PHOTO, LOAD_TYPES, LoadType } from '../../content/photos';
import { DeckLine } from '../../shared/deck-line';
import { Photo } from '../../shared/photo';

/**
 * "What are you moving?" — choose a load type and see how it rides and what we'll ask.
 * Two-way bind the selection with [(type)]. With `continueLink` it offers a link into the
 * quote request with the type preselected.
 */
@Component({
  selector: 'app-configurator',
  imports: [RouterLink, DeckLine, Photo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './configurator.html',
  styleUrl: './configurator.css',
})
export class Configurator {
  protected readonly i18n = inject(I18n);

  readonly type = model<LoadType>('everyday');
  readonly continueLink = input(false);
  /** Unique prefix so two configurators could coexist on one page. */
  readonly idPrefix = input('cfg');

  protected readonly types = LOAD_TYPES;
  protected readonly photoId = computed(() => LOAD_PHOTO[this.type()]);
  protected readonly copy = computed(() => this.i18n.t().configurator.loads[this.type()]);
  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');

  protected select(type: LoadType): void {
    this.type.set(type);
  }

  /** Roving focus across the tab list (arrow keys, Home, End). */
  protected onKey(e: KeyboardEvent, i: number): void {
    const n = this.types.length;
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % n
      : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i - 1 + n) % n
      : e.key === 'Home' ? 0
      : e.key === 'End' ? n - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    this.select(this.types[next]);
    this.tabs()[next].nativeElement.focus();
  }
}

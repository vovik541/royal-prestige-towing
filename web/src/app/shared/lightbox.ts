import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, signal, viewChild } from '@angular/core';
import { I18n, fmt } from '../core/i18n/i18n';
import { PhotoId, photoSources } from '../content/photos';

/**
 * Accessible photo viewer on the native <dialog> element: focus is trapped and returned,
 * Escape closes, arrow keys move between photos. Open it with `open(index)`.
 */
@Component({
  selector: 'app-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <dialog #dlg [attr.aria-label]="t.common.photoViewer" (keydown)="onKey($event)" (click)="onBackdrop($event)" (close)="index.set(-1)">
      @if (current(); as id) {
        <figure>
          <img [src]="largest()" [alt]="t.photos[id].alt" />
          <figcaption>
            <span>{{ t.photos[id].caption }}</span>
            <span class="count">{{ count() }}</span>
          </figcaption>
        </figure>
        <div class="ctl">
          <button class="icon-btn" type="button" [attr.aria-label]="t.common.previousPhoto" (click)="step(-1)" [disabled]="items().length < 2">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button class="icon-btn" type="button" [attr.aria-label]="t.common.nextPhoto" (click)="step(1)" [disabled]="items().length < 2">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <button class="btn btn--ghost btn--sm" type="button" (click)="close()">{{ t.common.closeViewer }}</button>
        </div>
      }
    </dialog>
  `,
  styles: `
    dialog { border: 0; padding: 0; background: transparent; width: min(1100px, 94vw); max-width: none; color: var(--silver); }
    dialog::backdrop { background: rgba(6, 7, 9, .92); }
    img { width: 100%; max-height: 76vh; object-fit: contain; background: #000; }
    figcaption { display: flex; justify-content: space-between; gap: 16px; margin-top: 12px; font-size: var(--t-sm); color: var(--silver-2); }
    .ctl { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
  `,
})
export class Lightbox {
  protected readonly i18n = inject(I18n);
  readonly items = input.required<readonly PhotoId[]>();

  private readonly dlg = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');
  protected readonly index = signal(-1);
  protected readonly current = computed(() => this.items()[this.index()] ?? null);
  protected readonly largest = computed(() => (this.current() ? photoSources(this.current()!).largest : ''));
  protected readonly count = computed(() =>
    fmt(this.i18n.t().common.photoCount, { i: this.index() + 1, n: this.items().length }),
  );

  open(i: number): void {
    this.index.set(i);
    this.dlg().nativeElement.showModal();
  }

  close(): void {
    this.dlg().nativeElement.close();
  }

  protected step(d: number): void {
    const n = this.items().length;
    this.index.update((i) => (i + d + n) % n);
  }

  protected onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.step(1);
    if (e.key === 'ArrowLeft') this.step(-1);
  }

  protected onBackdrop(e: MouseEvent): void {
    if (e.target === this.dlg().nativeElement) this.close();
  }
}

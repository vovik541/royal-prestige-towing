import { ChangeDetectionStrategy, Component, DOCUMENT, DestroyRef, ElementRef, afterNextRender, afterRenderEffect, computed, inject, input, signal, viewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { I18n, fmt } from '../core/i18n/i18n';
import { PhotoId, photoSources } from '../content/photos';

/** History-state flag marking an entry that the viewer itself pushed. */
const OWN_ENTRY = 'rptViewer';

/**
 * Shared, accessible photo viewer on the native <dialog>, driven by the URL (?photo=<id>):
 *  - opening pushes one history entry, so the browser Back button closes the viewer and stays
 *    on the page; Forward reopens it;
 *  - stepping between photos replaces that entry (no history pile-up);
 *  - Close and Escape go back when the viewer added the entry, and otherwise (a direct link to
 *    ?photo=…) just drop the parameter, so Back never traps the visitor;
 *  - focus returns to the opener (native dialog), and page scroll is locked while open.
 * The parameter is only read after hydration, so prerendered HTML and the first client render match.
 */
@Component({
  selector: 'app-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <dialog #dlg [attr.aria-label]="t.common.photoViewer" (keydown)="onKey($event)" (click)="onBackdrop($event)" (cancel)="onCancel($event)">
      @if (current(); as id) {
        <figure>
          <img [src]="largest()" [alt]="t.photos[id].alt" />
          <figcaption>
            <span>{{ t.photos[id].caption }}</span>
            <span class="count">{{ count() }}</span>
          </figcaption>
        </figure>
      }
      <!-- Controls stay in the DOM so showModal() focuses Close instead of the dialog itself
           (focusing an empty dialog scrolls the page to the top). -->
      <div class="ctl">
          <button class="icon-btn" type="button" [attr.aria-label]="t.common.previousPhoto" (click)="step(-1)" [disabled]="items().length < 2">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button class="icon-btn" type="button" [attr.aria-label]="t.common.nextPhoto" (click)="step(1)" [disabled]="items().length < 2">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <button class="btn btn--ghost btn--sm" type="button" autofocus (click)="close()">{{ t.common.closeViewer }}</button>
      </div>
    </dialog>
  `,
  styles: `
    dialog { border: 0; padding: 0; background: transparent; width: min(1100px, calc(100vw - 32px)); max-width: none; color: var(--silver); }
    dialog::backdrop { background: rgba(6, 7, 9, .92); }
    img { width: 100%; max-height: 76vh; object-fit: contain; background: #000; }
    figcaption { display: flex; justify-content: space-between; gap: 16px; margin-top: 12px; font-size: var(--t-sm); color: var(--silver-2); }
    .ctl { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
  `,
})
export class Lightbox {
  protected readonly i18n = inject(I18n);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly doc = inject(DOCUMENT);

  readonly items = input.required<readonly PhotoId[]>();

  private readonly dlg = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');
  private readonly hydrated = signal(false);
  private readonly param = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.routerState.snapshot.root.queryParamMap.get('photo')),
    ),
    { initialValue: this.router.routerState.snapshot.root.queryParamMap.get('photo') },
  );

  protected readonly index = computed(() => (this.hydrated() ? this.items().indexOf(this.param() as PhotoId) : -1));
  protected readonly current = computed(() => this.items()[this.index()] ?? null);
  protected readonly largest = computed(() => (this.current() ? photoSources(this.current()!).largest : ''));
  protected readonly count = computed(() => fmt(this.i18n.t().common.photoCount, { i: this.index() + 1, n: this.items().length }));

  constructor() {
    afterNextRender(() => this.hydrated.set(true));
    inject(DestroyRef).onDestroy(() => (this.doc.documentElement.style.overflow = ''));
    // The URL is the source of truth: show or hide the dialog to match it, after the photo has rendered.
    afterRenderEffect(() => {
      const el = this.dlg().nativeElement;
      const open = this.current() !== null;
      if (open && !el.open) {
        el.showModal();
        this.doc.documentElement.style.overflow = 'hidden';
      } else if (!open && el.open) {
        el.close();
        this.doc.documentElement.style.overflow = '';
      }
    });
  }

  /** Open the photo at `i` in this viewer's item list (adds one history entry). */
  open(i: number): void {
    const id = this.items()[i];
    if (!id) return;
    this.router.navigate([], { queryParams: { photo: id }, queryParamsHandling: 'merge', preserveFragment: true, state: { [OWN_ENTRY]: true } });
  }

  close(): void {
    const state = this.location.getState() as Record<string, unknown> | null;
    if (state?.[OWN_ENTRY]) {
      this.location.back();
    } else {
      this.router.navigate([], { queryParams: { photo: null }, queryParamsHandling: 'merge', preserveFragment: true, replaceUrl: true });
    }
  }

  protected step(d: number): void {
    const n = this.items().length;
    const next = this.items()[(this.index() + d + n) % n];
    const state = this.location.getState() as Record<string, unknown> | null;
    this.router.navigate([], { queryParams: { photo: next }, queryParamsHandling: 'merge', preserveFragment: true, replaceUrl: true, state: { [OWN_ENTRY]: !!state?.[OWN_ENTRY] } });
  }

  protected onCancel(e: Event): void {
    // Escape: route through close() so history stays consistent.
    e.preventDefault();
    this.close();
  }

  protected onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.step(1);
    if (e.key === 'ArrowLeft') this.step(-1);
  }

  protected onBackdrop(e: MouseEvent): void {
    if (e.target === this.dlg().nativeElement) this.close();
  }
}

import { DestroyRef, Directive, ElementRef, Injectable, PLATFORM_ID, afterNextRender, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** The sticky header covers the top of the viewport, so a zone only counts below it. */
const ROOT_MARGIN = '-64px 0px 0px 0px';
/** A zone counts once this many pixels of it are on screen (or all of it, if it is smaller). */
const MIN_VISIBLE_PX = 96;
const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);
/** Showing waits this long so a route change (old zones gone, new ones not yet measured) never flashes the bar; hiding is immediate. */
const SHOW_DELAY_MS = 180;

/**
 * Decides whether the floating phone/SMS bar is useful right now. It is hidden while
 *  - a prominent contact zone (call buttons, phone block, quote form, open mobile menu) is meaningfully on screen,
 *  - a form field has focus (the on-screen keyboard is likely up).
 * Zones register through the `appContactZone` directive; state changes only on observer callbacks,
 * so scrolling itself does no work. Browser-only: on the server the bar renders hidden.
 */
@Injectable({ providedIn: 'root' })
export class ContactBar {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly visible = new Set<Element>();
  private observer: IntersectionObserver | null = null;

  private readonly zonesInView = signal(0);
  /** False until the first observer pass, so the bar never flashes in before zones are known. */
  private readonly measured = signal(false);
  readonly typing = signal(false);

  private readonly wanted = computed(
    () => this.measured() && this.zonesInView() === 0 && !this.typing(),
  );
  private readonly shown = signal(false);
  readonly show = this.shown.asReadonly();

  constructor() {
    if (!this.browser) return;
    // Pages without any zone still need the bar: give zones a moment to report, then count as measured.
    afterNextRender(() => setTimeout(() => this.measured.set(true), 300));
    let timer: ReturnType<typeof setTimeout> | undefined;
    effect(() => {
      const wanted = this.wanted();
      clearTimeout(timer);
      if (!wanted) this.shown.set(false);
      else timer = setTimeout(() => this.shown.set(true), SHOW_DELAY_MS);
    });
  }

  observe(el: Element): void {
    this.io()?.observe(el);
  }

  unobserve(el: Element): void {
    this.observer?.unobserve(el);
    if (this.visible.delete(el)) this.zonesInView.set(this.visible.size);
  }

  private io(): IntersectionObserver | null {
    if (!this.browser || !('IntersectionObserver' in window)) return null;
    this.observer ??= new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const need = Math.min(e.boundingClientRect.height, MIN_VISIBLE_PX) - 1;
          const inView = e.isIntersecting && e.intersectionRect.height >= need;
          if (inView) this.visible.add(e.target);
          else this.visible.delete(e.target);
        }
        if (this.zonesInView() !== this.visible.size) this.zonesInView.set(this.visible.size);
        this.measured.set(true);
      },
      { rootMargin: ROOT_MARGIN, threshold: THRESHOLDS },
    );
    return this.observer;
  }
}

/** Marks an element as a prominent contact zone: while it is on screen the floating bar steps aside. */
@Directive({ selector: '[appContactZone]' })
export class ContactZone {
  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const bar = inject(ContactBar);
    afterNextRender(() => bar.observe(el));
    inject(DestroyRef).onDestroy(() => bar.unobserve(el));
  }
}

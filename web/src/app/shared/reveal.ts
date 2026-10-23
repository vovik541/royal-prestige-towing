import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';

/**
 * Fades an element up as it scrolls into view. Runs only in the browser after hydration,
 * and only for elements still below the fold, so server-rendered content never flashes
 * or stays hidden. Skipped entirely when the visitor prefers reduced motion.
 */
@Directive({ selector: '[appReveal]' })
export class Reveal {
  /** Stagger delay in ms: appReveal="70" or [appReveal]="i * 70". */
  readonly appReveal = input(0, { transform: (v: unknown) => numberAttribute(v, 0) });

  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
      if (el.getBoundingClientRect().top < innerHeight * 0.92) return;
      const delay = this.appReveal();
      if (delay) el.style.setProperty('--d', `${delay}ms`);
      el.classList.add('rv');
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            el.classList.add('in');
            io.disconnect();
          }
        },
        { rootMargin: '0px 0px -6% 0px' },
      );
      io.observe(el);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}

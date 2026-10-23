import { DOCUMENT, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, Scroll } from '@angular/router';

const pathOf = (url: string) => url.split(/[?#]/)[0];

/**
 * Scroll behaviour for router navigations (the router's own position restoration is disabled
 * in app.config.ts; anchor scrolling stays with the router):
 *  - a new page (path change) starts at the top;
 *  - Back/Forward between pages restores the saved position;
 *  - query-only changes on the same page (e.g. opening the photo viewer, ?photo=…) never scroll;
 *  - the initial page load is left to the browser.
 * Paths come from NavigationEnd events, so the comparison never depends on router state read
 * before the first navigation has finished.
 */
@Injectable({ providedIn: 'root' })
export class ScrollManager {
  private readonly win = inject(DOCUMENT).defaultView;
  private previousPath: string | null = null;
  private currentPath: string | null = null;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    inject(Router).events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.previousPath = this.currentPath;
        this.currentPath = pathOf(e.urlAfterRedirects);
        return;
      }
      if (!(e instanceof Scroll) || e.anchor) return;
      const pageChanged = this.previousPath !== null && this.previousPath !== this.currentPath;
      if (!pageChanged) return;
      const [left, top] = e.position ?? [0, 0];
      this.win?.scrollTo({ left, top, behavior: 'instant' });
    });
  }
}

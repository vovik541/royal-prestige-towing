import { ChangeDetectionStrategy, Component, DOCUMENT, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { I18n } from '../core/i18n/i18n';
import { Header } from './header';
import { Footer } from './footer';

/** Language-scoped layout: header, page outlet, footer and the mobile quote bar. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    @let t = i18n.t();
    <a class="skip" href="#main">{{ t.meta.skip }}</a>
    <app-header />
    <main id="main" tabindex="-1"><router-outlet /></main>
    <app-footer />
    @if (!onContact()) {
      <div class="dock" [class.is-on]="pastFold()">
        <a class="btn btn--copper" [routerLink]="i18n.link('contact')" [attr.tabindex]="pastFold() ? null : -1">{{ t.common.planTransport }}</a>
      </div>
    }
  `,
  styles: `
    main:focus { outline: none; }
    .dock { display: none; }
    @media (max-width: 640px) {
      .dock { display: block; position: fixed; left: 0; right: 0; bottom: 0; z-index: 40; padding: 10px var(--gut) max(10px, env(safe-area-inset-bottom)); background: rgba(15, 17, 20, .96); border-top: 1px solid var(--line); transform: translateY(110%); transition: transform .35s var(--ease); }
      .dock.is-on { transform: none; }
      .dock .btn { width: 100%; min-height: 52px; }
    }
  `,
})
export class Shell {
  protected readonly i18n = inject(I18n);
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);

  protected readonly pastFold = signal(false);
  private readonly url = toSignal(
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd), map(() => this.router.url)),
    { initialValue: this.router.url },
  );
  protected readonly onContact = computed(() => /^\/\w+\/contact/.test(this.url()));

  protected onScroll(): void {
    const win = this.doc.defaultView!;
    this.pastFold.set(win.scrollY > win.innerHeight * 0.85);
  }
}

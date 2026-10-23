import { ChangeDetectionStrategy, Component, DOCUMENT, inject, signal } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { I18n } from '../core/i18n/i18n';
import { DeckLine } from '../shared/deck-line';
import { LangSwitcher } from './lang-switcher';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, DeckLine, LangSwitcher],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()', '(document:keydown.escape)': 'close()' },
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly i18n = inject(I18n);
  private readonly doc = inject(DOCUMENT);

  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly links = [
    { path: 'services', key: 'services' },
    { path: 'our-work', key: 'work' },
    { path: 'about', key: 'about' },
    { path: 'service-areas', key: 'areas' },
  ] as const;

  constructor() {
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationStart), takeUntilDestroyed())
      .subscribe(() => this.close());
  }

  protected toggle(): void {
    this.open.update((v) => !v);
    this.doc.body.style.overflow = this.open() ? 'hidden' : '';
  }

  protected close(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.doc.body.style.overflow = '';
  }

  protected onScroll(): void {
    this.scrolled.set(this.doc.defaultView!.scrollY > 8);
  }
}

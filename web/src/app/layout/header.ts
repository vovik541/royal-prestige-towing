import { ChangeDetectionStrategy, Component, DOCUMENT, computed, inject, signal } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { PHONE } from '../core/config/site';
import { ContactZone } from '../core/contact-bar';
import { I18n, fmt } from '../core/i18n/i18n';
import { DeckLine } from '../shared/deck-line';
import { MessageIcon } from '../shared/message-icon';
import { PhoneIcon } from '../shared/phone-icon';
import { LangSwitcher } from './lang-switcher';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ContactZone, DeckLine, LangSwitcher, MessageIcon, PhoneIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()', '(document:keydown.escape)': 'close()' },
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly i18n = inject(I18n);
  private readonly doc = inject(DOCUMENT);

  protected readonly phone = PHONE;
  protected readonly callAria = computed(() => fmt(this.i18n.t().common.callAria, { phone: PHONE.display }));
  protected readonly smsAria = computed(() => fmt(this.i18n.t().common.smsAria, { phone: PHONE.display }));
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

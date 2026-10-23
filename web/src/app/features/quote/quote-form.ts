import { ChangeDetectionStrategy, Component, DOCUMENT, ElementRef, Injector, afterNextRender, computed, effect, inject, model, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PHONE } from '../../core/config/site';
import { I18n, fmt } from '../../core/i18n/i18n';
import { LOAD_TYPES, LoadType } from '../../content/photos';
import { MessageIcon } from '../../shared/message-icon';
import { PhoneIcon } from '../../shared/phone-icon';
import { CONDITIONS, CONTACT_PREFS, Condition, ContactPref, QuoteRequest, QuoteSubmission, TIMINGS, Timing } from './quote.model';

/** 10 US digits (an optional leading 1 is dropped), or null if it isn't a valid NANP number. */
export function usDigits(value: string): string | null {
  if (!/^[+()\d\s.-]*$/.test(value)) return null;
  let d = value.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(d) ? d : null;
}

/** Accepts US phone numbers in common formats: (916) 555-1234, 916-555-1234, +1 916 555 1234. */
function usPhone(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '').trim();
  return !value || usDigits(value) ? null : { usPhone: true };
}

const formatUs = (value: string) => {
  const d = usDigits(value);
  return d ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : value;
};

/** A preferred date is required only when "specific date" is chosen. */
function dateWhenNeeded(group: AbstractControl): ValidationErrors | null {
  return group.get('timing')?.value === 'date' && !group.get('date')?.value ? { dateRequired: true } : null;
}

/**
 * Compact quote request: four essentials on one screen (load, pickup, drop-off, phone), optional
 * details behind a single disclosure, then an in-place review. There is no backend yet, so the
 * review says so plainly and offers the phone instead of pretending to send anything.
 */
@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule, MessageIcon, PhoneIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css',
})
export class QuoteForm {
  protected readonly i18n = inject(I18n);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly doc = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  protected readonly submission = inject(QuoteSubmission);
  protected readonly phone = PHONE;
  protected readonly callAria = computed(() => fmt(this.i18n.t().common.callAria, { phone: PHONE.display }));
  protected readonly smsAria = computed(() => fmt(this.i18n.t().common.smsAria, { phone: PHONE.display }));

  /** Load type, two-way bound with the page (preselected from ?type=). */
  readonly loadType = model<LoadType>('everyday');

  protected readonly loadTypes = LOAD_TYPES;
  protected readonly conditions = CONDITIONS;
  protected readonly timings = TIMINGS;
  protected readonly prefs = CONTACT_PREFS;

  protected readonly form = this.fb.group(
    {
      loadType: this.fb.control<LoadType>('everyday'),
      pickup: ['', [Validators.required, Validators.maxLength(80)]],
      destination: ['', [Validators.required, Validators.maxLength(80)]],
      phone: ['', [Validators.required, usPhone]],
      item: ['', Validators.maxLength(120)],
      condition: this.fb.control<Condition | ''>(''),
      timing: this.fb.control<Timing>('flexible'),
      date: [''],
      notes: ['', Validators.maxLength(1000)],
      name: ['', Validators.maxLength(80)],
      preference: this.fb.control<ContactPref>('phone'),
    },
    { validators: dateWhenNeeded },
  );
  protected readonly c = this.form.controls;

  protected readonly moreOpen = signal(false);
  protected readonly reviewing = signal(false);
  protected readonly showErrors = signal(false);
  protected readonly copyStatus = signal<'idle' | 'copied' | 'failed'>('idle');
  private readonly reviewHeading = viewChild<ElementRef<HTMLElement>>('reviewHeading');

  private readonly value = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });
  protected readonly needsDate = computed(() => this.value().timing === 'date');
  protected readonly itemPlaceholder = computed(() => this.i18n.t().configurator.loads[this.value().loadType ?? 'everyday'].placeholder);

  constructor() {
    // Keep the control and the page's load type (from ?type= or the configurator) in sync.
    effect(() => {
      const type = this.loadType();
      if (this.c.loadType.value !== type) this.c.loadType.setValue(type);
    });
    this.c.loadType.valueChanges.pipe(takeUntilDestroyed()).subscribe((type) => this.loadType.set(type));
  }

  /** Summary rows: the essentials always, optional details only when given. */
  protected readonly rows = computed(() => {
    this.reviewing();
    const t = this.i18n.t();
    const q = t.quote;
    const v = this.form.getRawValue();
    const rows = [
      { label: q.review.loadType, value: t.loadTypes[v.loadType].name },
      { label: q.fields.pickup.label, value: v.pickup.trim() },
      { label: q.fields.destination.label, value: v.destination.trim() },
      { label: q.fields.phone.label, value: formatUs(v.phone) },
    ];
    const optional = [
      { label: q.fields.item.label, value: v.item.trim() },
      { label: q.fields.condition.legend, value: v.condition ? q.conditions[v.condition] : '' },
      { label: q.fields.timing.legend, value: v.timing === 'date' && v.date ? `${q.timings.date}: ${v.date}` : v.timing !== 'flexible' ? q.timings[v.timing] : '' },
      { label: q.fields.notes.label, value: v.notes.trim() },
      { label: q.fields.name.label, value: v.name.trim() },
      { label: q.fields.contactPref.legend, value: v.preference !== 'phone' ? q.contactPrefs[v.preference] : '' },
    ];
    return [...rows, ...optional.filter((r) => r.value)];
  });

  protected invalid(control: AbstractControl): boolean {
    return control.invalid && (control.touched || this.showErrors());
  }

  protected toggleMore(): void {
    this.moreOpen.update((v) => !v);
  }

  protected review(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showErrors.set(true);
      if (this.form.hasError('dateRequired')) this.moreOpen.set(true);
      afterNextRender(() => this.doc.querySelector<HTMLElement>('.qf [aria-invalid="true"]')?.focus(), { injector: this.injector });
      return;
    }
    this.showErrors.set(false);
    this.copyStatus.set('idle');
    this.reviewing.set(true);
    afterNextRender(() => {
      const h = this.reviewHeading()?.nativeElement;
      h?.focus({ preventScroll: true });
      h?.scrollIntoView({ block: 'nearest' });
    }, { injector: this.injector });
  }

  protected edit(): void {
    this.reviewing.set(false);
    afterNextRender(() => this.doc.getElementById('q-pickup')?.focus(), { injector: this.injector });
  }

  protected startOver(): void {
    this.form.reset({ loadType: this.loadType() });
    this.moreOpen.set(false);
    this.reviewing.set(false);
  }

  protected buildRequest(): QuoteRequest {
    const v = this.form.getRawValue();
    return {
      lang: this.i18n.lang(),
      loadType: v.loadType,
      item: v.item.trim(),
      pickup: v.pickup.trim(),
      destination: v.destination.trim(),
      condition: (v.condition || 'unsure') as Condition,
      timing: v.timing,
      date: v.timing === 'date' ? v.date : null,
      notes: v.notes.trim(),
      contact: { name: v.name.trim(), phone: usDigits(v.phone) ?? '', preference: v.preference },
    };
  }

  /** Plain-text copy so the visitor can read it out on the phone or text it. */
  protected async copy(): Promise<void> {
    const text = this.rows().map((r) => `${r.label}: ${r.value}`).join('\n');
    try {
      await navigator.clipboard.writeText(`Royal Prestige Towing\n${text}`);
      this.copyStatus.set('copied');
    } catch {
      this.copyStatus.set('failed');
    }
  }

  protected send(): void {
    // Unreachable while submission is unavailable: the button is aria-disabled and says why.
    if (!this.submission.available) return;
    this.submission.submit(this.buildRequest()).subscribe();
  }
}

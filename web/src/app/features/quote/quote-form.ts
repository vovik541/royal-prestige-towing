import { ChangeDetectionStrategy, Component, DOCUMENT, ElementRef, Injector, afterNextRender, computed, inject, model, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PHONE } from '../../core/config/site';
import { I18n, fmt } from '../../core/i18n/i18n';
import { LoadType } from '../../content/photos';
import { PhoneIcon } from '../../shared/phone-icon';
import { Configurator } from './configurator';
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

/** A preferred date is required only when "on a specific date" is chosen. */
function dateWhenNeeded(group: AbstractControl): ValidationErrors | null {
  const timing = group.get('timing')?.value as Timing;
  const date = group.get('date')?.value as string;
  return timing === 'date' && !date ? { dateRequired: true } : null;
}

type Step = 0 | 1 | 2 | 3;

@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule, Configurator, PhoneIcon],
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

  readonly loadType = model<LoadType>('exotic');

  protected readonly conditions = CONDITIONS;
  protected readonly timings = TIMINGS;
  protected readonly prefs = CONTACT_PREFS;
  protected readonly stepKeys = ['load', 'details', 'contact', 'review'] as const;

  protected readonly details = this.fb.group(
    {
      item: ['', [Validators.required, Validators.maxLength(120)]],
      pickup: ['', [Validators.required, Validators.maxLength(80)]],
      destination: ['', [Validators.required, Validators.maxLength(80)]],
      condition: this.fb.control<Condition | ''>('', Validators.required),
      timing: this.fb.control<Timing>('flexible'),
      date: [''],
      notes: ['', Validators.maxLength(1000)],
    },
    { validators: dateWhenNeeded },
  );

  protected readonly contact = this.fb.group({
    name: ['', Validators.maxLength(80)],
    phone: ['', [Validators.required, usPhone]],
    preference: this.fb.control<ContactPref>('phone'),
  });

  protected readonly step = signal<Step>(0);
  protected readonly showErrors = signal(false);
  protected readonly copyStatus = signal<'idle' | 'copied' | 'failed'>('idle');
  private readonly stepHeading = viewChild<ElementRef<HTMLElement>>('stepHeading');

  private readonly detailsValue = toSignal(this.details.valueChanges, { initialValue: this.details.getRawValue() });
  protected readonly needsDate = computed(() => this.detailsValue().timing === 'date');
  protected readonly stepLabel = computed(() => fmt(this.i18n.t().quote.stepOf, { i: this.step() + 1, n: 4 }));

  /** Summary rows for the review step, in the visitor's language. */
  protected readonly summary = computed(() => {
    this.step(); // recompute whenever the review step is entered
    const t = this.i18n.t();
    const q = t.quote;
    const d = this.details.getRawValue();
    const c = this.contact.getRawValue();
    const none = q.review.notProvided;
    const timing = d.timing === 'date' && d.date ? `${q.timings.date}: ${d.date}` : q.timings[d.timing];
    return {
      load: [{ label: q.review.loadType, value: t.loadTypes[this.loadType()].name }],
      details: [
        { label: q.fields.item.label, value: d.item || none },
        { label: q.fields.pickup.label, value: d.pickup || none },
        { label: q.fields.destination.label, value: d.destination || none },
        { label: q.fields.condition.label, value: d.condition ? q.conditions[d.condition] : none },
        { label: q.fields.timing.label, value: timing },
        { label: q.fields.notes.label, value: d.notes || none },
      ],
      contact: [
        { label: q.fields.name.label, value: c.name || none },
        { label: q.fields.phone.label, value: c.phone ? formatUs(c.phone) : none },
        { label: q.fields.contactPref.label, value: q.contactPrefs[c.preference] },
      ],
    };
  });

  protected readonly reviewBlocks = computed(() => {
    const s = this.summary();
    return [
      { key: 'load' as const, step: 0 as Step, rows: s.load },
      { key: 'details' as const, step: 1 as Step, rows: s.details },
      { key: 'contact' as const, step: 2 as Step, rows: s.contact },
    ];
  });

  protected invalid(control: AbstractControl | null): boolean {
    return !!control && control.invalid && (control.touched || this.showErrors());
  }

  protected next(): void {
    const group = this.step() === 1 ? this.details : this.step() === 2 ? this.contact : null;
    if (group && group.invalid) {
      group.markAllAsTouched();
      this.showErrors.set(true);
      // After the error state renders, move focus to the first field that needs attention.
      afterNextRender(() => this.doc.querySelector<HTMLElement>('.quote [aria-invalid="true"]')?.focus(), { injector: this.injector });
      return;
    }
    this.showErrors.set(false);
    this.go((this.step() + 1) as Step);
  }

  protected back(): void {
    this.go((this.step() - 1) as Step);
  }

  protected go(step: Step): void {
    this.step.set(step);
    this.copyStatus.set('idle');
    afterNextRender(() => {
      const h = this.stepHeading()?.nativeElement;
      h?.focus({ preventScroll: true });
      h?.scrollIntoView({ block: 'nearest' });
    }, { injector: this.injector });
  }

  protected buildRequest(): QuoteRequest {
    const d = this.details.getRawValue();
    return {
      lang: this.i18n.lang(),
      loadType: this.loadType(),
      item: d.item.trim(),
      pickup: d.pickup.trim(),
      destination: d.destination.trim(),
      condition: d.condition as Condition,
      timing: d.timing,
      date: d.timing === 'date' ? d.date : null,
      notes: d.notes.trim(),
      contact: { ...this.contact.getRawValue(), phone: usDigits(this.contact.getRawValue().phone) ?? '' },
    };
  }

  /** Plain-text copy of the request so the visitor can share it manually. */
  protected async copy(): Promise<void> {
    const s = this.summary();
    const text = [...s.load, ...s.details, ...s.contact].map((r) => `${r.label}: ${r.value}`).join('\n');
    try {
      await navigator.clipboard.writeText(`Royal Prestige Towing\n${text}`);
      this.copyStatus.set('copied');
    } catch {
      this.copyStatus.set('failed');
    }
  }

  protected send(): void {
    // Unreachable while submission is unavailable: the button is aria-disabled and explains why.
    if (!this.submission.available) return;
    this.submission.submit(this.buildRequest()).subscribe();
  }

  protected reset(): void {
    this.details.reset();
    this.contact.reset();
    this.go(0);
  }
}

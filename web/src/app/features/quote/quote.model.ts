import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { QUOTE_ENDPOINT } from '../../core/config/site';
import { Lang } from '../../core/i18n/i18n';
import { LoadType } from '../../content/photos';

export const CONDITIONS = ['runs', 'rolls', 'static', 'unsure'] as const;
export const TIMINGS = ['flexible', 'week', 'date'] as const;
export const CONTACT_PREFS = ['phone', 'text'] as const;
export type Condition = (typeof CONDITIONS)[number];
export type Timing = (typeof TIMINGS)[number];
export type ContactPref = (typeof CONTACT_PREFS)[number];

/** The payload a future quote API will receive. */
export interface QuoteRequest {
  lang: Lang;
  loadType: LoadType;
  item: string;
  pickup: string;
  destination: string;
  condition: Condition;
  timing: Timing;
  date: string | null;
  notes: string;
  /**
   * The public form collects a phone number only. `email` stays optional in the payload so a
   * future API that accepts it is not broken, but the website never asks for or sends it.
   */
  contact: { name: string; phone: string; email?: string; preference: ContactPref };
  /** The visitor agreed that Serhii may call or text them to respond to this request (required). */
  consent: { contact: true };
}

/**
 * Sends quote requests. There is no backend yet (QUOTE_ENDPOINT is null), so `available`
 * is false and the UI says plainly that nothing can be sent. Set QUOTE_ENDPOINT to enable.
 */
@Injectable({ providedIn: 'root' })
export class QuoteSubmission {
  private readonly http = inject(HttpClient);
  readonly available = QUOTE_ENDPOINT !== null;

  submit(request: QuoteRequest): Observable<unknown> {
    if (!QUOTE_ENDPOINT) return throwError(() => new Error('Quote submission is not configured.'));
    return this.http.post(QUOTE_ENDPOINT, request);
  }
}

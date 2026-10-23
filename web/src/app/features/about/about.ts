import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { I18n } from '../../core/i18n/i18n';
import { ORG_ID, Seo, breadcrumbSchema } from '../../core/seo/seo';
import { photoSources } from '../../content/photos';
import { SITE } from '../../core/config/site';
import { Breadcrumbs } from '../../shared/breadcrumbs';
import { DeckLine } from '../../shared/deck-line';
import { FinalCta } from '../../shared/final-cta';
import { OwnerProfile } from '../../shared/owner-profile';
import { Photo } from '../../shared/photo';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-about',
  imports: [Breadcrumbs, DeckLine, FinalCta, OwnerProfile, Photo, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <header class="page-head">
      <div class="wrap">
        <app-breadcrumbs [items]="[{ name: t.nav.home, path: '' }, { name: t.nav.about, path: 'about' }]" />
        <h1 class="display-h">{{ t.about.title }}</h1>
        <app-deck-line />
        <p class="lede">{{ t.about.intro }}</p>
      </div>
    </header>

    <section class="section owner" aria-labelledby="owner-h">
      <app-owner-profile />
    </section>

    <section class="section band" aria-labelledby="story-h">
      <div class="story wrap">
        <div>
          <h2 id="story-h" class="section-h" appReveal>{{ t.about.storyTitle }}</h2>
          @for (p of t.about.story; track $index) {
            <p class="lede" [appReveal]="70 + $index * 70">{{ p }}</p>
          }
        </div>
        <div class="trio" appReveal="120">
          <app-photo id="mclaren-front" sizes="(max-width: 900px) 46vw, 24vw" />
          <app-photo id="mercedes-sedan" sizes="(max-width: 900px) 46vw, 24vw" />
          <app-photo id="lathe-secured" sizes="(max-width: 900px) 92vw, 48vw" />
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="pr-h">
      <div class="wrap">
        <h2 id="pr-h" class="section-h" appReveal>{{ t.about.principlesTitle }}</h2>
        <ul class="principles">
          @for (p of t.about.principles; track p.title; let i = $index) {
            <li [appReveal]="i * 80"><h3>{{ p.title }}</h3><p>{{ p.text }}</p></li>
          }
        </ul>
      </div>
    </section>

    <app-final-cta />
  `,
  styles: `
    .owner { padding-top: 0; }
    .story { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); gap: clamp(32px, 5vw, 80px); align-items: center; }
    .story .lede { margin-top: 20px; max-width: 34em; }
    .trio { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; }
    .trio app-photo { aspect-ratio: 4 / 3; }
    .trio app-photo:last-child { grid-column: 1 / -1; aspect-ratio: 16 / 8; }
    .principles { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; margin-top: 36px; }
    .principles li { border-top: 1px solid var(--line-2); padding-top: 20px; display: grid; gap: 8px; align-content: start; }
    .principles h3 { font: 600 var(--t-h3)/1.2 var(--text); }
    .principles p { color: var(--silver-2); }
    @media (max-width: 900px) { .story, .principles { grid-template-columns: minmax(0, 1fr); } }
  `,
})
export class AboutPage {
  protected readonly i18n = inject(I18n);

  constructor() {
    const seo = inject(Seo);
    effect(() => {
      const t = this.i18n.t();
      const lang = this.i18n.lang();
      seo.set({
        title: t.about.seo.title,
        description: t.about.seo.description,
        path: 'about',
        image: photoSources('owner-serhii').largest,
        imageAlt: t.photos['owner-serhii'].alt,
        schema: [
          breadcrumbSchema(lang, [{ name: t.nav.home, path: '' }, { name: t.nav.about, path: 'about' }]),
          { '@type': 'AboutPage', mainEntity: { '@id': ORG_ID } },
          { '@type': 'Person', name: 'Serhii Hoida', jobTitle: 'Owner', worksFor: { '@id': ORG_ID }, image: SITE.url + photoSources('owner-serhii').largest },
        ],
      });
    });
  }
}

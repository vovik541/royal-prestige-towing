# Concept 01 Refined: design notes

Prototype: `design-exploration/concept-01-refined/index.html`. To serve it, run `python -m http.server` from `design-exploration/`.
The original is kept unchanged as a reference in `design-exploration/concept-01/`.

## Palette
| Role | HEX | Use |
|---|---|---|
| Carbon | #0F1114 | Page ground |
| Carbon 2 | #13161A | Request panel, projects band, final section |
| Graphite | #1A1F25 | Configurator and service-area bands, blended in with gradients |
| Graphite 2 | #222830 | Active states |
| Line / Line 2 | #2B323A / #3B444E | Subtle dividers and input borders |
| Silver | #E3E5E8 | Primary text |
| Silver 2 | #A9B0B8 | Secondary text |
| Steel | #93A6BC | Small labels and map pins. This is the trailer's cobalt deck, desaturated |
| Copper | #C58A54 (hover #D49B66) | Primary action, deck motif, active marks. This is the strap orange, muted |

Section changes are tonal gradients (carbon → graphite → carbon). There are no saturated color fields anywhere.

## Typography
- **Barlow Condensed 600, uppercase.** Used only for major moments: the hero, "What are you moving?", the exotic spotlight, the owner section, the final CTA, and the owner section's labels.
- **Manrope 400–700.** Everything else: section headings in sentence case, navigation, descriptions, form labels, portfolio captions and the footer.
- Scale tokens: 13, 15, 17, 18–20, 20–24, 28–42, 40–76 and 46–96 px.

## Signature motif: the deck profile and tie-down points
- **The deck profile** is a thin line that runs flat and then drops down the loading ramp, with two tie-down points on it. It is the side profile of RPT's own trailer.
- Where it appears: under the RPT wordmark, under the hero headline, on the active configurator option, above the final CTA, and as the "How a transport works" timeline. In that timeline, step 4 ("Delivered") sits up on the deck after the ramp.
- **Tie-down points** are four small rings in the corners of the featured photos ("secured at four wheels"). They scale in on reveal and turn copper on hover.

## Interactive features
- **Transport configurator.** Five load types, as a vertical list on desktop and a grid on tablet and phone. Selecting one crossfades the real photo, the "how it rides" copy and the "we'll ask you about" checklist, and updates the request panel. Arrow, Home and End keys work.
- **Request panel.** Fields for vehicle, pickup, drop-off and "runs and rolls", with validation. It shows an on-page request summary. Nothing is sent, because no contact channel is confirmed yet.
- **Hero load index and footer service links.** Both jump to the configurator with that load type preselected.
- **Selected projects.** Three featured loads (McLaren, Lamborghini, lathe) plus a compact "More from the deck" strip. Every photo opens in a lightbox with previous/next and Escape.
- **Mobile.** A full-screen menu sheet, and a quote bar that slides in after the hero and stays hidden while the configurator is on screen.
- **Reduced motion.** With reduced motion on, all reveals, crossfades and line drawing are skipped and content is shown immediately.

## Validation (rendered and inspected)
- The headless inspector rendered 1440, 768 and 390 with no horizontal overflow and no broken images.
- State captures are in `screenshots/`: menu, configurator, request summary, mobile quote bar, desktop configurator, projects, lightbox, owner and final CTA.
- Inspector items deliberately not "fixed": subtle 1px lines, tonal gradients, copper accent, small uppercase labels and the strip that scrolls sideways. These go against the skill's house style, but the client asked for them.
- The hero headline runs to 3 lines at 1440 and 390, intentionally, as an editorial column.
- On phones the fixed quote bar briefly covers text at the bottom edge while scrolling.

## Needs owner confirmation
1. Phone number. The handwritten note may say (916) 470-5606, but that is unverified. It is not shown, and there are no tel: links.
2. Email address. None was supplied, and none is shown.
3. Service territory beyond Sacramento: Bay Area, the wider Northern California region and long distance.
4. Operating claims written as owner-operated practice: that Serhii answers, quotes, loads and delivers himself; wheel straps only; no hand-offs.
5. Enclosed-transport options, non-running vehicles, and forklift-loaded machinery limits (weight and size).
6. Vehicle identifications in captions: 720S Spider, Urus, Alpina B10, ProMaster, E-Class and the "engine lathe".
7. Whether Serhii is comfortable with the portrait and the "You'll deal with Serhii" framing.
8. How quote requests should be delivered: form backend, email or phone.

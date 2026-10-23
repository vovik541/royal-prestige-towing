// Concept 01 Refined — configurator, request summary, project viewer, menu and reveal. No dependencies.
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const P = '../assets/photos/';
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const LOADS = {
  exotic: {
    title: 'Exotic & sports cars', img: 'lamborghini-urus.jpg', cap: 'Lamborghini Urus',
    alt: 'White Lamborghini Urus secured on the RPT trailer',
    ride: 'Low cars go up slowly, with the approach checked before the nose reaches the ramp. Straps go over the tires, so nothing pulls on the suspension or bodywork.',
    ask: ['Year, make and model', 'Ground clearance, or whether it has a nose lift', 'Pickup and drop-off addresses, and any gate or garage limits'],
    ph: 'e.g. 2021 McLaren 720S Spider'
  },
  everyday: {
    title: 'Everyday cars & SUVs', img: 'mercedes-sedan.jpg', cap: 'Mercedes-Benz E-Class',
    alt: 'Black Mercedes-Benz sedan strapped on the RPT trailer',
    ride: 'Moving, selling, buying out of town, or just done driving it? Your daily driver gets the same wheel straps and the same careful loading as anything else on our deck.',
    ask: ['Year, make and model', 'Whether it runs, rolls and steers', 'Pickup and drop-off addresses'],
    ph: 'e.g. 2016 Honda Accord'
  },
  commercial: {
    title: 'Vans & commercial vehicles', img: 'cargo-van.jpg', cap: 'Ram ProMaster cargo van',
    alt: 'White Ram ProMaster cargo van on the RPT trailer',
    ride: 'High-roof vans and work vehicles are checked for height and weight before we confirm. Let us know about any racking or cargo still inside.',
    ask: ['Make, model and roof height', 'Approximate weight, and whether it is loaded', 'Pickup and drop-off addresses'],
    ph: 'e.g. Ram ProMaster 2500 high roof'
  },
  machinery: {
    title: 'Machinery & equipment', img: 'lathe-forklift.jpg', cap: 'Engine lathe, forklift-loaded',
    alt: 'Shrink-wrapped metal lathe on the trailer beside a forklift',
    ride: 'Shop machines go on by forklift, sit on timber, and are wrapped and strapped at several points so they can’t shift or tip.',
    ask: ['What the machine is, with a photo', 'Footprint, height and weight', 'Whether a forklift is available at both ends'],
    ph: 'e.g. Engine lathe, approx. 3,000 lb'
  },
  special: {
    title: 'Classics & the unusual', img: 'vintage-microtruck.jpg', cap: 'Vintage micro-truck',
    alt: 'Small vintage utility vehicle strapped on the RPT trailer',
    ride: 'Project cars, classics, odd little vehicles that don’t fit anyone’s form. If it has wheels or a footprint, ask — we’ll tell you honestly whether it fits.',
    ask: ['What it is, with a photo or two', 'Whether it rolls and steers', 'Pickup and drop-off addresses'],
    ph: 'e.g. 1987 BMW Alpina B10, not running'
  }
};
let current = 'exotic';

// ---- Configurator
const tabs = $$('.config__list [role="tab"]');
function pick(type, focus) {
  const d = LOADS[type]; if (!d || (type === current && !focus)) { if (focus) tabs.find(t => t.dataset.type === type)?.focus(); return; }
  current = type;
  tabs.forEach(t => {
    const on = t.dataset.type === type;
    t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
    if (on && focus) t.focus();
  });
  $('#cfg-panel').setAttribute('aria-labelledby', 'tab-' + type);
  const img = $('#cfg-img'), info = $$('.sheetinfo > div');
  const swap = () => {
    img.src = P + d.img; img.alt = d.alt;
    $('#cfg-cap').textContent = d.cap;
    $('#cfg-title').textContent = d.title;
    $('#cfg-ride').textContent = d.ride;
    $('#cfg-ask').innerHTML = d.ask.map(a => `<li>${esc(a)}</li>`).join('');
    $('#q-item').placeholder = d.ph;
    $('#req-type').textContent = d.title;
    img.classList.remove('is-swapping'); info.forEach(n => n.classList.remove('is-fading'));
  };
  if (reduced()) return swap();
  img.classList.add('is-swapping'); info.forEach(n => n.classList.add('is-fading'));
  const pre = new Image(); pre.src = P + d.img;
  setTimeout(swap, 220);
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => pick(t.dataset.type));
  t.addEventListener('keydown', e => {
    const k = e.key; let n = null;
    if (k === 'ArrowDown' || k === 'ArrowRight') n = (i + 1) % tabs.length;
    if (k === 'ArrowUp' || k === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
    if (k === 'Home') n = 0; if (k === 'End') n = tabs.length - 1;
    if (n === null) return;
    e.preventDefault(); pick(tabs[n].dataset.type, true);
  });
});
// [data-pick] anywhere jumps to the configurator with that load selected
$$('[data-pick]').forEach(b => b.addEventListener('click', e => {
  e.preventDefault(); pick(b.dataset.pick);
  $('#configurator').scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' });
}));

// ---- Request: validate, then show a summary (no contact channel is confirmed yet, so nothing is sent)
const form = $('#request'), summary = $('#summary'), item = $('#q-item');
form.addEventListener('submit', e => {
  e.preventDefault();
  const v = n => (form.elements.namedItem(n).value || '').trim();
  if (!v('item')) {
    item.setAttribute('aria-invalid', 'true'); $('#req-err').hidden = false; item.focus(); return;
  }
  item.removeAttribute('aria-invalid'); $('#req-err').hidden = true;
  const rows = [['Load type', LOADS[current].title], ['Vehicle or equipment', v('item')], ['Pickup', v('from') || 'Not given'], ['Drop-off', v('to') || 'Not given'], ['Runs and rolls', form.elements.runs.value]];
  $('#summary-list').innerHTML = rows.map(([k, val]) => `<div><dt>${esc(k)}</dt><dd>${esc(val)}</dd></div>`).join('');
  summary.hidden = false; summary.focus({ preventScroll: true });
  summary.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'nearest' });
});
item.addEventListener('input', () => { if (item.value.trim()) { item.removeAttribute('aria-invalid'); $('#req-err').hidden = true; } });
$('#summary-edit').addEventListener('click', () => { summary.hidden = true; item.focus(); });

// ---- More from the deck: scroll buttons
const strip = $('#strip');
const stripStep = () => strip.clientWidth * .8;
$('#more-prev').addEventListener('click', () => strip.scrollBy({ left: -stripStep(), behavior: reduced() ? 'auto' : 'smooth' }));
$('#more-next').addEventListener('click', () => strip.scrollBy({ left: stripStep(), behavior: reduced() ? 'auto' : 'smooth' }));
const syncStrip = () => {
  $('#more-prev').disabled = strip.scrollLeft < 4;
  $('#more-next').disabled = strip.scrollLeft > strip.scrollWidth - strip.clientWidth - 4;
};
strip.addEventListener('scroll', syncStrip, { passive: true }); addEventListener('resize', syncStrip); syncStrip();

// ---- Photo viewer
const lb = $('#lightbox'), openers = $$('[data-open]');
let li = 0;
function showPhoto(i) {
  li = (i + openers.length) % openers.length;
  const o = openers[li];
  $('#lb-img').src = P + o.dataset.open; $('#lb-img').alt = o.dataset.cap; $('#lb-cap').textContent = o.dataset.cap;
}
openers.forEach((o, i) => o.addEventListener('click', () => { showPhoto(i); lb.showModal(); }));
$('#lb-prev').addEventListener('click', () => showPhoto(li - 1));
$('#lb-next').addEventListener('click', () => showPhoto(li + 1));
$('#lb-close').addEventListener('click', () => lb.close());
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
lb.addEventListener('keydown', e => { if (e.key === 'ArrowRight') showPhoto(li + 1); if (e.key === 'ArrowLeft') showPhoto(li - 1); });

// ---- Mobile menu
const mb = $('.menu-btn'), sheet = $('#sheet');
function setMenu(open) {
  mb.setAttribute('aria-expanded', String(open)); sheet.hidden = !open;
  mb.textContent = open ? 'Close' : 'Menu';
  document.body.style.overflow = open ? 'hidden' : '';
}
mb.addEventListener('click', () => setMenu(mb.getAttribute('aria-expanded') !== 'true'));
$$('#sheet a').forEach(a => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { setMenu(false); mb.focus(); } });

// ---- Header state; mobile dock appears once the hero actions scroll away
const bar = $('.bar'), dock = $('.dock');
addEventListener('scroll', () => bar.classList.toggle('is-scrolled', scrollY > 8), { passive: true });
// shown after the hero's own buttons scroll away, hidden while the configurator itself is on screen
let pastHero = false, inConfig = false;
const syncDock = () => dock.classList.toggle('is-on', pastHero && !inConfig);
new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; syncDock(); }).observe($('.hero__actions'));
new IntersectionObserver(([e]) => { inConfig = e.isIntersecting; syncDock(); }).observe($('#configurator'));

// ---- Reveal: heading, text, then pictures; never leaves content hidden
const sel = '.display-h, .section-h, .position__h, .hero__kicker, .hero__title, .hero__lede, .hero__actions, .hero__media .frame, .index li, .position__body > *, .config__head p, .config__body, .request, .exotic__lede, .method, .exotic .frame, .feat, .more, .owner__photo, .owner__lede, .handover li, .area__copy > p, .legend, .area__map, .steps li, .faq__list, .final__lede, .final__actions';
if (!reduced() && 'IntersectionObserver' in window) {
  $$('main > section').forEach(sec => $$(sel, sec).forEach((n, i) => { n.classList.add('rv'); n.style.setProperty('--d', Math.min(i, 6) * 70 + 'ms'); }));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px' });
  $$('.rv').forEach(n => io.observe(n));
  const sweep = () => $$('.rv:not(.in)').forEach(n => { if (n.getBoundingClientRect().top < innerHeight) n.classList.add('in'); });
  addEventListener('hashchange', () => setTimeout(sweep, 80));
  addEventListener('scrollend', sweep);
}
const proc = $('.process');
new IntersectionObserver(([e], o) => { if (e.isIntersecting) { proc.classList.add('in-view'); o.disconnect(); } }, { threshold: .3 }).observe(proc);

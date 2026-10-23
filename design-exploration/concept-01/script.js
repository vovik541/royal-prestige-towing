// Concept 01 — Manifest. Load planner, live load sheet, filters, menu, dock and reveal. No dependencies.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const P = '../assets/photos/';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

// ---------- Reveal (set up first, so a later error can never leave content hidden) ----------
if ('IntersectionObserver' in window && !reduced.matches) {
  document.documentElement.classList.add('js');
  $$('main > section').forEach(sec => {
    $$('h2, .hero__title, .hero__lede, .hero__actions, .sheet-spec, p, .btn, figure, li, details, .planner__panel, dl > div', sec)
      .filter(el => !el.closest('.mosaic p, .planner__tabs') && !el.parentElement.closest('.planner__panel'))
      .reduce((list, el) => (list.length < 14 && !list.some(x => x.contains(el)) ? list.concat(el) : list), [])
      .forEach((el, i) => { el.classList.add('rv'); el.style.setProperty('--d', Math.min(i, 8) * 70 + 'ms'); });
  });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -6% 0px' });
  $$('.rv').forEach(el => io.observe(el));
}

// ---------- Load planner ----------
const LOADS = {
  exotic: {
    title: 'Exotic & sports cars', img: 'lamborghini-urus.jpg', cap: 'Lamborghini Urus',
    alt: 'White Lamborghini Urus secured on the RPT flatbed trailer',
    ride: 'Low cars go up slowly, with the approach checked before the nose reaches the ramp. Straps go over the tires, so nothing pulls on the suspension or bodywork.',
    ask: ['Year, make and model', 'Ground clearance, or whether it has a nose lift', 'Pickup and drop-off addresses, and any gate or garage limits'],
    ph: 'e.g. 2021 McLaren 720S Spider'
  },
  everyday: {
    title: 'Everyday cars & SUVs', img: 'mercedes-sedan.jpg', cap: 'Mercedes-Benz E-Class',
    alt: 'Black Mercedes-Benz sedan strapped on the RPT flatbed trailer',
    ride: 'Moving, selling, buying out of town or just done driving it? Your daily driver gets the same wheel straps and the same slow loading as anything else on our deck.',
    ask: ['Year, make and model', 'Whether it runs, rolls and steers', 'Pickup and drop-off addresses'],
    ph: 'e.g. 2016 Honda Accord'
  },
  commercial: {
    title: 'Vans & commercial vehicles', img: 'cargo-van.jpg', cap: 'Ram ProMaster cargo van',
    alt: 'White Ram ProMaster cargo van on the RPT flatbed trailer',
    ride: 'High-roof vans and work vehicles are checked for height and weight before we confirm. Tell us about any racking or cargo still inside.',
    ask: ['Make, model and roof height', 'Approximate weight, and whether it is loaded', 'Pickup and drop-off addresses'],
    ph: 'e.g. Ram ProMaster 2500 high roof'
  },
  machinery: {
    title: 'Machinery & equipment', img: 'lathe-forklift.jpg', cap: 'Engine lathe, forklift-loaded',
    alt: 'Shrink-wrapped metal lathe on the trailer beside a forklift',
    ride: 'Shop machines go on by forklift, sit on timber, and are wrapped and strapped at several points so they cannot shift or tip.',
    ask: ['What the machine is, with a photo', 'Footprint, height and weight', 'Whether a forklift is available at both ends'],
    ph: 'e.g. Engine lathe, about 3,000 lb'
  },
  special: {
    title: 'Classics & the unusual', img: 'vintage-microtruck.jpg', cap: 'Vintage micro-truck',
    alt: 'Small vintage utility vehicle strapped on the RPT trailer',
    ride: 'Project cars, classics, odd little vehicles that don’t fit anyone’s form. If it has wheels or a footprint, ask and we’ll tell you honestly if it fits.',
    ask: ['What it is, with a photo or two', 'Whether it rolls and steers', 'Pickup and drop-off addresses'],
    ph: 'e.g. 1987 BMW Alpina B10, non-running'
  }
};
// Warm the cache so tab switches never flash an empty frame
Object.values(LOADS).forEach(d => { const i = new Image(); i.src = P + d.img; });

const tabs = $$('.planner__tabs [role="tab"]');
const form = $('#quote');
let current = 'exotic';
function pick(type, focus) {
  const d = LOADS[type]; if (!d) return;
  tabs.forEach(t => {
    const on = t.dataset.type === type;
    t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
    if (on && focus) t.focus();
  });
  if (type === current) return;
  current = type;
  $('#plan-panel').setAttribute('aria-labelledby', 'tab-' + type);
  const img = $('#plan-img'), info = $('.planner__info');
  const swap = () => {
    img.src = P + d.img; img.alt = d.alt;
    $('#plan-cap').textContent = d.cap;
    $('#plan-title').textContent = d.title;
    $('#plan-ride').textContent = d.ride;
    $('#plan-ask').replaceChildren(...d.ask.map(a => Object.assign(document.createElement('li'), { textContent: a })));
    img.classList.remove('is-swapping'); info.classList.remove('is-swapping');
  };
  if (reduced.matches) swap();
  else { img.classList.add('is-swapping'); info.classList.add('is-swapping'); setTimeout(swap, 200); }
  $('#q-item').placeholder = d.ph;
  form.dataset.type = d.title;
  ticket();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => pick(t.dataset.type));
  t.addEventListener('keydown', e => {
    const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    let n;
    if (k) n = tabs[(i + k + tabs.length) % tabs.length];
    else if (e.key === 'Home') n = tabs[0];
    else if (e.key === 'End') n = tabs[tabs.length - 1];
    if (!n) return;
    e.preventDefault(); pick(n.dataset.type, true);
  });
});
// Any [data-pick] elsewhere jumps to the planner with that load selected
$$('[data-pick]').forEach(b => b.addEventListener('click', e => {
  e.preventDefault(); pick(b.dataset.pick);
  $('#planner').scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth' });
}));

// ---------- Live load sheet + prefilled email ----------
const val = n => (form.elements[n].value || '').trim();
function setT(id, text, empty) {
  const el = $(id); el.textContent = text || empty; el.classList.toggle('is-empty', !text);
}
function ticket() {
  $('#t-type').textContent = form.dataset.type || LOADS.exotic.title;
  setT('#t-item', val('item'), 'Not filled in yet');
  const from = val('from'), to = val('to');
  setT('#t-route', from || to ? `${from || '?'} to ${to || '?'}` : '', 'Not filled in yet');
  $('#t-runs').textContent = $('input[name="runs"]:checked', form).nextElementSibling.textContent;
}
form.addEventListener('input', ticket);
form.addEventListener('change', ticket);
ticket();
form.addEventListener('submit', e => {
  e.preventDefault();
  const type = form.dataset.type || LOADS.exotic.title;
  const body = `Load type: ${type}\nWhat it is: ${val('item') || '-'}\nFrom: ${val('from') || '-'}\nTo: ${val('to') || '-'}\nRuns and rolls: ${form.elements.runs.value}\n\nName:\nPhone:\nPreferred dates:`;
  location.href = `mailto:quotes@royalprestigetowing.com?subject=${encodeURIComponent('Quote request: ' + (val('item') || type))}&body=${encodeURIComponent(body)}`;
});

// ---------- Loads filter ----------
$$('.filters button').forEach(b => b.addEventListener('click', () => {
  $$('.filters button').forEach(x => x.setAttribute('aria-pressed', x === b));
  const f = b.dataset.filter;
  $$('.mosaic li').forEach(li => li.classList.toggle('is-dim', f !== 'all' && li.dataset.cat !== f));
}));

// ---------- Mobile menu ----------
const mb = $('.menu-btn'), sheet = $('#sheet');
function menu(open) {
  mb.setAttribute('aria-expanded', open); sheet.hidden = !open;
  sheet.classList.toggle('is-open', open);
  mb.firstElementChild.textContent = open ? 'Close' : 'Menu';
  document.body.style.overflow = open ? 'hidden' : '';
  dockUpdate();
}
mb.addEventListener('click', () => menu(mb.getAttribute('aria-expanded') !== 'true'));
$$('#sheet a').forEach(a => a.addEventListener('click', () => menu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { menu(false); mb.focus(); } });
matchMedia('(min-width: 1101px)').addEventListener('change', e => { if (e.matches) menu(false); });

// ---------- Header + phone dock ----------
// The dock shows once the hero's own buttons have scrolled away, and steps aside
// wherever the page already offers the same actions (planner form, final call, footer).
const bar = $('.bar'), dock = $('.dock');
const busy = new Set();
let pastHero = false;
function dockUpdate() {
  dock.dataset.on = pastHero && busy.size === 0 && sheet.hidden;
}
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; dockUpdate(); })
    .observe($('.hero__actions'));
  const zo = new IntersectionObserver(es => {
    es.forEach(e => (e.isIntersecting ? busy.add(e.target) : busy.delete(e.target)));
    dockUpdate();
  });
  $$('.planner, .final, .foot').forEach(el => zo.observe(el));
} else { pastHero = true; dockUpdate(); }
addEventListener('scroll', () => bar.classList.toggle('is-scrolled', scrollY > 8), { passive: true });

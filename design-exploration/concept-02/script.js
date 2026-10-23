// Concept 02 — Long Exposure. Header, index overlay, hero reel, services preview, story sync, route finder, reveals.
// No dependencies.
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
const reduce = () => reduceMQ.matches;

/* ---------- Header: solid once scrolled, hides while scrolling down, returns on the way up ---------- */
const hdr = $('.top');
let lastY = scrollY;
function onScrollHeader() {
  const y = scrollY;
  hdr.classList.toggle('is-solid', y > 24 || document.body.classList.contains('menu-open'));
  if (!document.body.classList.contains('menu-open')) {
    if (y > 320 && y > lastY + 4) hdr.classList.add('is-hidden');
    else if (y < lastY - 4 || y <= 320) hdr.classList.remove('is-hidden');
  }
  lastY = y;
}

/* ---------- Menu overlay (typographic index) ---------- */
const menu = $('.menu'), index = $('#index');
const behind = [$('main'), $('.foot'), $('.dock')];
function setMenu(open, { returnFocus = true } = {}) {
  menu.setAttribute('aria-expanded', String(open));
  index.hidden = !open;
  $('.menu__label').textContent = open ? 'Close' : 'Menu';
  document.body.classList.toggle('menu-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  behind.forEach(n => n && (n.inert = open));
  hdr.classList.remove('is-hidden');
  hdr.classList.toggle('is-solid', open || scrollY > 24);
  if (open) $('#index nav a').focus({ preventScroll: true });
  else if (returnFocus) menu.focus({ preventScroll: true });
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
$$('#index a[href^="#"]').forEach(a => a.addEventListener('click', () => setMenu(false, { returnFocus: false })));
addEventListener('keydown', e => {
  if (e.key === 'Escape' && !index.hidden) { setMenu(false); return; }
  // keep Tab inside the header + overlay while open
  if (e.key === 'Tab' && !index.hidden) {
    const f = [menu, ...$$('#index a, #index button')];
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  }
});

/* ---------- Hero reel: crossfade, choose a load, pause, honours reduced motion ---------- */
const CAPS = ['McLaren 720S Spider', 'BMW Alpina B10, out of storage', 'Engine lathe, forklift-loaded', 'Mercedes-Benz E-Class'];
const reel = $('.reel'), imgs = $$('.reel__img'), picks = $$('.reel__picks button'), pauseBtn = $('.reel__pause');
let cur = 0, timer = null, userPaused = false, hovering = false, inView = true;
function show(i) {
  cur = i;
  imgs.forEach((im, k) => { im.classList.toggle('is-on', k === i); if (k === i) im.loading = 'eager'; });
  picks.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
  $('#reel-cap').textContent = CAPS[i];
}
function canPlay() { return !reduce() && !userPaused && !hovering && inView && !document.hidden; }
function sync() {
  clearInterval(timer); timer = null;
  if (canPlay()) timer = setInterval(() => show((cur + 1) % imgs.length), 6000);
}
function setPaused(p) {
  userPaused = p;
  pauseBtn.setAttribute('aria-pressed', String(p));
  pauseBtn.setAttribute('aria-label', p ? 'Play slideshow' : 'Pause slideshow');
  sync();
}
if (reduce()) setPaused(true);
reduceMQ.addEventListener?.('change', () => { if (reduce()) setPaused(true); });
picks.forEach(b => b.addEventListener('click', () => { show(+b.dataset.i); sync(); }));
pauseBtn.addEventListener('click', () => setPaused(!userPaused));
reel.addEventListener('mouseenter', () => { hovering = true; sync(); });
reel.addEventListener('mouseleave', () => { hovering = false; sync(); });
reel.addEventListener('focusin', () => { hovering = true; sync(); });
reel.addEventListener('focusout', () => { hovering = false; sync(); });
document.addEventListener('visibilitychange', sync);
new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync(); }).observe(reel);
// warm the cache for the next frames once the page is idle
addEventListener('load', () => setTimeout(() => imgs.forEach(im => { im.loading = 'eager'; }), 1200));
sync();

/* ---------- Mobile dock: appears once the hero's own buttons have scrolled away ---------- */
const dock = $('.dock');
new IntersectionObserver(([e]) => dock.classList.toggle('is-on', !e.isIntersecting && e.boundingClientRect.top < 0))
  .observe($('.hero__actions'));

/* ---------- Services: photo follows the cursor (desktop with hover only) ---------- */
const float = $('.svc__float');
if (matchMedia('(hover: hover) and (min-width: 901px)').matches) {
  let x = 0, y = 0, fx = 0, fy = 0, raf = null;
  const loop = () => { fx += (x - fx) * .18; fy += (y - fy) * .18; float.style.left = fx + 'px'; float.style.top = fy + 'px'; raf = requestAnimationFrame(loop); };
  $$('.svc li').forEach(li => {
    li.addEventListener('mouseenter', e => {
      float.src = '../assets/photos/' + li.dataset.img;
      x = fx = e.clientX + 190; y = fy = e.clientY;
      float.classList.add('is-on');
      if (!raf) loop();
    });
    li.addEventListener('mousemove', e => { x = e.clientX + 190; y = e.clientY; });
    li.addEventListener('mouseleave', () => { float.classList.remove('is-on'); cancelAnimationFrame(raf); raf = null; });
  });
}

/* ---------- Stories: the sticky picture follows the chapter in view (desktop) ---------- */
const stories = $$('.story'), stage = $$('.stories__stage img');
const sio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const k = e.target.dataset.k;
  stories.forEach(s => s.classList.toggle('is-on', s === e.target));
  stage.forEach(im => im.classList.toggle('is-on', im.dataset.k === k));
}), { rootMargin: '-45% 0px -45% 0px' });
stories.forEach(s => sio.observe(s));

/* ---------- Route finder ---------- */
// [name, lat, lon, zone, label side, label dy, minor (label hidden on phones unless selected)]
// zone: base = Sacramento itself; near = Sacramento area (provisional); nc = wider NorCal (provisional); bay = Bay Area (provisional)
const CITIES = [
  ['Sacramento', 38.58, -121.49, 'base', 'r', 6, 0],
  ['Davis', 38.54, -121.74, 'near', 'l', 5, 1],
  ['Roseville', 38.75, -121.29, 'near', 'r', 0, 1],
  ['Folsom', 38.68, -121.18, 'near', 'r', 10, 1],
  ['Elk Grove', 38.41, -121.37, 'near', 'r', 5, 1],
  ['Auburn', 38.90, -121.08, 'nc', 'r', 5, 0],
  ['Placerville', 38.73, -120.80, 'nc', 'r', 5, 1],
  ['Yuba City', 39.14, -121.62, 'nc', 'r', 5, 0],
  ['Stockton', 37.96, -121.29, 'nc', 'r', 5, 0],
  ['Modesto', 37.64, -121.00, 'nc', 'r', 5, 1],
  ['Vacaville', 38.36, -121.99, 'nc', 'r', 5, 1],
  ['Napa', 38.30, -122.29, 'bay', 'l', 8, 1],
  ['Santa Rosa', 38.44, -122.71, 'bay', 'r', 5, 0],
  ['Oakland', 37.80, -122.27, 'bay', 'r', 5, 1],
  ['San Francisco', 37.77, -122.42, 'bay', 'l', 16, 0],
  ['San Jose', 37.34, -121.89, 'bay', 'r', 5, 0]
];
const px = lon => 50 + (lon + 123) * 211, py = lat => 20 + (39.35 - lat) * 270;
const pt = ([lat, lon]) => `${px(lon).toFixed(1)},${py(lat).toFixed(1)}`;
const NS = 'http://www.w3.org/2000/svg';
const el = (t, a) => { const n = document.createElementNS(NS, t); for (const k in a) n.setAttribute(k, a[k]); return n; };

// simplified geography: land, ocean, the Bay and the delta rivers (hand-traced, approximate)
const geo = $('#map-geo');
geo.append(el('rect', { class: 'land', x: 20, y: 40, width: 600, height: 610 }));
const OCEAN = [[38.75, -123.6], [38.52, -123.25], [38.45, -123.13], [38.31, -123.05], [38.18, -122.96], [38.0, -123.02], [37.92, -122.72], [37.82, -122.52], [37.78, -122.51], [37.6, -122.5], [37.46, -122.45], [37.2, -122.41], [36.95, -122.05], [36.5, -121.95], [36.5, -123.6]];
const BAY = [[37.81, -122.48], [37.86, -122.47], [37.92, -122.38], [38.03, -122.42], [38.1, -122.3], [38.06, -122.24], [38.05, -122.1], [38.1, -121.97], [38.06, -121.88], [38.02, -122.03], [38.02, -122.24], [37.93, -122.33], [37.86, -122.3], [37.79, -122.27], [37.73, -122.22], [37.66, -122.15], [37.55, -122.06], [37.46, -121.97], [37.44, -122.03], [37.46, -122.11], [37.52, -122.2], [37.58, -122.29], [37.62, -122.37], [37.72, -122.37], [37.79, -122.39], [37.81, -122.42]];
geo.append(el('polygon', { class: 'water', points: OCEAN.map(pt).join(' ') }));
geo.append(el('polygon', { class: 'water', points: BAY.map(pt).join(' ') }));
const RIVERS = [
  [[39.5, -121.95], [39.2, -121.88], [38.95, -121.72], [38.75, -121.6], [38.6, -121.51], [38.45, -121.53], [38.25, -121.6], [38.1, -121.72], [38.06, -121.88]], // Sacramento
  [[38.69, -121.17], [38.63, -121.3], [38.6, -121.42], [38.6, -121.51]], // American
  [[37.55, -121.0], [37.75, -121.2], [37.95, -121.32], [38.03, -121.55], [38.06, -121.85]] // San Joaquin
];
RIVERS.forEach(r => geo.append(el('polyline', { class: 'river', points: r.map(pt).join(' ') })));
const pacific = el('text', { x: px(-123.05), y: py(37.25), 'text-anchor': 'start' }); pacific.textContent = 'Pacific';
geo.append(pacific);

// coverage zones — both provisional apart from Sacramento itself
const zones = $('#map-zones');
zones.append(el('circle', { cx: px(-121.42), cy: py(38.6), r: 86 }));
zones.append(el('circle', { cx: px(-122.3), cy: py(37.85), r: 118 }));
const zt1 = el('text', { x: px(-121.42), y: py(38.6) - 96, 'text-anchor': 'middle' }); zt1.textContent = 'Sacramento area';
const zt2 = el('text', { x: px(-122.3), y: py(37.85) + 142, 'text-anchor': 'middle' }); zt2.textContent = 'Bay Area';
zones.append(zt1, zt2);

const pins = $('#map-pins'), pinEls = {};
const from = $('#r-from'), to = $('#r-to'), route = $('#map-route');
CITIES.forEach(([n, lat, lon, z, side, dy, minor]) => {
  const g = el('g', { class: 'mp' + (z === 'base' ? ' home' : '') + (minor ? ' minor' : '') });
  const x = px(lon), y = py(lat);
  g.append(el('circle', { class: 'hit', cx: x, cy: y, r: 18 }));
  g.append(el('circle', { class: 'pin', cx: x, cy: y, r: z === 'base' ? 9 : 5 }));
  const t = el('text', { x: x + (side === 'l' ? -12 : 13), y: y + dy, 'text-anchor': side === 'l' ? 'end' : 'start' });
  t.textContent = n; g.append(t);
  const tip = el('title', {}); tip.textContent = `Set drop-off: ${n}`; g.append(tip);
  g.addEventListener('click', () => {
    if (n === from.value) return;
    to.value = n; update();
  });
  pins.append(g); pinEls[n] = g;
});
CITIES.forEach(([n]) => { from.add(new Option(n, n)); to.add(new Option(n, n)); });
to.add(new Option('Somewhere else', 'other'));
from.value = 'Sacramento'; to.value = 'San Francisco';
const find = n => CITIES.find(c => c[0] === n);

// straight-line distance x 1.2 as a rough road-mile estimate, rounded to 5
function miles(a, b) {
  const R = 3959, r = d => d * Math.PI / 180;
  const dLat = r(b[1] - a[1]), dLon = r(b[2] - a[2]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a[1])) * Math.cos(r(b[1])) * Math.sin(dLon / 2) ** 2;
  return Math.max(5, Math.round(2 * R * Math.asin(Math.sqrt(h)) * 1.2 / 5) * 5);
}
const STATUS = {
  base: 'Within Sacramento — our home base.',
  near: 'Sacramento area — provisional. Nearby towns are planned coverage; call to confirm your date.',
  nc: 'Wider Northern California — provisional. Considered case by case; call to confirm.',
  bay: 'Bay Area — provisional. Regular coverage is still being confirmed; call and we’ll answer straight away.',
  other: 'Somewhere else — provisional. Tell us where, and we’ll be honest about whether we can do it.'
};
const RANK = { base: 0, near: 1, nc: 2, bay: 3 };
function update() {
  const a = find(from.value), b = to.value === 'other' ? null : find(to.value);
  const toName = to.options[to.selectedIndex].text;
  Object.values(pinEls).forEach(g => g.classList.remove('on'));
  pinEls[a[0]].classList.add('on');
  let zone;
  if (!b || a === b) {
    route.setAttribute('d', '');
    $('#r-miles').textContent = '—';
    $('#r-unit').textContent = b ? 'pick a different drop-off' : 'distance confirmed by phone';
    $('#r-path').textContent = b ? `${a[0]} to ${a[0]}` : `${a[0]} to somewhere else`;
    zone = b ? a[3] : 'other';
    $('#r-status').textContent = b ? 'Pickup and drop-off are the same town.' : STATUS.other;
  } else {
    pinEls[b[0]].classList.add('on');
    const x1 = px(a[2]), y1 = py(a[1]), x2 = px(b[2]), y2 = py(b[1]);
    const mx = (x1 + x2) / 2 - (y2 - y1) * .18, my = (y1 + y2) / 2 + (x2 - x1) * .18;
    route.setAttribute('d', `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`);
    const len = route.getTotalLength();
    route.classList.remove('draw'); route.style.setProperty('--len', len);
    route.getBoundingClientRect();
    route.classList.add('draw');
    $('#r-miles').textContent = miles(a, b);
    $('#r-unit').textContent = 'road miles, approx.';
    $('#r-path').textContent = `${a[0]} to ${b[0]}`;
    zone = RANK[a[3]] >= RANK[b[3]] ? a[3] : b[3];
    $('#r-status').textContent = STATUS[zone];
  }
  $('#r-status-wrap').dataset.zone = zone;
  const what = $('#r-what').value.trim();
  const dist = b && a !== b ? `about ${miles(a, b)} road miles (rough estimate)` : 'to confirm';
  const body = `Hello Serhii,\n\nI'd like a quote for a transport.\n\nPickup: ${a[0]}\nDrop-off: ${toName}\nDistance: ${dist}\nWhat it is: ${what || '(please describe)'}\n\nName:\nPhone:\nPreferred dates:\n`;
  $('#r-send').href = `mailto:quotes@royalprestigetowing.com?subject=${encodeURIComponent(`Transport request: ${a[0]} to ${toName}`)}&body=${encodeURIComponent(body)}`;
}
[from, to].forEach(s => s.addEventListener('change', update));
$('#r-what').addEventListener('input', update);
update();

/* ---------- Reveal, staggered per section. Never leaves content hidden. ---------- */
const pending = new Set();
$$('main > section').forEach(sec => {
  $$('h2, .hero__lede, .hero__actions, .intro__text, .svc li, .owner__fig, .owner__lede, .owner__why > div, .route__out, .steps li, .faq__cols > div, .close__in > *', sec)
    .forEach((n, i) => { n.classList.add('rv'); n.style.setProperty('--d', Math.min(i, 5) * 70 + 'ms'); pending.add(n); });
});
const reveal = n => { n.classList.add('in'); pending.delete(n); io.unobserve(n); };
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) reveal(e.target); }), { rootMargin: '0px 0px -6% 0px' });
pending.forEach(n => io.observe(n));
// a jump (anchor link, find-in-page, fast fling) can skip an element past the viewport: reveal everything above the fold line
function sweep() { if (!pending.size) return; const lim = innerHeight; pending.forEach(n => { if (n.getBoundingClientRect().top < lim) reveal(n); }); }
addEventListener('beforeprint', () => pending.forEach(reveal));

let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => { onScrollHeader(); sweep(); ticking = false; });
}, { passive: true });
addEventListener('hashchange', sweep);
onScrollHeader(); sweep();

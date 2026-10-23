// Concept 03 — Deck Blue. Same-treatment input, deck reel, mobile drawer, reveal. No dependencies.
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Same treatment: what you type becomes the headline and the quote button
const input = $('#t-input'), chips = $$('.treat__chips button'), out = $('#t-out');
const EMAIL = 'quotes@royalprestigetowing.com'; // placeholder — confirm with client
function setLoad(raw) {
  const val = (raw || '').replace(/\s+/g, ' ').trim() || input.placeholder;
  $('#t-v').textContent = val;
  $('#t-btn').textContent = val;
  out.style.setProperty('--n', val.length + 26);               // whole sentence length drives its size
  input.style.setProperty('--in', Math.max(11, (input.value || input.placeholder).length + 1));
  const body = `What needs moving: ${val}\nPickup (city or ZIP):\nDrop-off (city or ZIP):\nDoes it run, roll and steer?\nPreferred dates:\n\nName:\nPhone:`;
  $('#t-send').href = `mailto:${EMAIL}?subject=${encodeURIComponent('Quote request: ' + val)}&body=${encodeURIComponent(body)}`;
  chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.v === raw)));
}
input.addEventListener('input', () => setLoad(input.value));
chips.forEach(c => c.addEventListener('click', () => { input.value = c.dataset.v; setLoad(c.dataset.v); }));
setLoad('');

// ---- One open item at a time in "What goes on the deck" (fallback for browsers without details[name])
$$('.carry details').forEach(d => d.addEventListener('toggle', () => {
  if (d.open) $$('.carry details').forEach(o => { if (o !== d) o.open = false; });
}));

// ---- Deck reel: arrows, counter, progress, keyboard, mouse drag
const reel = $('#reel'), items = $$('#reel li'), prev = $('#d-prev'), next = $('#d-next');
$('#d-t').textContent = items.length;
const step = () => items[0].getBoundingClientRect().width + 4;
const go = dir => reel.scrollBy({ left: dir * step(), behavior: reduced() ? 'auto' : 'smooth' });
prev.addEventListener('click', () => go(-1));
next.addEventListener('click', () => go(1));
reel.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  if (e.key === 'Home') { e.preventDefault(); reel.scrollTo({ left: 0 }); }
  if (e.key === 'End') { e.preventDefault(); reel.scrollTo({ left: reel.scrollWidth }); }
});
function syncReel() {
  const max = reel.scrollWidth - reel.clientWidth;
  const atEnd = reel.scrollLeft >= max - 4;
  const n = atEnd ? items.length : Math.min(items.length, Math.round(reel.scrollLeft / step()) + 1);
  $('#d-n').textContent = n;
  prev.disabled = reel.scrollLeft <= 4;
  next.disabled = atEnd;
  const visible = reel.clientWidth / reel.scrollWidth;
  $('#d-bar').style.setProperty('--p', Math.min(100, (visible + (max > 0 ? reel.scrollLeft / max : 1) * (1 - visible)) * 100) + '%');
}
reel.addEventListener('scroll', syncReel, { passive: true });
addEventListener('resize', syncReel);
syncReel();
// mouse drag (touch already scrolls natively)
let drag = null;
reel.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; drag = { x: e.clientX, l: reel.scrollLeft, moved: false }; });
addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 4) { drag.moved = true; reel.classList.add('is-drag'); } reel.scrollLeft = drag.l - dx; });
addEventListener('pointerup', () => { if (!drag) return; const moved = drag.moved; drag = null; reel.classList.remove('is-drag'); if (moved) { const i = Math.round(reel.scrollLeft / step()); reel.scrollTo({ left: i * step(), behavior: reduced() ? 'auto' : 'smooth' }); } });

// ---- Mobile dock + drawer
const mb = $('.dock__menu'), drawer = $('#drawer');
let scrim = null;
function setDrawer(open) {
  mb.setAttribute('aria-expanded', String(open));
  mb.textContent = open ? 'Close' : 'Menu';
  drawer.hidden = !open;
  if (open) {
    scrim = document.createElement('div'); scrim.className = 'drawer-scrim';
    scrim.addEventListener('click', () => setDrawer(false));
    document.body.appendChild(scrim);
    $('nav a', drawer).focus({ preventScroll: true });
  } else if (scrim) { scrim.remove(); scrim = null; }
}
mb.addEventListener('click', () => setDrawer(mb.getAttribute('aria-expanded') !== 'true'));
$$('#drawer a').forEach(a => a.addEventListener('click', () => setDrawer(false)));
addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) { setDrawer(false); mb.focus(); } });

// ---- Reveal (never leaves content hidden)
const sel = 'h2, .treat__head p, .treat__label, .treat__field, .treat__chips, .treat__out, .treat__grid > *, .carry details, .exo__pic, .exo__copy > *, .serhii__copy > *, .serhii__pic, .area__list li, .area__note, .how__route li, .faq__list, .last > *';
if (!reduced() && 'IntersectionObserver' in window) {
  $$('main > section:not(.mono)').forEach(sec => $$(sel, sec).forEach((n, i) => { n.classList.add('rv'); n.style.setProperty('--d', Math.min(i, 5) * 60 + 'ms'); }));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -4% 0px' });
  $$('.rv').forEach(n => io.observe(n));
  // anchor jumps and fast scrolling: anything above the fold line is shown at once
  const sweep = () => $$('.rv:not(.in)').forEach(n => { if (n.getBoundingClientRect().top < innerHeight) n.classList.add('in'); });
  addEventListener('hashchange', () => setTimeout(sweep, 60));
  addEventListener('scrollend', sweep);
  addEventListener('beforeprint', () => $$('.rv').forEach(n => n.classList.add('in')));
}

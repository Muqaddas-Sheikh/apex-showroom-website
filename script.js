
// ── CURSOR ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  }, 60);
});
document.querySelectorAll('a,button,.car-card,.brand-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='18px'; cursor.style.height='18px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='10px'; cursor.style.height='10px'; });
});

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 60);
});

// ── MOBILE MENU ──
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mobDrawer');
hbg.addEventListener('click', () => {
  hbg.classList.toggle('open');
  mob.classList.toggle('open');
});
function closeMob() {
  hbg.classList.remove('open');
  mob.classList.remove('open');
}

// ── HERO SLIDER ──
let slide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.hero-dot');

function goSlide(n) {
  slides[slide].classList.remove('active');
  dots[slide].classList.remove('active');
  slide = n;
  slides[slide].classList.add('active');
  dots[slide].classList.add('active');
}
setInterval(() => goSlide((slide + 1) % slides.length), 5000);

// ── CAROUSEL ──
const track  = document.getElementById('carTrack');
const cards  = track.querySelectorAll('.car-card');
let carIdx   = 0;
let perView  = window.innerWidth > 960 ? 3 : window.innerWidth > 600 ? 1.5 : 1.1;

function getPerView() {
  return window.innerWidth > 960 ? 3 : window.innerWidth > 600 ? 1.5 : 1.1;
}

function updateCarousel() {
  perView = getPerView();
  const w = track.parentElement.offsetWidth;
  const cardW = w / perView;
  cards.forEach(c => { c.style.minWidth = cardW - 20 + 'px'; });
  track.style.transform = `translateX(-${carIdx * (cardW)}px)`;
}

document.getElementById('nextBtn').addEventListener('click', () => {
  const max = cards.length - Math.floor(getPerView());
  if (carIdx < max) { carIdx++; updateCarousel(); }
});
document.getElementById('prevBtn').addEventListener('click', () => {
  if (carIdx > 0) { carIdx--; updateCarousel(); }
});

window.addEventListener('resize', () => { carIdx = 0; updateCarousel(); });
updateCarousel();

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

// ── COUNTER ANIMATION ──
const targets = [{ id:'s1', val:500 }, { id:'s2', val:12 }, { id:'s3', val:25 }, { id:'s4', val:26 }];
let counted = false;
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !counted) {
      counted = true;
      targets.forEach(t => {
        const el = document.getElementById(t.id);
        let current = 0;
        const step = t.val / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= t.val) { el.textContent = t.val; clearInterval(timer); }
          else el.textContent = Math.floor(current);
        }, 20);
      });
    }
  });
}, { threshold: 0.5 });
const statBar = document.querySelector('.stats-bar');
if (statBar) statsObs.observe(statBar);

// ── CONTACT FORM ──
function handleSubmit() {
  const btn = document.getElementById('submitBtn');
  const msg = document.getElementById('formMsg');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '.7';
  setTimeout(() => {
    msg.style.display = 'block';
    btn.textContent = 'Sent';
    btn.style.background = '#1a6e1a';
  }, 1200);
}
// ── Navbar scroll effect ───────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Hamburger menu ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Reveal on scroll ───────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((el, idx) => {
        if (el === entry.target) delay = idx * 80;
      });
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Circuit timeline nodes (Experience + Competitions) ───────
document.querySelectorAll('.company-btn, .title-btn, button.circuit-node').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.circuit-item');
    const expanded = item.classList.toggle('expanded');
    item.querySelectorAll('.company-btn, .title-btn, button.circuit-node')
      .forEach(b => b.setAttribute('aria-expanded', expanded));
  });
});

// ── Terminal-style typing headings ───────────────────────────
function typeHeading(el) {
  const text = el.dataset.text || '';
  const speed = 45;
  let i = 0;
  (function step() {
    el.textContent = text.slice(0, i);
    if (i <= text.length) {
      i++;
      setTimeout(step, speed);
    }
  })();
}

const typeTargets = document.querySelectorAll('.type-text');
typeTargets.forEach(el => {
  el.dataset.text = el.dataset.text || el.textContent;
  el.textContent = '';
});

const typeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typeHeading(entry.target);
      typeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

typeTargets.forEach(el => typeObserver.observe(el));

// ── Active nav link highlight ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a:not(.btn-nav)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

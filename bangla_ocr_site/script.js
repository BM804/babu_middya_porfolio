/* ═══════════════════════════════════════════════
   BENGALI HANDWRITTEN OCR — PROJECT WEBSITE
   script.js
═══════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   1. NAVBAR — scroll shrink + mobile toggle
───────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('topBtn').style.display =
    window.scrollY > 400 ? 'block' : 'none';
});

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

/* ─────────────────────────────────────────────
   2. SMOOTH SCROLL for all anchor links
───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─────────────────────────────────────────────
   3. TOP BUTTON
───────────────────────────────────────────── */
document.getElementById('topBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─────────────────────────────────────────────
   4. SCROLL REVEAL
───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings
      const siblings = [...entry.target.parentElement.children]
        .filter(el => el.classList.contains('reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────────
   5. ANIMATED COUNTER (hero stats)
───────────────────────────────────────────── */
function animateCounter(el, target, duration = 1600) {
  let start = 0;
  const step = target / (duration / 16);
  const update = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start);
    if (start < target) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.hstat-num').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target), 1800);
      });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

/* ─────────────────────────────────────────────
   6. CHARACTER GRID — hero visual
───────────────────────────────────────────── */
const bengaliChars = [
  'ক','খ','গ','ঘ','ঙ',
  'চ','ছ','জ','ঝ','ঞ',
  'ট','ঠ','ড','ঢ','ণ',
  'ত','থ','দ','ধ','ন',
  'প','ফ','ব','ভ','ম',
  'য','র','ল','শ','ষ',
  'স','হ','ড়','ঢ়','য়',
  '০','১','২','৩','৪',
  '৫','৬','৭','৮','৯',
];

const grid = document.getElementById('charGrid');
if (grid) {
  bengaliChars.slice(0, 40).forEach((ch, i) => {
    const cell = document.createElement('div');
    cell.className = 'char-cell';
    cell.textContent = ch;
    cell.style.animationDelay = `${i * 40}ms`;
    cell.style.animationFillMode = 'forwards';
    // random accent on some cells
    if (i % 7 === 0) {
      cell.style.background = 'rgba(56,189,248,0.08)';
      cell.style.borderColor = 'rgba(56,189,248,0.3)';
    }
    grid.appendChild(cell);
  });

  // Cycle random cells with a glowing highlight
  setInterval(() => {
    const cells = grid.querySelectorAll('.char-cell');
    const idx = Math.floor(Math.random() * cells.length);
    const cell = cells[idx];
    cell.style.background    = 'rgba(56,189,248,0.18)';
    cell.style.borderColor   = 'rgba(56,189,248,0.6)';
    cell.style.color         = '#fff';
    cell.style.boxShadow     = '0 0 15px rgba(56,189,248,0.4)';
    setTimeout(() => {
      cell.style.background  = '';
      cell.style.borderColor = '';
      cell.style.color       = '';
      cell.style.boxShadow   = '';
    }, 700);
  }, 300);
}

/* ─────────────────────────────────────────────
   7. SVG RING PROGRESS ANIMATION (results)
───────────────────────────────────────────── */
const circumference = 2 * Math.PI * 42; // r=42 → 263.9

function animateRings() {
  const rings = [
    { id: 'ring1', pct: 95 },
    { id: 'ring2', pct: 90 },
    { id: 'ring3', pct: 80 },
    { id: 'ring4', pct: 99 },
  ];
  rings.forEach(({ id, pct }, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => {
      const offset = circumference - (pct / 100) * circumference;
      el.style.strokeDashoffset = offset;
    }, i * 150);
  });
}

const resultsSection = document.getElementById('results');
if (resultsSection) {
  const ringObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateRings();
        ringObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  ringObserver.observe(resultsSection);
}

/* ─────────────────────────────────────────────
   8. ACTIVE NAV LINK highlight on scroll
───────────────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--teal)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ─────────────────────────────────────────────
   9. IMAGE LIGHTBOX (click to zoom graphs)
───────────────────────────────────────────── */
function createLightbox() {
  const box = document.createElement('div');
  box.id = 'lightbox';
  box.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.92);
    display:none;align-items:center;justify-content:center;
    cursor:zoom-out;backdrop-filter:blur(8px);
  `;
  const img = document.createElement('img');
  img.style.cssText = `
    max-width:90vw;max-height:90vh;
    border-radius:12px;
    box-shadow:0 0 60px rgba(0,0,0,0.8);
    transition:transform 0.3s ease;
  `;
  box.appendChild(img);
  document.body.appendChild(box);

  box.addEventListener('click', () => {
    box.style.display = 'none';
    document.body.style.overflow = '';
  });

  return { box, img };
}

const { box: lightbox, img: lightboxImg } = createLightbox();

document.querySelectorAll('.graph-card img, .demo-img img, .vscode-wrap img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src        = img.src;
    lightboxImg.alt        = img.alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

// close with ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
});

/* ─────────────────────────────────────────────
   10. COPY CODE BUTTON
───────────────────────────────────────────── */
document.querySelectorAll('.code-block').forEach(block => {
  const btn = document.createElement('button');
  btn.textContent = 'Copy';
  btn.style.cssText = `
    position:absolute;top:10px;right:10px;
    background:rgba(56,189,248,0.15);
    color:var(--teal);
    border:1px solid rgba(56,189,248,0.3);
    border-radius:6px;
    padding:4px 12px;font-size:11px;font-weight:600;
    cursor:pointer;transition:all 0.3s;
    font-family:'DM Sans',sans-serif;letter-spacing:0.5px;
  `;
  btn.addEventListener('mouseenter', () => {
    btn.style.background = 'rgba(56,189,248,0.25)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.background = 'rgba(56,189,248,0.15)';
  });
  btn.addEventListener('click', () => {
    const code = block.querySelector('pre')?.innerText || '';
    navigator.clipboard.writeText(code.trim()).then(() => {
      btn.textContent = '✓ Copied!';
      btn.style.color = '#22c55e';
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.style.color = 'var(--teal)';
      }, 2000);
    });
  });
  block.style.position = 'relative';
  block.appendChild(btn);
});

/* ─────────────────────────────────────────────
   11. PAGE LOAD fade-in
───────────────────────────────────────────── */
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

/* ─────────────────────────────────────────────
   12. DATASET SPLIT BAR — animate on view
───────────────────────────────────────────── */
const splitBar = document.querySelector('.split-bar');
if (splitBar) {
  const splitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const segs = splitBar.querySelectorAll('.split-seg');
        segs.forEach(seg => {
          const target = seg.style.width;
          seg.style.width = '0%';
          seg.style.transition = 'width 1s ease';
          setTimeout(() => { seg.style.width = target; }, 100);
        });
        splitObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  splitObserver.observe(splitBar);
}

console.log('%c Bengali Handwritten OCR | github.com/BM804 ', 
  'background:#38bdf8;color:#000;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:6px;');

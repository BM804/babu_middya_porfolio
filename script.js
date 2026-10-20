// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Scale cursor on interactive elements
document.querySelectorAll('a, button, .skill-box, .mini-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.8)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
});


// ===== TYPING ANIMATION =====
const words = [
  "Babu Middya",
  "AI/ML Engineer",
  "Manual & Automation Tester",
  "QA Engineer",
  "Full Stack Developer",
  "Python Developer",
  "Django Developer",
  "ML Enthusiast",
  "Data Analyst",
  "Problem Solver",
  "Future Engineer 🚀"
];

let i = 0;
const typingEl = document.getElementById("typingText");

function typeWord() {
  const word = words[i];
  typingEl.style.opacity = '0';
  typingEl.style.transform = 'translateY(10px)';
  typingEl.style.transition = 'none';

  setTimeout(() => {
    typingEl.innerText = word;
    typingEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    typingEl.style.opacity = '1';
    typingEl.style.transform = 'translateY(0)';
  }, 200);

  i = (i + 1) % words.length;
}

typeWord();
setInterval(typeWord, 2500);


// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// ===== MOBILE NAV =====
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const closeBtn = document.getElementById('closeBtn');

menuBtn.addEventListener('click', () => {
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeMobileNav);


// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


// ===== TOP BUTTON =====
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  topBtn.style.alignItems = 'center';
  topBtn.style.justifyContent = 'center';
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#00d4ff';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


// ===== SMOOTH HOVER for cards =====
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

'use strict';
AOS.init({
  duration: 700,
  once: true,
  easing: 'ease-out-cubic',
  offset: 60,
});
const LIGHT_PROFILE = 'light-profile.jpg';  
const DARK_PROFILE  = 'dark-profile.jpg';   
const htmlEl      = document.documentElement;
const desktopToggle = document.getElementById('desktopThemeToggle');
const mobileToggle  = document.getElementById('mobileThemeToggle');
const desktopLabel  = document.getElementById('desktopThemeLabel');
const mobileLabel   = document.getElementById('mobileThemeLabel');
const profileImgs = [
  document.getElementById('desktopProfileImg'),
  document.getElementById('mobileProfileImg'),
  document.getElementById('heroProfileImg'),
].filter(Boolean);
function applyTheme(dark, save = true) {
  if (dark) {
    htmlEl.setAttribute('data-theme', 'dark');
    if (desktopToggle) desktopToggle.checked = true;
    if (mobileToggle)  mobileToggle.checked  = true;
    if (desktopLabel)  desktopLabel.textContent = 'Dark Mode';
    if (mobileLabel)   mobileLabel.textContent  = 'Dark Mode';
    profileImgs.forEach(img => { if (img) img.src = DARK_PROFILE; });
  } else {
    htmlEl.setAttribute('data-theme', 'light');
    if (desktopToggle) desktopToggle.checked = false;
    if (mobileToggle)  mobileToggle.checked  = false;
    if (desktopLabel)  desktopLabel.textContent = 'Light Mode';
    if (mobileLabel)   mobileLabel.textContent  = 'Light Mode';
    profileImgs.forEach(img => { if (img) img.src = LIGHT_PROFILE; });
  }
  if (save) localStorage.setItem('theme', dark ? 'dark' : 'light');
}
(function initTheme() {
  const saved = localStorage.getItem('theme');
  applyTheme(saved === 'dark', false);
})();
[desktopToggle, mobileToggle].forEach(toggle => {
  if (!toggle) return;
  toggle.addEventListener('change', () => {
    applyTheme(toggle.checked);
    if (desktopToggle) desktopToggle.checked = toggle.checked;
    if (mobileToggle)  mobileToggle.checked  = toggle.checked;
  });
});
const roles = [
  'IT Student',
  'Web Developer',
  'UI/UX Enthusiast',
  'Future Full Stack Developer',
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');
function typeLoop() {
  if (!typedEl) return;
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
    setTimeout(typeLoop, charIdx === 0 ? 400 : 45);
  }
}
typeLoop();
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.sidebar-nav .nav-link, #mobile-nav .nav-link');
function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
const skillBars = document.querySelectorAll('.skill-bar-fill');
let skillsAnimated = false;
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      skillBars.forEach(bar => {
        const pct = bar.getAttribute('data-percent') || '0';
        bar.style.width = pct + '%';
      });
    }
  });
}, { threshold: 0.2 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);
function handleContactSubmit() {
  const name    = document.getElementById('contact-name')?.value.trim();
  const email   = document.getElementById('contact-email')?.value.trim();
  const message = document.getElementById('contact-message')?.value.trim();
  const alert   = document.getElementById('form-alert');
  const btnText    = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  if (!alert) return;
  if (!name || !email || !message) {
    alert.className = 'alert-error-custom';
    alert.textContent = 'Please fill in all fields before sending.';
    alert.style.display = 'block';
    return;
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    alert.className = 'alert-error-custom';
    alert.textContent = 'Please enter a valid email address.';
    alert.style.display = 'block';
    return;
  }
  alert.style.display = 'none';
  if (btnText)    btnText.style.display    = 'none';
  if (btnLoading) btnLoading.style.display = 'inline-flex';
  setTimeout(() => {
    if (btnText)    btnText.style.display    = 'inline-flex';
    if (btnLoading) btnLoading.style.display = 'none';
    alert.className   = 'alert-success-custom';
    alert.textContent = '✓ Message sent! I will get back to you soon.';
    alert.style.display = 'block';
    document.getElementById('contact-name').value    = '';
    document.getElementById('contact-email').value   = '';
    document.getElementById('contact-message').value = '';
  }, 1500);
}
window.addEventListener('resize', () => {
  if (window.innerWidth >= 992) {
    const offcanvas = document.getElementById('mobileSidebar');
    if (offcanvas) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  }
});

const wrap3d = document.getElementById('hero3dWrap');
if (wrap3d) {
  wrap3d.addEventListener('mousemove', e => {
    const r = wrap3d.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    wrap3d.style.transform = `translateY(0) rotateY(${x * 28}deg) rotateX(${-y * 28}deg) scale(1.06)`;
  });
  wrap3d.addEventListener('mouseleave', () => {
    wrap3d.style.transform = '';
  });
}

const scrollBar = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollBar) scrollBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (!btt) return;
  if (window.scrollY > 400) btt.classList.add('visible');
  else btt.classList.remove('visible');
}, { passive: true });
if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = -200, my = -200, rx = -200, ry = -200;
window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor() {
  if (dot)  { dot.style.left  = mx + 'px'; dot.style.top  = my + 'px'; }
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a, button, .quick-card, .glass-card, .project-grid-card, .cert-card, .interest-tag, .hero-profile-3d-wrap').forEach(el => {
  el.addEventListener('mouseenter', () => { dot?.classList.add('hovered'); ring?.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { dot?.classList.remove('hovered'); ring?.classList.remove('hovered'); });
});
document.addEventListener('mouseleave', () => { if (dot) dot.style.opacity = '0'; if (ring) ring.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { if (dot) dot.style.opacity = '1'; if (ring) ring.style.opacity = '0.6'; });

const sparkColors = ['#6a5acd','#818cf8','#a78bfa','#ec4899','#f97316','#fff'];
document.addEventListener('click', e => {
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('div');
    s.className = 'spark';
    const angle = Math.random() * Math.PI * 2;
    const dist  = 30 + Math.random() * 50;
    s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;background:${sparkColors[Math.floor(Math.random()*sparkColors.length)]};--tx:${Math.cos(angle)*dist}px;--ty:${Math.sin(angle)*dist}px;animation-duration:${0.4+Math.random()*0.4}s`;
    document.body.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  }
});

const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  for (let i = 0; i < 80; i++) {
    particles.push({ x: Math.random()*W, y: Math.random()*H, r: 1+Math.random()*2, vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4 });
  }
  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function drawParticles() {
    ctx.clearRect(0,0,W,H);
    const color = isDark() ? '129,140,248' : '106,90,205';
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${color},0.55)`;
      ctx.fill();
      particles.forEach((p2, j) => {
        if (j <= i) return;
        const dx = p.x-p2.x, dy = p.y-p2.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${color},${0.18*(1-dist/130)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      });
      const mdx = p.x-mouse.x, mdy = p.y-mouse.y;
      const md = Math.sqrt(mdx*mdx+mdy*mdy);
      if (md < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(${color},${0.35*(1-md/100)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

const codeLayer = document.getElementById('codeFloatLayer');
const snippets = [
  'const dev = () => "Eduardo";',
  'function build(idea) {',
  '  return idea + code;',
  '}',
  'git commit -m "dream"',
  '<div class="future">',
  'SELECT * FROM skills;',
  'import pandas as pd',
  'if (passion) work();',
  'border-radius: 50%;',
  '@media (max-width:768px)',
  'console.log("hello!");',
  'async function learn()',
  'npm run portfolio',
  'data-theme="dark"',
];
if (codeLayer) {
  snippets.forEach((text, i) => {
    const el = document.createElement('div');
    el.className = 'code-snippet-float';
    el.textContent = text;
    el.style.cssText = `left:${5+Math.random()*85}%;top:${100+Math.random()*100}vh;animation-duration:${18+Math.random()*14}s;animation-delay:${i*1.8}s;opacity:0;transform:rotate(${(Math.random()-.5)*8}deg)`;
    codeLayer.appendChild(el);
  });
}
(async function loadGithubStats() {
  try {
    const res = await fetch('/.netlify/functions/github-stats');
    const data = await res.json();
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('gh-repos', data.public_repos ?? '—');
    set('gh-stars', data.total_stars ?? '—');
    set('gh-followers', data.followers ?? '—');
    set('gh-forks', data.total_forks ?? '—');
  } catch(e) {}
})();
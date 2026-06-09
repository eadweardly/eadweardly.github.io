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
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  try {
    const res = await fetch('https://eadweardly.netlify.app/.netlify/functions/github-stats');
    const data = await res.json();
    set('gh-repos', data.public_repos ?? '—');
    set('gh-stars', data.total_stars ?? '—');
    set('gh-followers', data.followers ?? '—');
    set('gh-forks', data.total_forks ?? '—');
  } catch(e) {}
})();
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
  }, 2000);
});
const translations = {
  en: {
    'nav-home': 'Home', 'nav-about': 'About Me', 'nav-education': 'Education',
    'nav-skills': 'Skills', 'nav-projects': 'Projects', 'nav-certificates': 'Certificates',
    'nav-contact': 'Contact', 'hero-eyebrow': 'WELCOME TO MY PORTFOLIO',
    'hero-intro': "I'm currently studying Information Technology and building things through code. I turn ideas into simple, functional, and meaningful digital experiences.",
    'hero-hire': 'Hire Me', 'hero-cv': 'Download CV',
    'qcard-about-title': 'About Me', 'qcard-about-desc': 'Get to know more about me and my background.',
    'qcard-edu-title': 'Education', 'qcard-edu-desc': 'My academic journey and achievements.',
    'qcard-skills-title': 'Skills', 'qcard-skills-desc': 'Technologies and tools I work with.',
    'qcard-contact-title': 'Contact', 'qcard-contact-desc': "Let's connect and build something amazing.",
    'about-eyebrow': 'GET TO KNOW ME', 'about-title': 'About <span class="gradient-text">Me</span>',
    'about-quote': "I may not have started with the path I first dreamed of, but every step I take now is a step toward becoming the person I aspire to be. Passion is discovered, goals are built, and with perseverance, I will transform challenges into opportunities.",
    'about-personal-title': 'Personal Introduction',
    'about-personal-1': "To be honest, IT was never my first passion. I originally dreamed of pursuing Law, Engineering, or Medicine — but due to personal circumstances, I found myself in this course. Still, I refuse to give up on those aspirations.",
    'about-personal-2': "Over time, I've started to develop a genuine interest in IT, especially in fields like <strong>Data Science & Analytics</strong> and <strong>Artificial Intelligence & Machine Learning</strong> — areas that combine logic, creativity, innovation, and math-based tools that can shape the future.",
    'about-career-title': 'Career Goals',
    'about-career-1': "My goal is to grow into someone who can harness the power of data and intelligent systems to create meaningful impact. Whether it's uncovering insights through analytics or building smarter solutions with AI, I want to contribute to a future where <strong>technology serves humanity with purpose and grace</strong>.",
    'about-career-2': "I am currently seeking <strong>OJT / internship opportunities</strong> where I can apply my skills, grow professionally, and take meaningful steps toward that vision.",
    'about-interests-title': 'Interests', 'about-tech-title': 'Technology Interests',
    'github-title': 'GitHub Activity', 'github-btn': 'View GitHub Profile',
    'gh-label-repos': 'Repositories', 'gh-label-stars': 'Stars',
    'gh-label-followers': 'Followers', 'gh-label-forks': 'Forks',
    'edu-eyebrow': 'MY ACADEMIC PATH', 'edu-title': 'Education <span class="gradient-text">Journey</span>',
    'edu-current': 'Current',
    'edu-1-degree': 'Bachelor of Science in Information Technology',
    'edu-1-desc': 'Pursuing a comprehensive program covering software development, database systems, networking, systems analysis, and modern web technologies. Actively involved in school organizations and tech communities.',
    'edu-2-degree': 'Senior High School – STEM Track',
    'edu-2-desc': 'Completed the STEM (Science, Technology, Engineering, and Mathematics) strand, building a strong foundation in scientific reasoning, mathematics, and analytical thinking that supports future studies in data science and AI.',
    'edu-3-degree': 'Junior High School',
    'edu-3-desc': 'Completed junior high school with a growing interest in computers and technology, building a strong academic foundation across core subjects.',
    'edu-4-degree': 'Elementary Education',
    'edu-4-desc': 'Completed elementary education with a solid foundation in core subjects. Developed early curiosity in learning and problem-solving that shaped future academic interests.',
    'skills-eyebrow': 'WHAT I KNOW', 'skills-title': 'My <span class="gradient-text">Skills</span>',
    'skills-cat-frontend': 'Frontend Development', 'skills-cat-backend': 'Backend / Database',
    'skills-cat-tools': 'Tools & Platforms',
    'projects-eyebrow': "WHAT I'VE BUILT", 'projects-title': 'My <span class="gradient-text">Projects</span>',
    'proj-1-title': 'Personal Portfolio', 'proj-1-desc': 'My personal web portfolio built with HTML, CSS, and JavaScript featuring glassmorphism design and 3D effects.',
    'proj-2-title': 'Student Management System', 'proj-2-desc': 'A web-based CRUD system for managing student records with PHP and MySQL database backend.',
    'proj-3-title': 'More Coming Soon', 'proj-3-desc': 'Currently working on new projects involving data analytics, AI tools, and modern web apps. Stay tuned!',
    'certs-eyebrow': 'ACHIEVEMENTS', 'certs-title': 'Certificates & <span class="gradient-text">Awards</span>',
    'cert-1-name': 'Certified Yearning Expert', 'cert-1-issuer': 'Institute of Deep Feelings',
    'cert-2-name': 'Advanced Loyalty Practitioner', 'cert-2-issuer': 'School of Undying Devotion',
    'cert-3-name': 'Master of Faithfulness', 'cert-3-issuer': 'Academy of Eternal Trust',
    'contact-eyebrow': 'GET IN TOUCH', 'contact-title': 'Contact <span class="gradient-text">Me</span>',
    'contact-connect': "Let's Connect",
    'contact-desc': "I'm open to internship opportunities, freelance projects, collaborations, or just a friendly chat. Feel free to reach out!",
    'contact-email-label': 'Email', 'contact-loc-label': 'Location', 'contact-status-label': 'Status',
    'contact-status-val': 'Open for OJT / Internship',
    'contact-social': 'Social Links', 'contact-send-title': 'Send a Message',
    'form-name-label': 'Your Name', 'form-email-label': 'Email Address', 'form-msg-label': 'Message',
    'form-send-btn': '<i class="bi bi-send-fill me-2"></i>Send Message',
    'footer-text': '© 2026 <strong>Eduardo Charles Florencio Guevarra</strong> · Built with <i class="bi bi-heart-fill text-accent"></i> Love',
    'sidebar-connect': "Let's connect", 'theme-light': 'Light Mode', 'theme-dark': 'Dark Mode',
  },
  fil: {
    'nav-home': 'Home', 'nav-about': 'Tungkol Sa Akin', 'nav-education': 'Edukasyon',
    'nav-skills': 'Mga Kakayahan', 'nav-projects': 'Mga Proyekto', 'nav-certificates': 'Mga Sertipiko',
    'nav-contact': 'Makipag-Ugnayan', 'hero-eyebrow': 'MALIGAYANG PAGDATING SA AKING PORTFOLIO',
    'hero-intro': "Kasalukuyan akong nag-aaral ng Information Technology at nagtatayo ng mga bagay sa pamamagitan ng code. Ginagawa kong simple, functional, at makabuluhang digital na karanasan ang mga ideya.",
    'hero-hire': 'Hire Mo Ako', 'hero-cv': 'I-download ang CV',
    'qcard-about-title': 'Tungkol Sa Akin', 'qcard-about-desc': 'Alamin pa ang tungkol sa akin at sa aking background.',
    'qcard-edu-title': 'Edukasyon', 'qcard-edu-desc': 'Ang aking landas sa paaralan at mga nagawa.',
    'qcard-skills-title': 'Mga Kakayahan', 'qcard-skills-desc': 'Mga teknolohiya at kagamitang ginagamit ko.',
    'qcard-contact-title': 'Makipag-Ugnayan', 'qcard-contact-desc': 'Makipag-ugnayan tayo at gumawa ng maganda.',
    'about-eyebrow': 'ALAMIN AKO', 'about-title': 'Tungkol <span class="gradient-text">Sa Akin</span>',
    'about-quote': "Maaaring hindi ko nasimulan ang landas na una kong pinapangarap, ngunit bawat hakbang na ginagawa ko ngayon ay isang hakbang patungo sa pagiging taong nais kong maging. Ang pagmamahal ay natatagpuan, ang mga pangarap ay itinatatag, at sa pamamagitan ng tiyaga, gagawin kong pagkakataon ang mga hamon.",
    'about-personal-title': 'Personal na Pagpapakilala',
    'about-personal-1': "Sa totoo lang, hindi IT ang unang hilig ko. Orihinal akong nangangarap na maging abogado, inhinyero, o doktor — ngunit dahil sa personal na mga pangyayari, narating ko ang kursong ito. Gayunpaman, hindi ko susuko sa mga pangarap na iyon.",
    'about-personal-2': "Sa paglipas ng panahon, nagsimula akong magkaroon ng tunay na interes sa IT, lalo na sa <strong>Data Science & Analytics</strong> at <strong>Artificial Intelligence & Machine Learning</strong> — mga larangang pinagsama ang lohika, pagkamalikhain, inobasyon, at mga kagamitang batay sa matematika na humuhubog sa kinabukasan.",
    'about-career-title': 'Mga Layunin sa Karera',
    'about-career-1': "Ang aking layunin ay lumago bilang isang taong makagagamit ng kapangyarihan ng data at matalinong sistema para lumikha ng makabuluhang epekto. Kung ito man ay paghahanap ng mga kaalaman sa pamamagitan ng analytics o pagbuo ng mas matalinong solusyon gamit ang AI, nais kong mag-ambag sa isang kinabukasan kung saan <strong>ang teknolohiya ay nagsisilbi sa sangkatauhan nang may layunin at kagandahang-loob</strong>.",
    'about-career-2': "Kasalukuyan akong naghahanap ng <strong>OJT / mga pagkakataon sa internship</strong> kung saan maaari kong gamitin ang aking mga kasanayan, lumago nang propesyonal, at gumawa ng makabuluhang hakbang patungo sa bisyong iyon.",
    'about-interests-title': 'Mga Interes', 'about-tech-title': 'Mga Interes sa Teknolohiya',
    'github-title': 'GitHub na Aktibidad', 'github-btn': 'Tingnan ang GitHub Profile',
    'gh-label-repos': 'Mga Repository', 'gh-label-stars': 'Mga Bituin',
    'gh-label-followers': 'Mga Tagasunod', 'gh-label-forks': 'Mga Fork',
    'edu-eyebrow': 'AKING LANDAS SA PAARALAN', 'edu-title': 'Paglalakbay sa <span class="gradient-text">Edukasyon</span>',
    'edu-current': 'Kasalukuyan',
    'edu-1-degree': 'Bachelor of Science in Information Technology',
    'edu-1-desc': 'Nagtatahak ng komprehensibong programa na sumasaklaw sa software development, database systems, networking, systems analysis, at modernong web technologies. Aktibong kalahok sa mga organisasyon ng paaralan at tech communities.',
    'edu-2-degree': 'Senior High School – STEM Track',
    'edu-2-desc': 'Natapos ang STEM (Science, Technology, Engineering, and Mathematics) strand, nagtatag ng matibay na pundasyon sa siyentipikong pag-iisip, matematika, at analytical thinking na sumusuporta sa mga pag-aaral sa data science at AI.',
    'edu-3-degree': 'Junior High School',
    'edu-3-desc': 'Natapos ang junior high school na may lumalaking interes sa mga computer at teknolohiya, nagtatag ng matibay na pundasyon sa mga pangunahing asignatura.',
    'edu-4-degree': 'Elementary Education',
    'edu-4-desc': 'Natapos ang elementarya na may matibay na pundasyon sa mga pangunahing asignatura. Nagpaunlad ng maagang kuryosidad sa pag-aaral at paglutas ng problema na humubog sa mga interes sa pag-aaral sa hinaharap.',
    'skills-eyebrow': 'ANG AKING MGA KAALAMAN', 'skills-title': 'Aking mga <span class="gradient-text">Kakayahan</span>',
    'skills-cat-frontend': 'Frontend Development', 'skills-cat-backend': 'Backend / Database',
    'skills-cat-tools': 'Mga Kagamitan at Platform',
    'projects-eyebrow': 'MGA GINAWA KO', 'projects-title': 'Aking mga <span class="gradient-text">Proyekto</span>',
    'proj-1-title': 'Personal na Portfolio', 'proj-1-desc': 'Ang aking personal na web portfolio na ginawa gamit ang HTML, CSS, at JavaScript na may glassmorphism design at 3D effects.',
    'proj-2-title': 'Student Management System', 'proj-2-desc': 'Isang web-based CRUD system para sa pamamahala ng mga rekord ng mag-aaral gamit ang PHP at MySQL database backend.',
    'proj-3-title': 'Marami Pang Darating', 'proj-3-desc': 'Kasalukuyang nagtatrabaho sa mga bagong proyekto na may kinalaman sa data analytics, AI tools, at modernong web apps. Abangan!',
    'certs-eyebrow': 'MGA NAGAWA', 'certs-title': 'Mga Sertipiko at <span class="gradient-text">Parangal</span>',
    'cert-1-name': 'Certified Yearning Expert', 'cert-1-issuer': 'Institute of Deep Feelings',
    'cert-2-name': 'Advanced Loyalty Practitioner', 'cert-2-issuer': 'School of Undying Devotion',
    'cert-3-name': 'Master of Faithfulness', 'cert-3-issuer': 'Academy of Eternal Trust',
    'contact-eyebrow': 'MAKIPAG-UGNAYAN', 'contact-title': 'Makipag-<span class="gradient-text">Usap</span>',
    'contact-connect': 'Makipag-Ugnayan',
    'contact-desc': "Bukas ako sa mga internship, freelance na proyekto, kolaborasyon, o simpleng pakikipag-usap. Huwag kang mahiyang makipag-ugnayan!",
    'contact-email-label': 'Email', 'contact-loc-label': 'Lokasyon', 'contact-status-label': 'Katayuan',
    'contact-status-val': 'Bukas para sa OJT / Internship',
    'contact-social': 'Mga Social Link', 'contact-send-title': 'Magpadala ng Mensahe',
    'form-name-label': 'Iyong Pangalan', 'form-email-label': 'Email Address', 'form-msg-label': 'Mensahe',
    'form-send-btn': '<i class="bi bi-send-fill me-2"></i>Ipadala',
    'footer-text': '© 2026 <strong>Eduardo Charles Florencio Guevarra</strong> · Ginawa nang may <i class="bi bi-heart-fill text-accent"></i> Pagmamahal',
    'sidebar-connect': 'Makipag-ugnayan', 'theme-light': 'Light Mode', 'theme-dark': 'Dark Mode',
  }
};

function setLang(lang) {
  const t = translations[lang];
  if (!t) return;
  const s = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined) el.innerHTML = val; };
  const q = (sel, val) => { const el = document.querySelector(sel); if (el && val !== undefined) el.innerHTML = val; };
  const all = (sel, val) => { document.querySelectorAll(sel).forEach(el => { if (val !== undefined) el.innerHTML = val; }); };

  s('hero-eyebrow-el', t['hero-eyebrow']);
  s('hero-intro-el', t['hero-intro']);
  s('hero-hire-btn', t['hero-hire']);
  s('hero-cv-btn', t['hero-cv']);
  s('qcard-about-title', t['qcard-about-title']); s('qcard-about-desc', t['qcard-about-desc']);
  s('qcard-edu-title', t['qcard-edu-title']); s('qcard-edu-desc', t['qcard-edu-desc']);
  s('qcard-skills-title', t['qcard-skills-title']); s('qcard-skills-desc', t['qcard-skills-desc']);
  s('qcard-contact-title', t['qcard-contact-title']); s('qcard-contact-desc', t['qcard-contact-desc']);
  s('about-eyebrow-el', t['about-eyebrow']); s('about-title-el', t['about-title']);
  s('about-quote-el', t['about-quote']);
  s('about-personal-title-el', t['about-personal-title']);
  s('about-personal-1-el', t['about-personal-1']); s('about-personal-2-el', t['about-personal-2']);
  s('about-career-title-el', t['about-career-title']);
  s('about-career-1-el', t['about-career-1']); s('about-career-2-el', t['about-career-2']);
  s('about-interests-title-el', t['about-interests-title']); s('about-tech-title-el', t['about-tech-title']);
  s('github-title-el', t['github-title']); s('github-btn-el', t['github-btn']);
  s('gh-label-repos', t['gh-label-repos']); s('gh-label-stars', t['gh-label-stars']);
  s('gh-label-followers', t['gh-label-followers']); s('gh-label-forks', t['gh-label-forks']);
  s('edu-eyebrow-el', t['edu-eyebrow']); s('edu-title-el', t['edu-title']);
  document.querySelectorAll('.edu-current-badge').forEach(el => el.innerHTML = t['edu-current']);
  s('edu-1-degree-el', t['edu-1-degree']); s('edu-1-desc-el', t['edu-1-desc']);
  s('edu-2-degree-el', t['edu-2-degree']); s('edu-2-desc-el', t['edu-2-desc']);
  s('edu-3-degree-el', t['edu-3-degree']); s('edu-3-desc-el', t['edu-3-desc']);
  s('edu-4-degree-el', t['edu-4-degree']); s('edu-4-desc-el', t['edu-4-desc']);
  s('skills-eyebrow-el', t['skills-eyebrow']); s('skills-title-el', t['skills-title']);
  s('skills-cat-frontend-el', t['skills-cat-frontend']); s('skills-cat-backend-el', t['skills-cat-backend']);
  s('skills-cat-tools-el', t['skills-cat-tools']);
  s('projects-eyebrow-el', t['projects-eyebrow']); s('projects-title-el', t['projects-title']);
  s('proj-1-title-el', t['proj-1-title']); s('proj-1-desc-el', t['proj-1-desc']);
  s('proj-2-title-el', t['proj-2-title']); s('proj-2-desc-el', t['proj-2-desc']);
  s('proj-3-title-el', t['proj-3-title']); s('proj-3-desc-el', t['proj-3-desc']);
  s('certs-eyebrow-el', t['certs-eyebrow']); s('certs-title-el', t['certs-title']);
  s('cert-1-name-el', t['cert-1-name']); s('cert-1-issuer-el', t['cert-1-issuer']);
  s('cert-2-name-el', t['cert-2-name']); s('cert-2-issuer-el', t['cert-2-issuer']);
  s('cert-3-name-el', t['cert-3-name']); s('cert-3-issuer-el', t['cert-3-issuer']);
  s('contact-eyebrow-el', t['contact-eyebrow']); s('contact-title-el', t['contact-title']);
  s('contact-connect-el', t['contact-connect']); s('contact-desc-el', t['contact-desc']);
  s('contact-email-label-el', t['contact-email-label']); s('contact-loc-label-el', t['contact-loc-label']);
  s('contact-status-label-el', t['contact-status-label']); s('contact-status-val-el', t['contact-status-val']);
  s('contact-social-el', t['contact-social']); s('contact-send-title-el', t['contact-send-title']);
  s('form-name-label-el', t['form-name-label']); s('form-email-label-el', t['form-email-label']);
  s('form-msg-label-el', t['form-msg-label']); s('btn-text', t['form-send-btn']);
  s('footer-text-el', t['footer-text']);
  document.querySelectorAll('.sidebar-connect-el').forEach(el => el.innerHTML = t['sidebar-connect']);
  document.querySelectorAll('.nav-link-about').forEach(el => el.childNodes[1].textContent = ' ' + t['nav-about']);
  document.querySelectorAll('.nav-link-edu').forEach(el => el.childNodes[1].textContent = ' ' + t['nav-education']);
  document.querySelectorAll('.nav-link-skills').forEach(el => el.childNodes[1].textContent = ' ' + t['nav-skills']);
  document.querySelectorAll('.nav-link-projects').forEach(el => el.childNodes[1].textContent = ' ' + t['nav-projects']);
  document.querySelectorAll('.nav-link-certs').forEach(el => el.childNodes[1].textContent = ' ' + t['nav-certificates']);
  document.querySelectorAll('.nav-link-contact').forEach(el => el.childNodes[1].textContent = ' ' + t['nav-contact']);
  document.getElementById('btnEN')?.classList.toggle('active', lang === 'en');
  document.getElementById('btnFIL')?.classList.toggle('active', lang === 'fil');
  localStorage.setItem('lang', lang);
}
(function initLang() {
  const saved = localStorage.getItem('lang') || 'en';
  setLang(saved);
})();
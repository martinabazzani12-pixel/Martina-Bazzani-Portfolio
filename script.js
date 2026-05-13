/* ============================================================
   MARTINA BAZZANI — PORTFOLIO 2026
   script.js — Condiviso tra tutte le pagine
   ============================================================ */

/* ===== CUSTOM CURSOR ===== */
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Ring follows with smooth lerp
  function lerpRing() {
    const ease = 0.12;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    raf = requestAnimationFrame(lerpRing);
  }
  lerpRing();

  // Hover state on interactive elements
  const hoverEls = 'a, button, .work-card, .soft-card, .project-row, [role="button"]';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();

/* tema fisso: dark */

/* ===== HAMBURGER MENU ===== */
(function initHamburger() {
  const hamburger = document.querySelector('.nav__hamburger');
  const overlay   = document.querySelector('.nav__overlay');
  if (!hamburger || !overlay) return;

  function toggle(open) {
    hamburger.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('open');
    toggle(!isOpen);
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggle(false);
  });
})();

/* ===== NAV BORDER ON SCROLL ===== */
(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const update = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ===== ACTIVE NAV LINK ===== */
(function initActiveLink() {
  const path    = window.location.pathname.split('/').pop() || 'index.html';
  const current = path === '' ? 'index.html' : path;
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ===== SCROLL REVEAL ===== */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ===== SOFT SKILLS POP ANIMATION (about page) ===== */
(function initTagPop() {
  const tags = document.querySelectorAll('.tag-pop');
  if (!tags.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('tag-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

  tags.forEach(tag => observer.observe(tag));
})();

/* ===== SKILL BAR ANIMATION ===== */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-item__bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // small delay per item for stagger
        const idx = Array.from(bars).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

/* ===== FLOATING PREVIEW (Progetti page) ===== */
(function initFloatingPreview() {
  const preview = document.querySelector('.floating-preview');
  const rows    = document.querySelectorAll('.project-row');
  if (!preview || !rows.length) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let animating = false;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    currentX = lerp(currentX, targetX, 0.1);
    currentY = lerp(currentY, targetY, 0.1);
    preview.style.left = (currentX + 20) + 'px';
    preview.style.top  = (currentY - preview.offsetHeight / 2) + 'px';
    if (animating) requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      animating = true;
      preview.classList.add('visible');
      requestAnimationFrame(animate);
    });
    row.addEventListener('mouseleave', () => {
      preview.classList.remove('visible');
      // don't stop raf immediately — let it settle
      setTimeout(() => { animating = false; }, 400);
    });
  });
})();

/* ===== SMOOTH SCROLL (anchor links) ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== PDF CARDS (Altri Progetti) ===== */
document.querySelectorAll('.altri-card[data-pdf]').forEach(card => {
  card.addEventListener('click', e => {
    const pdf = card.getAttribute('data-pdf');
    if (pdf) {
      e.preventDefault();
      window.open(pdf, '_blank', 'noopener');
    }
  });
});


/* ===== ICON ITEMS — staggered reveal ===== */
(function initIconReveal() {
  const items = document.querySelectorAll('.icon-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
})();

/* ===== IMAGE PARALLAX REVEAL (project pages) ===== */
(function initImgReveal() {
  const imgObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        imgObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.img-full, .img-item').forEach(el => imgObs.observe(el));
})();


/* ===== SCROLL BUTTONS (top / bottom) ===== */
(function initScrollBtns() {
  var btnTop    = document.getElementById('btn-top');
  var btnBottom = document.getElementById('btn-bottom');
  if (!btnTop || !btnBottom) return;

  function show(el) { el.style.opacity = '1'; el.style.pointerEvents = 'all'; }
  function hide(el) { el.style.opacity = '0'; el.style.pointerEvents = 'none'; }

  function checkScroll() {
    var scrolled  = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (scrolled > 10) { show(btnTop); } else { hide(btnTop); }
    if (scrolled < maxScroll - 10) { show(btnBottom); } else { hide(btnBottom); }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  btnTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  btnBottom.addEventListener('click', function () {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  });
})();

/* ===== BUTTON TILT EFFECT ===== */
(function initTilt() {
  // maxRot: max rotation degrees — lower = more subtle
  function applyTilt(el, maxRot, maxScale) {
    maxRot   = maxRot   || 6;
    maxScale = maxScale || 1.03;
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width  / 2;
      var cy = rect.height / 2;
      var rotX = ((y - cy) / cy) * -maxRot;
      var rotY = ((x - cx) / cx) *  maxRot;
      el.style.transition = 'transform 0.1s ease';
      el.style.transform  = 'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(' + maxScale + ')';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
      el.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  // Bottoni normali — tilt leggero
  document.querySelectorAll('.btn, .ov-link, .pdf-open-btn').forEach(function(el) {
    applyTilt(el, 6, 1.03);
  });
  // Tasti scroll circolari — leggermente più vivaci
  document.querySelectorAll('#btn-top, #btn-bottom').forEach(function(el) {
    applyTilt(el, 8, 1.05);
  });
  // Navigazione progetto — molto sottile (elementi grandi)
  document.querySelectorAll('.proj-nav__item').forEach(function(el) {
    applyTilt(el, 3, 1.01);
  });

  // Re-apply su elementi dinamici (overlay)
  var observer = new MutationObserver(function () {
    document.querySelectorAll('.btn, .ov-link, .pdf-open-btn').forEach(function(el) {
      if (!el.dataset.tilt) { el.dataset.tilt = '1'; applyTilt(el, 6, 1.03); }
    });
    document.querySelectorAll('.proj-nav__item').forEach(function(el) {
      if (!el.dataset.tilt) { el.dataset.tilt = '1'; applyTilt(el, 3, 1.01); }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

/* ===== NAVIGAZIONE PROGETTO AUTO ===== */
(function initProjNav() {
  // ── Aggiorna qui quando aggiungi un nuovo progetto ──
  var PROJECTS = [
    { file: 're-view.html',        title: 'RE-VIEW Eyewear'   },
    { file: 'vitaelis.html',       title: 'Vitaelis'          },
    { file: 'zipeatz.html',        title: 'Zip-Eatz'          },
    { file: 'envelop.html',        title: 'Risotìn'           },
    { file: 'orso-sobrio.html',    title: 'Orso Sobrio'       },
    { file: 'progetto-6.html',     title: 'Saime'             },
    { file: 'avis.html',           title: 'Avis'              },
    { file: 'siracusa.html',       title: 'Siracusa'          },
    { file: 'fiat-topolino.html',  title: 'Fiat Topolino Rock'},
    { file: 'baci-perugina.html',  title: 'Baci Perugina Ruby'},
    { file: 'funko.html',          title: 'Funko'             },
    { file: 'acqua-e-sapone.html', title: 'Acqua & Sapone'     },
  ];

  var nav = document.querySelector('.proj-nav');
  if (!nav) return;

  var current = window.location.pathname.split('/').pop();
  var idx = PROJECTS.findIndex(function(p) { return p.file === current; });
  if (idx === -1) return;

  var prev = PROJECTS[idx - 1] || null;
  var next = PROJECTS[idx + 1] || null;

  nav.innerHTML = '';

  if (prev) {
    var a = document.createElement('a');
    a.href = prev.file;
    a.className = 'proj-nav__item proj-nav__item--prev';
    a.innerHTML = '<span class="proj-nav__sub">← Progetto Precedente</span><span class="proj-nav__title">' + prev.title + '</span>';
    nav.appendChild(a);
  } else {
    var empty = document.createElement('div');
    nav.appendChild(empty);
  }

  if (next) {
    var b = document.createElement('a');
    b.href = next.file;
    b.className = 'proj-nav__item proj-nav__item--next';
    b.innerHTML = '<span class="proj-nav__sub">Progetto Successivo →</span><span class="proj-nav__title">' + next.title + '</span>';
    nav.appendChild(b);
  }

  // Applica tilt ai nuovi elementi
  nav.querySelectorAll('.proj-nav__item').forEach(function(el) {
    el.dataset.tilt = '1';
    (function applyTilt(el) {
      el.addEventListener('mousemove', function(e) {
        var rect = el.getBoundingClientRect();
        var rotX = (((e.clientY - rect.top) / rect.height) - 0.5) * -6;
        var rotY = (((e.clientX - rect.left) / rect.width) - 0.5) * 6;
        el.style.transition = 'transform 0.1s ease';
        el.style.transform = 'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.01)';
      });
      el.addEventListener('mouseleave', function() {
        el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    })(el);
  });
})();

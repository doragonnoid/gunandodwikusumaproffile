(() => {
  'use strict';

  const body = document.body;
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const ensureContactModal = () => {
    const existing = qs('#contactModal');
    if (existing) return existing;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'contactModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'contactTitle');
    modal.innerHTML = `
      <div class="modal-panel">
        <button class="modal-close" data-modal-close type="button">close</button>
        <div class="eyebrow">contact</div>
        <h2 id="contactTitle">Send a project message.</h2>
        <p>Gunakan formulir ini untuk mengirim pesan kolaborasi, proyek web, konten, atau peluang kreatif langsung ke email Gunando.</p>
        <form action="https://formsubmit.co/gunandodwik@gmail.com" class="contact-form" method="POST">
          <input name="_subject" type="hidden" value="Pesan baru dari website portfolio Gunando Dwi Kusuma">
          <input name="_template" type="hidden" value="table">
          <input name="_autoresponse" type="hidden" value="Terima kasih. Pesan Anda telah diterima melalui website portfolio Gunando Dwi Kusuma dan akan dibalas sesegera mungkin.">
          <input aria-hidden="true" autocomplete="off" class="form-honeypot" name="_honey" tabindex="-1" type="text">
          <div class="field"><label for="modalName">Nama</label><input autocomplete="name" id="modalName" name="name" required></div>
          <div class="field"><label for="modalEmail">Email</label><input autocomplete="email" id="modalEmail" name="email" required type="email"></div>
          <div class="field field--full"><label for="modalSubject">Subjek</label><input id="modalSubject" name="subject" placeholder="Website, kolaborasi, atau konten"></div>
          <div class="field field--full"><label for="modalMessage">Pesan</label><textarea id="modalMessage" name="message" required></textarea></div>
          <div class="form-actions"><span aria-live="polite" class="form-status">Pesan akan dikirim langsung ke gunandodwik@gmail.com.</span><button class="submit-button" type="submit">send<br>message</button></div>
        </form>
      </div>`;
    body.appendChild(modal);
    return modal;
  };

  // Preloader
  const preloader = qs('.preloader');
  const countEl = qs('.preloader__count');
  const barEl = qs('.preloader__bar span');
  let count = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tick = () => {
    count = Math.min(100, count + Math.ceil(Math.random() * 12));
    if (countEl) countEl.textContent = `${String(count).padStart(3, '0')}%`;
    if (barEl) barEl.style.width = `${count}%`;
    if (count < 100) setTimeout(tick, reducedMotion ? 10 : 65);
  };
  tick();
  window.addEventListener('load', () => {
    setTimeout(() => preloader?.classList.add('is-hidden'), reducedMotion ? 0 : 350);
  });
  setTimeout(() => preloader?.classList.add('is-hidden'), 2400);

  // Custom cursor
  const cursor = qs('.cursor');
  const dot = qs('.cursor-dot');
  if (cursor && dot && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`;
      dot.style.left = `${e.clientX}px`; dot.style.top = `${e.clientY}px`;
    });
    qsa('a, button, input, textarea, .slide-card').forEach(el => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
  }

  // Menu overlay
  const menu = qs('#menuOverlay');
  const openMenuButtons = qsa('[data-menu-open]');
  const closeMenuButtons = qsa('[data-menu-close]');
  const openMenu = () => {
    menu?.classList.add('is-open'); body.classList.add('menu-open');
    openMenuButtons.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
  };
  const closeMenu = () => {
    menu?.classList.remove('is-open'); body.classList.remove('menu-open');
    openMenuButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  };
  openMenuButtons.forEach(btn => btn.addEventListener('click', openMenu));
  closeMenuButtons.forEach(btn => btn.addEventListener('click', closeMenu));
  qsa('.menu-list a').forEach(link => link.addEventListener('click', closeMenu));

  // Contact modal
  const modal = ensureContactModal();
  const openModalButtons = qsa('[data-modal-open]');
  const closeModalButtons = qsa('[data-modal-close]');
  const openModal = () => {
    modal?.classList.add('is-open'); body.classList.add('modal-open');
    setTimeout(() => qs('input', modal)?.focus(), 150);
  };
  const closeModal = () => { modal?.classList.remove('is-open'); body.classList.remove('modal-open'); };
  openModalButtons.forEach(btn => btn.addEventListener('click', openModal));
  closeModalButtons.forEach(btn => btn.addEventListener('click', closeModal));
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeMenu(); closeModal(); }
  });

  // Header behavior and scroll progress
  const header = qs('.site-header');
  const progress = qs('.scroll-progress');
  const outreachTimeline = qs('[data-outreach-timeline] span');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-solid', y > 60);
    header?.classList.toggle('is-hidden', y > lastY && y > 500 && !body.classList.contains('menu-open'));
    lastY = y;
    if (progress) {
      const max = document.documentElement.scrollHeight - innerHeight;
      const amount = max > 0 ? (y / max) * 100 : 0;
      progress.style.width = `${amount}%`;
      if (outreachTimeline) outreachTimeline.style.width = `${amount}%`;
    }
    qsa('[data-parallax]').forEach(el => {
      const speed = Number(el.dataset.parallax || 0.08);
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) el.style.transform = `translate3d(0, ${rect.top * speed}px, 0)`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const reveals = qsa('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .14, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // Counters
  qsa('[data-counter]').forEach(el => {
    const target = Number(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    let started = false;
    const run = () => {
      if (started) return; started = true;
      const start = performance.now();
      const duration = 1100;
      const step = now => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.floor(target * eased)}${suffix}`;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { run(); io.disconnect(); }
      }), { threshold: .6 });
      io.observe(el);
    } else run();
  });

  // Horizontal slider
  qsa('[data-slider]').forEach(slider => {
    const id = slider.id;
    qsa(`[data-slider-prev="${id}"]`).forEach(btn => btn.addEventListener('click', () => slider.scrollBy({ left: -slider.clientWidth * .78, behavior: 'smooth' })));
    qsa(`[data-slider-next="${id}"]`).forEach(btn => btn.addEventListener('click', () => slider.scrollBy({ left: slider.clientWidth * .78, behavior: 'smooth' })));
    let down = false, startX = 0, scrollLeft = 0;
    slider.addEventListener('pointerdown', e => { down = true; startX = e.clientX; scrollLeft = slider.scrollLeft; slider.setPointerCapture?.(e.pointerId); });
    slider.addEventListener('pointermove', e => { if (down) slider.scrollLeft = scrollLeft - (e.clientX - startX); });
    ['pointerup','pointercancel','pointerleave'].forEach(event => slider.addEventListener(event, () => down = false));
  });

  // Hero audio. Browsers require user interaction before playback.
  const soundButton = qs('[data-sound-toggle]');
  const audio = qs('#ambientAudio');
  soundButton?.addEventListener('click', async () => {
    if (!audio) return;
    try {
      if (audio.paused) { await audio.play(); soundButton.setAttribute('aria-label', 'Matikan audio'); soundButton.classList.add('is-playing'); }
      else { audio.pause(); soundButton.setAttribute('aria-label', 'Nyalakan audio'); soundButton.classList.remove('is-playing'); }
    } catch { soundButton.title = 'Klik lagi untuk mengaktifkan audio'; }
  });

  // Contact form delivery through FormSubmit.
  qsa('.contact-form').forEach(form => {
    // Use a branded thank-you page when the website is served over HTTP/HTTPS.
    if (/^https?:$/.test(window.location.protocol)) {
      const next = document.createElement('input');
      next.type = 'hidden';
      next.name = '_next';
      next.value = new URL('thanks.html', window.location.href).href;
      form.appendChild(next);
    }

    form.addEventListener('submit', e => {
      const status = qs('.form-status', form);
      const submitButton = qs('.submit-button', form);

      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        if (status) status.textContent = 'Lengkapi nama, email yang valid, dan pesan.';
        return;
      }

      if (status) status.textContent = 'Mengirim pesan...';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = 'mengirim...';
      }
    });
  });

  // Set current year
  qsa('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();

// GDK Professional Portfolio interactions
(() => {
  'use strict';

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSignalHome = document.body.classList.contains('outreach-home');
  if (!isSignalHome) return;

  // Lightweight animated starfield; uses no external library and pauses in hidden tabs.
  const canvas = qs('#signalStars');
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars = [];
    let animationId = 0;

    const buildStars = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(55, Math.min(150, Math.floor((width * height) / 11000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.15 + .15,
        speed: Math.random() * .07 + .018,
        alpha: Math.random() * .55 + .15,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.y += star.speed;
        if (star.y > height + 3) { star.y = -3; star.x = Math.random() * width; }
        const flicker = reducedMotion ? star.alpha : star.alpha * (.72 + Math.sin(time * .001 + star.phase) * .28);
        ctx.beginPath();
        ctx.fillStyle = `rgba(231,227,216,${Math.max(.05, flicker)})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reducedMotion && !document.hidden) animationId = requestAnimationFrame(draw);
    };

    const restart = () => {
      cancelAnimationFrame(animationId);
      buildStars();
      draw();
    };
    restart();
    window.addEventListener('resize', restart, { passive: true });
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(animationId);
      if (!document.hidden) draw();
    });
  }

  // Active chapter rail and HUD counter.
  const chapters = qsa('.signal-chapter');
  const chapterLinks = qsa('[data-chapter-link]');
  const chapterCounter = qs('[data-chapter-counter]');
  const frameObject = qs('[data-frame-object]');
  const frameTitle = qs('[data-frame-title]');
  const frameThumbs = qsa('.outreach-thumbs span');
  const chapterMax = chapters.reduce((max, section) => {
    const value = Number(section.dataset.chapter || 0);
    return Number.isFinite(value) ? Math.max(max, value) : max;
  }, 0);
  const formatChapter = value => String(value).padStart(2, '0');
  const setActiveChapter = section => {
    const id = section.id;
    const value = Number(section.dataset.chapter || 0);
    chapterLinks.forEach(link => link.classList.toggle('is-active', link.dataset.chapterLink === id));
    if (chapterCounter) chapterCounter.textContent = `${formatChapter(value)} / ${formatChapter(chapterMax)}`;
    if (frameObject) frameObject.textContent = section.dataset.frameObject || `Object ${formatChapter(value)}`;
    if (frameTitle) frameTitle.textContent = section.dataset.frameTitle || id;
    frameThumbs.forEach((thumb, index) => thumb.classList.toggle('is-active', index === Math.min(frameThumbs.length - 1, value)));
  };
  if ('IntersectionObserver' in window && chapters.length) {
    const chapterObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveChapter(visible.target);
    }, { threshold: [.2, .45, .68], rootMargin: '-18% 0px -38% 0px' });
    chapters.forEach(section => chapterObserver.observe(section));
  } else if (chapters[0]) setActiveChapter(chapters[0]);

  // Draggable dual-face identity object.
  const stage = qs('[data-object-stage]');
  const object = qs('[data-signal-object]');
  if (stage && object && !reducedMotion) {
    let rotationX = -5;
    let rotationY = -14;
    let velocity = .08;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastMove = performance.now();

    const renderObject = () => {
      if (!dragging) {
        rotationY += velocity;
        velocity *= .995;
        if (Math.abs(velocity) < .025) velocity = .025;
      }
      object.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      requestAnimationFrame(renderObject);
    };
    renderObject();

    stage.addEventListener('pointerdown', event => {
      if (!event.target.closest('[data-signal-object]')) return;
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      lastMove = performance.now();
      velocity = 0;
      object.setPointerCapture?.(event.pointerId);
    });
    stage.addEventListener('pointermove', event => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const elapsed = Math.max(8, performance.now() - lastMove);
      rotationY += dx * .38;
      rotationX = Math.max(-28, Math.min(28, rotationX - dy * .18));
      velocity = (dx / elapsed) * 1.8;
      lastX = event.clientX;
      lastY = event.clientY;
      lastMove = performance.now();
    });
    const release = () => { dragging = false; };
    stage.addEventListener('pointerup', release);
    stage.addEventListener('pointercancel', release);
  }

  // Hero fragments respond subtly to pointer movement, echoing the reference site's observatory feel.
  const hero = qs('.signal-hero');
  const fragments = qsa('.signal-fragment');
  const objectCode = qs('.outreach-object-code');
  if (hero && !reducedMotion && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    hero.addEventListener('pointermove', event => {
      const x = event.clientX / window.innerWidth - .5;
      const y = event.clientY / window.innerHeight - .5;
      fragments.forEach((fragment, index) => {
        const depth = index === 0 ? 22 : -18;
        fragment.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0) rotate(${x * 8}deg)`;
      });
      if (objectCode) {
        objectCode.style.transform = `translate(-50%,-50%) translate3d(${x * -18}px, ${y * -10}px, 0)`;
      }
    });
    hero.addEventListener('pointerleave', () => {
      fragments.forEach(fragment => { fragment.style.transform = ''; });
      if (objectCode) objectCode.style.transform = 'translate(-50%,-50%)';
    });
  }

  // Capability accordion.
  qsa('.capability-row').forEach(row => {
    const button = qs('button', row);
    button?.addEventListener('click', () => {
      const accordion = row.closest('[data-accordion]');
      qsa('.capability-row', accordion).forEach(item => {
        const shouldOpen = item === row ? !item.classList.contains('is-open') : false;
        item.classList.toggle('is-open', shouldOpen);
        qs('button', item)?.setAttribute('aria-expanded', String(shouldOpen));
      });
    });
  });

  // Subtle depth response on project observations.
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reducedMotion) {
    qsa('[data-tilt-card]').forEach(card => {
      const media = qs('.observation-card__media img', card);
      const content = qs('.observation-card__content', card);
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        if (media) media.style.transform = `scale(1.07) translate3d(${x * -10}px,${y * -8}px,0)`;
        if (content) content.style.transform = `translate3d(${x * 8}px,${y * 6}px,0)`;
      });
      card.addEventListener('pointerleave', () => {
        if (media) media.style.transform = '';
        if (content) content.style.transform = '';
      });
    });
  }

  // Keep audio copy in sync with the existing audio controller.
  const audio = qs('#ambientAudio');
  const soundButton = qs('[data-sound-toggle]');
  const soundLabel = qs('[data-sound-label]');
  const updateSoundLabel = () => {
    if (!soundLabel || !audio || !soundButton) return;
    const active = !audio.paused;
    soundLabel.textContent = active ? 'mute ambient audio' : 'optional ambient audio';
    soundButton.classList.toggle('is-playing', active);
  };
  audio?.addEventListener('play', updateSoundLabel);
  audio?.addEventListener('pause', updateSoundLabel);
  soundButton?.addEventListener('click', () => setTimeout(updateSoundLabel, 30));

  // Keyboard chapter navigation for desktop presentation mode.
  document.addEventListener('keydown', event => {
    const tag = document.activeElement?.tagName;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || document.body.classList.contains('modal-open') || document.body.classList.contains('menu-open')) return;
    if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(event.key)) return;
    const center = window.scrollY + window.innerHeight * .42;
    let currentIndex = chapters.findIndex(section => center >= section.offsetTop && center < section.offsetTop + section.offsetHeight);
    if (currentIndex < 0) currentIndex = 0;
    const direction = ['ArrowDown', 'PageDown'].includes(event.key) ? 1 : -1;
    const target = chapters[Math.max(0, Math.min(chapters.length - 1, currentIndex + direction))];
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
})();

// Shared transitions and page telemetry across the portfolio.
(() => {
  'use strict';
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transition = document.createElement('div');
  transition.className = 'page-transition';
  transition.setAttribute('aria-hidden', 'true');
  body.appendChild(transition);

  const pageName = document.title.split('—')[0].trim() || 'Portfolio';
  const telemetry = document.createElement('div');
  telemetry.className = 'global-signal-tag';
  telemetry.setAttribute('aria-hidden', 'true');
  telemetry.textContent = `GDK ARCHIVE / ${pageName.toUpperCase()}`;
  body.appendChild(telemetry);

  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank' || link.hasAttribute('download')) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin && window.location.protocol !== 'file:') return;
      if (url.pathname === window.location.pathname && url.hash) return;
      event.preventDefault();
      body.classList.add('is-leaving');
      window.setTimeout(() => { window.location.href = url.href; }, reducedMotion ? 0 : 560);
    });
  });
})();

/* ================================================
   LAPIS LUXE — Main JavaScript (Enhanced)
   Scroll observer, parallax, form, interactions
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initOrderForm();
  initMobileMenu();
  initHeroParallax();
  initSmoothScroll();
  initBentoCards3D();
  initFloatingObjectsParallax();
  initCounterAnimation();
  initScrollyExplodedEngine();
});

/* ================================================
   SCROLLYTELLING 3D EXPLODED LAYER ENGINE
   Real-time scroll-driven 3D deconstruction & anatomy
   ================================================ */
function initScrollyExplodedEngine() {
  const section = document.querySelector('.scrolly-journey');
  if (!section) return;

  const bgAmbient = document.getElementById('scrolly-bg-ambient');
  const mainTitle = document.getElementById('scrolly-main-title');
  const subTitle = document.getElementById('scrolly-sub-title');
  const tabs = document.querySelectorAll('.phase-tab');
  const scenes = document.querySelectorAll('.scene-3d-view');
  const hudFill = document.getElementById('hud-fill');
  const hudStep = document.getElementById('hud-step-text');
  const hudPercent = document.getElementById('hud-percent-text');

  // Slices & Bases
  const baseLapis = document.getElementById('base-lapis');
  const sliceLapis1 = document.getElementById('slice-lapis-1');
  const sliceLapis2 = document.getElementById('slice-lapis-2');
  const sliceLapis3 = document.getElementById('slice-lapis-3');
  const sliceLapis4 = document.getElementById('slice-lapis-4');

  const baseTira = document.getElementById('base-tiramisu');
  const sliceTira1 = document.getElementById('slice-tira-1');
  const sliceTira2 = document.getElementById('slice-tira-2');
  const sliceTira3 = document.getElementById('slice-tira-3');

  const baseMochi = document.getElementById('base-mochi');
  const mochiBurst = document.getElementById('mochi-burst');

  // Callouts
  const calloutsLapis = [
    document.getElementById('callout-lapis-1'),
    document.getElementById('callout-lapis-2'),
    document.getElementById('callout-lapis-3'),
    document.getElementById('callout-lapis-4')
  ];

  const calloutsTira = [
    document.getElementById('callout-tira-1'),
    document.getElementById('callout-tira-2'),
    document.getElementById('callout-tira-3')
  ];

  const calloutsMochi = [
    document.getElementById('callout-mochi-1'),
    document.getElementById('callout-mochi-2'),
    document.getElementById('callout-mochi-3'),
    document.getElementById('callout-mochi-4')
  ];

  const sceneTitles = [
    {
      title: '🥞 Lapis Legit — 18 Layers of Spiced Heritage',
      sub: 'Scroll untuk membelah 18 lapisan butter spekkoek & rempah nusantara dalam 3D'
    },
    {
      title: '☕ Classic Tiramisu — Deconstructed Italian Cloud',
      sub: 'Scroll untuk melihat lapisan kakao, mascarpone & espresso savoiardi melayang terpisah'
    },
    {
      title: '🍡 Trio Mochi — Sliced Open with Molten Lava',
      sub: 'Scroll untuk membuka mochi dan mengeluarkan lelehan lava krim & strawberry segar'
    }
  ];

  const ambientGradients = [
    'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245, 158, 11, 0.28) 0%, rgba(254, 205, 211, 0.2) 50%, transparent 70%), var(--cream)',
    'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124, 90, 75, 0.25) 0%, rgba(255, 107, 107, 0.15) 50%, transparent 70%), var(--cream)',
    'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(110, 231, 183, 0.3) 0%, rgba(254, 205, 211, 0.35) 50%, transparent 70%), var(--cream)'
  ];

  let currentSceneIndex = 0;
  let mouseX = 0;
  let mouseY = 0;
  let ticking = false;

  // Track Mouse 3D perspective over stage
  const stage = document.querySelector('.scrolly-stage');
  if (stage) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    });

    stage.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });
  }

  // Click tabs to navigate directly to chapter
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const phase = parseInt(tab.dataset.phase);
      const sectionTop = section.offsetTop;
      const totalScrollHeight = section.offsetHeight - window.innerHeight;
      const targetScroll = sectionTop + (phase * (totalScrollHeight / 3)) + 40;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    });
  });

  // Main Scroll Loop
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollytelling();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  function updateScrollytelling() {
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = -sectionRect.top;
    const totalScroll = section.offsetHeight - window.innerHeight;

    if (sectionTop < -100 || sectionTop > totalScroll + 100) {
      return;
    }

    const progress = Math.max(0, Math.min(1, sectionTop / totalScroll));

    // Update HUD
    if (hudFill) hudFill.style.height = `${progress * 100}%`;
    if (hudPercent) hudPercent.textContent = `${Math.round(progress * 100)}%`;

    // Determine current active scene
    let sceneIndex = 0;
    let localProgress = 0;

    if (progress < 0.33) {
      sceneIndex = 0;
      localProgress = progress / 0.33;
    } else if (progress < 0.66) {
      sceneIndex = 1;
      localProgress = (progress - 0.33) / 0.33;
    } else {
      sceneIndex = 2;
      localProgress = (progress - 0.66) / 0.34;
    }

    localProgress = Math.max(0, Math.min(1, localProgress));

    // Switch Scene View
    if (sceneIndex !== currentSceneIndex) {
      currentSceneIndex = sceneIndex;

      // Update Title & Subtitle
      if (mainTitle && sceneTitles[sceneIndex]) {
        mainTitle.textContent = sceneTitles[sceneIndex].title;
      }
      if (subTitle && sceneTitles[sceneIndex]) {
        subTitle.textContent = sceneTitles[sceneIndex].sub;
      }

      // Update Phase Tabs
      tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === sceneIndex);
      });

      // Update Active Scene Visibility
      scenes.forEach((sc, i) => {
        sc.classList.toggle('active-scene', i === sceneIndex);
      });

      // Update Ambient Background
      if (bgAmbient) {
        bgAmbient.style.background = ambientGradients[sceneIndex];
      }

      // Update HUD step
      if (hudStep) {
        hudStep.textContent = `0${sceneIndex + 1} / 03`;
      }
    }

    // Apply real-time 3D deconstruction transforms based on localProgress
    applyDeconstructionTransforms(sceneIndex, localProgress);
  }

  function applyDeconstructionTransforms(sceneIndex, t) {
    // Parallax mouse offsets
    const mTiltX = mouseY * -18;
    const mTiltY = mouseX * 22;

    if (sceneIndex === 0) {
      // LAPIS LEGIT 3D LAYER SEPARATION
      const stack = document.getElementById('cake-lapis-3d');
      if (stack) {
        const rotX = 14 * t + mTiltX;
        const rotY = Math.sin(t * Math.PI) * 16 + mTiltY;
        const scale = 1 + 0.08 * t;
        stack.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      }

      // Slices Separation
      if (sliceLapis1) sliceLapis1.style.transform = `translateY(${-55 * t}px) translateZ(${22 * t}px) rotateX(${8 * t}deg)`;
      if (sliceLapis2) sliceLapis2.style.transform = `translateY(${-18 * t}px) translateZ(${12 * t}px)`;
      if (sliceLapis3) sliceLapis3.style.transform = `translateY(${18 * t}px) translateZ(${12 * t}px)`;
      if (sliceLapis4) sliceLapis4.style.transform = `translateY(${55 * t}px) translateZ(${22 * t}px) rotateX(${-8 * t}deg)`;

      // Base visibility (fades slightly to reveal layered glow)
      if (baseLapis) {
        baseLapis.style.opacity = `${Math.max(0, 1 - t * 1.2)}`;
      }

      // Animate Callouts
      toggleCallouts(calloutsLapis, t);

      // Animate floating spices in 3D
      const lapisScene = document.getElementById('scene-lapis');
      if (lapisScene) {
        const items = lapisScene.querySelectorAll('.floating-stage-item');
        items.forEach((item, idx) => {
          const spread = (idx + 1) * 32 * t;
          const spin = (idx % 2 === 0 ? 1 : -1) * t * 180;
          item.style.transform = `translate(${Math.cos(idx) * spread}px, ${Math.sin(idx) * spread}px) rotate(${spin}deg) scale(${1 + t * 0.3})`;
          item.style.opacity = `${0.6 + t * 0.4}`;
        });
      }

    } else if (sceneIndex === 1) {
      // TIRAMISU 3D LAYER SEPARATION
      const stack = document.getElementById('cake-tiramisu-3d');
      if (stack) {
        const rotX = -6 + 16 * t + mTiltX;
        const rotY = -10 + 20 * t + mTiltY;
        const scale = 1 + 0.08 * t;
        stack.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      }

      // Slices Separation
      if (sliceTira1) sliceTira1.style.transform = `translateY(${-48 * t}px) translateZ(${25 * t}px) rotateX(${6 * t}deg)`;
      if (sliceTira2) sliceTira2.style.transform = `translateY(${0}px) translateZ(${12 * t}px)`;
      if (sliceTira3) sliceTira3.style.transform = `translateY(${48 * t}px) translateZ(${20 * t}px) rotateX(${-6 * t}deg)`;

      if (baseTira) {
        baseTira.style.opacity = `${Math.max(0, 1 - t * 1.2)}`;
      }

      // Animate Callouts
      toggleCallouts(calloutsTira, t);

      // Animate cocoa & coffee floating droplets
      const tiraScene = document.getElementById('scene-tiramisu');
      if (tiraScene) {
        const items = tiraScene.querySelectorAll('.floating-stage-item');
        items.forEach((item, idx) => {
          const spread = (idx + 1) * 36 * t;
          const spin = t * 140;
          item.style.transform = `translate(${Math.sin(idx) * spread}px, ${Math.cos(idx) * spread * -1}px) rotate(${spin}deg) scale(${1 + t * 0.35})`;
          item.style.opacity = `${0.7 + t * 0.3}`;
        });
      }

    } else if (sceneIndex === 2) {
      // MOCHI 3D BURST & EXPANSION
      const stack = document.getElementById('cake-mochi-3d');
      if (stack) {
        const rotX = 10 * t + mTiltX;
        const rotY = -12 + 24 * t + mTiltY;
        const scale = 1 + 0.1 * t;
        stack.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      }

      // Molten Strawberry Cream Heart Burst Popout
      if (mochiBurst) {
        const burstScale = t * 1.2;
        const burstRotate = t * 360;
        mochiBurst.style.transform = `translate(-50%, -50%) scale(${burstScale}) rotate(${burstRotate}deg)`;
        mochiBurst.style.opacity = `${Math.min(1, t * 1.6)}`;
      }

      // Animate Callouts
      toggleCallouts(calloutsMochi, t);

      // Animate flying strawberries & matcha dust
      const mochiScene = document.getElementById('scene-mochi');
      if (mochiScene) {
        const items = mochiScene.querySelectorAll('.floating-stage-item');
        items.forEach((item, idx) => {
          const spread = (idx + 1) * 35 * t;
          const spin = (idx % 2 === 0 ? -1 : 1) * t * 200;
          item.style.transform = `translate(${Math.cos(idx * 1.5) * spread}px, ${Math.sin(idx * 1.5) * spread}px) rotate(${spin}deg) scale(${1 + t * 0.4})`;
          item.style.opacity = `${0.7 + t * 0.3}`;
        });
      }
    }
  }

  function toggleCallouts(calloutList, t) {
    if (!calloutList || !calloutList.length) return;

    const thresholds = [0.12, 0.32, 0.52, 0.72];
    calloutList.forEach((callout, i) => {
      if (!callout) return;
      const thresh = thresholds[i] || 0.2;
      if (t >= thresh) {
        callout.classList.add('show-callout');
      } else {
        callout.classList.remove('show-callout');
      }
    });
  }

  // Initial trigger
  updateScrollytelling();
}


/* ================================================
   NAVBAR — Scroll-based background
   ================================================ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ================================================
   SCROLL REVEAL — IntersectionObserver
   Handles .reveal, .reveal-left, .reveal-right,
   .reveal-scale, and .animated-underline
   ================================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .animated-underline');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 60px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ================================================
   HERO CINEMATIC 3D SCROLL EXPLOSION & GYRO
   Full-screen 3D dispersal on scroll with luxury depth
   ================================================ */
function initHeroParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const visualStage = document.getElementById('hero-visual-stage');
  const mainImg = document.getElementById('hero-img-main');
  const halo = document.getElementById('hero-glow-halo');
  const float1 = document.getElementById('hero-float-1');
  const float2 = document.getElementById('hero-float-2');
  const float3 = document.getElementById('hero-float-3');

  const p1 = document.getElementById('hp-1');
  const p2 = document.getElementById('hp-2');
  const p3 = document.getElementById('hp-3');
  const p4 = document.getElementById('hp-4');
  const p5 = document.getElementById('hp-5');
  const p6 = document.getElementById('hp-6');

  const titleLines = hero.querySelectorAll('.hero-title .line');
  const subtitle = hero.querySelector('.hero-subtitle');
  const ctaGroup = hero.querySelector('.hero-cta-group');
  const blobs = hero.querySelectorAll('.blob');
  const decorOrbs = hero.querySelectorAll('.hero-decor');

  let mouseX = 0;
  let mouseY = 0;
  let ticking = false;

  // Track Mouse 3D Gyro
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    if (!ticking) {
      requestAnimationFrame(renderHeroTransforms);
      ticking = true;
    }
  });

  hero.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
    if (!ticking) {
      requestAnimationFrame(renderHeroTransforms);
      ticking = true;
    }
  });

  // Track Scroll Explosion
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(renderHeroTransforms);
      ticking = true;
    }
  }, { passive: true });

  function renderHeroTransforms() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight || 800;

    // Scroll explosion progress (0.0 at top, 1.0 at 550px scroll)
    const p = Math.min(1.2, Math.max(0, scrollY / 550));

    // Mouse tilt offsets
    const mX = mouseX;
    const mY = mouseY;

    // 1. Main 3D Composition Board: Expands into full screen with dynamic tilt & bloom
    if (mainImg) {
      const scale = 1 + 0.32 * p;
      const rotX = 12 * p + mY * -16;
      const rotY = -14 * p + mX * 18;
      const zDepth = p * 180;
      const shiftX = mX * -15 + p * 20;
      const shiftY = mY * -12 + p * 10;

      mainImg.style.transform = `perspective(1200px) translate3d(${shiftX}px, ${shiftY}px, ${zDepth}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      mainImg.style.filter = `brightness(${1 + 0.12 * p}) contrast(${1 + 0.04 * p}) drop-shadow(0 ${28 + p * 50}px ${60 + p * 70}px rgba(45, 27, 20, ${0.16 + p * 0.15}))`;
    }

    // 2. Radiant Halo Bloom (expands behind the board)
    if (halo) {
      const haloScale = 1 + 1.4 * p;
      halo.style.transform = `translate(${mX * 25}px, ${mY * 20}px) scale(${haloScale})`;
      halo.style.opacity = `${Math.max(0.2, 1 - p * 0.35)}`;
    }

    // 3. Satellite Dessert Cards: Full 3D Radial Dispersal across screen
    if (float1) {
      // Cheesecake blasts Top-Right
      const f1X = p * 260 + mX * 30;
      const f1Y = p * -180 + mY * 25;
      const f1Rot = p * 40 + mX * 20;
      const f1Scale = 1 + p * 0.45;
      float1.style.transform = `translate3d(${f1X}px, ${f1Y}px, ${p * 120}px) rotate(${f1Rot}deg) scale(${f1Scale})`;
      float1.style.boxShadow = `0 ${16 + p * 30}px ${40 + p * 40}px rgba(45, 27, 20, ${0.18 + p * 0.15})`;
    }

    if (float2) {
      // Brownie blasts Bottom-Left
      const f2X = p * -280 + mX * 25;
      const f2Y = p * 200 + mY * 30;
      const f2Rot = p * -45 + mX * -20;
      const f2Scale = 1 + p * 0.4;
      float2.style.transform = `translate3d(${f2X}px, ${f2Y}px, ${p * 100}px) rotate(${f2Rot}deg) scale(${f2Scale})`;
      float2.style.boxShadow = `0 ${16 + p * 30}px ${40 + p * 40}px rgba(45, 27, 20, ${0.18 + p * 0.15})`;
    }

    if (float3) {
      // Mochi blasts Right-Center
      const f3X = p * 300 + mX * 28;
      const f3Y = p * 130 + mY * 20;
      const f3Rot = p * 50 + mX * 25;
      const f3Scale = 1 + p * 0.48;
      float3.style.transform = `translate3d(${f3X}px, ${f3Y}px, ${p * 140}px) rotate(${f3Rot}deg) scale(${f3Scale})`;
      float3.style.boxShadow = `0 ${16 + p * 30}px ${40 + p * 40}px rgba(45, 27, 20, ${0.18 + p * 0.15})`;
    }

    // 4. Luxury 3D Particles Blast Outwards
    if (p1) p1.style.transform = `translate(${p * -220 + mX * 20}px, ${p * -240 + mY * 20}px) rotate(${p * 360}deg) scale(${1 + p * 0.9})`;
    if (p2) p2.style.transform = `translate(${p * 260 + mX * -25}px, ${p * -170 + mY * 20}px) rotate(${p * -360}deg) scale(${1 + p * 0.7})`;
    if (p3) p3.style.transform = `translate(${p * -260 + mX * 22}px, ${p * 210 + mY * -20}px) rotate(${p * 280}deg) scale(${1 + p * 0.8})`;
    if (p4) p4.style.transform = `translate(${p * 240 + mX * 30}px, ${p * 250 + mY * 25}px) rotate(${p * -240}deg) scale(${1 + p * 1.3})`;
    if (p5) p5.style.transform = `translate(${p * -190 + mX * -15}px, ${p * -90 + mY * 15}px) rotate(${p * 300}deg) scale(${1 + p * 0.6})`;
    if (p6) p6.style.transform = `translate(${p * 210 + mX * 18}px, ${p * -60 + mY * -15}px) rotate(${p * -180}deg) scale(${1 + p * 0.75})`;

    // 5. Typography Kinetic 3D Dispersal
    if (titleLines.length >= 3) {
      titleLines[0].style.transform = `translateX(${p * -55}px) translateZ(${p * 40}px)`;
      titleLines[1].style.transform = `translateX(${p * 35}px) translateZ(${p * 60}px) scale(${1 + p * 0.06})`;
      titleLines[2].style.transform = `translateY(${p * 30}px) translateZ(${p * -30}px)`;
    }

    if (subtitle) {
      subtitle.style.transform = `translateY(${p * 25}px)`;
      subtitle.style.opacity = `${Math.max(0, 1 - p * 1.3)}`;
    }

    if (ctaGroup) {
      ctaGroup.style.transform = `translateY(${p * 20}px)`;
      ctaGroup.style.opacity = `${Math.max(0, 1 - p * 1.3)}`;
    }

    // 6. Ambient Blobs Expansion
    blobs.forEach((blob, i) => {
      const bScale = 1 + (i + 1) * 0.25 * p;
      blob.style.transform = `scale(${bScale}) translate(${mX * 20}px, ${mY * 20}px)`;
    });

    decorOrbs.forEach((orb, i) => {
      const oScale = 1 + (i + 1) * 0.3 * p;
      orb.style.transform = `scale(${oScale}) translate(${mX * 15}px, ${mY * 15}px)`;
    });

    ticking = false;
  }

  // Initial trigger
  renderHeroTransforms();
}

/* ================================================
   FLOATING OBJECTS — Scroll-based parallax
   Makes floating objects move at different speeds
   ================================================ */
function initFloatingObjectsParallax() {
  const objects = document.querySelectorAll('.floating-object');
  if (!objects.length) return;

  // Assign random parallax speeds
  objects.forEach(obj => {
    obj._parallaxSpeed = (Math.random() * 0.15) + 0.03; // 0.03 - 0.18
    obj._parallaxDirection = Math.random() > 0.5 ? 1 : -1;
  });

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        objects.forEach(obj => {
          // Only animate if object's section is in viewport
          const section = obj.closest('section, .hero');
          if (!section) return;

          const rect = section.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;

          if (inView) {
            const offset = scrollY * obj._parallaxSpeed * obj._parallaxDirection;
            // Apply as a translateY offset using CSS custom property
            obj.style.setProperty('--scroll-offset', `${offset}px`);
            // We need to add the scroll offset without breaking the existing animation
            // Use a wrapper approach with marginTop
            obj.style.marginTop = `${offset}px`;
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ================================================
   MOBILE MENU
   ================================================ */
function initMobileMenu() {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ================================================
   SMOOTH SCROLL
   ================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* ================================================
   BENTO CARDS — 3D Mouse Tilt
   ================================================ */
function initBentoCards3D() {
  const cards = document.querySelectorAll('.bento-card');

  cards.forEach(card => {
    let rafId = null;

    card.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `
          perspective(800px) 
          rotateY(${x * 10}deg) 
          rotateX(${y * -10}deg) 
          translateY(-10px) 
          scale(1.02)
        `;

        // Dynamic shadow based on tilt
        const shadowX = x * 20;
        const shadowY = y * 20;
        card.style.boxShadow = `
          ${shadowX}px ${shadowY + 16}px 48px rgba(45, 27, 20, 0.12),
          0 4px 12px rgba(45, 27, 20, 0.06)
        `;

        // Inner shine effect
        const shineX = (x + 0.5) * 100;
        const shineY = (y + 0.5) * 100;
        card.style.backgroundImage = `
          radial-gradient(
            circle at ${shineX}% ${shineY}%, 
            rgba(255,255,255,0.08) 0%, 
            transparent 60%
          )
        `;
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease, background-image 0.4s ease';
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.backgroundImage = '';
      setTimeout(() => { card.style.transition = ''; }, 600);
    });
  });
}

/* ================================================
   COUNTER ANIMATION — for "500+" number
   ================================================ */
function initCounterAnimation() {
  const proofText = document.querySelector('.social-proof-text strong');
  if (!proofText) return;

  const target = 500;
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounter(proofText, 0, target, 1500);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(proofText);
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * eased);

    element.textContent = current + '+';

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ================================================
   ORDER FORM — Validation, Ripple, Submission
   ================================================ */
function initOrderForm() {
  const form = document.getElementById('order-form');
  if (!form) return;

  const submitBtn = form.querySelector('.btn-submit');
  const formWrapper = document.querySelector('.order-form-wrapper');

  // Ripple effect
  submitBtn.addEventListener('click', (e) => {
    const rippleContainer = submitBtn.querySelector('.ripple-container');
    if (!rippleContainer) return;

    const rect = submitBtn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';

    rippleContainer.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#order-name').value.trim();
    const phone = form.querySelector('#order-phone').value.trim();
    const product = form.querySelector('#order-product').value;
    const qty = form.querySelector('#order-qty').value;

    if (!name || !phone || !product || !qty) {
      shakeElement(submitBtn);
      return;
    }

    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      form.style.display = 'none';
      const success = formWrapper.querySelector('.order-success');
      if (success) {
        success.classList.add('show');
      }
      formWrapper.classList.add('success');

      // Trigger confetti burst
      createConfettiBurst(formWrapper);
    }, 1200);
  });
}

/* --- Shake animation helper --- */
function shakeElement(el) {
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'shake 0.5s ease-in-out';
}

/* --- Confetti burst on form success --- */
function createConfettiBurst(container) {
  const emojis = ['🎉', '🍰', '✨', '🎊', '🧁', '🍓', '⭐'];
  const rect = container.getBoundingClientRect();

  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement('span');
    confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      font-size: ${14 + Math.random() * 18}px;
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
      transition: all ${0.8 + Math.random() * 1.2}s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    document.body.appendChild(confetti);

    requestAnimationFrame(() => {
      confetti.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 400}px`;
      confetti.style.top = `${rect.top + rect.height / 2 - Math.random() * 300 - 50}px`;
      confetti.style.opacity = '0';
      confetti.style.transform = `rotate(${Math.random() * 720 - 360}deg) scale(${0.3 + Math.random() * 0.5})`;
    });

    setTimeout(() => confetti.remove(), 2500);
  }
}

// Add shake keyframes
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);

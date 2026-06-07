import {
  clamp,
  lerp,
  prefersReducedMotion,
  qs,
  qsa,
  splitIntoAnimatedSpans,
  wrapForLineReveal,
} from "./utils.js";

const { gsap, ScrollTrigger, MotionPathPlugin, Lenis } = window;

export function setupGsap() {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
  });
}

export function setupSmoothScroll() {
  if (!Lenis || prefersReducedMotion()) return null;

  const lenis = new Lenis({
    duration: 1.2,
    autoRaf: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function runLoader() {
  const loader = qs(".loader");
  const label = qs(".loader__label");
  const layers = qsa(".sandwich-layer");

  if (prefersReducedMotion()) {
    gsap.set(loader, { autoAlpha: 0, display: "none" });
    return;
  }

  const labels = [
    "TOASTING SOURDOUGH...",
    "LAYERING TURKEY...",
    "MELTING SWISS...",
    "ADDING TOMATO...",
    "POURING COFFEE...",
    "READY TO SERVE...",
  ];

  gsap.set(layers, {
    y: () => gsap.utils.random(-220, -140),
    rotation: () => gsap.utils.random(-10, 10),
    scale: 0.9,
  });

  const timeline = gsap.timeline({
    defaults: { ease: "back.out(1.8)" },
    onComplete: () => document.body.classList.add("is-ready"),
  });

  timeline.fromTo(label, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 });

  const dropStart = 0.35;
  const layerGap = 0.16;
  layers.forEach((layer, index) => {
    const position = dropStart + index * layerGap;

    timeline
      .call(() => {
        label.textContent = labels[index] || labels[labels.length - 1];
      }, [], position)
      .to(layer, {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.58,
      }, position);
  });

  timeline
    .call(() => {
      label.textContent = labels[labels.length - 1];
    }, [], dropStart + layers.length * layerGap)
    .to(".loader__stack", {
      y: -12,
      repeat: 1,
      yoyo: true,
      duration: 0.22,
    }, dropStart + layers.length * layerGap + 0.32)
    .to(loader, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "+=0.2");
}

export function setupNavigation() {
  const nav = qs("[data-nav]");
  let previousY = window.scrollY;

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate() {
      const currentY = window.scrollY;
      const scrollingDown = currentY > previousY && currentY > 120;
      gsap.to(nav, {
        y: scrollingDown ? -95 : 0,
        duration: 0.32,
        ease: "power3.out",
      });
      previousY = currentY;
    },
  });
}

export function setupHero() {
  const heroImage = qs(".hero__image");

  gsap.fromTo(
    heroImage,
    { scale: 0.55, opacity: 0, y: 90, rotation: -5 },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: 1.25,
      ease: "back.out(1.5)",
      delay: 0.3,
    }
  );

  if (!prefersReducedMotion()) {
    gsap.to(heroImage, {
      y: "-=16",
      duration: 2.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.3,
    });

    qsa("[data-float]").forEach((item, index) => {
      gsap.to(item, {
        y: () => gsap.utils.random(-14, 14),
        rotation: `+=${index % 2 ? 5 : -5}`,
        duration: () => gsap.utils.random(2.2, 3.4),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.18,
      });
    });
  }

  qsa(".blob-button").forEach((button) => {
    button.addEventListener("pointerenter", () => {
      gsap.to(button, {
        scale: 1.06,
        rotation: -1.5,
        borderRadius: "70% 999px 70% 999px",
        duration: 0.28,
        ease: "back.out(2)",
      });
    });

    button.addEventListener("pointerleave", () => {
      gsap.to(button, {
        scale: 1,
        rotation: 0,
        borderRadius: "999px 70% 999px 80%",
        duration: 0.35,
        ease: "power3.out",
      });
    });
  });
}

export function setupTextAnimations() {
  qsa(".js-pop-text").forEach((element) => {
    splitIntoAnimatedSpans(element, element.classList.contains("badge") ? "words" : "chars");

    gsap.fromTo(
      element.querySelectorAll("[data-pop]"),
      {
        opacity: 0,
        scale: 0,
        y: () => gsap.utils.random(18, 40),
        rotation: () => gsap.utils.random(-16, 16),
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.72,
        ease: "back.out(2.35)",
        stagger: 0.055,
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      }
    );
  });

  qsa(".js-line-reveal").forEach((element) => {
    const inner = wrapForLineReveal(element);

    gsap.fromTo(
      inner,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      }
    );
  });
}

export function setupTiltCards() {
  qsa("[data-tilt-card]").forEach((card) => {
    const baseRotation = Number(card.dataset.baseRotation || 0);
    const velocity = { x: 0, y: 0 };
    let previous = { x: 0, y: 0, time: performance.now() };

    gsap.set(card, { rotation: baseRotation });

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const now = performance.now();
      const deltaTime = Math.max(now - previous.time, 16);

      velocity.x = (event.clientX - previous.x) / deltaTime;
      velocity.y = (event.clientY - previous.y) / deltaTime;
      previous = { x: event.clientX, y: event.clientY, time: now };

      gsap.to(card, {
        x: x * 18,
        y: y * 12,
        rotation: baseRotation + x * 5,
        duration: 0.24,
        ease: "power2.out",
      });
    });

    card.addEventListener("pointerleave", () => {
      gsap
        .timeline()
        .to(card, {
          x: clamp(velocity.x * 90, -24, 24),
          y: clamp(velocity.y * 90, -18, 18),
          rotation: baseRotation + clamp(velocity.x * 18, -6, 6),
          duration: 0.24,
          ease: "power3.out",
        })
        .to(card, {
          x: 0,
          y: 0,
          rotation: baseRotation,
          duration: 0.62,
          ease: "elastic.out(1, 0.55)",
        });
    });
  });
}

export function setupPointerMagnifier() {
  const stage = qs(".tracker-stage");
  const lens = qs("[data-pointer-lens]");
  if (!stage || !lens) return;

  const setLensX = gsap.quickSetter(stage, "--lens-x-px");
  const setLensY = gsap.quickSetter(stage, "--lens-y-px");
  const setSceneX = gsap.quickSetter(stage, "--lens-scene-x");
  const setSceneY = gsap.quickSetter(stage, "--lens-scene-y");
  const setStageWidth = gsap.quickSetter(stage, "--stage-width");
  const setStageHeight = gsap.quickSetter(stage, "--stage-height");

  const updateLens = (clientX, clientY) => {
    const rect = stage.getBoundingClientRect();
    const lensRect = lens.getBoundingClientRect();
    const magnify = Number.parseFloat(getComputedStyle(stage).getPropertyValue("--magnify")) || 1.85;
    const x = clamp(clientX - rect.left, lensRect.width / 2, rect.width - lensRect.width / 2);
    const y = clamp(clientY - rect.top, lensRect.height / 2, rect.height - lensRect.height / 2);

    setStageWidth(`${rect.width}px`);
    setStageHeight(`${rect.height}px`);
    setLensX(`${x}px`);
    setLensY(`${y}px`);
    setSceneX(`${lensRect.width / 2 - x * magnify}px`);
    setSceneY(`${lensRect.height / 2 - y * magnify}px`);
  };

  const rect = stage.getBoundingClientRect();
  updateLens(rect.left + rect.width / 2, rect.top + rect.height / 2);

  window.addEventListener("pointermove", (event) => {
    updateLens(event.clientX, event.clientY);
  });

  window.addEventListener("resize", () => {
    const resizedRect = stage.getBoundingClientRect();
    updateLens(resizedRect.left + resizedRect.width / 2, resizedRect.top + resizedRect.height / 2);
  });
}

export function setupParallaxIngredients() {
  qsa("[data-parallax]").forEach((item) => {
    const speed = Number(item.dataset.parallax || -0.08);

    gsap.to(item, {
      y: () => window.innerHeight * speed * 2,
      ease: "none",
      scrollTrigger: {
        trigger: ".ingredients",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  gsap.to("[data-peel-sticker]", {
    "--peel": 1,
    ease: "none",
    scrollTrigger: {
      trigger: "[data-peel-sticker]",
      start: "top 80%",
      end: "top 40%",
      scrub: 1,
    },
  });
}

export function setupRouteMap() {
  const map = qs("[data-route-map]");
  const cup = qs(".delivery-cup");
  const path = qs("#delivery-path");
  const cards = qsa(".route-card");

  gsap.set(cup, { xPercent: -50, yPercent: -50 });

  gsap.to(cup, {
    motionPath: {
      path,
      align: path,
      alignOrigin: [0.5, 0.5],
      autoRotate: true,
    },
    ease: "none",
    scrollTrigger: {
      trigger: map,
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1,
    },
  });

  cards.forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: map,
        start: `${20 + index * 18}% center`,
        once: true,
      },
    });
  });
}

export function setupWaveTransition() {
  const overlay = qs(".page-wipe");
  const text = qs(".page-wipe__text");
  const paths = qsa(".page-wipe__path");
  const states = paths.map(() => ({ left: 100, right: 100, center: 100 }));

  function pathShape(state) {
    return `M 0 100 H 100 V ${state.right} Q 50 ${state.center} 0 ${state.left} Z`;
  }

  function render() {
    paths.forEach((path, index) => path.setAttribute("d", pathShape(states[index])));
  }

  render();

  qsa("[data-wave-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const timeline = gsap.timeline();

      timeline
        .set(overlay, { autoAlpha: 1 })
        .set(text, { opacity: 0, scale: 0.85 })
        .to(
          states,
          {
            left: 0,
            right: 0,
            center: 14,
            duration: 0.58,
            ease: "power4.inOut",
            stagger: 0.08,
            onUpdate: render,
          },
          0
        )
        .to(text, { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(2)" }, 0.32)
        .to(text, { opacity: 0, scale: 1.08, duration: 0.22 }, 0.9)
        .to(
          states,
          {
            left: -110,
            right: -110,
            center: -86,
            duration: 0.68,
            ease: "power4.inOut",
            stagger: 0.08,
            onUpdate: render,
          },
          0.85
        )
        .set(overlay, { autoAlpha: 0 })
        .set(states, { left: 100, right: 100, center: 100 })
        .call(render);
    });
  });
}

export function setupCursorTrail() {
  if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;

  const trail = document.createElement("div");
  trail.className = "cursor-trail";

  const dots = Array.from({ length: 7 }, () => {
    const dot = document.createElement("span");
    trail.appendChild(dot);
    return { element: dot, x: window.innerWidth / 2, y: window.innerHeight / 2 };
  });

  document.body.appendChild(trail);

  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let hasPointer = false;

  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;

    if (!hasPointer) {
      hasPointer = true;
      gsap.to(trail, { opacity: 1, duration: 0.2 });
    }
  });

  gsap.ticker.add(() => {
    dots.forEach((dot, index) => {
      const leader = index === 0 ? pointer : dots[index - 1];
      dot.x = lerp(dot.x, leader.x, 0.28);
      dot.y = lerp(dot.y, leader.y, 0.28);
      gsap.set(dot.element, {
        x: dot.x,
        y: dot.y,
        scale: 1 - index * 0.08,
      });
    });
  });
}

export function setupFooterJuggle() {
  qsa("[data-throw-object]").forEach((item, index) => {
    if (prefersReducedMotion()) return;

    const isBackLayer = item.classList.contains("throw-object--back");
    const delay = index * 0.34;
    const durationScale = isBackLayer ? 1.18 : 1;
    const apexMin = isBackLayer ? -520 : -660;
    const apexMax = isBackLayer ? -360 : -460;
    const drift = isBackLayer ? 70 : 125;

    const throwLoop = gsap.timeline({
      repeat: -1,
      repeatRefresh: true,
      delay,
    });

    throwLoop
      .set(item, {
        xPercent: -50,
        y: 260,
        x: () => gsap.utils.random(-24, 24),
        rotation: () => gsap.utils.random(-22, 22),
        opacity: 0,
        scale: () => gsap.utils.random(isBackLayer ? 0.72 : 0.9, isBackLayer ? 0.92 : 1.08),
      })
      .to(item, { opacity: 1, duration: 0.08 })
      .to(item, {
        y: () => gsap.utils.random(apexMin, apexMax),
        x: () => gsap.utils.random(-drift, drift),
        rotation: () => gsap.utils.random(-95, 95),
        duration: () => gsap.utils.random(1.0, 1.35) * durationScale,
        ease: "power2.out",
      })
      .to(item, {
        y: 280,
        x: () => gsap.utils.random(-drift * 0.8, drift * 0.8),
        rotation: () => gsap.utils.random(-210, 210),
        duration: () => gsap.utils.random(0.9, 1.2) * durationScale,
        ease: "power2.in",
      })
      .to(item, { opacity: 0, duration: 0.05 });
  });
}

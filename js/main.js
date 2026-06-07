import {
  runLoader,
  setupCursorTrail,
  setupFooterJuggle,
  setupGsap,
  setupHero,
  setupNavigation,
  setupParallaxIngredients,
  setupPointerMagnifier,
  setupRouteMap,
  setupSmoothScroll,
  setupTextAnimations,
  setupTiltCards,
  setupWaveTransition,
} from "./animations.js";

document.body.classList.remove("no-js");

if (!window.gsap) {
  document.body.classList.add("gsap-missing");
  console.warn("GSAP did not load. Check your internet connection or use a local GSAP copy.");
} else {
  setupGsap();
  setupSmoothScroll();
  runLoader();
  setupNavigation();
  setupHero();
  setupTextAnimations();
  setupTiltCards();
  setupPointerMagnifier();
  setupParallaxIngredients();
  setupRouteMap();
  setupWaveTransition();
  setupCursorTrail();
  setupFooterJuggle();
}

export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const lerp = (start, end, amount) => start + (end - start) * amount;

export function splitIntoAnimatedSpans(element, mode = "chars") {
  const originalText = element.textContent.trim();

  element.setAttribute("aria-label", originalText);
  element.textContent = "";

  if (mode === "chars") {
    const words = originalText.split(/\s+/);

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.setAttribute("aria-hidden", "true");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      [...word].forEach((char) => {
        const span = document.createElement("span");
        span.dataset.pop = "";
        span.textContent = char;
        span.style.display = "inline-block";
        wordSpan.appendChild(span);
      });

      element.appendChild(wordSpan);

      if (wordIndex < words.length - 1) {
        element.appendChild(document.createTextNode("\u00a0"));
      }
    });

    return;
  }

  const pieces = originalText.split(/(\s+)/);

  pieces.forEach((piece) => {
    const span = document.createElement("span");
    span.dataset.pop = "";
    span.setAttribute("aria-hidden", "true");
    span.textContent = piece === " " ? "\u00a0" : piece;
    span.style.display = piece.trim() ? "inline-block" : "inline";
    element.appendChild(span);
  });
}

export function wrapForLineReveal(element) {
  const text = element.textContent.trim();
  element.textContent = "";

  const mask = document.createElement("span");
  const inner = document.createElement("span");

  mask.className = "line-mask";
  inner.textContent = text;
  mask.appendChild(inner);
  element.appendChild(mask);

  return inner;
}

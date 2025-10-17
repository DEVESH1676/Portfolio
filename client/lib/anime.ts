// Dynamically import anime.js and run the animation factory
async function runAnime(params: any) {
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // respect reduced motion preference
    return Promise.resolve();
  }
  const mod = await import("animejs");
  const anime = (mod as any).default ?? mod;
  return anime(params as any);
}

// Global animation configuration
export const ANIME = {
  easing: "easeInOutQuad",
  fastEasing: "easeOutExpo",
  pulseEasing: "easeInOutSine",
  durations: {
    line: 900,
    dot: 520,
    pulse: 1200,
    entrance: 600,
  },
};

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
};

export const animateHoverEnter = async (el: HTMLElement, opts?: { scale?: number; duration?: number }) => {
  if (!el || prefersReducedMotion()) return;
  const scale = opts?.scale ?? 1.04;
  const duration = opts?.duration ?? 180;
  const mod = await import("animejs");
  const a = (mod as any).default ?? mod;
  a({ targets: el, scale, duration, easing: ANIME.fastEasing });
};

export const animateHoverLeave = async (el: HTMLElement, opts?: { duration?: number }) => {
  if (!el || prefersReducedMotion()) return;
  const duration = opts?.duration ?? 180;
  const mod = await import("animejs");
  const a = (mod as any).default ?? mod;
  a({ targets: el, scale: 1, duration, easing: ANIME.fastEasing });
};

export const animateLineDraw = async (
  el: HTMLElement,
  opts?: { duration?: number; easing?: string },
) => {
  if (!el) return;
  const duration = opts?.duration ?? ANIME.durations.line;
  const easing = opts?.easing ?? ANIME.easing;
  // ensure transform origin
  el.style.transformOrigin = "top";
  el.style.transform = "scaleY(0)";
  await runAnime({ targets: el, scaleY: [0, 1], duration, easing });
};

export const animateEntrance = async (
  el: HTMLElement,
  opts?: {
    translateY?: number;
    opacity?: [number, number];
    duration?: number;
    easing?: string;
    delay?: number;
  },
) => {
  if (!el) return;
  const translateY = opts?.translateY ?? 16;
  const opacity = opts?.opacity ?? [0, 1];
  const duration = opts?.duration ?? ANIME.durations.entrance;
  const easing = opts?.easing ?? ANIME.fastEasing;
  const delay = opts?.delay ?? 0;

  el.style.opacity = String(opacity[0]);
  await runAnime({
    targets: el,
    translateY: [translateY, 0],
    opacity,
    duration,
    easing,
    delay,
  });
};

export const animatePulse = async (
  el: HTMLElement,
  opts?: { scale?: [number, number]; duration?: number },
) => {
  if (!el) return;
  const scale = opts?.scale ?? [1, 1.06];
  const duration = opts?.duration ?? ANIME.durations.pulse;
  return runAnime({
    targets: el,
    scale,
    duration,
    easing: ANIME.pulseEasing,
    direction: "alternate",
    loop: true,
  });
};

export const animateHoverPop = async (
  el: HTMLElement,
  opts?: { scale?: number; duration?: number },
) => {
  // anime.js not ideal for hover binding; prefer CSS or framer-motion for hover interactions
  // This helper returns a bound function that triggers a quick pop.
  const scale = opts?.scale ?? 1.04;
  const duration = opts?.duration ?? 180;
  return {
    onEnter: () => runAnime({ targets: el, scale, duration, easing: ANIME.fastEasing }),
    onLeave: () => runAnime({ targets: el, scale: 1, duration, easing: ANIME.fastEasing }),
  };
};

export default {
  runAnime,
  animateLineDraw,
  animateEntrance,
  animatePulse,
  animateHoverPop,
};

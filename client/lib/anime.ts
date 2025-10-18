let _animeLib: any = null;
let _animeLibPromise: Promise<any> | null = null;

export async function getAnimeLib() {
  if (_animeLib) return _animeLib;
  if (_animeLibPromise) return _animeLibPromise;
  _animeLibPromise = import("animejs").then((mod) => {
    const a = (mod as any).default ?? mod;
    _animeLib = a;
    return a;
  });
  return _animeLibPromise;
}

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
};

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

export async function runAnime(params: any) {
  const anime = await getAnimeLib();
  // Respect reduced motion: if user prefers reduced motion, make animations instant
  if (prefersReducedMotion()) {
    if (params && typeof params === "object") {
      params.duration = 0;
      if (params.loop) params.loop = false;
    }
  }
  return anime(params as any);
}

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
  await runAnime({ targets: el, scaleY: [0, 1], duration, easing, translateZ: 0 });
};

export const animateEntrance = async (
  el: HTMLElement,
  opts?: {
    translateY?: number;
    duration?: number;
    easing?: string;
    delay?: number;
  },
) => {
  if (!el) return;
  const translateY = opts?.translateY ?? 16;
  const duration = opts?.duration ?? ANIME.durations.entrance;
  const easing = opts?.easing ?? ANIME.fastEasing;
  const delay = opts?.delay ?? 0;

  // Animate transform only for entrance animations to keep content readable immediately.
  await runAnime({
    targets: el,
    translateY: [translateY, 0],
    duration,
    easing,
    delay,
    translateZ: 0,
  });
};

export const animatePulse = async (
  el: HTMLElement,
  opts?: { scale?: [number, number]; duration?: number; loop?: boolean },
) => {
  if (!el) return;
  const scale = opts?.scale ?? [1, 1.06];
  const duration = opts?.duration ?? ANIME.durations.pulse;
  const loop = opts?.loop ?? true;
  // Respect reduced motion
  if (prefersReducedMotion()) return;
  return runAnime({
    targets: el,
    scale,
    duration,
    easing: ANIME.pulseEasing,
    direction: "alternate",
    loop,
    translateZ: 0,
  });
};

export const animateHoverPop = async (
  el: HTMLElement,
  opts?: { scale?: number; duration?: number },
) => {
  const scale = opts?.scale ?? 1.04;
  const duration = opts?.duration ?? 180;
  return {
    onEnter: () => runAnime({ targets: el, scale, duration, easing: ANIME.fastEasing, translateZ: 0 }),
    onLeave: () => runAnime({ targets: el, scale: 1, duration, easing: ANIME.fastEasing, translateZ: 0 }),
  };
};

export default {
  getAnimeLib,
  runAnime,
  prefersReducedMotion,
  animateLineDraw,
  animateEntrance,
  animatePulse,
  animateHoverPop,
};

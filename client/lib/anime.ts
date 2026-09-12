// Native Web Animations API Wrapper
// No external dependencies required

export interface AnimeOptions extends KeyframeAnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  staggerIndex?: number; // New: For staggered animations
}

export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
};

// Premium Academic Animation Configuration
export const ANIME = {
  // "Apple-like" smooth easing (Premium)
  premiumEasing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  // Standard functional easing
  standardEasing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  // Bouncy/Playful (Use sparingly)
  springEasing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",

  durations: {
    hero: 1000,
    section: 800,
    card: 600,
    staggerBase: 100, // ms per item
  },
};

export function runAnime(
  el: HTMLElement,
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  options?: AnimeOptions,
): Animation {
  let finalDuration = options?.duration ?? 0;
  let finalDelay = options?.delay ?? 0;

  // Stagger calculation
  if (options?.staggerIndex !== undefined && options.staggerIndex > 0) {
    finalDelay += options.staggerIndex * ANIME.durations.staggerBase;
  }

  // Respect reduced motion
  if (prefersReducedMotion()) {
    finalDuration = 0;
    finalDelay = 0;
  }

  const anim = el.animate(keyframes, {
    ...options,
    duration: finalDuration,
    delay: finalDelay,
    easing: options?.easing ?? "linear",
    fill: options?.fill ?? "forwards",
  });

  return anim;
}

export const animateEntrance = (
  el: HTMLElement,
  opts?: {
    translateY?: number;
    scale?: number;
    opacity?: number;
    duration?: number;
    easing?: string;
    delay?: number;
    staggerIndex?: number;
    blur?: boolean; // New: Blur effect
  },
): Animation | undefined => {
  if (!el) return;

  const duration = opts?.duration ?? ANIME.durations.section;
  const easing = opts?.easing ?? ANIME.premiumEasing;

  const startFrame: Keyframe = {
    transform: "translate3d(0, 0, 0)",
    opacity: 0,
    filter: opts?.blur ? "blur(6px)" : "none",
  };

  if (opts?.translateY !== undefined) {
    startFrame.transform = `translate3d(0, ${opts.translateY}px, 0)`;
  }

  const endFrame: Keyframe = {
    transform: "translate3d(0, 0, 0)",
    opacity: 1,
    filter: "blur(0px)",
  };

  if (opts?.scale !== undefined) {
    startFrame.transform += ` scale(${opts.scale})`;
  }

  return runAnime(el, [startFrame, endFrame], {
    duration,
    easing,
    delay: opts?.delay,
    staggerIndex: opts?.staggerIndex,
    fill: "forwards",
  });
};

export const animateLineDraw = (
  el: HTMLElement,
  opts?: { duration?: number; easing?: string; delay?: number },
): Animation | undefined => {
  if (!el) return;
  const duration = opts?.duration ?? 800;
  const easing = opts?.easing ?? ANIME.premiumEasing;

  el.style.transformOrigin = "top";

  return runAnime(
    el,
    [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
    { duration, easing, delay: opts?.delay },
  );
};

// New: Animate a list of children with automatic staggering
export const animateStaggeredChildren = (
  parent: HTMLElement,
  selector: string,
  opts?: {
    translateY?: number;
    duration?: number;
    baseDelay?: number;
  },
) => {
  if (!parent) return;
  const children = parent.querySelectorAll(selector);

  children.forEach((child, index) => {
    animateEntrance(child as HTMLElement, {
      translateY: opts?.translateY ?? 20,
      duration: opts?.duration,
      delay: opts?.baseDelay ?? 0,
      staggerIndex: index,
      easing: ANIME.premiumEasing,
      blur: true,
    });
  });
};

export default {
  runAnime,
  prefersReducedMotion,
  animateLineDraw,
  animateEntrance,
  animateStaggeredChildren,
  ANIME,
};

// Native Web Animations API Wrapper
// No external dependencies required

export interface AnimeOptions extends KeyframeAnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
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

// Global animation configuration
export const ANIME = {
  easing: "cubic-bezier(0.455, 0.03, 0.515, 0.955)", // easeInOutQuad equivalent
  fastEasing: "cubic-bezier(0.19, 1, 0.22, 1)", // easeOutExpo equivalent
  pulseEasing: "cubic-bezier(0.445, 0.05, 0.55, 0.95)", // easeInOutSine equivalent
  durations: {
    line: 900,
    dot: 520,
    pulse: 1200,
    entrance: 600,
  },
};

export function runAnime(
  el: HTMLElement,
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  options?: AnimeOptions,
): Animation {
  let finalDuration = options?.duration ?? 0;

  // Respect reduced motion: if user prefers reduced motion, make animations instant
  if (prefersReducedMotion()) {
    finalDuration = 0;
  }

  const anim = el.animate(keyframes, {
    ...options,
    duration: finalDuration,
    easing: options?.easing ?? "linear",
    fill: options?.fill ?? "forwards", // Default to 'forwards' to persist state
  });

  return anim;
}

export const animateLineDraw = (
  el: HTMLElement,
  opts?: { duration?: number; easing?: string },
): Animation | undefined => {
  if (!el) return;
  const duration = opts?.duration ?? ANIME.durations.line;
  const easing = opts?.easing ?? ANIME.easing;

  // ensure transform origin
  el.style.transformOrigin = "top";

  return runAnime(
    el,
    [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
    { duration, easing }
  );
};

export const animateEntrance = (
  el: HTMLElement,
  opts?: {
    translateY?: number;
    scale?: number;
    opacity?: number;
    duration?: number;
    easing?: string;
    delay?: number;
  },
): Animation | undefined => {
  if (!el) return;

  const duration = opts?.duration ?? ANIME.durations.entrance;
  const easing = opts?.easing ?? ANIME.fastEasing;
  const delay = opts?.delay ?? 0;

  const keyframes: Keyframe[] = [];
  const startFrame: Keyframe = { transform: "translateZ(0)", opacity: 0 };
  const endFrame: Keyframe = { transform: "translateZ(0)", opacity: 1 };

  if (opts?.translateY !== undefined) {
    startFrame.transform += ` translateY(${opts.translateY}px)`;
    endFrame.transform += ` translateY(0px)`;
  }

  if (opts?.scale !== undefined) {
    // If scale is provided, we animate from 0 or 1? 
    // Usually entrance implies appearing.
    // Let's assume scale is target scale? 
    // Or maybe we should animate FROM smaller scale?
    // Hero.tsx uses: scale: 1.2 (target?) No, animejs usually animates TO values.
    // If we want keyframes, we need start and end.
    // Let's assume we start at scale 0.8 and go to `opts.scale`? Or standard entrance is safe defaults.
    // Actually Hero.tsx usage seems to imply scaling UP to 1.2. 
    // Wait, let's look at Hero again. `animateEntrance(badgeRef, { scale: 1.2, opacity: 1 })`.
    // It probably means animate TO scale 1.2. But from what? 0? 1?
    // Given it's an entrance, 0 makes sense, or 0.5.
    // Let's implement a safe fade-in-up logic that incorporates strict params if present.

    // Simplification for WAAPI: define clear From -> To.
    // If translateY is present, we move Y.
    // If scale is present, we scale.

    if (opts.scale) {
      startFrame.transform += ` scale(0.8)`;
      endFrame.transform += ` scale(${opts.scale})`;
    }
  }

  // Override opacity if start is implied 0 -> 1
  if (opts?.opacity !== undefined) {
    endFrame.opacity = opts.opacity;
  }

  return runAnime(el, [startFrame, endFrame], {
    duration,
    easing,
    delay,
    fill: "forwards"
  });
};



export const animateHoverPop = (
  el: HTMLElement,
  opts?: { scale?: number; duration?: number },
) => {
  const scale = opts?.scale ?? 1.04;
  const duration = opts?.duration ?? 180;

  return {
    onEnter: () =>
      runAnime(
        el,
        [{ transform: `scale(${scale})` }],
        { duration, easing: ANIME.fastEasing, fill: "forwards" }
      ),
    onLeave: () =>
      runAnime(
        el,
        [{ transform: "scale(1)" }],
        { duration, easing: ANIME.fastEasing, fill: "forwards" }
      ),
  };
};

export default {
  runAnime,
  prefersReducedMotion,
  animateLineDraw,
  animateEntrance,
  animateHoverPop,
};

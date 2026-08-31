import React, { useEffect, useRef } from "react";
import { sharedNeuralNodes } from "@/lib/neural-bus";

export const PixelName: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const text = "DEVESH";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface VectorNode {
      x: number;
      y: number;
      offsetX: number;
      offsetY: number;
      vx: number;
      vy: number;
      activity: number;
      flashIntensity: number;
    }

    let particles: VectorNode[] = [];
    let sampledTextWidth = 1;
    let sampledTextHeight = 1;

    // ── Cached theme color ──
    let cachedPrimaryHsl = "230 60% 60%";

    const readPrimary = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      if (!raw) return;
      cachedPrimaryHsl = raw.includes("%")
        ? raw
        : raw.split(" ").map((v, i) => (i === 0 ? v : v + "%")).join(" ");
    };

    readPrimary();

    // Watch for .dark class toggle on <html>
    const themeObserver = new MutationObserver(() => readPrimary());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ── Sample text pixels with mathematical precision ──
    const samplePixels = () => {
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      const sampleFontSize = 32;
      offCtx.font = `900 ${sampleFontSize}px "Inter", "Satoshi", "Segoe UI", sans-serif`;
      const metrics = offCtx.measureText(text);
      const rawWidth = Math.max(1, Math.ceil(metrics.width));
      const rawHeight = Math.max(1, Math.ceil(sampleFontSize * 1.3));

      offscreen.width = rawWidth;
      offscreen.height = rawHeight;

      offCtx.fillStyle = "black";
      offCtx.fillRect(0, 0, rawWidth, rawHeight);
      offCtx.font = `900 ${sampleFontSize}px "Inter", "Satoshi", "Segoe UI", sans-serif`;
      offCtx.fillStyle = "white";
      offCtx.textBaseline = "top";
      offCtx.fillText(text, 0, 0);

      const imgData = offCtx.getImageData(0, 0, rawWidth, rawHeight).data;

      const stride = 1;
      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      const rawPoints: { gx: number; gy: number }[] = [];

      for (let y = 0; y < rawHeight; y += stride) {
        for (let x = 0; x < rawWidth; x += stride) {
          const i = (y * rawWidth + x) * 4;
          if (imgData[i] > 130) {
            const gx = x / stride;
            const gy = y / stride;
            rawPoints.push({ gx, gy });
            if (gx < minX) minX = gx;
            if (gx > maxX) maxX = gx;
            if (gy < minY) minY = gy;
            if (gy > maxY) maxY = gy;
          }
        }
      }

      if (rawPoints.length === 0) return;

      sampledTextWidth = Math.max(1, maxX - minX + 1);
      sampledTextHeight = Math.max(1, maxY - minY + 1);

      const newParticles: VectorNode[] = [];
      for (let i = 0; i < rawPoints.length; i++) {
        const nx = rawPoints[i].gx - minX;
        const ny = rawPoints[i].gy - minY;
        newParticles.push({
          x: nx,
          y: ny,
          offsetX: 0,
          offsetY: 0,
          vx: 0,
          vy: 0,
          activity: 0,
          flashIntensity: 0,
        });
      }

      particles = newParticles;
    };

    // ── Canvas sizing ──
    let animationFrameId = 0;
    let mouse = { x: -1000, y: -1000, radius: 90 };
    let running = true;
    let time = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      const parentWidth = parent?.clientWidth || window.innerWidth;
      const displayWidth = Math.max(280, Math.min(parentWidth, 750));

      const targetWidth = displayWidth * 0.96;
      const cellPitch = targetWidth / Math.max(1, sampledTextWidth);
      const totalGridHeight = sampledTextHeight * cellPitch;
      const displayHeight = Math.max(60, Math.ceil(totalGridHeight + 12));

      canvas.width = Math.round(displayWidth * window.devicePixelRatio);
      canvas.height = Math.round(displayHeight * window.devicePixelRatio);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // ── Render loop ──
    const render = () => {
      if (!running) return;
      time += 0.02;

      const dpr = window.devicePixelRatio;
      const dWidth = parseFloat(canvas.style.width || "300");
      const dHeight = parseFloat(canvas.style.height || "100");

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, dWidth, dHeight);

      if (particles.length > 0) {
        const targetWidth = dWidth * 0.96;
        const cellPitch = targetWidth / Math.max(1, sampledTextWidth);
        const totalGridWidth = sampledTextWidth * cellPitch;
        const totalGridHeight = sampledTextHeight * cellPitch;

        const offsetX = (dWidth - totalGridWidth) / 2;
        const offsetY = (dHeight - totalGridHeight) / 2;

        const influenceRadius = mouse.radius;
        const blockSize = Math.max(2, cellPitch * 0.72);

        // Get canvas offset relative to the section (NeuralBackground canvas space)
        const canvasRect = canvas.getBoundingClientRect();
        const section = canvas.closest("section");
        const sectionRect = section ? section.getBoundingClientRect() : canvasRect;
        const toSectionX = canvasRect.left - sectionRect.left;
        const toSectionY = canvasRect.top - sectionRect.top;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const originX = offsetX + p.x * cellPitch + cellPitch / 2;
          const originY = offsetY + p.y * cellPitch + cellPitch / 2;

          // Subtle organic micro-breathing (subpixel precision)
          const waveX = Math.cos(time * 0.8 + p.x * 0.15 + p.y * 0.1) * 0.2;
          const waveY = Math.sin(time * 0.8 + p.y * 0.15 + p.x * 0.1) * 0.2;

          const curX = originX + p.offsetX;
          const curY = originY + p.offsetY;
          const dx = mouse.x - curX;
          const dy = mouse.y - curY;
          const r = Math.hypot(dx, dy);

          // 1. Mouse Interaction Activation & Magnetic Vector Attraction
          let magX = 0;
          let magY = 0;
          if (r < influenceRadius && r > 0.001) {
            const q = 1 - (r / influenceRadius);
            p.activity = Math.min(p.activity + q * 0.25, 1);

            // Gentle magnetic attraction towards cursor (collects towards mouse)
            const pullStrength = q * q * 5.2;
            magX = (dx / r) * pullStrength;
            magY = (dy / r) * pullStrength;
          } else {
            p.activity = Math.max(p.activity - 0.04, 0);
          }

          // 2. Exact 1:1 Background Neural Node Detection
          // Map this particle's position to NeuralBackground's coordinate space
          const globalParticleX = curX + toSectionX;
          const globalParticleY = curY + toSectionY;

          // Check if any actual background neural node is passing behind this exact dot
          for (let n = 0; n < sharedNeuralNodes.length; n++) {
            const node = sharedNeuralNodes[n];
            const dist = Math.hypot(node.x - globalParticleX, node.y - globalParticleY);
            if (dist < 26) {
              const boost = (1 - dist / 26);
              // Flash bright on passage
              p.flashIntensity = Math.max(p.flashIntensity, boost);
            }
          }

          // Soft 0.3s fading ripple tail
          p.flashIntensity = Math.max(0, p.flashIntensity - 0.045);

          // Smooth elastic spring physics (attracts on hover, smoothly recovers to origin)
          const targetOffsetX = waveX + magX;
          const targetOffsetY = waveY + magY;

          p.vx = (p.vx + (targetOffsetX - p.offsetX) * 0.14) * 0.78;
          p.vy = (p.vy + (targetOffsetY - p.offsetY) * 0.14) * 0.78;
          p.offsetX += p.vx;
          p.offsetY += p.vy;

          // Final alpha: stable base + mouse/flash boost
          const totalIntensity = Math.min(1, p.activity + p.flashIntensity);
          const alpha = 0.44 + totalIntensity * 0.56;

          ctx.fillStyle = `hsl(${cachedPrimaryHsl} / ${alpha})`;
          ctx.fillRect(
            curX - blockSize / 2,
            curY - blockSize / 2,
            blockSize,
            blockSize
          );
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // ── Bootstrap ──
    handleResize();

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Sample with whatever font is available RIGHT NOW, then start rendering
    samplePixels();
    handleResize();
    render();

    // Re-sample once fonts are fully loaded (metrics improve)
    document.fonts.ready.then(() => {
      samplePixels();
      handleResize();
    });

    return () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center my-1 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="cursor-crosshair block"
      />
    </div>
  );
};

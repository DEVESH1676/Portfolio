import React, { useEffect, useRef } from "react";
import { sharedNeuralNodes } from "@/lib/neural-bus";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  size: number;
  type: "ambient" | "perimeter" | "streamer";
  phase: number;
  speed: number;
  ampX: number;
  ampY: number;
}

interface BackgroundSynapse {
  nodeA: number;
  nodeB: number;
  progress: number;
  speed: number;
}

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    let synapses: BackgroundSynapse[] = [];
    let running = true;
    let time = 0;
    const connectionDistance = 145;
    const mouseRadius = 200;
    const mouseStrength = 0.04;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Cached theme color ──
    let cachedPrimaryColor = "230 60% 60%";

    const readPrimary = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      if (!raw) return;
      cachedPrimaryColor = raw.includes("%")
        ? raw
        : raw.split(" ").map((v, i) => (i === 0 ? v : v + "%")).join(" ");
    };

    readPrimary();

    const themeObserver = new MutationObserver(() => readPrimary());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ── Sizing ──
    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || window.innerWidth;
      const h = parent?.clientHeight || window.innerHeight;
      canvas.width = Math.max(300, w);
      canvas.height = Math.max(300, h);
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      const w = canvas.width;
      const h = canvas.height;
      const nameCenterX = w / 2;
      const nameCenterY = h * 0.41;

      // 1. Ambient Background Grid (Covers whole home section)
      const cols = Math.max(4, Math.floor(w / 140));
      const rows = Math.max(3, Math.floor(h / 140));
      const cellW = w / cols;
      const cellH = h / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = (c + 0.3 + Math.random() * 0.4) * cellW;
          const oy = (r + 0.3 + Math.random() * 0.4) * cellH;
          nodes.push({
            x: ox,
            y: oy,
            originX: ox,
            originY: oy,
            vx: 0,
            vy: 0,
            size: 1.8 + Math.random() * 0.8,
            type: "ambient",
            phase: Math.random() * Math.PI * 2,
            speed: 0.008 + Math.random() * 0.008,
            ampX: 18 + Math.random() * 16,
            ampY: 14 + Math.random() * 14,
          });
        }
      }

      // 2. Perimeter Constellation (Encircling DEVESH)
      const perimeterCount = Math.max(10, Math.min(18, Math.floor(w / 70)));
      for (let i = 0; i < perimeterCount; i++) {
        const angle = (i / perimeterCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
        const radX = Math.min(w * 0.42, 260 + Math.random() * 80);
        const radY = Math.min(h * 0.22, 75 + Math.random() * 35);
        const ox = nameCenterX + Math.cos(angle) * radX;
        const oy = nameCenterY + Math.sin(angle) * radY;
        nodes.push({
          x: ox,
          y: oy,
          originX: ox,
          originY: oy,
          vx: 0,
          vy: 0,
          size: 2.2 + Math.random() * 0.6,
          type: "perimeter",
          phase: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.008,
          ampX: 12 + Math.random() * 10,
          ampY: 10 + Math.random() * 8,
        });
      }

      // 3. Transiting Streamer Nodes (Passing through DEVESH to create flash effect)
      const streamerCount = 5;
      for (let s = 0; s < streamerCount; s++) {
        nodes.push({
          x: nameCenterX,
          y: nameCenterY,
          originX: nameCenterX,
          originY: nameCenterY,
          vx: 0,
          vy: 0,
          size: 2.6,
          type: "streamer",
          phase: (s / streamerCount) * Math.PI * 2,
          speed: 0.009 + (s % 2 === 0 ? 0.003 : -0.002),
          ampX: Math.min(w * 0.38, 290),
          ampY: 50 + (s % 3) * 15,
        });
      }

      // Pre-allocate traveling synaptic impulses
      synapses = [];
      for (let s = 0; s < 16; s++) {
        synapses.push({
          nodeA: Math.floor(Math.random() * nodes.length),
          nodeB: Math.floor(Math.random() * nodes.length),
          progress: Math.random(),
          speed: 0.01 + Math.random() * 0.014,
        });
      }
    };

    // ── Draw loop ──
    const draw = () => {
      if (!running) return;
      time += 0.02;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const primaryColor = cachedPrimaryColor;
      const lineBaseOpacity = 0.32;
      const nodeBaseOpacity = 0.65;
      const nameCenterX = canvas.width / 2;
      const nameCenterY = canvas.height * 0.41;

      ctx.lineWidth = 1.35;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          let targetX = node.originX;
          let targetY = node.originY;

          if (node.type === "ambient" || node.type === "perimeter") {
            // Harmonic orbital oscillation around organized anchor point
            targetX = node.originX + Math.sin(time * node.speed * 50 + node.phase) * node.ampX;
            targetY = node.originY + Math.cos(time * node.speed * 40 + node.phase) * node.ampY;
          } else if (node.type === "streamer") {
            // Smooth Lissajous curve gliding right through DEVESH center
            const t = time * node.speed * 45 + node.phase;
            targetX = nameCenterX + Math.sin(t) * node.ampX;
            targetY = nameCenterY + Math.sin(t * 2 + node.phase) * node.ampY;
          }

          // Elastic spring motion back to designated places
          node.x += (targetX - node.x) * 0.05;
          node.y += (targetY - node.y) * 0.05;

          // Mouse interaction
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouseRadius && distance > 0) {
            const force = (mouseRadius - distance) / mouseRadius;
            node.x -= (dx / distance) * force * 35 * mouseStrength * 15;
            node.y -= (dy / distance) * force * 35 * mouseStrength * 15;
          }
        }

        // Draw Vector Vertex Node
        ctx.fillStyle = `hsl(${primaryColor} / ${nodeBaseOpacity})`;
        ctx.fillRect(node.x - node.size / 2, node.y - node.size / 2, node.size, node.size);

        // Sync node position to shared bus
        if (!sharedNeuralNodes[i]) {
          sharedNeuralNodes[i] = { x: node.x, y: node.y, vx: node.vx, vy: node.vy };
        } else {
          sharedNeuralNodes[i].x = node.x;
          sharedNeuralNodes[i].y = node.y;
          sharedNeuralNodes[i].vx = node.vx;
          sharedNeuralNodes[i].vy = node.vy;
        }

        // Draw Connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < connectionDistance) {
            const lineAlpha = (1 - distance / connectionDistance) * lineBaseOpacity;
            ctx.strokeStyle = `hsl(${primaryColor} / ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      // Draw Synaptic Impulses traveling along connections
      for (let s = 0; s < synapses.length; s++) {
        const syn = synapses[s];
        if (syn.nodeA >= nodes.length || syn.nodeB >= nodes.length) continue;
        const nA = nodes[syn.nodeA];
        const nB = nodes[syn.nodeB];
        const d = Math.hypot(nA.x - nB.x, nA.y - nB.y);

        if (d < connectionDistance) {
          syn.progress += syn.speed;
          if (syn.progress >= 1) {
            syn.progress = 0;
            syn.nodeA = Math.floor(Math.random() * nodes.length);
            syn.nodeB = Math.floor(Math.random() * nodes.length);
          }

          const sx = nA.x + (nB.x - nA.x) * syn.progress;
          const sy = nA.y + (nB.y - nA.y) * syn.progress;
          ctx.fillStyle = `hsl(${primaryColor} / 0.85)`;
          ctx.fillRect(sx - 1.25, sy - 1.25, 2.5, 2.5);
        } else {
          // Re-pick connected pair
          syn.progress = 0;
          syn.nodeA = Math.floor(Math.random() * nodes.length);
          syn.nodeB = Math.floor(Math.random() * nodes.length);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Mouse handlers on window (not canvas) so pointer-events-none works
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const resizeObserver = new ResizeObserver(() => resize());

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resize();
    draw();

    return () => {
      running = false;
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

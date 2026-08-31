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
    const connectionDistance = 140;
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
      const nodeCount = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        nodes.push({
          x, y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          size: 1.8 + Math.random() * 0.8,
        });
      }

      // Pre-allocate traveling synaptic impulses
      synapses = [];
      for (let s = 0; s < 12; s++) {
        synapses.push({
          nodeA: Math.floor(Math.random() * Math.max(1, nodes.length)),
          nodeB: Math.floor(Math.random() * Math.max(1, nodes.length)),
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.007,
        });
      }
    };

    // ── Draw loop ──
    const draw = () => {
      if (!running) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const primaryColor = cachedPrimaryColor;
      const lineBaseOpacity = 0.32;
      const nodeBaseOpacity = 0.65;

      ctx.lineWidth = 1.35;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.originX += node.vx;
          node.originY += node.vy;

          if (node.originX < 0 || node.originX > canvas.width) node.vx *= -1;
          if (node.originY < 0 || node.originY > canvas.height) node.vy *= -1;

          node.x += (node.originX - node.x) * 0.02;
          node.y += (node.originY - node.y) * 0.02;

          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            node.x += dx * force * mouseStrength;
            node.y += dy * force * mouseStrength;
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

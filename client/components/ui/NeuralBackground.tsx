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
  magnitude: number; // 0: minor vertex, 1: major constellation star
  connections: number[]; // Active constellation neighbor indices
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
    const connectionDistance = 150;
    const maxConnectionsPerNode = 3;
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
      const nodeCount = Math.floor((canvas.width * canvas.height) / 11500);
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const isMajorStar = Math.random() < 0.28;
        nodes.push({
          x, y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          size: isMajorStar ? 2.6 : 1.7 + Math.random() * 0.6,
          magnitude: isMajorStar ? 1 : 0,
          connections: [],
        });
      }

      // Pre-allocate traveling synaptic impulses
      synapses = [];
      for (let s = 0; s < 14; s++) {
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
      const lineBaseOpacity = 0.35;
      const nodeBaseOpacity = 0.68;

      ctx.lineWidth = 1.35;

      // 1. Update node physics & clear connection lists
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.connections = [];

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

        // Sync node position to shared bus for DEVESH letter interaction
        if (!sharedNeuralNodes[i]) {
          sharedNeuralNodes[i] = { x: node.x, y: node.y, vx: node.vx, vy: node.vy };
        } else {
          sharedNeuralNodes[i].x = node.x;
          sharedNeuralNodes[i].y = node.y;
          sharedNeuralNodes[i].vx = node.vx;
          sharedNeuralNodes[i].vy = node.vy;
        }
      }

      // 2. Build Constellation Network Topology (Dynamic nearest neighbors per star)
      const drawnLinks = new Set<string>();

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Find nearest candidates within range
        const candidates: { index: number; dist: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < connectionDistance) {
            candidates.push({ index: j, dist });
          }
        }

        // Sort by distance to prioritize closest constellation bonds
        candidates.sort((a, b) => a.dist - b.dist);

        // Link up to maxConnectionsPerNode nearest stars
        const linksToMake = Math.min(candidates.length, maxConnectionsPerNode);
        for (let k = 0; k < linksToMake; k++) {
          const { index: j, dist } = candidates[k];
          node.connections.push(j);

          const linkKey = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!drawnLinks.has(linkKey)) {
            drawnLinks.add(linkKey);

            // Smooth cosine ease-out for fading in and smoothly losing connections as nodes drift
            const normalized = dist / connectionDistance;
            const ease = Math.cos(normalized * (Math.PI / 2));
            const lineAlpha = ease * ease * lineBaseOpacity;

            ctx.strokeStyle = `hsl(${primaryColor} / ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw Constellation Star Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const isMajor = node.magnitude === 1;

        if (isMajor) {
          // Major constellation star: vertex dot + delicate cross sparkle
          ctx.fillStyle = `hsl(${primaryColor} / ${nodeBaseOpacity + 0.15})`;
          ctx.fillRect(node.x - node.size / 2, node.y - node.size / 2, node.size, node.size);

          // Subtle diamond glow accent
          ctx.fillStyle = `hsl(${primaryColor} / 0.3)`;
          ctx.fillRect(node.x - node.size * 1.2, node.y - 0.5, node.size * 2.4, 1);
          ctx.fillRect(node.x - 0.5, node.y - node.size * 1.2, 1, node.size * 2.4);
        } else {
          // Minor network node
          ctx.fillStyle = `hsl(${primaryColor} / ${nodeBaseOpacity})`;
          ctx.fillRect(node.x - node.size / 2, node.y - node.size / 2, node.size, node.size);
        }
      }

      // 4. Draw Traveling Synaptic Impulses across active constellation routes
      for (let s = 0; s < synapses.length; s++) {
        const syn = synapses[s];
        if (syn.nodeA >= nodes.length || syn.nodeB >= nodes.length) continue;
        const nA = nodes[syn.nodeA];
        const nB = nodes[syn.nodeB];
        const d = Math.hypot(nA.x - nB.x, nA.y - nB.y);

        // Check if connection is still active in current constellation topology
        const isConnected = d < connectionDistance && nA.connections.includes(syn.nodeB);

        if (isConnected) {
          syn.progress += syn.speed;
          if (syn.progress >= 1) {
            syn.progress = 0;
            // Hop to next connected constellation neighbor
            syn.nodeA = syn.nodeB;
            if (nB.connections.length > 0) {
              const nextIdx = Math.floor(Math.random() * nB.connections.length);
              syn.nodeB = nB.connections[nextIdx];
            } else {
              syn.nodeA = Math.floor(Math.random() * nodes.length);
              syn.nodeB = Math.floor(Math.random() * nodes.length);
            }
          }

          const sx = nA.x + (nB.x - nA.x) * syn.progress;
          const sy = nA.y + (nB.y - nA.y) * syn.progress;
          ctx.fillStyle = `hsl(${primaryColor} / 0.88)`;
          ctx.fillRect(sx - 1.25, sy - 1.25, 2.5, 2.5);
        } else {
          // Find a valid active connection to jump onto
          if (nA.connections.length > 0) {
            syn.progress = 0;
            syn.nodeB = nA.connections[Math.floor(Math.random() * nA.connections.length)];
          } else {
            syn.progress = 0;
            syn.nodeA = Math.floor(Math.random() * nodes.length);
            const chosen = nodes[syn.nodeA];
            syn.nodeB = chosen.connections.length > 0 
              ? chosen.connections[Math.floor(Math.random() * chosen.connections.length)] 
              : Math.floor(Math.random() * nodes.length);
          }
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

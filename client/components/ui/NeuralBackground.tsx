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

interface LongRangeBridge {
  nodeA: number;
  nodeB: number;
  alpha: number;
  targetAlpha: number;
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
    let bridges: LongRangeBridge[] = [];
    let running = true;
    const connectionDistance = 145;
    const maxConnectionsPerNode = 3;
    const maxBridgeDistance = 420;
    const bridgeCount = 14;
    const mouseRadius = 200;
    const mouseStrength = 0.04;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ── Cached theme color ──
    let cachedPrimaryColor = "230 60% 60%";

    const readPrimary = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      if (!raw) return;
      cachedPrimaryColor = raw.includes("%")
        ? raw
        : raw
            .split(" ")
            .map((v, i) => (i === 0 ? v : v + "%"))
            .join(" ");
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
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          size: isMajorStar ? 2.6 : 1.7 + Math.random() * 0.6,
          magnitude: isMajorStar ? 1 : 0,
          connections: [],
        });
      }

      // Pre-allocate 12-15 persistent long-range constellation backbone bridges
      bridges = [];
      if (nodes.length > 3) {
        for (let b = 0; b < bridgeCount; b++) {
          const a = Math.floor(Math.random() * nodes.length);
          let bIdx =
            (a + 1 + Math.floor(Math.random() * (nodes.length - 1))) %
            nodes.length;

          // Find a pair with meaningful distance
          for (let attempt = 0; attempt < 8; attempt++) {
            const candidate = Math.floor(Math.random() * nodes.length);
            if (candidate === a) continue;
            const d = Math.hypot(
              nodes[a].x - nodes[candidate].x,
              nodes[a].y - nodes[candidate].y,
            );
            if (d > 160 && d < 380) {
              bIdx = candidate;
              break;
            }
          }

          bridges.push({
            nodeA: a,
            nodeB: bIdx,
            alpha: 0.22,
            targetAlpha: 0.22,
          });
        }
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

    // ── Intersection Observer for Performance ──
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0 },
    );

    if (canvas.parentElement) {
      visibilityObserver.observe(canvas.parentElement);
    }

    // ── Draw loop ──
    const draw = () => {
      if (!running) return;

      if (isVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const primaryColor = cachedPrimaryColor;
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
            sharedNeuralNodes[i] = {
              x: node.x,
              y: node.y,
              vx: node.vx,
              vy: node.vy,
            };
          } else {
            sharedNeuralNodes[i].x = node.x;
            sharedNeuralNodes[i].y = node.y;
            sharedNeuralNodes[i].vx = node.vx;
            sharedNeuralNodes[i].vy = node.vy;
          }
        }

        // 2. Build Constellation Network Topology & Dual-Tier Line System
        const drawnLinks = new Set<string>();
        const ambientDistance = 185;

        // 2a. Draw Ambient Light Lines (Faint background neural matrix)
        ctx.lineWidth = 0.9;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dist = Math.hypot(node.x - other.x, node.y - other.y);

            if (dist < ambientDistance) {
              const norm = dist / ambientDistance;
              const faintAlpha = Math.cos(norm * (Math.PI / 2)) * 0.12;
              if (faintAlpha > 0.01) {
                ctx.strokeStyle = `hsl(${primaryColor} / ${faintAlpha})`;
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
              }
            }
          }
        }

        // 2b. Draw Bright Active Links (Symbolizes established constellation bonds)
        ctx.lineWidth = 1.45;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          // Find nearest candidates within active connection range
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
          const linksToMake = Math.min(
            candidates.length,
            maxConnectionsPerNode,
          );
          for (let k = 0; k < linksToMake; k++) {
            const { index: j, dist } = candidates[k];
            node.connections.push(j);

            const linkKey = i < j ? `${i}-${j}` : `${j}-${i}`;
            if (!drawnLinks.has(linkKey)) {
              drawnLinks.add(linkKey);

              // Silky smooth cosine ease-out for link/unlink transitions
              const normalized = dist / connectionDistance;
              const ease = Math.cos(normalized * (Math.PI / 2));
              const activeAlpha = ease * ease * 0.52;

              ctx.strokeStyle = `hsl(${primaryColor} / ${activeAlpha})`;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }

        // 3. Draw Persistent Long-Range Backbone Bridges (10-15 stable far connections)
        for (let b = 0; b < bridges.length; b++) {
          const bridge = bridges[b];
          if (bridge.nodeA >= nodes.length || bridge.nodeB >= nodes.length)
            continue;

          const nA = nodes[bridge.nodeA];
          const nB = nodes[bridge.nodeB];
          const dist = Math.hypot(nA.x - nB.x, nA.y - nB.y);

          if (dist < maxBridgeDistance) {
            const norm = dist / maxBridgeDistance;
            bridge.targetAlpha = Math.cos(norm * (Math.PI / 2)) * 0.28;
          } else {
            bridge.targetAlpha = 0;
          }

          // Smooth continuous gradual fade without flickering
          bridge.alpha += (bridge.targetAlpha - bridge.alpha) * 0.02;

          // If completely faded out, gracefully re-anchor to another distant node
          if (bridge.alpha < 0.01 && bridge.targetAlpha === 0) {
            const newA = Math.floor(Math.random() * nodes.length);
            for (let attempt = 0; attempt < 8; attempt++) {
              const candidate = Math.floor(Math.random() * nodes.length);
              if (candidate === newA) continue;
              const d = Math.hypot(
                nodes[newA].x - nodes[candidate].x,
                nodes[newA].y - nodes[candidate].y,
              );
              if (d > 180 && d < 340) {
                bridge.nodeA = newA;
                bridge.nodeB = candidate;
                bridge.alpha = 0;
                break;
              }
            }
          }

          if (bridge.alpha > 0.01) {
            nA.connections.push(bridge.nodeB);
            nB.connections.push(bridge.nodeA);

            const linkKey =
              bridge.nodeA < bridge.nodeB
                ? `${bridge.nodeA}-${bridge.nodeB}`
                : `${bridge.nodeB}-${bridge.nodeA}`;

            if (!drawnLinks.has(linkKey)) {
              drawnLinks.add(linkKey);
              ctx.strokeStyle = `hsl(${primaryColor} / ${bridge.alpha})`;
              ctx.beginPath();
              ctx.moveTo(nA.x, nA.y);
              ctx.lineTo(nB.x, nB.y);
              ctx.stroke();
            }
          }
        }

        // 4. Draw Constellation Star Nodes
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const isMajor = node.magnitude === 1;

          if (isMajor) {
            // Major constellation star: vertex dot + delicate cross sparkle
            ctx.fillStyle = `hsl(${primaryColor} / ${nodeBaseOpacity + 0.15})`;
            ctx.fillRect(
              node.x - node.size / 2,
              node.y - node.size / 2,
              node.size,
              node.size,
            );

            // Subtle diamond glow accent
            ctx.fillStyle = `hsl(${primaryColor} / 0.35)`;
            ctx.fillRect(
              node.x - node.size * 1.3,
              node.y - 0.5,
              node.size * 2.6,
              1,
            );
            ctx.fillRect(
              node.x - 0.5,
              node.y - node.size * 1.3,
              1,
              node.size * 2.6,
            );
          } else {
            // Minor network node
            ctx.fillStyle = `hsl(${primaryColor} / ${nodeBaseOpacity})`;
            ctx.fillRect(
              node.x - node.size / 2,
              node.y - node.size / 2,
              node.size,
              node.size,
            );
          }
        }

        // 5. Draw Traveling Synaptic Flash Pulses across active links
        for (let s = 0; s < synapses.length; s++) {
          const syn = synapses[s];
          if (syn.nodeA >= nodes.length || syn.nodeB >= nodes.length) continue;
          const nA = nodes[syn.nodeA];
          const nB = nodes[syn.nodeB];
          const d = Math.hypot(nA.x - nB.x, nA.y - nB.y);

          // Check if connection is still active in current constellation topology
          const isConnected =
            d < maxBridgeDistance && nA.connections.includes(syn.nodeB);

          if (isConnected) {
            syn.progress += syn.speed;
            if (syn.progress >= 1) {
              syn.progress = 0;
              // Hop to next connected constellation neighbor
              syn.nodeA = syn.nodeB;
              if (nB.connections.length > 0) {
                const nextIdx = Math.floor(
                  Math.random() * nB.connections.length,
                );
                syn.nodeB = nB.connections[nextIdx];
              } else {
                syn.nodeA = Math.floor(Math.random() * nodes.length);
                syn.nodeB = Math.floor(Math.random() * nodes.length);
              }
            }

            // Draw Flash Pulse head
            const sx = nA.x + (nB.x - nA.x) * syn.progress;
            const sy = nA.y + (nB.y - nA.y) * syn.progress;

            // Traveling beam head (bright laser flash)
            ctx.fillStyle = `hsl(${primaryColor} / 0.95)`;
            ctx.fillRect(sx - 1.5, sy - 1.5, 3, 3);

            // Subtle glowing tail behind the flash
            const tailProgress = Math.max(0, syn.progress - 0.12);
            const tx = nA.x + (nB.x - nA.x) * tailProgress;
            const ty = nA.y + (nB.y - nA.y) * tailProgress;
            ctx.strokeStyle = `hsl(${primaryColor} / 0.45)`;
            ctx.lineWidth = 2.0;
            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(sx, sy);
            ctx.stroke();
          } else {
            // Find a valid active connection to jump onto
            if (nA.connections.length > 0) {
              syn.progress = 0;
              syn.nodeB =
                nA.connections[
                  Math.floor(Math.random() * nA.connections.length)
                ];
            } else {
              syn.progress = 0;
              syn.nodeA = Math.floor(Math.random() * nodes.length);
              const chosen = nodes[syn.nodeA];
              syn.nodeB =
                chosen.connections.length > 0
                  ? chosen.connections[
                      Math.floor(Math.random() * chosen.connections.length)
                    ]
                  : Math.floor(Math.random() * nodes.length);
            }
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

    const parent = canvas.parentElement;

    if (parent) {
      resizeObserver.observe(parent);
      visibilityObserver.observe(parent);
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    resize();
    draw();

    return () => {
      running = false;
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 75%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 75%, transparent 100%)",
      }}
    />
  );
};

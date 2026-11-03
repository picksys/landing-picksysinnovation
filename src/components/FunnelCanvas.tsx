import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/motion';

/**
 * Hero visual: particles ("visitors") fall into a 3D-looking funnel,
 * change color as they qualify, and converge into a glowing "customer" core.
 *
 * Two layouts driven by the canvas' own size:
 *  - wide (desktop): full-bleed background, funnel on the right, labels on the side
 *  - compact (mobile): dedicated stage, centered funnel, labels top / side / bottom
 *
 * Interaction: pointer repels particles, tap/click bursts them, scrolling speeds the flow.
 * Pure Canvas 2D, paused when offscreen or tab hidden, DPR capped.
 */
type P = { x: number; y: number; px: number; py: number; vx: number; vy: number; s: number; seed: number };
type Pulse = { x: number; y: number; r: number; a: number; flat: number; color: string };

const STOPS: [number, number, number][] = [
  [59, 232, 255], // cyan   — engineering
  [139, 92, 255], // violet
  [255, 181, 71], // amber  — sales
];
const PALETTE = Array.from({ length: 48 }, (_, i) => {
  const t = i / 47;
  const seg = t < 0.5 ? 0 : 1;
  const k = seg === 0 ? t / 0.5 : (t - 0.5) / 0.5;
  const a = STOPS[seg];
  const b = STOPS[seg + 1];
  const c = a.map((v, j) => Math.round(v + (b[j] - v) * k));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
});

export default function FunnelCanvas({ labels }: { labels: string[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef(labels);
  const redrawLayer = useRef<() => void>(() => {});

  useEffect(() => {
    labelsRef.current = labels;
    redrawLayer.current();
  }, [labels]);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    const layer = document.createElement('canvas');
    const lctx = layer.getContext('2d')!;
    const reduced = prefersReducedMotion();

    let W = 0, H = 0, dpr = 1, cx = 0, top = 0, neck = 0, core = 0, topW = 0, neckW = 0;
    let compact = false;
    let particles: P[] = [];
    let pulses: Pulse[] = [];
    let raf = 0, running = false, visible = true, time = 0, boost = 0;
    const mouse = { x: -9999, y: -9999 };

    const halfWidth = (y: number) => {
      const t = Math.min(1, Math.max(0, (y - top) / (neck - top)));
      return topW * Math.pow(1 - t, 1.7) + neckW;
    };

    const spawn = (p: P, initial = false) => {
      p.x = cx + (Math.random() * 2 - 1) * topW * 1.05;
      p.y = initial ? top + Math.random() * (core - top) : top - 20 - Math.random() * H * (compact ? 0.15 : 0.25);
      p.px = p.x;
      p.py = p.y;
      p.vx = (Math.random() - 0.5) * 0.4;
      p.vy = 0.4 + Math.random() * 0.6;
      p.s = (compact ? 1 : 0.8) + Math.random() * 1.6;
      p.seed = Math.random() * 1000;
    };

    const drawLabel = (text: string, x: number, y: number, align: CanvasTextAlign, highlight: boolean, line?: [number, number]) => {
      if (line) {
        lctx.globalAlpha = 0.45;
        lctx.strokeStyle = 'rgba(255,255,255,0.6)';
        lctx.setLineDash([2, 4]);
        lctx.beginPath();
        lctx.moveTo(line[0], y);
        lctx.lineTo(line[1], y);
        lctx.stroke();
        lctx.setLineDash([]);
      }
      lctx.globalAlpha = highlight ? 0.95 : 0.75;
      lctx.fillStyle = highlight ? '#FFC870' : '#C9CEDA';
      lctx.textAlign = align;
      lctx.fillText(text.toUpperCase(), x, y);
    };

    const drawLayer = () => {
      layer.width = W * dpr;
      layer.height = H * dpr;
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.clearRect(0, 0, W, H);
      // elliptical rings → 3D funnel
      const rings = compact ? 11 : 14;
      for (let i = 0; i <= rings; i++) {
        const t = i / rings;
        const y = top + (neck - top) * Math.pow(t, 0.9);
        const w = halfWidth(y);
        const g = lctx.createLinearGradient(cx - w, 0, cx + w, 0);
        const col = PALETTE[Math.round(t * 47)];
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(0.5, col);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        lctx.strokeStyle = g;
        lctx.globalAlpha = (compact ? 0.16 : 0.1) + t * 0.24;
        lctx.lineWidth = 1;
        lctx.beginPath();
        lctx.ellipse(cx, y, w, Math.max(2, w * 0.18), 0, 0, Math.PI * 2);
        lctx.stroke();
      }
      // side curves
      lctx.globalAlpha = compact ? 0.5 : 0.35;
      for (const side of [-1, 1]) {
        const g = lctx.createLinearGradient(0, top, 0, neck);
        g.addColorStop(0, 'rgba(59,232,255,0.15)');
        g.addColorStop(0.4, 'rgba(139,92,255,0.75)');
        g.addColorStop(1, 'rgba(255,181,71,0.95)');
        lctx.strokeStyle = g;
        lctx.beginPath();
        for (let y = top; y <= neck; y += 3) {
          const x = cx + side * halfWidth(y);
          y === top ? lctx.moveTo(x, y) : lctx.lineTo(x, y);
        }
        lctx.stroke();
      }
      // core glow
      lctx.globalAlpha = 1;
      const gr = compact ? 60 : 70;
      const rg = lctx.createRadialGradient(cx, core, 0, cx, core, gr);
      rg.addColorStop(0, 'rgba(255,200,110,0.6)');
      rg.addColorStop(0.35, 'rgba(255,150,60,0.2)');
      rg.addColorStop(1, 'rgba(255,120,40,0)');
      lctx.fillStyle = rg;
      lctx.fillRect(cx - gr, core - gr, gr * 2, gr * 2);

      // labels
      const [l0, l1, l2] = labelsRef.current;
      lctx.textBaseline = 'middle';
      lctx.lineWidth = 1;
      if (compact) {
        lctx.font = '600 10.5px "Inter Variable", system-ui, sans-serif';
        if ('letterSpacing' in lctx) (lctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '1.5px';
        drawLabel(l0, cx, top - 22, 'center', false);
        const ly = top + (neck - top) * 0.56;
        const edge = cx + halfWidth(ly);
        drawLabel(l1, edge + 30, ly, 'left', false, [edge + 6, edge + 24]);
        drawLabel(l2, cx, core + 30, 'center', true);
      } else {
        lctx.font = '500 12px "Inter Variable", system-ui, sans-serif';
        const lv = [0.12, 0.55];
        [l0, l1].forEach((label, i) => {
          const y = top + (neck - top) * lv[i];
          const x = cx + halfWidth(y) + 28;
          drawLabel(label, x, y, 'left', false, [x - 22, x - 6]);
        });
        drawLabel(l2, cx + 62, core, 'left', true, [cx + 40, cx + 56]);
      }
      lctx.globalAlpha = 1;
    };
    redrawLayer.current = () => {
      if (W) drawLayer();
      if (reduced || !running) render();
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      if (!W || !H) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      compact = W < 900;
      if (compact) {
        cx = W * 0.5;
        top = H * 0.16;
        neck = H * 0.7;
        core = neck + H * 0.1;
        topW = Math.min(W * 0.36, 210);
        neckW = 5;
      } else {
        cx = W * 0.75;
        top = H * 0.16;
        neck = H * 0.7;
        core = neck + H * 0.09;
        topW = Math.min(W * 0.2, 300);
        neckW = 6;
      }
      const count = compact ? Math.round(Math.min(130, Math.max(100, W * 0.3))) : Math.round(Math.min(160, Math.max(90, (W * H) / 9000)));
      particles = Array.from({ length: count }, () => {
        const p = {} as P;
        spawn(p, true);
        return p;
      });
      pulses = [];
      drawLayer();
    };

    const step = () => {
      time += 0.016;
      boost *= 0.94;
      const g = 0.012 + boost * 0.02;
      for (const p of particles) {
        p.px = p.x;
        p.py = p.y;
        const w = halfWidth(p.y);
        // gravity & gentle swirl
        p.vy += g + (p.y > neck ? 0.03 : 0);
        p.vx += Math.sin(time * 1.3 + p.seed) * 0.018;
        if (p.y > top - 10) {
          const dx = p.x - cx;
          const out = Math.abs(dx) - w;
          if (out > 0) {
            // walls: ease back inside by position (no velocity spikes → no streaks)
            p.x -= Math.sign(dx) * out * (boost > 0.3 ? 0.04 : 0.1);
            p.vx *= 0.9;
          }
          p.vx -= dx * 0.0009;
        }
        // pointer repulsion
        const mx = p.x - mouse.x, my = p.y - mouse.y;
        const d2 = mx * mx + my * my;
        if (d2 < 9000) {
          const f = (1 - d2 / 9000) * 0.9;
          const d = Math.sqrt(d2) || 1;
          p.vx += (mx / d) * f;
          p.vy += (my / d) * f * 0.4;
        }
        p.vx *= 0.96;
        const vmax = 2.4 + boost * 4;
        if (p.vx > vmax) p.vx = vmax;
        else if (p.vx < -vmax) p.vx = -vmax;
        p.vy = Math.min(p.vy * 0.985, 5 + boost * 3);
        if (p.y > neck) {
          // through the neck: glide smoothly to the center instead of oscillating
          p.vx *= 0.7;
          p.x += (cx - p.x) * 0.12;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > core) {
          if (Math.random() < 0.14 && pulses.length < 6) pulses.push({ x: cx, y: core, r: 6, a: 0.75, flat: 0.35, color: '#FFC870' });
          spawn(p);
        } else if (p.y < -H * 0.5) {
          spawn(p);
        }
      }
      for (const pl of pulses) {
        pl.r += pl.flat < 1 ? 1.6 : 3.2;
        pl.a *= pl.flat < 1 ? 0.94 : 0.92;
      }
      pulses = pulses.filter((pl) => pl.a > 0.02);
    };

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(layer, 0, 0, W, H);
      ctx.lineCap = 'round';
      const trail = 2 + boost * 2;
      for (const p of particles) {
        const t = Math.min(1, Math.max(0, (p.y - top) / (core - top)));
        ctx.strokeStyle = PALETTE[Math.round(t * 47)];
        ctx.globalAlpha = p.y < top ? Math.max(0, 0.4 + (p.y - top) / 120) : 0.6 + t * 0.4;
        ctx.lineWidth = p.s;
        ctx.beginPath();
        ctx.moveTo(p.px - p.vx * trail, p.py - p.vy * trail);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      ctx.lineWidth = 1.2;
      for (const pl of pulses) {
        ctx.globalAlpha = pl.a;
        ctx.strokeStyle = pl.color;
        ctx.beginPath();
        ctx.ellipse(pl.x, pl.y, pl.r, pl.r * pl.flat, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      step();
      render();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    if (reduced) {
      for (let i = 0; i < 240; i++) step();
      render();
    }
    document.fonts?.ready.then(() => redrawLayer.current());

    // ---- interaction ----
    const host = (canvas.closest('section') as HTMLElement) ?? canvas.parentElement!;
    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // touch uses tap bursts instead
      const l = local(e);
      mouse.x = l.x;
      mouse.y = l.y;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('a,button,input,textarea')) return;
      const { x, y } = local(e);
      if (x < 0 || y < 0 || x > W || y > H) return;
      const R = compact ? 140 : 170;
      for (const p of particles) {
        const dx = p.x - x, dy = p.y - y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < R) {
          const f = (1 - d / R) * (compact ? 9 : 10);
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
      pulses.push({ x, y, r: 4, a: 0.9, flat: 1, color: '#3BE8FF' }, { x, y, r: 0, a: 0.6, flat: 1, color: '#8B5CFF' });
      boost = Math.min(boost + 0.8, 2);
      if (!running) render();
    };
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(boost + Math.abs(y - lastY) * 0.012, 2.2);
      lastY = y;
    };

    let rt = 0;
    let lastW = window.innerWidth;
    const onResize = () => {
      // ignore mobile URL-bar height jitter; only react to real width changes
      if (window.innerWidth === lastW && compact) return;
      lastW = window.innerWidth;
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        resize();
        if (!running) render();
      }, 150);
    };
    const onVis = () => (document.hidden ? stop() : start());
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(canvas);
    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      stop();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerdown', onDown);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      clearTimeout(rt);
    };
  }, []);

  return <canvas ref={ref} className="funnel-canvas" aria-hidden="true" />;
}

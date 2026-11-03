import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/motion';

/**
 * Hero visual: particles ("visitors") fall into a 3D-looking funnel,
 * change color as they qualify, and converge into a glowing "customer" core.
 * Pure Canvas 2D, ~100–160 particles, paused when offscreen or tab hidden.
 */
type P = { x: number; y: number; px: number; py: number; vx: number; vy: number; s: number; seed: number };

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
    let particles: P[] = [];
    let pulses: { r: number; a: number }[] = [];
    let raf = 0, running = false, visible = true, time = 0;
    const mouse = { x: -9999, y: -9999 };

    const halfWidth = (y: number) => {
      const t = Math.min(1, Math.max(0, (y - top) / (neck - top)));
      return topW * Math.pow(1 - t, 1.7) + neckW;
    };

    const spawn = (p: P, initial = false) => {
      p.x = cx + (Math.random() * 2 - 1) * topW * 1.25;
      p.y = initial ? top + Math.random() * (core - top) : top - 20 - Math.random() * H * 0.25;
      p.px = p.x;
      p.py = p.y;
      p.vx = (Math.random() - 0.5) * 0.4;
      p.vy = 0.4 + Math.random() * 0.6;
      p.s = 0.8 + Math.random() * 1.6;
      p.seed = Math.random() * 1000;
    };

    const drawLayer = () => {
      layer.width = W * dpr;
      layer.height = H * dpr;
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.clearRect(0, 0, W, H);
      // elliptical rings → 3D funnel
      const rings = 14;
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
        lctx.globalAlpha = 0.1 + t * 0.22;
        lctx.lineWidth = 1;
        lctx.beginPath();
        lctx.ellipse(cx, y, w, Math.max(2, w * 0.16), 0, 0, Math.PI * 2);
        lctx.stroke();
      }
      // side curves
      lctx.globalAlpha = 0.35;
      for (const side of [-1, 1]) {
        const g = lctx.createLinearGradient(0, top, 0, neck);
        g.addColorStop(0, 'rgba(59,232,255,0.0)');
        g.addColorStop(0.4, 'rgba(139,92,255,0.7)');
        g.addColorStop(1, 'rgba(255,181,71,0.9)');
        lctx.strokeStyle = g;
        lctx.beginPath();
        for (let y = top; y <= neck; y += 4) {
          const x = cx + side * halfWidth(y);
          y === top ? lctx.moveTo(x, y) : lctx.lineTo(x, y);
        }
        lctx.stroke();
      }
      // core glow
      lctx.globalAlpha = 1;
      const rg = lctx.createRadialGradient(cx, core, 0, cx, core, 70);
      rg.addColorStop(0, 'rgba(255,200,110,0.55)');
      rg.addColorStop(0.35, 'rgba(255,150,60,0.18)');
      rg.addColorStop(1, 'rgba(255,120,40,0)');
      lctx.fillStyle = rg;
      lctx.fillRect(cx - 80, core - 80, 160, 160);
      // labels (desktop only)
      if (W >= 900) {
        lctx.font = '500 12px "Inter Variable", system-ui, sans-serif';
        lctx.textBaseline = 'middle';
        const lv = [0.12, 0.55, 1];
        labelsRef.current.forEach((label, i) => {
          const y = i < 2 ? top + (neck - top) * lv[i] : core;
          const x = cx + (i < 2 ? halfWidth(y) : 34) + 28;
          lctx.globalAlpha = 0.5;
          lctx.strokeStyle = 'rgba(255,255,255,0.5)';
          lctx.setLineDash([2, 4]);
          lctx.beginPath();
          lctx.moveTo(x - 22, y);
          lctx.lineTo(x - 6, y);
          lctx.stroke();
          lctx.setLineDash([]);
          lctx.globalAlpha = 0.75;
          lctx.fillStyle = i === 2 ? '#FFC870' : '#C9CEDA';
          lctx.fillText(label.toUpperCase(), x, y);
        });
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
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const desktop = W >= 900;
      cx = desktop ? W * 0.75 : W * 0.5;
      top = H * (desktop ? 0.16 : 0.1);
      neck = H * (desktop ? 0.7 : 0.62);
      core = neck + H * 0.09;
      topW = Math.min(desktop ? W * 0.2 : W * 0.42, 300);
      neckW = 6;
      const count = Math.round(Math.min(160, Math.max(70, (W * H) / 9000)) * (desktop ? 1 : 0.6));
      particles = Array.from({ length: count }, () => {
        const p = {} as P;
        spawn(p, true);
        return p;
      });
      drawLayer();
    };

    const step = () => {
      time += 0.016;
      for (const p of particles) {
        p.px = p.x;
        p.py = p.y;
        const w = halfWidth(p.y);
        const inFunnel = p.y > top - 10;
        // gravity & gentle swirl
        p.vy += 0.012 + (p.y > neck ? 0.03 : 0);
        p.vx += Math.sin(time * 1.3 + p.seed) * 0.018;
        if (inFunnel) {
          const dx = p.x - cx;
          if (Math.abs(dx) > w) p.vx -= Math.sign(dx) * (Math.abs(dx) - w) * 0.02;
          p.vx -= dx * 0.0009;
        }
        if (p.y > neck) p.vx -= (p.x - cx) * 0.08;
        // mouse repulsion
        const mx = p.x - mouse.x, my = p.y - mouse.y;
        const d2 = mx * mx + my * my;
        if (d2 < 9000) {
          const f = (1 - d2 / 9000) * 0.9;
          const d = Math.sqrt(d2) || 1;
          p.vx += (mx / d) * f;
          p.vy += (my / d) * f * 0.4;
        }
        p.vx *= 0.96;
        p.vy = Math.min(p.vy * 0.985, 5);
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > core) {
          if (Math.random() < 0.12 && pulses.length < 4) pulses.push({ r: 6, a: 0.7 });
          spawn(p);
        }
      }
      for (const pl of pulses) {
        pl.r += 1.6;
        pl.a *= 0.94;
      }
      pulses = pulses.filter((pl) => pl.a > 0.02);
    };

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(layer, 0, 0, W, H);
      ctx.lineCap = 'round';
      for (const p of particles) {
        const t = Math.min(1, Math.max(0, (p.y - top) / (core - top)));
        ctx.strokeStyle = PALETTE[Math.round(t * 47)];
        ctx.globalAlpha = p.y < top ? Math.max(0, 0.4 + (p.y - top) / 120) : 0.55 + t * 0.45;
        ctx.lineWidth = p.s;
        ctx.beginPath();
        ctx.moveTo(p.px - p.vx * 2, p.py - p.vy * 2);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      ctx.lineWidth = 1.2;
      for (const pl of pulses) {
        ctx.globalAlpha = pl.a;
        ctx.strokeStyle = '#FFC870';
        ctx.beginPath();
        ctx.ellipse(cx, core, pl.r, pl.r * 0.35, 0, 0, Math.PI * 2);
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

    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        resize();
        if (!running) render();
      }, 150);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onVis = () => (document.hidden ? stop() : start());
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(canvas);
    const host = canvas.parentElement!;
    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      stop();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      clearTimeout(rt);
    };
  }, []);

  return <canvas ref={ref} className="funnel-canvas" aria-hidden="true" />;
}

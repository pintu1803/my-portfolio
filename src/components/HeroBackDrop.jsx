import React, { useEffect, useRef } from "react";

const LINK = 140; // max distance for a node-to-node line
const MOUSE = 170; // cursor influence radius

function toRgb(v) {
  if (!v) return null;
  v = v.trim();
  let m = /^#([0-9a-f]{3})$/i.exec(v);
  if (m) {
    const [a, b, c] = m[1].split("");
    return [parseInt(a + a, 16), parseInt(b + b, 16), parseInt(c + c, 16)];
  }
  m = /^#([0-9a-f]{6})/i.exec(v);
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
  m = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(v);
  return m ? [+m[1], +m[2], +m[3]] : null;
}

/* Faint drifting network graph. Nodes link to nearby nodes; the cursor lights up
   the ones near it. Static on phones / reduced-motion, paused when off-screen. */
export default function HeroBackDrop() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0, running = false, visible = true, animate = true;
    let nodes = [];
    let ink = [243, 237, 227];
    let accent = [226, 161, 61];
    const mouse = { x: 0, y: 0, active: false };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      ink = toRgb(cs.getPropertyValue("--text")) || ink;
      accent = toRgb(cs.getPropertyValue("--accent")) || accent;
    };

    const seed = () => {
      const target = w < 640 ? 24 : Math.max(18, Math.min(70, Math.round((w * h) / 18000)));
      while (nodes.length < target) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
        });
      }
      nodes.length = target;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      const [ir, ig, ib] = ink;
      const [ar, ag, ab] = accent;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const al = (1 - Math.sqrt(d2) / LINK) * 0.16;
            ctx.strokeStyle = `rgba(${ir},${ig},${ib},${al})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        let near = 0;
        if (mouse.active) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < MOUSE) {
            near = 1 - d / MOUSE;
            ctx.strokeStyle = `rgba(${ar},${ag},${ab},${near * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle =
          near > 0
            ? `rgba(${ar},${ag},${ab},${0.35 + near * 0.55})`
            : `rgba(${ir},${ig},${ib},0.32)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 + near * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
    };

    const loop = () => {
      if (!running) return;
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!animate || running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const r = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      animate = !reduce && w >= 640;
      seed();
      draw();
      animate ? start() : stop();
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= r.width && mouse.y <= r.height;
    };
    const onLeave = () => (mouse.active = false);
    const onVisibility = () => (document.hidden ? stop() : start());

    readColors();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      readColors();
      if (!running) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
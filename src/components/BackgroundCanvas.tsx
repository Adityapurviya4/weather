import { useEffect, useRef } from "react";

const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W: number, H: number;
    let stars: any[] = [], particles: any[] = [], ripples: any[] = [];
    let mouse = { x: -9999, y: -9999 };
    const GRID = 55;
    let gridW: number, gridH: number, gridNodes: any[] = [];
    let bgT = 0;
    let animId: number;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initStars();
      buildGrid();
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * W, y: Math.random() * H,
          ox: 0, oy: 0,
          r: Math.random() * 1.5 + 0.3,
          a: Math.random() * 0.6 + 0.15,
          speed: Math.random() * 0.3 + 0.05,
          twinkleOffset: Math.random() * Math.PI * 2
        });
      }
    }

    function buildGrid() {
      gridNodes = [];
      gridW = Math.ceil(W / GRID) + 1;
      gridH = Math.ceil(H / GRID) + 1;
      for (let gy = 0; gy < gridH; gy++)
        for (let gx = 0; gx < gridW; gx++)
          gridNodes.push({ bx: gx * GRID, by: gy * GRID, ox: 0, oy: 0 });
    }

    function spawnParticle(x: number, y: number, burst: boolean) {
      const count = burst ? 14 : 1;
      const colors = ["rgba(0,200,255,", "rgba(97,218,251,", "rgba(130,80,255,", "rgba(0,150,255,"];
      for (let i = 0; i < count; i++) {
        const angle = burst ? (Math.PI * 2 / count) * i + Math.random() * 0.4 : Math.random() * Math.PI * 2;
        const speed = burst ? Math.random() * 3.5 + 1.5 : Math.random() * 0.7 + 0.2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          r: burst ? Math.random() * 2.5 + 1 : Math.random() * 1.5 + 0.5,
          a: burst ? 0.9 : 0.6,
          col: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
          decay: burst ? 0.018 : Math.random() * 0.008 + 0.003
        });
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      if (Math.random() < 0.2) spawnParticle(mouse.x, mouse.y, false);
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onClick = (e: MouseEvent) => {
      spawnParticle(e.clientX, e.clientY, true);
      ripples.push({ x: e.clientX, y: e.clientY, radius: 0, a: 0.75 });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("click", onClick);

    function loop() {
      ctx.clearRect(0, 0, W, H);
      bgT += 0.012;
      ctx.fillStyle = "#040c1a";
      ctx.fillRect(0, 0, W, H);

      const REPEL = 90, REPEL_STR = 18;
      for (const n of gridNodes) {
        const dx = n.bx - mouse.x, dy = n.by - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL && dist > 0) {
          const f = (1 - dist / REPEL) * REPEL_STR;
          n.ox += (dx / dist * f - n.ox) * 0.18;
          n.oy += (dy / dist * f - n.oy) * 0.18;
        } else { n.ox *= 0.88; n.oy *= 0.88; }
      }

      ctx.strokeStyle = "rgba(0,150,255,0.045)";
      ctx.lineWidth = 0.5;
      for (let gy = 0; gy < gridH; gy++) {
        ctx.beginPath();
        for (let gx = 0; gx < gridW; gx++) {
          const n = gridNodes[gy * gridW + gx];
          gx === 0 ? ctx.moveTo(n.bx + n.ox, n.by + n.oy) : ctx.lineTo(n.bx + n.ox, n.by + n.oy);
        }
        ctx.stroke();
      }
      for (let gx = 0; gx < gridW; gx++) {
        ctx.beginPath();
        for (let gy = 0; gy < gridH; gy++) {
          const n = gridNodes[gy * gridW + gx];
          gy === 0 ? ctx.moveTo(n.bx + n.ox, n.by + n.oy) : ctx.lineTo(n.bx + n.ox, n.by + n.oy);
        }
        ctx.stroke();
      }

      const ATTRACT = 200;
      for (const s of stars) {
        const dx = mouse.x - s.x, dy = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < ATTRACT && dist > 0) {
          const f = (1 - dist / ATTRACT) * s.speed * 0.4;
          s.ox += dx / dist * f * 0.12;
          s.oy += dy / dist * f * 0.12;
        } else { s.ox *= 0.94; s.oy *= 0.94; }
        const tw = Math.sin(bgT * 2 + s.twinkleOffset) * 0.3 + 0.7;
        const sx = s.x + s.ox, sy = s.y + s.oy;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,225,255,${s.a * tw})`;
        ctx.fill();
        for (const s2 of stars) {
          const ex = s2.x + s2.ox - sx, ey = s2.y + s2.oy - sy;
          const ed = Math.sqrt(ex * ex + ey * ey);
          if (ed < 80 && ed > 0) {
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(s2.x + s2.ox, s2.y + s2.oy);
            ctx.strokeStyle = `rgba(100,160,255,${0.04 * (1 - ed / 80)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy *= 0.96;
        p.life -= p.decay; p.a = p.life * 0.9;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        pg.addColorStop(0, p.col + p.a + ")");
        pg.addColorStop(1, p.col + "0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += 3.5; rp.a -= 0.022;
        if (rp.a <= 0) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,200,255,${rp.a})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        if (rp.radius > 20) {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(100,180,255,${rp.a * 0.4})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} id="bgCanvas" />;
};

export default BackgroundCanvas;

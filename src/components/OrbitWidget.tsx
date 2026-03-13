import { useEffect, useRef } from "react";

const cfg = {
  react: { a: 100, b: 50, spd: 0.52, ang: 0.3, col: "rgba(97,218,251,", id: "i-react" },
  python: { a: 139, b: 69, spd: -0.35, ang: 2.2, col: "rgba(255,212,59,", id: "i-python" },
  psql: { a: 169, b: 84, spd: 0.23, ang: 4.1, col: "rgba(51,163,245,", id: "i-psql" },
  mongo: { a: 200, b: 100, spd: -0.16, ang: 5.6, col: "rgba(77,179,61,", id: "i-mongo" },
};

const CX = 230, CY = 230, TLEN = 32;

const OrbitWidget = () => {
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const trails: Record<string, { x: number; y: number }[]> = {};
    const pos: Record<string, { x: number; y: number }> = {};
    const state = { ...cfg };
    for (const k of Object.keys(state)) trails[k] = [];
    let lastT: number | null = null;
    let animId: number;

    function orbitLoop(ts: number) {
      if (!lastT) lastT = ts;
      const dt = Math.min((ts - lastT) / 1000, 0.05);
      lastT = ts;

      for (const [k, c] of Object.entries(state)) {
        c.ang += c.spd * dt;
        const x = CX + c.a * Math.cos(c.ang);
        const y = CY + c.b * Math.sin(c.ang);
        pos[k] = { x, y };

        const el = document.getElementById(c.id);
        if (el) {
          el.style.left = (x - 31) + "px";
          el.style.top = (y - 31) + "px";
        }

        trails[k].push({ x, y });
        while (trails[k].length > TLEN) trails[k].shift();
      }

      drawTrails();
      drawBeams();
      animId = requestAnimationFrame(orbitLoop);
    }

    function drawTrails() {
      const cv = trailCanvasRef.current;
      if (!cv) return;
      const ctx = cv.getContext("2d")!;
      ctx.clearRect(0, 0, 460, 460);

      for (const [k, buf] of Object.entries(trails)) {
        if (buf.length < 2) continue;
        const col = (state as any)[k].col;
        for (let i = 1; i < buf.length; i++) {
          const f = i / buf.length;
          ctx.beginPath();
          ctx.moveTo(buf[i - 1].x, buf[i - 1].y);
          ctx.lineTo(buf[i].x, buf[i].y);
          ctx.strokeStyle = col + (f * 0.5) + ")";
          ctx.lineWidth = f * 2.5;
          ctx.lineCap = "round";
          ctx.stroke();
        }
        const h = buf[buf.length - 1];
        const g = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 10);
        g.addColorStop(0, col + "0.9)");
        g.addColorStop(0.4, col + "0.4)");
        g.addColorStop(1, col + "0)");
        ctx.beginPath();
        ctx.arc(h.x, h.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
    }

    function drawBeams() {
      const svg = svgRef.current;
      if (!svg) return;
      let h = "";
      for (const [k, p] of Object.entries(pos)) {
        if (!p) continue;
        h += `<line x1="${CX}" y1="${CY}" x2="${p.x}" y2="${p.y}" stroke="${(state as any)[k].col}0.07)" stroke-width="0.6"/>`;
      }
      svg.innerHTML = h;
    }

    animId = requestAnimationFrame(orbitLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="orbit-widget">
      <div className="scene">
        <div className="ep" style={{ width: 200, height: 100, transform: "translate(-50%,-50%) rotate(-12deg)" }} />
        <div className="ep" style={{ width: 278, height: 139, transform: "translate(-50%,-50%) rotate(-12deg)" }} />
        <div className="ep" style={{ width: 338, height: 169, transform: "translate(-50%,-50%) rotate(-12deg)" }} />
        <div className="ep" style={{ width: 400, height: 200, transform: "translate(-50%,-50%) rotate(-12deg)" }} />
        <canvas className="tc" ref={trailCanvasRef} width={460} height={460} />
        <svg className="bsvg" ref={svgRef} width={460} height={460} viewBox="0 0 460 460" />
        <div className="jc">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" />
          <span className="lb">[JAVA]</span>
        </div>
        <div className="oi react-g" id="i-react">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
          <span className="lb">[React]</span>
        </div>
        <div className="oi python-g" id="i-python">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
          <span className="lb">[Python]</span>
        </div>
        <div className="oi psql-g" id="i-psql">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="SQL" />
          <span className="lb">[SQL/PgSQL]</span>
        </div>
        <div className="oi mongo-g" id="i-mongo">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
          <span className="lb">[MongoDB]</span>
        </div>
      </div>
    </div>
  );
};

export default OrbitWidget;

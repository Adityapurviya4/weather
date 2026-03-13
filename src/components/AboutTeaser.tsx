import { useEffect, useRef, useState, useCallback } from "react";

const NODE_COLORS: Record<string, {
  line: string;
  dot: string;
  border: string;
  borderHover: string;
  shadow: string;
}> = {
  Java:    { line: "#f89820", dot: "#f89820", border: "rgba(248,152,32,0.5)",  borderHover: "#f89820",  shadow: "rgba(248,152,32,0.5)"  },
  React:   { line: "#61dafb", dot: "#61dafb", border: "rgba(97,218,251,0.5)",  borderHover: "#61dafb",  shadow: "rgba(97,218,251,0.5)"  },
  Python:  { line: "#3776ab", dot: "#3776ab", border: "rgba(55,118,171,0.5)",  borderHover: "#3776ab",  shadow: "rgba(55,118,171,0.5)"  },
  "Next.js":{ line: "#ffffff", dot: "#ffffff", border: "rgba(255,255,255,0.4)", borderHover: "#ffffff",  shadow: "rgba(255,255,255,0.4)" },
  MongoDB: { line: "#4db33d", dot: "#4db33d", border: "rgba(77,179,61,0.5)",   borderHover: "#4db33d",  shadow: "rgba(77,179,61,0.5)"   },
  Django:  { line: "#44b78b", dot: "#44b78b", border: "rgba(68,183,139,0.5)",  borderHover: "#44b78b",  shadow: "rgba(68,183,139,0.5)"  },
};

const nodes = [
  { label: "Java",    icon: "java/java-original.svg",      x: 38, y: 8,  delay: "0s"   },
  { label: "React",   icon: "react/react-original.svg",     x: 75, y: 25, delay: "0.5s" },
  { label: "Python",  icon: "python/python-original.svg",   x: 70, y: 62, delay: "1s"   },
  { label: "Next.js", icon: "nextjs/nextjs-original.svg",   x: 35, y: 78, delay: "1.5s" },
  { label: "MongoDB", icon: "mongodb/mongodb-original.svg", x: 5,  y: 55, delay: "2s"   },
  { label: "Django",  icon: "django/django-plain.svg",      x: 8,  y: 20, delay: "2.5s" },
];

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

const COUNTER_TARGETS = [3, 18, 370];
const COUNTER_LABELS  = ["YRS EXP", "PROJECTS", "COMMITS"];

// Build all unique connection pairs once
const connections: [number, number][] = [];
for (let i = 0; i < nodes.length; i++)
  for (let j = i + 1; j < nodes.length; j++)
    connections.push([i, j]);

// ─── Particle type ───────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  col: string;
}

const AboutTeaser = () => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const svgRef        = useRef<SVGSVGElement>(null);
  const nodesRef      = useRef<HTMLDivElement>(null);
  const tooltipRef    = useRef<HTMLDivElement>(null);
  const mouseRef      = useRef({ x: -999, y: -999 });
  const particlesRef  = useRef<Particle[]>([]);
  const animIdRef     = useRef<number>(0);
  const startedRef    = useRef(false);

  const [counters, setCounters] = useState([0, 0, 0]);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // ── Canvas background particles ────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const p = canvas.parentElement!;
      canvas.width  = p.offsetWidth;
      canvas.height = p.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed particles
    particlesRef.current = Array.from({ length: 60 }, () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      vx:  (Math.random() - 0.5) * 0.5,
      vy:  (Math.random() - 0.5) * 0.5,
      r:   Math.random() * 2 + 1,
      col: Math.random() > 0.5 ? "0,212,255" : "0,255,136",
    }));

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };
    canvas.parentElement!.addEventListener("mousemove", onMove);
    canvas.parentElement!.addEventListener("mouseleave", onLeave);

    const draw = () => {
      const { x: mx, y: my } = mouseRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ps = particlesRef.current;
      ps.forEach(p => {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) { p.vx += dx / dist * 0.04; p.vy += dy / dist * 0.04; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},0.7)`;
        ctx.fill();
      });

      for (let a = 0; a < ps.length; a++) {
        for (let b = a + 1; b < ps.length; b++) {
          const dx = ps[a].x - ps[b].x, dy = ps[a].y - ps[b].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(ps[a].x, ps[a].y);
            ctx.lineTo(ps[b].x, ps[b].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.12 * (1 - d / 120)})`;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }
      animIdRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  // ── SVG network lines + traveling dots ─────────────────────────────────────
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const defs = svg.querySelector("defs")!;

    connections.forEach(([a, b], idx) => {
      const pa = nodes[a], pb = nodes[b];
      const cx = pa.x + 4, cy = pa.y + 4;
      const dx = pb.x + 4, dy = pb.y + 4;
      const colA = NODE_COLORS[nodes[a].label].line;
      const colB = NODE_COLORS[nodes[b].label].line;
      const gradId = `lg${idx}`;

      const grad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
      grad.setAttribute("id", gradId);
      grad.setAttribute("gradientUnits", "userSpaceOnUse");
      grad.setAttribute("x1", String(cx)); grad.setAttribute("y1", String(cy));
      grad.setAttribute("x2", String(dx)); grad.setAttribute("y2", String(dy));
      const s1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      s1.setAttribute("offset", "0%"); s1.setAttribute("stop-color", colA); s1.setAttribute("stop-opacity", "0.55");
      const s2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      s2.setAttribute("offset", "100%"); s2.setAttribute("stop-color", colB); s2.setAttribute("stop-opacity", "0.55");
      grad.appendChild(s1); grad.appendChild(s2);
      defs.appendChild(grad);

      const g    = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(cx)); line.setAttribute("y1", String(cy));
      line.setAttribute("x2", String(dx)); line.setAttribute("y2", String(dy));
      line.setAttribute("stroke", `url(#${gradId})`);
      line.setAttribute("stroke-opacity", "0.18");
      line.setAttribute("stroke-width",   "0.25");
      line.dataset.a = String(a); line.dataset.b = String(b);

      const dot  = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("r", "0.55"); dot.setAttribute("fill", "#00ff88"); dot.setAttribute("opacity", "0.7");
      const anim = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
      anim.setAttribute("dur", `${3 + idx * 0.4}s`);
      anim.setAttribute("repeatCount", "indefinite");
      anim.setAttribute("path", `M${cx},${cy} L${dx},${dy}`);
      dot.appendChild(anim);

      g.appendChild(line); g.appendChild(dot);
      svg.appendChild(g);
    });

    // Junction dots — green, pulsing
    nodes.forEach((p, i) => {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", String(p.x + 4)); c.setAttribute("cy", String(p.y + 4));
      c.setAttribute("r",  "1.6");
      c.setAttribute("fill",    "#00ff88");
      c.setAttribute("opacity", "0.85");
      c.setAttribute("filter",  "url(#glow2)");
      const anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      anim.setAttribute("attributeName", "r");
      anim.setAttribute("values",        "1.4;2.4;1.4");
      anim.setAttribute("dur",           "3s");
      anim.setAttribute("repeatCount",   "indefinite");
      anim.setAttribute("begin",         `${i * 0.5}s`);
      c.appendChild(anim);
      svg.appendChild(c);
    });

    return () => {
      // Remove everything except <defs> when component unmounts
      Array.from(svg.children).forEach(child => {
        if (child.tagName !== "defs") svg.removeChild(child);
      });
      // Clear gradients
      while (defs.firstChild) defs.removeChild(defs.firstChild);
    };
  }, []);

  // ── Counter animation on intersect ─────────────────────────────────────────
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !startedRef.current) {
        startedRef.current = true;
        COUNTER_TARGETS.forEach((target, idx) => {
          let val = 0;
          const step = target / (1500 / 16);
          const timer = setInterval(() => {
            val += step;
            if (val >= target) { val = target; clearInterval(timer); }
            setCounters(prev => {
              const next = [...prev];
              next[idx] = Math.floor(val);
              return next;
            });
          }, 16);
        });
      }
    }, { threshold: 0.3 });
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // ── Node hover — highlight SVG lines ───────────────────────────────────────
  const handleNodeEnter = useCallback((idx: number, e: React.MouseEvent<HTMLDivElement>) => {
    setActiveNode(idx);
    const svg = svgRef.current;
    if (svg) {
      svg.querySelectorAll<SVGLineElement>("line").forEach(line => {
        const a = parseInt(line.dataset.a ?? "-1");
        const b = parseInt(line.dataset.b ?? "-1");
        if (a === idx || b === idx) {
          line.setAttribute("stroke-opacity", "0.75");
          line.setAttribute("stroke-width",   "0.55");
          // Also enlarge the sibling traveling dot
          const dot = line.nextElementSibling as SVGCircleElement | null;
          if (dot) { dot.setAttribute("r", "1.1"); dot.setAttribute("opacity", "1"); }
        }
      });
    }
    // Tooltip
    const tooltip = tooltipRef.current;
    const wrap    = nodesRef.current;
    if (tooltip && wrap) {
      const wr = wrap.getBoundingClientRect();
      const er = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      tooltip.style.left    = `${er.left - wr.left + er.width + 8}px`;
      tooltip.style.top     = `${er.top  - wr.top}px`;
      tooltip.style.display = "block";
      const nc = NODE_COLORS[nodes[idx].label];
      tooltip.style.border    = `1px solid ${nc.borderHover}`;
      tooltip.style.color     = nc.dot;
      tooltip.textContent = nodes[idx].label;
    }
  }, []);

  const handleNodeLeave = useCallback(() => {
    setActiveNode(null);
    const svg = svgRef.current;
    if (svg) {
      svg.querySelectorAll<SVGLineElement>("line").forEach(line => {
        line.setAttribute("stroke-opacity", "0.18");
        line.setAttribute("stroke-width",   "0.25");
        const dot = line.nextElementSibling as SVGCircleElement | null;
        if (dot) { dot.setAttribute("r", "0.55"); dot.setAttribute("opacity", "0.7"); }
      });
    }
    if (tooltipRef.current) tooltipRef.current.style.display = "none";
  }, []);

  const handleNodeClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    el.style.transform = "scale(1.3)";
    setTimeout(() => { el.style.transform = ""; }, 400);
  }, []);

  return (
    <>
      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes nodeFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          background: "linear-gradient(180deg,#060b12 0%,#080f1c 50%,#0a1020 100%)",
          position:   "relative",
          overflow:   "hidden",
          padding:    "60px 40px",
          minHeight:  "420px",
          display:    "flex",
          alignItems: "center",
          borderRadius: "12px",
        }}
      >
        {/* ── Particle canvas ── */}
        <canvas
          ref={canvasRef}
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            zIndex:        0,
            opacity:       0.5,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position:           "relative",
            zIndex:             2,
            display:            "grid",
            gridTemplateColumns:"1fr 1fr",
            gap:                "60px",
            alignItems:         "center",
            width:              "100%",
            maxWidth:           "1400px",
            margin:             "0 auto",
          }}
        >
          {/* ── Left: text ── */}
          <div>
            <div style={{ fontFamily:"monospace", fontSize:11, letterSpacing:4, color:"#00d4ff", opacity:0.7, marginBottom:20 }}>
              // WHO AM I
            </div>

            <h2 style={{ fontFamily:"monospace", fontSize:"clamp(40px,6vw,72px)", lineHeight:0.95, letterSpacing:3, color:"#fff", margin:"0 0 24px" }}>
              FULL STACK<br />
              <span style={{ color:"#00d4ff", textShadow:"0 0 40px rgba(0,212,255,0.4)" }}>ARCHITECT</span>
            </h2>

            <p style={{ fontSize:14, color:"#7a9db8", lineHeight:1.8, maxWidth:380, margin:"0 0 28px" }}>
              I craft digital experiences that live at the intersection of design and engineering — fast, beautiful, and built to last.
            </p>

            <div style={{ display:"flex", gap:28, marginBottom:28, flexWrap:"wrap" }}>
              {COUNTER_TARGETS.map((_, i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <span style={{ fontFamily:"monospace", fontSize:"clamp(28px,4vw,40px)", color:"#00d4ff", letterSpacing:2, lineHeight:1 }}>
                    {counters[i]}<span style={{ fontSize:"0.7em", verticalAlign:"super" }}>+</span>
                  </span>
                  <span style={{ fontFamily:"monospace", fontSize:9, letterSpacing:3, color:"#7a9db8" }}>
                    {COUNTER_LABELS[i]}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#about"
              style={{
                display:    "inline-block",
                padding:    "12px 28px",
                border:     "1px solid #00d4ff",
                color:      "#00d4ff",
                fontFamily: "monospace",
                fontSize:   11,
                letterSpacing: 2,
                textDecoration: "none",
                clipPath:   "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#00d4ff";
                (e.currentTarget as HTMLAnchorElement).style.color = "#060b12";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "#00d4ff";
              }}
            >
              EXPLORE MORE →
            </a>
          </div>

          {/* ── Right: network ── */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ position:"relative", width:"100%", maxWidth:400, aspectRatio:"1/1" }}>

              {/* SVG lines + dots */}
              <svg
                ref={svgRef}
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:0 }}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="glow2">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Tech node icons */}
              <div ref={nodesRef} style={{ position:"absolute", inset:0, zIndex:2 }}>
                {nodes.map((node, i) => {
                  const nc = NODE_COLORS[node.label];
                  const isActive = activeNode === i;
                  return (
                    <div
                      key={node.label}
                      style={{
                        position:    "absolute",
                        left:        `${node.x}%`,
                        top:         `${node.y}%`,
                        width:       56,
                        height:      56,
                        borderRadius:"50%",
                        display:     "flex",
                        alignItems:  "center",
                        justifyContent:"center",
                        border:      `2px solid ${isActive ? nc.borderHover : nc.border}`,
                        background:  "rgba(0,20,50,0.9)",
                        cursor:      "pointer",
                        transition:  "all 0.3s",
                        boxShadow:   isActive ? `0 0 22px ${nc.shadow}` : "none",
                        transform:   isActive ? "scale(1.2)" : "scale(1)",
                        animation:   `nodeFloat 4s ease-in-out infinite`,
                        animationDelay: node.delay,
                        zIndex:      isActive ? 10 : 2,
                      }}
                      onMouseEnter={e => handleNodeEnter(i, e)}
                      onMouseLeave={handleNodeLeave}
                      onClick={handleNodeClick}
                    >
                      <img
                        src={DEVICON_BASE + node.icon}
                        alt={node.label}
                        style={{ width:28, height:28, pointerEvents:"none" }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Tooltip */}
              <div
                ref={tooltipRef}
                style={{
                  position:       "absolute",
                  fontFamily:     "monospace",
                  fontSize:       10,
                  letterSpacing:  2,
                  padding:        "5px 12px",
                  pointerEvents:  "none",
                  whiteSpace:     "nowrap",
                  zIndex:         20,
                  display:        "none",
                  borderRadius:   3,
                  background:     "rgba(0,0,0,0.75)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutTeaser;

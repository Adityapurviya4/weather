import { useEffect, useRef, useState } from "react";

const works = [
  { num: "01", title: "STOCKEASY", desc: "Online stock platform with chart analytics, AI chatbot & admin dashboard.", tags: ["Django", "Python", "MySQL", "WebSockets"], img: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800" },
  { num: "02", title: "RESUMEIQ", desc: "AI Resume analyzer + builder with job search integration.", tags: ["Streamlit", "MySQL", "Gemini API"], img: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=800" },
  { num: "03", title: "A.I.V.A CHATBOT", desc: "AI chatbot that answers questions, analyzes documents & manages tasks.", tags: ["Django", "Python", "AI"], img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800" },
  { num: "04", title: "PORTFOLIO V1", desc: "Interactive 3D portfolio built with React & Three.js.", tags: ["React", "Three.js", "Node"], img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800" },
];

const WorksSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [binaryText, setBinaryText] = useState("");
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Matrix rain
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const fontSize = 14;
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>=/\\|#@!?";

    function resize() {
      const section = canvas.parentElement!;
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    }
    resize();

    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array.from({ length: cols }, () => Math.random() * -50);

    function draw() {
      ctx.fillStyle = "rgba(3,6,9,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(Math.random() * -50);
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const alpha = Math.random() > 0.98 ? 1 : 0.3 + Math.random() * 0.3;
        ctx.fillStyle = drops[i] % 3 < 1 ? `rgba(0,255,136,${alpha})` : `rgba(0,212,255,${alpha * 0.5})`;
        ctx.font = `${fontSize}px "Space Mono", monospace`;
        ctx.fillText(char, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4;
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    // Binary bg
    const bChars = "01";
    let bt = "";
    for (let i = 0; i < 4000; i++) {
      bt += bChars[Math.floor(Math.random() * 2)];
      if (i % 50 === 0) bt += " ";
    }
    setBinaryText(bt);

    const bInterval = setInterval(() => {
      setBinaryText(prev => {
        const arr = prev.split("");
        const pos = Math.floor(Math.random() * arr.length);
        if (arr[pos] === "0") arr[pos] = "1";
        else if (arr[pos] === "1") arr[pos] = "0";
        return arr.join("");
      });
    }, 80);

    // Card animation
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = "1";
              (entry.target as HTMLElement).style.transform = "none";
            }, i * 120);
          }
        });
      },
      { threshold: 0.1 }
    );
    cardsRef.current.forEach((c) => c && obs.observe(c));

    window.addEventListener("resize", () => {
      resize();
      cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    });

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(bInterval);
      obs.disconnect();
    };
  }, []);

  return (
    <section className="relative z-[1] bg-[#030609] overflow-hidden" id="works">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-60" />
      <div className="absolute inset-0 font-[var(--font-mono)] text-lg leading-[1.8] text-[rgba(0,212,255,0.03)] overflow-hidden select-none z-[1] p-5 break-all tracking-[4px]" style={{ animation: "binary-flicker 4s ease-in-out infinite" }}>
        {binaryText}
      </div>
      <div className="relative z-[2] py-[120px] px-[80px] max-md:py-[80px] max-md:px-[25px]">
        <div className="font-[var(--font-mono)] text-[11px] text-[hsl(var(--cyan))] tracking-[4px] mb-5 opacity-70">// 05 PROJECTS</div>
        <h2 className="font-[var(--font-display)] text-[clamp(48px,7vw,80px)] tracking-[3px] leading-none mb-[60px] text-white">
          SELECTED_<span className="text-[hsl(var(--cyan))]">WORKS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-[60px]">
          {works.map((work, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="bg-[rgba(10,20,35,0.85)] border border-[rgba(0,200,255,0.15)] overflow-hidden transition-all duration-[400ms] backdrop-blur-[12px] hover:border-[hsl(var(--cyan))] hover:-translate-y-2 group"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              <div className="relative overflow-hidden h-[220px]">
                <img src={work.img} alt={work.title} className="w-full h-full object-cover transition-all duration-500 grayscale-[30%] brightness-[0.8] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-[0.9]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(10,20,35,0.95))" }} />
                <a href="https://github.com/Adityapurviya4" target="_blank" className="absolute top-[15px] right-[15px] w-[38px] h-[38px] bg-[hsl(var(--cyan))] text-[hsl(var(--bg))] flex items-center justify-center no-underline text-lg font-extrabold transition-all opacity-0 group-hover:opacity-100 hover:bg-white">
                  ↗
                </a>
              </div>
              <div className="p-[25px]">
                <div className="font-[var(--font-mono)] text-[10px] text-[hsl(var(--cyan))] tracking-[3px] mb-2 opacity-60">{work.num}</div>
                <h3 className="font-[var(--font-display)] text-2xl tracking-[3px] mb-2.5">{work.title}</h3>
                <p className="text-[13px] text-[hsl(var(--text-dim))] leading-[1.6] mb-[15px]">{work.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag, j) => (
                    <span key={j} className="bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.2)] text-[hsl(var(--cyan))] font-[var(--font-mono)] text-[10px] px-2.5 py-[5px] tracking-[1px]">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://github.com/Adityapurviya4"
            target="_blank"
            className="relative inline-block px-[50px] py-[18px] border border-[hsl(var(--cyan))] text-[hsl(var(--cyan))] no-underline font-[var(--font-mono)] text-xs tracking-[3px] overflow-hidden transition-all group/cta hover:text-[hsl(var(--bg))]"
          >
            <span className="relative z-[1]">VIEW ALL REPOS ON GITHUB</span>
            <div className="absolute inset-0 bg-[hsl(var(--cyan))] -translate-x-full transition-transform duration-400 z-0 group-hover/cta:translate-x-0" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorksSection;

import { useEffect, useRef, useState } from "react";

const CodingStats = () => {
  const ghCmdRef = useRef<HTMLSpanElement>(null);
  const lcCmdRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function typewriter(el: HTMLSpanElement | null, text: string, speed = 55) {
      if (!el) return;
      el.textContent = "";
      let i = 0;
      const timer = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(timer);
      }, speed);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          typewriter(ghCmdRef.current, "$ gh --stats", 60);
          setTimeout(() => typewriter(lcCmdRef.current, "$ lc --status", 60), 300);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#050a10] py-[120px] px-[80px] border-t border-[rgba(0,200,255,0.15)] relative z-[1] max-md:py-[80px] max-md:px-[25px]" id="stats">
      <div className="font-[var(--font-mono)] text-[11px] text-[hsl(var(--green))] tracking-[4px] mb-5 opacity-70">// 04 STATS</div>
      <div className="flex justify-between items-start mb-[60px]">
        <h2 className="font-[var(--font-display)] text-[clamp(48px,7vw,80px)] tracking-[3px] leading-none text-white">
          CODING_<span className="text-[hsl(var(--green))]">STATS</span>
        </h2>
        <div className="flex items-center gap-2 bg-[rgba(0,255,136,0.08)] border border-[rgba(0,255,136,0.2)] px-[18px] py-2 font-[var(--font-mono)] text-[11px] tracking-[3px] text-[hsl(var(--green))]">
          <span className="w-2 h-2 bg-[hsl(var(--green))] rounded-full" style={{ animation: "pulse 1.5s infinite" }} />
          LIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
        {/* GitHub */}
        <div className="bg-[#0a0f1a] border border-[rgba(0,200,255,0.15)] p-[30px] transition-all duration-300 hover:border-[hsl(var(--cyan))]">
          <div className="flex items-center gap-3 mb-[25px] font-[var(--font-display)] text-lg tracking-[3px]">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg" alt="GitHub" className="w-6 invert" />
            <span>GITHUB</span>
          </div>
          <div className="flex justify-between items-center mb-[25px]">
            <div className="flex items-center gap-3.5">
              <img src="https://github.com/Adityapurviya4.png" alt="avatar" className="w-11 h-11 rounded-full border-2 border-[hsl(var(--green))]" />
              <div>
                <h3 className="font-[var(--font-display)] text-lg tracking-[2px]">Adityapurviya4</h3>
                <span className="font-[var(--font-mono)] text-[10px] text-[hsl(var(--text-dim))] tracking-[2px]">Midnight Coder</span>
              </div>
            </div>
            <div className="font-[var(--font-display)] text-[30px] text-[hsl(var(--green))] text-right tracking-[2px]">
              370+<span className="block font-[var(--font-mono)] text-[9px] text-[hsl(var(--text-dim))] tracking-[3px]">COMMITS</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[2px] mb-[25px]">
            {[{ l: "REPOS", v: "18" }, { l: "FOLLOWERS", v: "2" }, { l: "COMMITS", v: "370+" }, { l: "SINCE", v: "2023" }].map((s, i) => (
              <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(0,200,255,0.15)] p-[18px]">
                <span className="font-[var(--font-mono)] text-[9px] tracking-[2px] text-[hsl(var(--text-dim))] block mb-1">{s.l}</span>
                <h4 className="font-[var(--font-display)] text-[26px] tracking-[2px] text-[hsl(var(--green))]">{s.v}</h4>
              </div>
            ))}
          </div>
          <div className="mb-5">
            <img src="https://ghchart.rshah.org/00ff66/Adityapurviya4" alt="GitHub heatmap" className="w-full border border-[rgba(0,200,255,0.15)] brightness-[0.8]" />
          </div>
          <div className="flex justify-between items-center bg-[rgba(0,0,0,0.3)] px-[18px] py-3 border border-[rgba(0,200,255,0.15)] font-[var(--font-mono)] text-[11px]">
            <span ref={ghCmdRef} className="text-[hsl(var(--green))]" />
            <a href="https://github.com/Adityapurviya4" target="_blank" className="no-underline px-3.5 py-1.5 text-[hsl(var(--green))] border border-[hsl(var(--green))] tracking-[2px] transition-all hover:bg-[hsl(var(--green))] hover:text-[hsl(var(--bg))]">
              VIEW_GH →
            </a>
          </div>
        </div>

        {/* LeetCode */}
        <div className="bg-[#0a0f1a] border border-[rgba(0,200,255,0.15)] p-[30px] transition-all duration-300 hover:border-[hsl(var(--cyan))]">
          <div className="flex items-center gap-3 mb-[25px] font-[var(--font-display)] text-lg tracking-[3px]">
            <span className="text-[22px]">⚡</span>
            <span>LEETCODE</span>
            <div className="ml-auto bg-[rgba(255,165,0,0.1)] border border-[rgba(255,165,0,0.3)] text-[hsl(var(--orange))] px-3 py-1 font-[var(--font-mono)] text-[10px] tracking-[2px]">TOP CODER</div>
          </div>
          <div className="flex justify-between items-center mb-[25px]">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-[hsl(var(--orange))] text-[hsl(var(--bg))] flex items-center justify-center font-[var(--font-display)] text-base font-extrabold">AP</div>
              <div>
                <h3 className="font-[var(--font-display)] text-lg tracking-[2px]">Aditya Purviya</h3>
                <span className="font-[var(--font-mono)] text-[10px] text-[hsl(var(--text-dim))] tracking-[2px]">Problem Solver</span>
              </div>
            </div>
            <div className="font-[var(--font-mono)] text-[13px] text-[hsl(var(--text-dim))]">#979833</div>
          </div>
          <div className="mt-5">
            <p className="font-[var(--font-mono)] text-[10px] text-[hsl(var(--text-dim))] tracking-[2px] mb-2.5">Heatmap · Last 52 Weeks</p>
            <img src="https://leetcard.jacoblin.cool/7VrCruxVXO?ext=heatmap&theme=dark" alt="LeetCode heatmap" className="w-full border border-[rgba(0,200,255,0.15)] brightness-[0.8]" />
          </div>
          <div className="mt-5 flex justify-between items-center bg-[rgba(0,0,0,0.3)] px-[18px] py-3 border border-[rgba(0,200,255,0.15)] font-[var(--font-mono)] text-[11px]">
            <span ref={lcCmdRef} className="text-[hsl(var(--orange))]" />
            <a href="https://leetcode.com/u/7VrCruxVXO/" target="_blank" className="no-underline px-3.5 py-1.5 text-[hsl(var(--orange))] border border-[hsl(var(--orange))] tracking-[2px] transition-all hover:bg-[hsl(var(--orange))] hover:text-[hsl(var(--bg))]">
              VIEW_LC →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingStats;

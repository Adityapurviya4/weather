import OrbitWidget from "./OrbitWidget";

const HeroSection = () => {
  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden pt-[120px] px-[80px] pb-[80px] max-md:pt-[100px] max-md:px-[30px] max-md:pb-[60px]"
      id="home"
    >
      <div className="relative z-[2] max-w-[680px]">
        <div
          className="inline-flex items-center gap-2.5 bg-[rgba(0,255,136,0.08)] border border-[rgba(0,255,136,0.3)] px-[18px] py-2 font-[var(--font-mono)] text-[11px] tracking-[3px] text-[hsl(var(--green))] mb-[30px]"
          style={{ animation: "fadeInDown 0.8s ease both" }}
        >
          <span className="w-2 h-2 bg-[hsl(var(--green))] rounded-full" style={{ animation: "pulse 2s infinite" }} />
          AVAILABLE FOR WORK
        </div>

        <h1
          className="font-[var(--font-display)] text-[clamp(32px,5vw,60px)] leading-[1.1] tracking-[2px] mb-[25px]"
          style={{ animation: "fadeInUp 0.9s 0.2s ease both" }}
        >
          <span className="text-[hsl(var(--cyan))] block text-[clamp(40px,6vw,72px)]" style={{ textShadow: "0 0 60px rgba(0,212,255,0.3)" }}>
            ADITYA PURVIYA
          </span>
          <span className="text-[hsl(var(--text-dim))] text-4xl mx-[15px] opacity-50 hidden md:inline">|</span>
          <span className="text-white">
            Senior Full Stack<br />Architect &amp; Engineer
          </span>
        </h1>

        <p
          className="text-[15px] text-[hsl(var(--text-dim))] leading-[1.7] max-w-[480px] mb-10"
          style={{ animation: "fadeInUp 1s 0.4s ease both" }}
        >
          Building scalable, animated web applications with Java, React, Python, and Data Science.
        </p>

        <div className="flex gap-5" style={{ animation: "fadeInUp 1.1s 0.6s ease both" }}>
          <a
            href="#works"
            className="bg-[hsl(var(--cyan))] text-[hsl(var(--bg))] px-8 py-3.5 font-[var(--font-mono)] text-xs font-bold tracking-[2px] no-underline transition-all duration-300 hover:bg-white hover:-translate-y-[3px]"
            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
          >
            VIEW PROJECTS
          </a>
          <a
            href="#contact"
            className="border border-[rgba(0,200,255,0.15)] text-[hsl(var(--text))] px-8 py-3.5 font-[var(--font-mono)] text-xs tracking-[2px] no-underline transition-all duration-300 hover:border-[hsl(var(--cyan))] hover:text-[hsl(var(--cyan))]"
            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
          >
            HIRE ME
          </a>
        </div>
      </div>

      <OrbitWidget />

      <div className="absolute bottom-10 left-[80px] flex items-center gap-[15px] font-[var(--font-mono)] text-[10px] tracking-[3px] text-[hsl(var(--text-dim))] z-[2] max-md:left-[30px]">
        <span>SCROLL</span>
        <div
          className="h-[1px] bg-gradient-to-r from-[hsl(var(--cyan))] to-transparent"
          style={{ animation: "extend 2s ease-in-out infinite alternate", width: "60px" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;

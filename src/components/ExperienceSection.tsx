import { useEffect, useRef } from "react";

const experiences = [
  { date: "Nov 2023 — Present", title: "FREELANCE FULL-STACK DEVELOPER", company: "@ Self Employed", items: ["Building responsive web applications using HTML, CSS, JavaScript", "Developing modern apps with React, Node.js & Django", "Creating custom digital solutions for global clients"] },
  { date: "Aug 2025 — Nov 2025", title: "DATA ENTRY CONTRACT", company: "@ Injala India", items: ["Processed large-scale data with 99%+ accuracy", "Maintained strict quality assurance standards", "Delivered daily & weekly reporting targets"] },
  { date: "Dec 2024 — Aug 2025", title: "PROJECT MANAGER", company: "@ Self Employed", items: ["Managed client projects from start to deployment", "Coordinated development teams & milestones", "Handled communication and technical planning"] },
  { date: "Nov 2023 — May 2025", title: "ONLINE BUSINESS MANAGER", company: "@ Genuine Bags", items: ["Managed end-to-end ecommerce operations", "Executed digital marketing strategies", "Handled inventory & supply chain management"] },
];

const ExperienceSection = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
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
      { threshold: 0.15 }
    );
    cardsRef.current.forEach((c) => c && obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-[120px] px-[80px] bg-[hsl(var(--bg2))] border-t border-[rgba(0,200,255,0.15)] relative z-[1] max-md:py-[80px] max-md:px-[25px]" id="experience">
      <div className="font-[var(--font-mono)] text-[11px] text-[hsl(var(--cyan))] tracking-[4px] mb-5 opacity-70">// 03 JOURNEY</div>
      <h2 className="font-[var(--font-display)] text-[clamp(48px,7vw,80px)] tracking-[3px] leading-none mb-[60px]">
        EXPERIENCE_<span className="text-[hsl(var(--red))]">LOG</span>
      </h2>
      <div className="border-l border-[rgba(0,200,255,0.15)] pl-[50px] relative">
        {experiences.map((exp, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="bg-[hsl(var(--surface))] border border-[rgba(0,200,255,0.15)] p-[35px] mb-[30px] relative transition-all duration-300 hover:border-[hsl(var(--cyan))]"
            style={{ opacity: 0, transform: "translateX(-20px)" }}
          >
            <div className="absolute -left-[58px] top-[35px] w-3.5 h-3.5 bg-[hsl(var(--cyan))] border-[3px] border-[hsl(var(--bg2))] rounded-full shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
            <div className="font-[var(--font-mono)] text-[11px] tracking-[2px] text-[hsl(var(--cyan))] mb-2.5">{exp.date}</div>
            <h3 className="font-[var(--font-display)] text-[22px] tracking-[2px] mb-1">{exp.title}</h3>
            <h4 className="text-[13px] text-[hsl(var(--text-dim))] mb-[15px] font-normal">{exp.company}</h4>
            <ul className="pl-5">
              {exp.items.map((item, j) => (
                <li key={j} className="text-[13px] text-[hsl(var(--text-dim))] mb-1.5 leading-[1.6]">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;

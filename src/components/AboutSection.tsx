import { useState } from "react";

const AboutSection = () => {
  const [available, setAvailable] = useState(true);

  return (
    <section
      className="py-16 px-4 sm:py-20 sm:px-8 md:py-24 md:px-12 lg:py-28 lg:px-20 bg-secondary border-t border-b border-primary/15 relative z-[1]"
      id="about"
    >
      <div className="font-[var(--font-mono)] text-[11px] text-primary tracking-[4px] mb-5 opacity-70">
        // 01 ABOUT
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center max-w-[1400px] mx-auto">
        <div>
          <h2 className="font-[var(--font-display)] text-[clamp(36px,7vw,80px)] tracking-[3px] leading-none mb-8 sm:mb-12 md:mb-14 text-foreground">
            WHO AM I?
          </h2>
          <p className="text-sm sm:text-[15px] md:text-[17px] leading-[1.8] text-muted-foreground mb-6 sm:mb-8">
            I am{" "}
            <span className="bg-primary/15 text-primary px-1.5">Aditya Purviya</span> — a
            creative{" "}
            <span className="bg-primary/15 text-primary px-1.5">developer</span> who believes
            the web has become too sanitized. I bring{" "}
            <span className="bg-primary/15 text-primary px-1.5">personality</span> back to
            code.
          </p>
          <div className="mb-6 sm:mb-8">
            {[
              "Specialized in Designing and Web Development.",
              "Obsessed with Perfection and AI.",
              "3+ years of shipping code that works.",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-3 sm:gap-4 py-3 sm:py-3.5 border-b border-primary/15 text-xs sm:text-sm text-muted-foreground"
              >
                <span className="font-[var(--font-mono)] text-[11px] text-primary tracking-[1px] min-w-[25px]">
                  0{i + 1}
                </span>
                {text}
              </div>
            ))}
          </div>
          <div className="flex gap-3 sm:gap-4 flex-wrap mt-6 sm:mt-8">
            <span className="px-4 sm:px-5 py-2 sm:py-2.5 font-[var(--font-mono)] text-[10px] sm:text-[11px] tracking-[2px] cursor-pointer transition-all duration-300 border bg-foreground/5 border-primary/15 text-foreground">
              📍 WORLDWIDE
            </span>
            <span
              className={`px-4 sm:px-5 py-2 sm:py-2.5 font-[var(--font-mono)] text-[10px] sm:text-[11px] tracking-[2px] cursor-pointer transition-all duration-300 border ${
                available
                  ? "bg-accent/10 border-accent/30 text-accent"
                  : "bg-destructive/10 border-destructive/30 text-destructive"
              }`}
              onClick={() => setAvailable(!available)}
            >
              {available ? "🟢 AVAILABLE" : "🔴 BUSY"}
            </span>
          </div>
        </div>

        <div>
          <div className="relative w-[200px] sm:w-[240px] md:w-[280px] mx-auto mb-6 sm:mb-8">
            <div className="w-full aspect-square bg-gradient-to-br from-card to-primary/10 border-2 border-primary/15 flex items-center justify-center font-[var(--font-display)] text-[clamp(50px,10vw,80px)] text-primary">
              AP
            </div>
            <div className="absolute -top-3 sm:-top-3.5 left-3 sm:left-4 bg-destructive text-destructive-foreground font-[var(--font-mono)] text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 sm:py-1 tracking-[2px]">
              AVATAR.png
            </div>
            <div
              className="absolute -inset-4 rounded z-[-1]"
              style={{
                background: "radial-gradient(circle at center, hsl(var(--cyan) / 0.1), transparent 70%)",
              }}
            />
          </div>
          <div className="flex border border-primary/15 overflow-hidden">
            {[
              { val: "3+", label: "Years Exp" },
              { val: "18+", label: "Projects" },
              { val: "370+", label: "Commits" },
            ].map((s, i) => (
              <div
                key={i}
                className={`flex-1 text-center py-3 sm:py-4 md:py-5 px-1 sm:px-2 ${
                  i < 2 ? "border-r border-primary/15" : ""
                }`}
              >
                <h4 className="font-[var(--font-display)] text-[clamp(22px,4vw,32px)] text-primary tracking-[2px]">
                  {s.val}
                </h4>
                <span className="font-[var(--font-mono)] text-[8px] sm:text-[10px] text-muted-foreground tracking-[2px]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

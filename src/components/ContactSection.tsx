import { useState } from "react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <section className="py-[140px] px-[80px] bg-[hsl(var(--bg2))] border-t border-[rgba(0,200,255,0.15)] flex flex-col items-center relative z-[1] max-md:py-[80px] max-md:px-[25px]" id="contact">
      <div className="font-[var(--font-mono)] text-[11px] text-[hsl(var(--cyan))] tracking-[4px] mb-5 opacity-70 self-start max-w-[1100px] w-full mx-auto">// 06 CONTACT</div>
      <div className="relative w-full max-w-[1100px]">
        <div className="absolute -top-[22px] left-10 bg-[hsl(var(--yellow))] text-[hsl(var(--bg))] px-5 py-2 font-[var(--font-mono)] text-[11px] font-bold tracking-[3px] -rotate-3 z-[3] border-2 border-[rgba(0,0,0,0.2)]">
          START A PROJECT
        </div>
        <div className="bg-[hsl(var(--surface))] border border-[rgba(0,200,255,0.15)] p-[70px] grid grid-cols-1 md:grid-cols-2 gap-[80px] mt-2.5 max-md:p-[25px] max-md:gap-10">
          <div>
            <h2 className="font-[var(--font-display)] text-[80px] tracking-[4px] leading-[0.9] text-white mb-[25px] max-md:text-[50px]">
              LET'S<br />TALK<br />CODE<span className="text-[hsl(var(--cyan))]">.</span>
            </h2>
            <p className="text-sm text-[hsl(var(--text-dim))] leading-[1.7] mb-[30px]">
              Currently available for freelance work and open to full-time opportunities.
            </p>
            <div className="flex items-center gap-[15px] mb-[15px] text-[13px] text-[hsl(var(--text-dim))] font-[var(--font-mono)] tracking-[1px]">
              <div className="w-9 h-9 bg-[rgba(0,212,255,0.1)] border border-[rgba(0,200,255,0.15)] flex items-center justify-center text-sm">✉</div>
              <span>adityapurviya@email.com</span>
            </div>
            <div className="flex items-center gap-[15px] text-[13px] text-[hsl(var(--text-dim))] font-[var(--font-mono)] tracking-[1px]">
              <div className="w-9 h-9 bg-[rgba(0,212,255,0.1)] border border-[rgba(0,200,255,0.15)] flex items-center justify-center text-sm">📍</div>
              <span>Remote / Earth</span>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label className="font-[var(--font-mono)] text-[10px] tracking-[3px] text-[hsl(var(--text-dim))] mt-4 mb-1.5">IDENTITY</label>
              <input type="text" placeholder="NAME / COMPANY" className="bg-[rgba(255,255,255,0.03)] border border-[rgba(0,200,255,0.15)] text-[hsl(var(--text))] px-4 py-3 font-[var(--font-mono)] text-xs transition-all outline-none focus:border-[hsl(var(--cyan))] focus:bg-[rgba(0,212,255,0.03)]" />
              <label className="font-[var(--font-mono)] text-[10px] tracking-[3px] text-[hsl(var(--text-dim))] mt-4 mb-1.5">COORDINATES</label>
              <input type="email" placeholder="EMAIL ADDRESS" className="bg-[rgba(255,255,255,0.03)] border border-[rgba(0,200,255,0.15)] text-[hsl(var(--text))] px-4 py-3 font-[var(--font-mono)] text-xs transition-all outline-none focus:border-[hsl(var(--cyan))] focus:bg-[rgba(0,212,255,0.03)]" />
              <label className="font-[var(--font-mono)] text-[10px] tracking-[3px] text-[hsl(var(--text-dim))] mt-4 mb-1.5">TRANSMISSION</label>
              <textarea placeholder="PROJECT DETAILS..." className="bg-[rgba(255,255,255,0.03)] border border-[rgba(0,200,255,0.15)] text-[hsl(var(--text))] px-4 py-3 font-[var(--font-mono)] text-xs transition-all outline-none focus:border-[hsl(var(--cyan))] focus:bg-[rgba(0,212,255,0.03)] h-[120px] resize-none" />
              <button
                type="submit"
                className="mt-[25px] py-4 font-[var(--font-mono)] text-xs font-bold tracking-[3px] cursor-pointer transition-all border-none hover:bg-white"
                style={{
                  background: submitted ? "hsl(var(--green))" : "hsl(var(--cyan))",
                  color: "hsl(var(--bg))",
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                {submitted ? "TRANSMISSION SENT ✓" : "TRANSMIT DATA →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

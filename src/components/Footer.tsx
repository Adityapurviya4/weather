const Footer = () => (
  <footer className="bg-[#040810] border-t border-[hsl(var(--green))] py-[80px] px-[80px] text-[hsl(var(--text))] relative z-[1] max-md:py-[60px] max-md:px-[25px]">
    <div className="flex justify-between items-start gap-[60px] mb-[60px] max-md:flex-col max-md:gap-10">
      <div>
        <h2 className="font-[var(--font-display)] text-[32px] tracking-[4px] mb-[15px]">
          ADITYA<span className="text-[hsl(var(--green))]">.</span>
        </h2>
        <p className="text-[13px] text-[hsl(var(--text-dim))] max-w-[300px] leading-[1.7]">
          Designing for the future with the raw aesthetics of the past. No cookies, no trackers, just code.
        </p>
      </div>
      <div>
        <h4 className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[hsl(var(--green))] mb-5">SITEMAP</h4>
        <ul className="list-none">
          {[{ href: "#home", label: "Home" }, { href: "#works", label: "Works" }, { href: "#about", label: "About" }, { href: "#contact", label: "Contact" }].map((item) => (
            <li key={item.href} className="mb-2.5">
              <a href={item.href} className="no-underline text-[hsl(var(--text-dim))] text-[13px] font-[var(--font-mono)] transition-colors hover:text-[hsl(var(--cyan))]">{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[hsl(var(--green))] mb-5">SOCIALS</h4>
        <div className="flex gap-[15px]">
          {[
            { href: "https://instagram.com", icon: "instagram" },
            { href: "https://github.com/Adityapurviya4", icon: "github" },
            { href: "https://www.linkedin.com/in/aditya-purviya-305218372/", icon: "linkedin" },
          ].map((s) => (
            <a key={s.icon} href={s.href} target="_blank" className="w-10 h-10 border border-[rgba(0,200,255,0.15)] flex items-center justify-center transition-all hover:border-[hsl(var(--cyan))] hover:bg-[rgba(0,212,255,0.05)]">
              <img src={`https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${s.icon}.svg`} alt={s.icon} className="w-[18px] invert" />
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="border-t border-[rgba(0,200,255,0.15)] pt-[25px] text-center font-[var(--font-mono)] text-[11px] tracking-[3px] text-[hsl(var(--text-dim))]">
      © 2026 ADITYA PURVIYA.exe // SYSTEM_END
    </div>
  </footer>
);

export default Footer;

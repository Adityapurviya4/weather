import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpg";

const navItems = [
  { href: "#home", label: "HOME" },
  { href: "#about", label: "PORTFOLIO" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#skills", label: "SKILLS" },
  { href: "#contact", label: "CONTACT" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);

    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink("#" + entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => obs.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center px-[50px] h-[70px] backdrop-blur-[24px] transition-all duration-400 border-b ${
        scrolled
          ? "h-[58px] bg-[rgba(4,12,26,0.95)] border-b-[rgba(0,200,255,0.2)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-[rgba(4,12,26,0.6)] border-b-[rgba(0,200,255,0.08)]"
      } max-md:px-6`}
    >
      <a href="#home" className="flex items-center gap-3.5 mr-auto no-underline">
        <div
          className="w-[38px] h-[38px] flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{
            clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            boxShadow: "0 0 20px rgba(0,212,255,0.4)",
          }}
        >
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="font-[var(--font-display)] text-xl tracking-[4px] text-white">
          ADITYA PURVIYA
        </span>
      </a>

      <ul className="hidden md:flex list-none gap-[38px] mr-9">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`no-underline font-[var(--font-mono)] text-[11px] tracking-[2px] transition-colors duration-200 relative pb-[3px] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-[hsl(var(--cyan))] after:transition-all after:duration-300 ${
                activeLink === item.href
                  ? "text-[hsl(var(--cyan))] after:w-full"
                  : "text-[hsl(var(--text-dim))] after:w-0 hover:text-[hsl(var(--cyan))] hover:after:w-full"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="hidden md:inline-block bg-transparent border border-[hsl(var(--cyan))] text-[hsl(var(--cyan))] px-5 py-[9px] font-[var(--font-mono)] text-[11px] tracking-[2px] no-underline transition-all duration-300 hover:bg-[hsl(var(--cyan))] hover:text-[hsl(var(--bg))]"
        style={{
          clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
        }}
      >
        GET IN TOUCH
      </a>

      <div
        className="flex md:hidden flex-col gap-[5px] cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="block w-6 h-[2px] bg-[hsl(var(--text))] transition-all" />
        <span className="block w-6 h-[2px] bg-[hsl(var(--text))] transition-all" />
        <span className="block w-6 h-[2px] bg-[hsl(var(--text))] transition-all" />
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[rgba(4,12,26,0.95)] backdrop-blur-[24px] p-6 md:hidden border-b border-[rgba(0,200,255,0.08)]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 font-[var(--font-mono)] text-[11px] tracking-[2px] text-[hsl(var(--text-dim))] hover:text-[hsl(var(--cyan))] no-underline"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block mt-4 text-center border border-[hsl(var(--cyan))] text-[hsl(var(--cyan))] px-5 py-3 font-[var(--font-mono)] text-[11px] tracking-[2px] no-underline"
          >
            GET IN TOUCH
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

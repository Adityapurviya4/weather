import { useState } from "react";

const marqueeItems = [
  "nextjs/nextjs-original.svg|Next.js",
  "react/react-original.svg|React",
  "javascript/javascript-original.svg|JavaScript",
  "typescript/typescript-original.svg|TypeScript",
  "python/python-original.svg|Python",
  "java/java-original.svg|Java",
  "threejs/threejs-original.svg|Three.js",
  "webpack/webpack-original.svg|Webpack",
  "firebase/firebase-plain.svg|Firebase",
  "mysql/mysql-original.svg|MySQL",
  "mongodb/mongodb-original.svg|MongoDB",
  "django/django-plain.svg|Django",
];

const techBoxes = [
  { type: "<_LIBRARY", name: "REACT", color: "#61dafb" },
  { type: "<_FRAMEWORK", name: "NEXT.JS", color: "#00d8ff" },
  { type: "<_LANGUAGE", name: "PYTHON", color: "#3776ab" },
  { type: "<_RUNTIME", name: "NODE.JS", color: "#68a063" },
  { type: "<_CSS", name: "TAILWIND", color: "#38bdf8" },
  { type: "<_DATABASE", name: "MYSQL", color: "#4479a1" },
  { type: "<_MARKUP", name: "HTML5", color: "#e34f26" },
  { type: "<_VERSION", name: "GIT", color: "#f05032" },
  { type: "<_API", name: "GRAPHQL", color: "#e10098" },
  { type: "<_PLATFORM", name: "GITHUB", color: "#333" },
  { type: "<_LANGUAGE", name: "JAVA", color: "#ed8b00" },
  { type: "<_FRAMEWORK", name: "DJANGO", color: "#092e20" },
  { type: "<_LANGUAGE", name: "PHP", color: "#8993be" },
  { type: "<_FRAMEWORK", name: "LARAVEL", color: "#ff2d20" },
  { type: "<_3D", name: "THREE.JS", color: "#049ef4" },
  { type: "<_LANGUAGE", name: "C++", color: "#00599c" },
];

const base = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

const TechSection = () => {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  return (
    <section className="py-[120px] px-[80px] bg-[hsl(var(--bg))] relative z-[1] max-md:py-[80px] max-md:px-[25px]" id="skills">
      <div className="font-[var(--font-mono)] text-[11px] text-[hsl(var(--cyan))] tracking-[4px] mb-5 opacity-70">// 02 SKILLS</div>
      <h2 className="font-[var(--font-display)] text-[clamp(48px,7vw,80px)] tracking-[3px] leading-none mb-[60px]">
        TECH_<span className="text-[hsl(var(--green))]">STACK</span>
      </h2>

      <div className="overflow-hidden mb-[60px] border-t border-b border-[rgba(0,200,255,0.15)] py-[15px]">
        <div className="flex gap-[50px] w-max" style={{ animation: "marquee 30s linear infinite" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => {
            const [icon, name] = item.split("|");
            return (
              <div key={i} className="flex items-center gap-3 text-[hsl(var(--text-dim))] whitespace-nowrap font-[var(--font-mono)] text-xs tracking-[2px]">
                <img src={base + icon} alt={name} className="w-7 h-7 brightness-[0.7] hover:brightness-[1.2] transition-all" />
                <span>{name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-8 gap-[2px] max-lg:grid-cols-4">
        {techBoxes.map((box, i) => (
          <div
            key={i}
            className="bg-[hsl(var(--surface))] border border-[rgba(0,200,255,0.15)] py-5 px-2.5 text-center cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 relative overflow-hidden hover:-translate-y-1.5 hover:z-[2]"
            style={hoveredBox === i ? { background: box.color + "22", borderColor: box.color + "88" } : {}}
            onMouseEnter={() => setHoveredBox(i)}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <span className="font-[var(--font-mono)] text-[8px] tracking-[2px] text-[hsl(var(--text-dim))]">{box.type}</span>
            <h3
              className="font-[var(--font-display)] text-base tracking-[2px]"
              style={hoveredBox === i ? { color: box.color } : { color: "hsl(var(--text))" }}
            >
              {box.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechSection;

const row1 = [
  { name: "JavaScript", icon: "javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "typescript/typescript-original.svg" },
  { name: "Java", icon: "java/java-original.svg" },
  { name: "Python", icon: "python/python-original.svg" },
  { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
  { name: "Next.js", icon: "nextjs/nextjs-original.svg" },
  { name: "Tailwind", icon: "tailwindcss/tailwindcss-original.svg" },
  { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "postgresql/postgresql-original.svg" },
  { name: "Redis", icon: "redis/redis-original.svg" },
  { name: "Docker", icon: "docker/docker-original.svg" },
  { name: "React", icon: "react/react-original.svg" },
];

const row2 = [
  { name: "Kubernetes", icon: "kubernetes/kubernetes-plain.svg" },
  { name: "Firebase", icon: "firebase/firebase-plain.svg" },
  { name: "Three.js", icon: "threejs/threejs-original.svg" },
  { name: "D3.js", icon: "d3js/d3js-original.svg" },
  { name: "Rust", icon: "rust/rust-original.svg" },
  { name: "AWS", icon: "amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "React Native", icon: "react/react-original.svg" },
  { name: "GraphQL", icon: "graphql/graphql-plain.svg" },
  { name: "Nginx", icon: "nginx/nginx-original.svg" },
  { name: "Vite", icon: "vitejs/vitejs-original.svg" },
  { name: "Jest", icon: "jest/jest-plain.svg" },
  { name: "Webpack", icon: "webpack/webpack-original.svg" },
];

const base = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

const TechItem = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex items-center gap-[11px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl px-5 py-3 whitespace-nowrap cursor-default transition-all duration-250 flex-shrink-0 hover:bg-[rgba(0,255,102,0.07)] hover:border-[rgba(0,255,102,0.3)] hover:-translate-y-[3px] hover:shadow-[0_8px_30px_rgba(0,255,102,0.12)]">
    <img src={base + icon} alt={name} className="w-8 h-8 object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]" />
    <span className="font-[var(--font-mono)] text-[13px] font-bold text-[rgba(255,255,255,0.75)] tracking-[0.04em] uppercase">{name}</span>
  </div>
);

const TechLogosShowcase = () => (
  <div className="bg-[#080808] py-[70px] overflow-hidden relative z-[1] border-t border-b border-[rgba(255,255,255,0.06)]">
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,102,0.04) 0%, transparent 70%)" }} />
    <div className="flex items-center gap-[18px] px-[60px] mb-10 max-md:px-[25px]">
      <span className="font-[var(--font-mono)] text-[11px] tracking-[0.18em] text-[rgba(255,255,255,0.35)] uppercase whitespace-nowrap">// TECH STACK</span>
      <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(0,255,102,0.3), rgba(255,255,255,0.06), rgba(0,255,102,0.3))" }} />
      <span className="font-[var(--font-mono)] text-[11px] tracking-[0.18em] text-[rgba(255,255,255,0.35)] uppercase whitespace-nowrap">TOOLS &amp; TECHNOLOGIES</span>
    </div>

    {[{ items: row1, dir: "left" }, { items: row2, dir: "right" }].map(({ items, dir }, idx) => (
      <div key={idx} className="w-full overflow-hidden relative mb-5 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[120px] before:z-[2] before:pointer-events-none before:bg-gradient-to-r before:from-[#080808] before:to-transparent after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-0 after:w-[120px] after:z-[2] after:pointer-events-none after:bg-gradient-to-l after:from-[#080808] after:to-transparent group">
        <div
          className="flex gap-3 w-max will-change-transform group-hover:[animation-play-state:paused]"
          style={{ animation: dir === "left" ? "tlsScrollLeft 35s linear infinite" : "tlsScrollRight 28s linear infinite" }}
        >
          {[...items, ...items].map((t, i) => (
            <TechItem key={i} {...t} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default TechLogosShowcase;

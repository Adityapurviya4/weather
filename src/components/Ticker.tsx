const text = "OPEN FOR WORK /// FULL STACK DEVELOPMENT /// HTML /// CSS /// JAVASCRIPT /// REACT /// NEXT.JS /// NODE.JS /// PYTHON /// JAVA /// DJANGO /// MYSQL /// POSTGRESQL /// MONGODB /// GIT /// GITHUB /// DOCKER /// REST API /// GRAPHQL /// DATA ANALYSIS /// MACHINE LEARNING /// FAST /// SCALABLE /// SECURE ///\u00A0\u00A0\u00A0";

const Ticker = () => (
  <div className="overflow-hidden bg-[hsl(var(--cyan))] py-3 relative z-[1] group">
    <div className="flex w-max group-hover:[animation-play-state:paused]" style={{ animation: "tickerScroll 30s linear infinite" }}>
      <span className="font-[var(--font-mono)] text-xs font-bold tracking-[2px] text-[hsl(var(--bg))] whitespace-nowrap pr-[50px]">{text}</span>
      <span className="font-[var(--font-mono)] text-xs font-bold tracking-[2px] text-[hsl(var(--bg))] whitespace-nowrap pr-[50px]">{text}</span>
    </div>
  </div>
);

export default Ticker;

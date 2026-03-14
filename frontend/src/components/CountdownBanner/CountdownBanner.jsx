import { useState, useEffect } from "react";

const WC_DATE = new Date("2030-06-11T16:00:00Z");

function getTimeLeft() {
  const diff = WC_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 1000 / 60 / 60 / 24),
    hours:   Math.floor((diff / 1000 / 60 / 60) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownBanner() {
  const [time,  setTime]  = useState(getTimeLeft());
  const [tick,  setTick]  = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeLeft());
      setTick(p => !p);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { v: time.days,    l: "jours"   },
    { v: time.hours,   l: "heures"  },
    { v: time.minutes, l: "minutes" },
    { v: time.seconds, l: "secs"    },
  ];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-14"
      style={{
        background: "linear-gradient(90deg,#1847c8 0%,#2563eb 55%,#1a4fd6 100%)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div className="h-full max-w-7xl mx-auto px-5 sm:px-8 flex items-center gap-5">

        {/* Logo + text */}
        <div className="flex items-center gap-3 shrink-0">
          <img src="/logo512.png" alt="FIFA" className="h-8 w-8 object-contain opacity-90"
            onError={e => e.target.style.display = "none"} />
          <div className="hidden md:block">
            <p className="text-white font-body font-bold text-[0.78rem] leading-tight">
              FIFA World Cup 2030™
            </p>
            <p className="text-white/40 font-body text-[0.58rem] tracking-wide mt-0.5">
              11 juin – 19 juillet 2030
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-white/15 shrink-0" />

        {/* Countdown */}
        <div className="flex items-baseline gap-3 sm:gap-5 flex-1 justify-center">
          {units.map((u, i) => (
            <div key={i} className="flex items-baseline gap-3 sm:gap-5">
              <div className="flex flex-col items-center">
                <span className="font-display text-white leading-none tabular-nums"
                  style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>
                  {String(u.v).padStart(2, "0")}
                </span>
                <span className="text-white/40 font-body uppercase tracking-widest mt-0.5"
                  style={{ fontSize: "0.5rem" }}>
                  {u.l}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="font-display text-white/40 text-lg pb-3 select-none"
                  style={{ opacity: tick ? 0.9 : 0.25, transition: "opacity 0.3s" }}>
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <a href="/matches"
          className="shrink-0 bg-black/30 hover:bg-black/50 border border-white/20 hover:border-white/40 text-white font-body font-bold rounded-lg px-4 sm:px-6 py-2 transition-all"
          style={{ fontSize: "0.72rem", letterSpacing: "0.02em" }}>
          <span className="hidden sm:inline">Voir les matches</span>
          <span className="sm:hidden">Matches</span>
        </a>
      </div>
    </div>
  );
}
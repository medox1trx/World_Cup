import { useState, useEffect } from "react";

const WC_DATE = new Date("2026-06-11T19:00:00Z");

function getTimeLeft() {
  const diff = WC_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

const UNITS = [
  { key: "days",    fr: "JOURS",  en: "DAYS"  },
  { key: "hours",   fr: "HEURES", en: "HRS"   },
  { key: "minutes", fr: "MIN",    en: "MIN"   },
  { key: "seconds", fr: "SEC",    en: "SEC"   },
];

export default function CountdownBanner() {
  const [time, setTime] = useState(getTimeLeft());
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeLeft());
      setTick(p => !p);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');

        :root {
          --cdb-red: #c8102e;
          --cdb-h:   44px;
        }

        .cdb-root {
          background: var(--cdb-red);
          height: var(--cdb-h);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Barlow Condensed', sans-serif;
        }

        /* CENTER: countdown */
        .cdb-units {
          display: flex; align-items: center;
          gap: 0; z-index: 1;
        }
        .cdb-unit {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          min-width: 52px; gap: 1px;
        }
        .cdb-num {
          color: #fff;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 1.45rem;
          line-height: 1;
          letter-spacing: -0.01em;
          font-variant-numeric: tabular-nums;
          transition: transform 0.15s ease;
        }
        .cdb-num.tick { transform: translateY(-1px); }
        .cdb-unit-label {
          color: rgba(255,255,255,0.45);
          font-family: 'Barlow', sans-serif;
          font-size: 7.5px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
        }
        .cdb-sep {
          color: rgba(255,255,255,0.45);
          font-size: 1.15rem; font-weight: 900;
          padding-bottom: 12px; margin: 0 1px;
          line-height: 1; user-select: none;
          transition: opacity 0.35s;
          font-family: 'Barlow Condensed', sans-serif;
        }

        /* ── RESPONSIVE ── */
      `}</style>

      <div className="cdb-root">
        {/* Countdown */}
        <div className="cdb-units">
          {UNITS.map((u, i) => (
            <div key={u.key} style={{ display: "flex", alignItems: "center" }}>
              <div className="cdb-unit">
                <span className={`cdb-num${tick && u.key === "seconds" ? " tick" : ""}`}>
                  {String(time[u.key]).padStart(2, "0")}
                </span>
                <span className="cdb-unit-label">{u.fr}</span>
              </div>
              {i < 3 && (
                <span className="cdb-sep" style={{ opacity: tick ? 1 : 0.15 }}>:</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
import { useState, useEffect } from "react";
import { FiShoppingCart, FiArrowRight, FiPlay, FiCalendar } from "react-icons/fi";
import { FONT, TICKER_ITEMS, C } from "./constants";

const YT_VIDEO_ID = "RDtdVQgB9ME";

// ─── NEWS TICKER ───────────────────────────────────────────────
export function NewsTicker() {
  const [idx,  setIdx]  = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % TICKER_ITEMS.length); setFade(true); }, 280);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ background: "#f8f8f8", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <div style={{
        maxWidth: 1380, margin: "0 auto", padding: "0 clamp(16px,3vw,32px)",
        display: "flex", alignItems: "center", height: 44, gap: 14,
      }}>
        <div style={{
          flexShrink: 0, display: "flex", alignItems: "center", gap: 6,
          background: "white", padding: "4px 10px", borderRadius: 2,
          border: "1px solid rgba(0,0,0,0.08)"
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#c8102e",
            flexShrink: 0, animation: "tdot 1.4s ease-in-out infinite",
          }} />
          <span style={{
            color: "#0a0a0a", fontSize: 9, fontWeight: 900,
            letterSpacing: "0.2em", textTransform: "uppercase",
            fontFamily: FONT.body, whiteSpace: "nowrap",
          }}>En Direct</span>
        </div>

        <div style={{ width: 1, height: 16, background: "rgba(0,0,0,0.1)", flexShrink: 0 }} />

        <p style={{
          flex: 1, color: "rgba(0,0,0,0.6)", fontSize: 12,
          fontFamily: FONT.body, overflow: "hidden", whiteSpace: "nowrap",
          textOverflow: "ellipsis", opacity: fade ? 1 : 0, transition: "opacity 0.28s",
          minWidth: 0,
        }}>
          {TICKER_ITEMS[idx]}
        </p>

        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          {TICKER_ITEMS.map((_, i) => (
            <button key={i}
              onClick={() => { setFade(false); setTimeout(() => { setIdx(i); setFade(true); }, 200); }}
              style={{
                width: i === idx ? 14 : 5, height: 5, borderRadius: 3,
                border: "none", cursor: "pointer", padding: 0,
                background: i === idx ? "#0d0d0d" : "rgba(0,0,0,0.15)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`@keyframes tdot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.3;transform:scale(.6);}}`}</style>
    </div>
  );
}

// ─── HERO ──────────────────────────────────────────────────────
export function HeroSection() {
  const [vis,     setVis]     = useState(false);
  const [ytReady, setYtReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fallback = setTimeout(() => setYtReady(true), 3000);
    const handler = (e) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.event === "onReady" || data?.info?.playerState === 1) {
          clearTimeout(fallback);
          setYtReady(true);
        }
      } catch (_) {}
    };
    window.addEventListener("message", handler);
    return () => { clearTimeout(fallback); window.removeEventListener("message", handler); };
  }, []);

  const s = (d) => ({
    opacity:   vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(18px)",
    transition: `opacity .6s ease ${d}s, transform .6s ease ${d}s`,
  });

  return (
    <>
<style>{`
        @keyframes bgz  { from{transform:scale(1);}   to{transform:scale(1.05);}  }
        @keyframes shim { from{left:-80%;}            to{left:130%;}              }
        @keyframes lpul { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.45);}
                          60%{box-shadow:0 0 0 8px rgba(34,197,94,0);}            }

        .hero-root {
          --bars: 146px;
          position: relative;
          background: #ffffff;
          min-height: max(500px, calc(100svh - var(--bars)));
          display: flex;
          align-items: center;
          overflow-x: hidden;
        }

        .hero-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 20%;
          animation: bgz 18s ease-in-out infinite alternate;
          transition: opacity .7s ease;
        }
        .hero-ov-b {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to top,
            rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 35%,
            rgba(255,255,255,0.2) 70%, rgba(255,255,255,0.4) 100%);
        }
        .hero-ov-l {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to right,
            rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.7) 45%, transparent 100%);
        }

        .hero-wrap {
          position: relative; z-index: 10;
          width: 100%; max-width: 1380px; margin: 0 auto;
          padding: clamp(40px,6vh,80px) clamp(16px,3vw,40px);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(20px,3vw,48px);
          align-items: center;
        }

        .hero-ey {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: clamp(10px,1.5vh,18px);
        }
        .hero-ey-line { width: 32px; height: 1px; background: rgba(0,0,0,0.15); }
        .hero-ey-txt {
          color: rgba(0,0,0,0.5); font-family: 'Barlow', sans-serif;
          font-size: clamp(8px,1vw,10px); font-weight: 800;
          letter-spacing: .4em; text-transform: uppercase;
        }

        .hero-h1 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; line-height: 0.9;
          text-transform: uppercase; letter-spacing: -.02em; margin: 0;
          font-size: clamp(64px, 10vw, 140px);
          color: #0d0d0d;
        }
        .h1-o {
          color: transparent;
          -webkit-text-stroke: clamp(1px, 0.13vw, 2px) rgba(0,0,0,0.2);
        }

        .hero-sub {
          color: rgba(0,0,0,0.65);
          font-family: 'Barlow', sans-serif;
          font-size: clamp(12px,1.4vw,15px);
          font-weight: 400; line-height: 1.8;
          margin: clamp(14px,2vh,22px) 0 clamp(24px,3.5vh,36px);
          max-width: 35ch;
        }

        .hero-cta {
          display: flex; flex-wrap: wrap;
          align-items: center; gap: clamp(8px,1.5vw,12px);
        }

        .btn-buy {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0d0d0d; color: white;
          font-family: 'Barlow', sans-serif;
          font-size: clamp(12px,1.2vw,14px); font-weight: 800; letter-spacing: .04em;
          padding: clamp(11px,1.4vh,14px) clamp(20px,2.2vw,28px);
          border-radius: 100px; text-decoration: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          transition: transform .2s, background .15s;
        }
        .btn-buy:hover { background: #222; transform: translateY(-2px); }

        .btn-watch {
          display: inline-flex; align-items: center; gap: 9px;
          text-decoration: none; border-radius: 100px;
          padding: clamp(11px,1.4vh,14px) clamp(16px,2vw,22px);
          background: #f0f0f0; border: 1px solid rgba(0,0,0,0.06);
          transition: background .22s;
        }
        .btn-watch:hover { background: #e8e8e8; }
        .btn-watch-circle {
          width: 24px; height: 24px; border-radius: 50%;
          background: #0d0d0d; display: flex; align-items: center; justify-content: center;
        }
        .btn-watch-label {
          color: #0d0d0d; font-family: 'Barlow', sans-serif;
          font-size: clamp(11px,1.1vw,13px); font-weight: 700;
        }

        .match-card {
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 16px; padding: 20px;
          backdrop-filter: blur(20px);
          width: clamp(200px,20vw,260px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }
        .mc-head { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .mc-head-txt {
          color: rgba(0,0,0,0.4); font-family: 'Barlow', sans-serif;
          font-size: 9px; font-weight: 800; letter-spacing: .15em; text-transform: uppercase;
        }
        .mc-teams {
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; gap: 10px; margin-bottom: 20px;
        }
        .mc-team { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .mc-flag { width: 44px; height: 30px; object-fit: cover; border-radius: 2px; }
        .mc-code { color: #0d0d0d; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 800; }
        .mc-vs-t { color: rgba(0,0,0,0.15); font-size: 11px; font-weight: 600; }
        .mc-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          background: #f0f0f0; color: #0d0d0d; font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 800; padding: 10px; border-radius: 8px;
          text-decoration: none; transition: background .15s;
        }
        .mc-btn:hover { background: #e8e8e8; }
        .live-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: lpul 1.8s infinite; }

        @media (max-width: 860px) {
          .hero-right { display: none; }
          .hero-ov-l { background: rgba(255,255,255,0.85); }
        }
      `}</style>

      <section className="hero-root">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <iframe
            src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
            allow="autoplay; encrypted-media"
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100vw",
              height: "56.25vw",
              minWidth: "177.78vh",
              minHeight: "100%",
              border: "none",
              opacity: ytReady ? 0.35 : 0,
              transition: "opacity 1.2s ease",
            }}
            title="hero-bg"
          />
        </div>

        <div className="hero-ov-b" />
        <div className="hero-ov-l" />

        <div className="hero-wrap">
          <div>
            <div className="hero-ey" style={s(0.05)}>
              <div className="hero-ey-line" />
              <span className="hero-ey-txt">Coupe du Monde FIFA 2030™</span>
            </div>
            <h1 className="hero-h1" style={s(0.12)}>
              LE <span className="h1-o">MONDE</span> UNI.
            </h1>
            <p className="hero-sub" style={s(0.38)}>
              11 juin – 19 juillet 2030<br />
              Six nations hôtes · 48 équipes<br />
              Un seul champion du monde
            </p>
            <div className="hero-cta" style={s(0.48)}>
              <a href="/tickets" className="btn-buy">
                <FiShoppingCart size={15} />
                <span>Acheter des billets</span>
                <FiArrowRight size={13} />
              </a>
              <a href="/highlights" className="btn-watch">
                <div className="btn-watch-circle">
                  <FiPlay size={10} color="white" style={{ marginLeft: 2 }} />
                </div>
                <span className="btn-watch-label">Voir les temps forts</span>
              </a>
            </div>
          </div>

          <div className="hero-right" style={s(0.62)}>
            <div className="match-card">
              <div className="mc-head">
                <span className="live-dot" />
                <span className="mc-head-txt">Prochain match</span>
              </div>
              <div className="mc-teams">
                <div className="mc-team">
                  <img className="mc-flag" src="https://flagcdn.com/w80/fr.png" alt="France" />
                  <span className="mc-code">FRA</span>
                </div>
                <div className="mc-vs">
                  <span className="mc-vs-t">VS</span>
                </div>
                <div className="mc-team">
                  <img className="mc-flag" src="https://flagcdn.com/w80/br.png" alt="Brésil" />
                  <span className="mc-code">BRÉ</span>
                </div>
              </div>
              <a href="/matches" className="mc-btn">
                <FiCalendar size={11} />
                <span>Voir le match</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
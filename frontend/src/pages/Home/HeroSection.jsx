import { useState, useEffect } from "react";
import { FiShoppingCart, FiArrowRight, FiPlay, FiCalendar } from "react-icons/fi";
import { FONT, TICKER_ITEMS } from "./constants";

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
    <div style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{
        maxWidth: 1380, margin: "0 auto", padding: "0 clamp(16px,3vw,32px)",
        display: "flex", alignItems: "center", height: 44, gap: 14,
      }}>
        <div style={{
          flexShrink: 0, display: "flex", alignItems: "center", gap: 6,
          background: "white", padding: "4px 10px", borderRadius: 2,
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

        <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)", flexShrink: 0 }} />

        <p style={{
          flex: 1, color: "rgba(255,255,255,0.5)", fontSize: 12,
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
                background: i === idx ? "white" : "rgba(255,255,255,0.2)",
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

  const WORDS = [
    { word: "LE",    cls: "h1-w", sizeClass: "h1-le",    delay: 0.12 },
    { word: "MONDE", cls: "h1-o", sizeClass: "h1-monde", delay: 0.20 },
    { word: "UNI.",  cls: "h1-w", sizeClass: "h1-uni",   delay: 0.28 },
  ];

  return (
    <>
<style>{`
        @keyframes bgz  { from{transform:scale(1);}   to{transform:scale(1.05);}  }
        @keyframes shim { from{left:-80%;}            to{left:130%;}              }
        @keyframes lpul { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.45);}
                          60%{box-shadow:0 0 0 8px rgba(34,197,94,0);}            }
        @keyframes idot { 0%,100%{opacity:1;transform:scale(1);}
                          50%{opacity:.3;transform:scale(.6);}                    }

        .hero-root {
          --bars: 146px;
          position: relative;
          background: #0a0a0a;
          min-height: max(500px, calc(100svh - var(--bars)));
          display: flex;
          align-items: center;
          overflow-x: hidden;
          overflow-y: visible;
        }

        .hero-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 20%;
          animation: bgz 18s ease-in-out infinite alternate;
          transition: opacity .7s ease;
          pointer-events: none; user-select: none;
        }
        .hero-ov-b {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to top,
            #0a0a0a 0%, rgba(10,10,10,.82) 38%,
            rgba(10,10,10,.3) 68%, rgba(10,10,10,.55) 100%);
        }
        .hero-ov-l {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to right,
            rgba(10,10,10,.96) 0%, rgba(10,10,10,.55) 52%, transparent 100%);
        }

        .hero-dots {
          position: absolute; bottom: 20px; right: clamp(16px,3vw,32px);
          z-index: 20; display: flex; gap: 5px;
        }
        .hero-dot {
          height: 5px; border-radius: 3px; border: none;
          cursor: pointer; padding: 0;
          background: rgba(255,255,255,.3); transition: all .35s;
        }
        .hero-dot.on  { width: 18px; background: white; }
        .hero-dot.off { width: 5px; }

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
          width: 100%;
        }
        .hero-ey-line { width: 32px; height: 1px; background: rgba(255,255,255,.28); flex-shrink: 0; }
        .hero-ey-txt {
          color: rgba(255,255,255,.35);
          font-family: 'Barlow', sans-serif;
          font-size: clamp(8px,1vw,10px); font-weight: 800;
          letter-spacing: .4em; text-transform: uppercase;
        }

.hero-h1 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900; line-height: 0.9;
  text-transform: uppercase; letter-spacing: -.02em; margin: 0;
  display: block; width: 100%; overflow: visible;
  font-size: clamp(164px, 10vw, 140px);
}
        .hero-h1:last-child { padding-bottom: 0.06em; }

        .h1-le    { font-size: clamp(64px, 10vw, 140px); }
        .h1-monde { font-size: clamp(64px, 10vw, 140px); }
        .h1-uni   { font-size: clamp(64px, 10vw, 140px); }

.h1-w { color: white; }
.h1-o {
  color: transparent;
  -webkit-text-stroke: clamp(1px, 0.13vw, 2px) rgba(255,255,255,.55);
}

        .hero-sub {
          color: rgba(255,255,255,.38);
          font-family: 'Barlow', sans-serif;
          font-size: clamp(12px,1.4vw,15px);
          font-weight: 400; line-height: 1.8;
          margin: clamp(14px,2vh,22px) 0 clamp(24px,3.5vh,36px);
          max-width: 30ch; width: 100%;
        }

        .hero-cta {
          display: flex; flex-wrap: wrap;
          align-items: center; gap: clamp(8px,1.5vw,12px);
          margin-bottom: clamp(18px,2.5vh,28px);
          width: 100%;
        }

        .btn-buy {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
          background: white; color: #0a0a0a;
          font-family: 'Barlow', sans-serif;
          font-size: clamp(12px,1.2vw,14px); font-weight: 800; letter-spacing: .04em;
          padding: clamp(11px,1.4vh,14px) clamp(20px,2.2vw,28px);
          border-radius: 100px; text-decoration: none;
          box-shadow: 0 4px 20px rgba(0,0,0,.4);
          transition: transform .2s ease, box-shadow .2s ease, background .15s;
          white-space: nowrap;
        }
        .btn-buy:hover {
          background: #efefef;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,.55);
        }
        .btn-buy:active { transform: translateY(0); }
        .btn-buy .shimmer {
          position: absolute; top: 0; left: -80%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent);
          pointer-events: none;
        }
        .btn-buy:hover .shimmer { animation: shim .5s ease forwards; }
        .btn-buy .arr { transition: transform .2s; }
        .btn-buy:hover .arr { transform: translateX(3px); }

        .btn-watch {
          display: inline-flex; align-items: center; gap: 9px;
          text-decoration: none;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 100px;
          padding: clamp(11px,1.4vh,14px) clamp(16px,2vw,22px);
          transition: background .22s, border-color .22s;
          white-space: nowrap;
        }
        .btn-watch:hover {
          background: rgba(255,255,255,.14);
          border-color: rgba(255,255,255,.45);
        }
        .btn-watch-circle {
          width: clamp(22px,2.2vw,26px); height: clamp(22px,2.2vw,26px);
          border-radius: 50%; border: 1.5px solid rgba(255,255,255,.35);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: border-color .22s;
        }
        .btn-watch:hover .btn-watch-circle { border-color: rgba(255,255,255,.8); }
        .btn-watch-label {
          color: rgba(255,255,255,.6); font-family: 'Barlow', sans-serif;
          font-size: clamp(11px,1.1vw,13px); font-weight: 700; letter-spacing: .04em;
          transition: color .2s;
        }
        .btn-watch:hover .btn-watch-label { color: rgba(255,255,255,.95); }

        .hero-live {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 14px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.04);
          backdrop-filter: blur(8px);
          text-decoration: none; transition: all .2s;
          width: fit-content;
        }
        .hero-live:hover { background: rgba(255,255,255,.09); border-color: rgba(255,255,255,.22); }
        .live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e; flex-shrink: 0;
          animation: lpul 1.8s ease-in-out infinite;
        }
        .live-txt {
          color: rgba(255,255,255,.42); font-family: 'Barlow', sans-serif;
          font-size: clamp(10px,1vw,11px); font-weight: 500; letter-spacing: .05em;
          white-space: nowrap;
        }

        .match-card {
          background: rgba(10,10,10,.78);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: clamp(10px,1.2vw,16px);
          padding: clamp(14px,1.8vw,22px);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          width: clamp(180px,18vw,240px);
          flex-shrink: 0;
        }
        .mc-head { display: flex; align-items: center; gap: 6px; margin-bottom: clamp(12px,1.5vh,18px); }
        .mc-head-txt {
          color: rgba(255,255,255,.4); font-family: 'Barlow', sans-serif;
          font-size: clamp(8px,.9vw,9px); font-weight: 800;
          letter-spacing: .2em; text-transform: uppercase;
        }
        .mc-teams {
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; gap: 6px;
          margin-bottom: clamp(12px,1.5vh,18px);
        }
        .mc-team { display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .mc-flag {
          width: clamp(32px,3.5vw,44px); height: clamp(22px,2.3vw,30px);
          object-fit: cover; border-radius: 3px; display: block;
          box-shadow: 0 2px 8px rgba(0,0,0,.45);
        }
        .mc-code {
          color: white; font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(11px,1.1vw,14px); font-weight: 800; letter-spacing: .08em;
        }
        .mc-vs { text-align: center; }
        .mc-vs-t {
          display: block; color: rgba(255,255,255,.18); font-family: 'Barlow', sans-serif;
          font-size: clamp(10px,1vw,12px); font-weight: 600;
        }
        .mc-time {
          display: block; color: rgba(255,255,255,.28); font-family: 'Barlow', sans-serif;
          font-size: clamp(9px,.9vw,10px); margin-top: 3px;
        }
        .mc-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          background: white; color: #0a0a0a; font-family: 'Barlow', sans-serif;
          font-size: clamp(9px,.95vw,11px); font-weight: 800;
          letter-spacing: .12em; text-transform: uppercase;
          padding: clamp(8px,1vh,11px) 14px;
          border-radius: 100px; text-decoration: none; transition: background .18s;
        }
        .mc-btn:hover { background: #e8e8e8; }

@media (max-width: 1024px) {
          .hero-wrap { grid-template-columns: 1fr auto; gap: 24px; }
          .match-card { width: clamp(160px, 16vw, 200px); }
        }

        @media (max-width: 860px) {
          .hero-wrap {
            grid-template-columns: 1fr;
            padding: clamp(48px,7vh,80px) clamp(20px,4vw,36px);
          }
          .hero-right { display: none; }
          .hero-ov-l {
            background: linear-gradient(to right,
              rgba(10,10,10,.95) 0%,
              rgba(10,10,10,.7)  50%,
              rgba(10,10,10,.3)  100%);
          }
          .hero-h1  { font-size: clamp(66px, 14vw, 130px); }
          .hero-sub { max-width: 42ch; }
          .hero-cta { flex-direction: row; flex-wrap: wrap; gap: 12px; }
          .btn-buy  { flex: 1 1 auto; min-width: 160px; justify-content: center; }
          .btn-watch{ flex: 1 1 auto; min-width: 160px; justify-content: center; }
          .btn-watch-label { display: inline !important; }
        }

        @media (max-width: 600px) {
          .hero-root { min-height: 100svh; }
          .hero-wrap { padding: 40px 20px 52px; }
          .hero-h1   { font-size: clamp(76px, 56vw, 93px); }
          .hero-sub  { font-size: 13px; max-width: 100%; line-height: 1.7; }
          .hero-ey-txt { font-size: 8px; letter-spacing: .2em; }
          .hero-cta { flex-direction: column; align-items: stretch; gap: 10px; width: 100%; }
          .btn-buy  { width: 100%; justify-content: center; box-sizing: border-box; padding: 14px 20px; font-size: 13px; }
          .btn-watch{ width: 100%; justify-content: center; box-sizing: border-box; padding: 13px 20px; }
          .btn-watch-label { display: inline !important; font-size: 13px; color: rgba(255,255,255,.85); }
          .btn-watch-circle { display: flex; }
        }

        @media (max-width: 380px) {
          .hero-h1  { font-size: clamp(28px, 13vw, 52px); }
          .btn-buy  { font-size: 12px; padding: 12px 16px; }
          .btn-watch{ padding: 12px 16px; }
          .btn-buy-txt-long  { display: inline; }
          .btn-buy-txt-short { display: none; }
        }
      `}</style>

      <section className="hero-root">

        {/* ── VIDEO BACKGROUND ── */}
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
              opacity: ytReady ? 0.45 : 0,
              transition: "opacity 1.2s ease",
            }}
            title="hero-bg"
          />
        </div>

        <div className="hero-ov-b" />
        <div className="hero-ov-l" />

        <div className="hero-wrap">

          {/* ── LEFT ── */}
          <div>

            <div className="hero-ey" style={s(0.05)}>
              <div className="hero-ey-line" />
              <span className="hero-ey-txt">Coupe du Monde FIFA 2030™</span>
            </div>

            {/* Words — each fills its own full width */}
            <div style={{ width: "100%", overflow: "visible" }}>
  <h1 className="hero-h1 h1-w" style={s(0.12)}>
    LE <span className="h1-o">MONDE</span> UNI.
  </h1>
</div>

            <p className="hero-sub" style={s(0.38)}>
              11 juin – 19 juillet 2030<br />
              Six nations hôtes · 48 équipes<br />
              Un seul champion du monde
            </p>

            <div className="hero-cta" style={s(0.48)}>
              <a href="/tickets" className="btn-buy">
                <span className="shimmer" />
                <FiShoppingCart size={15} />
                <span className="btn-buy-txt-long">Acheter des billets</span>
                <span className="btn-buy-txt-short" style={{ display: "none" }}>Billets</span>
                <FiArrowRight size={13} className="arr" />
              </a>
              <a href="/highlights" className="btn-watch">
                <div className="btn-watch-circle">
                  <FiPlay size={12} color="white" style={{ marginLeft: 2 }} />
                </div>
                <span className="btn-watch-label">Voir les temps forts</span>
              </a>
            </div>

          </div>

          {/* ── RIGHT: Match card ── */}
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
                  <span className="mc-time">11 juin · 18h00</span>
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
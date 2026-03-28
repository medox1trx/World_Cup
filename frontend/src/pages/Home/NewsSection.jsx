import { useEffect, useRef, useState } from "react";
import { FiCalendar, FiArrowRight, FiArrowUpRight, FiClock, FiImage } from "react-icons/fi";
import { C, FONT, NEWS_FEATURED, NEWS_SIDE, NEWS_MORE } from "./constants";
import { SectionHead } from "./ui";

// ─── Shared hover hook ────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

// ─── Tag pill ─────────────────────────────────────────────────
function Tag({ label, dark = false }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 9px",
      fontSize: 8, fontWeight: 900, letterSpacing: "0.24em",
      textTransform: "uppercase", fontFamily: FONT.body,
      background: dark ? "#0d0d0d" : "#eeeeee",
      color: dark ? "white" : "#0d0d0d",
      borderRadius: 2, lineHeight: 1.6, whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

// ─── Smart image — handles errors + fallback ──────────────────
function ArticleImg({ src, style, onLoad }) {
  const [ok, setOk] = useState(!!src);

  useEffect(() => { setOk(!!src); }, [src]);

  if (!src || !ok) {
    return (
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 6,
        background: "#f5f5f5",
      }}>
        <FiImage size={18} color="rgba(0,0,0,0.1)" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setOk(false)}
      onLoad={onLoad}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }}
    />
  );
}

function resolveImg(img, size = "w640") {
  if (!img) return null;
  if (img.startsWith("http")) return img;
  return `https://flagcdn.com/${size}/${img.toLowerCase()}.png`;
}

// ─── Count-up ──────────────────────────────────────────────────
function useCountUp(target, duration = 1400, delay = 0, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    const numeric = parseInt(target.toString().replace(/\D/g, ""), 10);
    const suffix  = target.toString().replace(/[0-9]/g, "");
    if (isNaN(numeric)) { setValue(target); return; }
    let raf, startTime = null;
    const tid = setTimeout(() => {
      raf = requestAnimationFrame(function step(ts) {
        if (!startTime) startTime = ts;
        const p = Math.min((ts - startTime) / duration, 1);
        const e = 1 - Math.pow(1 - p, 4);
        setValue(Math.floor(e * numeric) + suffix);
        if (p < 1) raf = requestAnimationFrame(step);
        else setValue(numeric + suffix);
      });
    }, delay);
    return () => { clearTimeout(tid); cancelAnimationFrame(raf); };
  }, [started, target, duration, delay]);
  return value;
}

// ─── Stat cell ─────────────────────────────────────────────────
function StatCell({ value, label, started, index }) {
  const counted = useCountUp(value, 1400, index * 110, started);
  return (
    <div className="sb-cell">
      <span className="sb-num">{started ? counted : <span style={{ opacity: 0.1 }}>–</span>}</span>
      <span className="sb-label">{label}</span>
    </div>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────
export function StatsBar({ stats, loading }) {
  const ref = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fallback = [
    { value: "48",  label: "Équipes"       },
    { value: "104", label: "Matchs"        },
    { value: "6",   label: "Nations hôtes" },
    { value: "1",   label: "Champion"      },
  ];

  const items = (!loading && stats?.length) ? stats : fallback;

  return (
    <>
      <style>{`
        .sb-root { background: #ffffff; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .sb-inner { max-width: 1380px; margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); }
        .sb-cell {
          position: relative; display: flex; flex-direction: column;
          align-items: center; justify-content: center; padding: 24px 12px;
          opacity: 0; transform: translateY(10px);
          transition: all 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .sb-cell:not(:last-child)::after {
          content: ''; position: absolute; right: 0; top: 25%; bottom: 25%;
          width: 1px; background: rgba(0,0,0,0.06);
        }
        .sb-in .sb-cell { opacity:1; transform:none; }
        .sb-in .sb-cell:nth-child(1) { transition-delay:0.00s; }
        .sb-in .sb-cell:nth-child(2) { transition-delay:0.08s; }
        .sb-in .sb-cell:nth-child(3) { transition-delay:0.16s; }
        .sb-in .sb-cell:nth-child(4) { transition-delay:0.24s; }
        .sb-num {
          font-family: ${FONT.display}; font-weight: 900; color: #0d0d0d;
          font-size: clamp(1.8rem, 2.8vw, 2.4rem); line-height: 1; letter-spacing: -0.03em;
        }
        .sb-label {
          font-family: ${FONT.body}; font-size: 9px;
          font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(0,0,0,0.4); margin-top: 6px; text-align: center;
        }
        @media (max-width: 600px) {
          .sb-inner { grid-template-columns: repeat(2,1fr); }
          .sb-cell:nth-child(2n)::after { display: none; }
          .sb-cell { padding: 20px 10px; border-bottom: 1px solid rgba(0,0,0,0.06); }
        }
      `}</style>

      <div className="sb-root" ref={ref}>
        <div className={`sb-inner${entered ? " sb-in" : ""}`}>
          {items.map((item, i) => (
            <StatCell key={i} index={i} value={item.value} label={item.label} started={entered} />
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Featured card ────────────────────────────────────────────
function FeaturedCard({ article }) {
  const [hovered, hoverProps] = useHover();
  const src = resolveImg(article.img, "w640");

  return (
    <a href="/news" style={{ textDecoration: "none", display: "block" }} {...hoverProps}>
      <div style={{
        position: "relative", overflow: "hidden",
        background: "#eee", minHeight: "clamp(300px,40vw,480px)",
        height: "100%", borderRadius: 8,
      }}>
        <ArticleImg
          src={src}
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: 32,
        }}>
          <Tag label={article.tag} dark />
          <h3 style={{
            fontFamily: FONT.display, fontWeight: 900, color: "white",
            fontSize: "clamp(1.5rem,2.5vw,2.2rem)",
            lineHeight: 1.1, letterSpacing: "0.01em", margin: "12px 0 8px",
          }}>{article.title}</h3>
          <p style={{
            color: "rgba(255,255,255,0.7)", fontFamily: FONT.body,
            fontSize: 14, lineHeight: 1.6, marginBottom: 16,
            maxWidth: "60ch",
          }}>{article.desc}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "white", fontWeight: 800, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            LIRE L'ARTICLE <FiArrowRight />
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Side article ─────────────────────────────────────────────
function SideArticle({ article, last }) {
  const [hovered, hoverProps] = useHover();
  const src = resolveImg(article.img, "w200");

  return (
    <a href="/news" style={{
      display: "flex", gap: 16, padding: "20px 0",
      borderBottom: last ? "none" : "1px solid #eee",
      textDecoration: "none",
    }} {...hoverProps}>
      <div style={{ width: 100, height: 70, flexShrink: 0, background: "#f0f0f0", position: "relative", overflow: "hidden", borderRadius: 4 }}>
        <ArticleImg src={src} style={{ opacity: hovered ? 1 : 0.85, transition: "0.3s" }} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
        <span style={{ fontSize: 9, fontWeight: 900, color: "#c8102e", letterSpacing: "0.1em", textTransform: "uppercase" }}>{article.tag}</span>
        <p style={{
          fontSize: 14, fontWeight: 700, color: "#0d0d0d", lineHeight: 1.3,
          fontFamily: FONT.body, transition: "color 0.2s"
        }}>{article.title}</p>
        <span style={{ fontSize: 11, color: "#888", fontFamily: FONT.body }}>{article.date}</span>
      </div>
    </a>
  );
}

// ─── NEWS SECTION ─────────────────────────────────────────────
export function NewsSection() {
  return (
    <section style={{ background: "#ffffff", padding: "80px 0" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 clamp(16px,3vw,32px)" }}>
        <SectionHead eyebrow="Dernières actus" title="À la Une" action="Voir tout" href="/news" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40 }}>
          <FeaturedCard article={NEWS_FEATURED} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {NEWS_SIDE.map((n, i) => (
              <SideArticle key={i} article={n} last={i === NEWS_SIDE.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MORE NEWS ────────────────────────────────────────────────
export function MoreNewsSection() {
  return (
    <section style={{ background: "#fcfcfc", borderTop: "1px solid #eee", padding: "80px 0" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 clamp(16px,3vw,32px)" }}>
        <SectionHead eyebrow="Exploration" title="Plus de news" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 32 }}>
          {NEWS_MORE.map((n, i) => (
            <a key={i} href="/news" style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ aspectRatio: "16/9", background: "#eee", borderRadius: 8, overflow: "hidden", position: "relative" }}>
                <ArticleImg src={resolveImg(n.img)} />
              </div>
              <div>
                <span style={{ fontSize: 9, fontWeight: 900, color: "#c8102e", textTransform: "uppercase", letterSpacing: "0.1em" }}>{n.tag}</span>
                <h4 style={{ fontSize: 16, fontWeight: 800, margin: "6px 0", lineHeight: 1.3 }}>{n.title}</h4>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>{n.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
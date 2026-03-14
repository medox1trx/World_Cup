import { useState } from "react";
import { FiChevronRight, FiGrid, FiMapPin, FiGlobe, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import { C, FONT, GROUPS, HOST_CITIES } from "./constants";
import { Flag, SectionHead } from "./ui";

// ─── Shared hover hook ────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

// ─── GROUP TABLE ──────────────────────────────────────────────
function GroupTable({ group }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 4, overflow: "hidden" }}>

      {/* Header */}
      <div style={{
        background: C.black, padding: "9px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          color: "white", fontSize: 9, fontWeight: 900,
          letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: FONT.body,
        }}>
          {group.name}
        </span>
        <a href="/standings" style={{
          display: "flex", alignItems: "center", gap: 3,
          color: "rgba(255,255,255,0.28)", fontSize: 8, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.12em",
          textDecoration: "none", fontFamily: FONT.body,
          transition: "color 0.15s",
        }}
          onMouseOver={e => e.currentTarget.style.color = "white"}
          onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.28)"}
        >
          Détails <FiChevronRight size={9} />
        </a>
      </div>

      {/* Column headers */}
      <div style={{
        background: "#f9f9f9", padding: "5px 12px",
        display: "grid", borderBottom: `1px solid #ececec`,
        gridTemplateColumns: "16px 1fr 20px 20px 26px",
        gap: 4,
      }}>
        {["", "Équipe", "J", "DG", "Pts"].map((h, i) => (
          <span key={i} style={{
            fontSize: 8, fontWeight: 900, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#bbb", fontFamily: FONT.body,
            textAlign: i >= 2 ? "center" : "left",
          }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      {group.teams.map((r, i) => {
        const [hovered, hoverProps] = useHover(); // eslint-disable-line
        const qualified = i < 2;
        return (
          <div key={i} style={{
            padding: "9px 12px",
            display: "grid", gap: 4, alignItems: "center",
            borderBottom: i < group.teams.length - 1 ? `1px solid #f5f5f5` : "none",
            background: hovered ? "#f4f4f4" : qualified ? "white" : "#fbfbfb",
            gridTemplateColumns: "16px 1fr 20px 20px 26px",
            cursor: "pointer", transition: "background 0.15s",
          }} {...hoverProps}>

            {/* Position */}
            <span style={{
              fontSize: 9, fontWeight: 900, fontFamily: FONT.body,
              color: qualified ? "#15803d" : "#ccc",
              fontVariantNumeric: "tabular-nums",
            }}>{r.pos}</span>

            {/* Team */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
              <Flag code={r.code} alt={r.team} size={13} />
              <span style={{
                fontSize: 11, fontWeight: 700, color: C.black,
                fontFamily: FONT.body, overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{r.team}</span>
              {qualified && (
                <span style={{
                  fontSize: 7, fontWeight: 900, color: "#15803d",
                  background: "#f0fdf4", border: "1px solid #bbf7d0",
                  padding: "1px 4px", borderRadius: 2, lineHeight: 1.4, flexShrink: 0,
                }}>Q</span>
              )}
            </div>

            {/* Stats */}
            {[r.pld, r.gd].map((val, j) => (
              <span key={j} style={{
                fontSize: 10, color: C.mid, textAlign: "center",
                fontFamily: FONT.body, fontVariantNumeric: "tabular-nums",
              }}>{val ?? "—"}</span>
            ))}

            {/* Points */}
            <span style={{
              fontSize: 12, fontWeight: 900, color: C.black,
              textAlign: "center", fontFamily: FONT.body,
              fontVariantNumeric: "tabular-nums",
            }}>{r.pts}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── STANDINGS SECTION ────────────────────────────────────────
export function StandingsSection() {
  return (
    <>
      <style>{`
        .st-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 14px;
        }
        @media (max-width: 900px) { .st-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px) { .st-grid { grid-template-columns: 1fr; } }

        .st-cta {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          width: 100%; padding: 12px 0; border-radius: 100px;
          font-size: 9px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase;
          color: ${C.mid}; border: 1px solid ${C.border};
          text-decoration: none; font-family: ${FONT.body};
          transition: all 0.15s; background: transparent;
        }
        .st-cta:hover { border-color: ${C.black}; color: ${C.black}; }
      `}</style>

      <section style={{ background: "white", padding: "clamp(28px,5vw,48px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>
          <SectionHead
            eyebrow="Classements" title="Groupes"
            action="Tous les groupes" href="/standings"
            icon={FiTrendingUp}
          />
          <div className="st-grid">
            {GROUPS.map((g, i) => <GroupTable key={i} group={g} />)}
          </div>
          <a href="/standings" className="st-cta">
            <FiGrid size={11} /> Voir tous les groupes
          </a>
        </div>
      </section>
    </>
  );
}

// ─── CITY CARD ────────────────────────────────────────────────
function CityCard({ city }) {
  const [hovered, hoverProps] = useHover();
  return (
    <a href="/cities" style={{
      position: "relative", display: "flex", flexDirection: "column",
      justifyContent: "flex-end",
      minHeight: "clamp(100px,14vw,140px)",
      borderRadius: 4, overflow: "hidden",
      background: city.bg || "#111",
      textDecoration: "none",
      border: `1px solid ${hovered ? "#aaa" : "transparent"}`,
      transition: "border-color 0.25s",
    }} {...hoverProps}>

      {/* Flag bg */}
      <img
        src={`https://flagcdn.com/w320/${city.code}.png`} alt=""
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
          opacity: hovered ? 0.28 : 0.16,
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "opacity 0.4s, transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
      }} />

      {/* Arrow */}
      <div style={{
        position: "absolute", top: 8, right: 8,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translate(0,0)" : "translate(4px,-4px)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: "50%",
          background: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <FiArrowRight size={10} color={C.black} />
        </div>
      </div>

      {/* Text */}
      <div style={{ position: "relative", zIndex: 1, padding: "10px 12px" }}>
        <p style={{
          color: "white", fontFamily: FONT.display,
          fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 900,
          letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1,
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}>{city.city}</p>
        <p style={{
          display: "flex", alignItems: "center", gap: 3,
          color: "rgba(255,255,255,0.4)", fontSize: 8, fontWeight: 600,
          marginTop: 4, fontFamily: FONT.body,
        }}>
          <FiGlobe size={7} /> {city.country}
        </p>
      </div>

      {/* Bottom sweep line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: "1.5px", background: "white", opacity: 0.5,
        width: hovered ? "100%" : "0%",
        transition: "width 0.45s cubic-bezier(0.22,1,0.36,1)",
      }} />
    </a>
  );
}

// ─── CITIES SECTION ───────────────────────────────────────────
export function CitiesSection() {
  return (
    <>
      <style>{`
        .ci-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 6px;
        }
        @media (max-width: 1024px) { .ci-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 640px)  { .ci-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 400px)  { .ci-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      <section style={{ background: "#f7f7f7", padding: "clamp(28px,5vw,48px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>
          <SectionHead
            eyebrow="Villes Hôtes" title="Les Villes"
            action="Explorer toutes" href="/cities"
            icon={FiMapPin}
          />
          <div className="ci-grid">
            {HOST_CITIES.map((c, i) => <CityCard key={i} city={c} />)}
          </div>
        </div>
      </section>
    </>
  );
}
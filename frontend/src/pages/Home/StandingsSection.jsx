import { FiChevronRight, FiGrid, FiMapPin, FiGlobe, FiTrendingUp } from "react-icons/fi";
import { C, FONT, GROUPS, HOST_CITIES } from "./constants";
import { Flag, SectionHead } from "./ui";

// ─── GROUP TABLE ──────────────────────────────────────────────
function GroupTable({ group }) {
  return (
    <div style={{ border:`1px solid ${C.border}`, borderRadius:4, overflow:"hidden" }}>

      {/* Header */}
      <div style={{
        background: C.black, padding:"10px 16px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <span style={{ color:"white", fontSize:10, fontWeight:900, letterSpacing:"0.2em", textTransform:"uppercase", fontFamily: FONT.body }}>
          {group.name}
        </span>
        <a href="/standings" style={{
          display:"flex", alignItems:"center", gap:4,
          color:"rgba(255,255,255,0.3)", fontSize:9, fontWeight:800,
          textTransform:"uppercase", letterSpacing:"0.12em",
          textDecoration:"none", fontFamily: FONT.body,
        }}
          onMouseOver={e => e.currentTarget.style.color = "white"}
          onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
        >
          Détails <FiChevronRight size={10}/>
        </a>
      </div>

      {/* Column headers */}
      <div style={{
        background:"#f0f0f0", padding:"6px 12px",
        display:"grid", gap:4, borderBottom:`1px solid #ddd`,
        gridTemplateColumns:"18px 1fr 24px 24px 28px",
      }}>
        {["","Équipe","J","DG","Pts"].map((h, i) => (
          <span key={i} style={{
            fontSize:9, fontWeight:900, letterSpacing:"0.12em",
            textTransform:"uppercase", color:"#555", fontFamily: FONT.body,
            textAlign: i >= 2 ? "center" : "left",
          }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      {group.teams.map((r, i) => (
        <div key={i} style={{
          padding:"10px 12px",
          display:"grid", gap:4, alignItems:"center",
          borderBottom: i < group.teams.length - 1 ? `1px solid #f0f0f0` : "none",
          background: "white",
          gridTemplateColumns:"18px 1fr 24px 24px 28px",
          cursor:"pointer",
        }}
          onMouseOver={e => e.currentTarget.style.background = "#f5f5f5"}
          onMouseOut={e => e.currentTarget.style.background = "white"}
        >
          <span style={{
            fontSize:10, fontWeight:900, fontFamily: FONT.body,
            color:"#bbb", fontVariantNumeric:"tabular-nums",
          }}>{r.pos}</span>

          <div style={{ display:"flex", alignItems:"center", gap:6, minWidth:0 }}>
            <Flag code={r.code} alt={r.team} size={14}/>
            <span style={{ fontSize:11, fontWeight:700, color: C.black, fontFamily: FONT.body, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {r.team}
            </span>
          </div>

          {[r.pld, r.gd].map((val, j) => (
            <span key={j} style={{ fontSize:11, color:"#555", textAlign:"center", fontFamily: FONT.body, fontVariantNumeric:"tabular-nums" }}>
              {val}
            </span>
          ))}
          <span style={{ fontSize:12, fontWeight:900, color:"#444", textAlign:"center", fontFamily: FONT.body }}>
            {r.pts}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── STANDINGS SECTION ────────────────────────────────────────
export function StandingsSection() {
  return (
    <>
      <style>{`
        .standings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        @media (max-width: 860px) {
          .standings-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 540px) {
          .standings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section style={{ background:"white", padding:"clamp(28px,5vw,48px) 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 clamp(12px,4vw,24px)" }}>
          <SectionHead eyebrow="Classements" title="Groupes" action="Tous les groupes" href="/standings"/>

          <div className="standings-grid">
            {GROUPS.map((g, i) => <GroupTable key={i} group={g}/>)}
          </div>

          <a href="/standings" style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            width:"100%", padding:"12px 0", borderRadius:100,
            fontSize:10, fontWeight:900, letterSpacing:"0.14em", textTransform:"uppercase",
            color:"#444", border:`1px solid #ccc`,
            textDecoration:"none", fontFamily: FONT.body,
            transition:"all 0.15s",
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = C.black; e.currentTarget.style.color = C.black; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#444"; }}
          >
            <FiGrid size={12}/> Voir tous les groupes
          </a>
        </div>
      </section>
    </>
  );
}

// ─── CITIES SECTION ───────────────────────────────────────────
export function CitiesSection() {
  return (
    <>
      <style>{`
        .cities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .city-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 220px;
          border-radius: 4px;
          overflow: hidden;
          text-decoration: none;
        }
        .city-card img { opacity: 0.78; transition: opacity 0.4s; }
        .city-card:hover img { opacity: 0.92; }
        @media (max-width: 720px) {
          .cities-grid {
            grid-template-columns: 1fr;
          }
          .city-card {
            min-height: 160px;
          }
        }
      `}</style>

      <section style={{ background:"white", padding:"clamp(28px,5vw,48px) 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 clamp(12px,4vw,24px)" }}>
          <SectionHead eyebrow="Pays Hôtes" title="Pays Organisateurs" action="Explorer" href="/cities"/>

          <div className="cities-grid">
            {HOST_CITIES.map((c, i) => (
              <a key={i} href="/cities" className="city-card" style={{ background: c.bg }}>
                <img
                  src={`https://flagcdn.com/${c.code}.svg`} alt=""
                  style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}
                />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.78),transparent)" }}/>
                <div style={{ position:"relative", zIndex:1, padding:"clamp(12px,3vw,20px)" }}>
                  <p style={{
                    color:"white", fontFamily: FONT.display,
                    fontSize:"clamp(18px,4vw,26px)", fontWeight:800,
                    letterSpacing:"0.12em", textTransform:"uppercase", lineHeight:1, margin:0,
                  }}>{c.city}</p>
                  <p style={{
                    display:"flex", alignItems:"center", gap:4,
                    color:"rgba(255,255,255,0.6)", fontSize:"clamp(9px,2vw,11px)",
                    fontWeight:600, marginTop:5, marginBottom:0, fontFamily: FONT.body,
                  }}>
                    <FiGlobe size={9}/> {c.country}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
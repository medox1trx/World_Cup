import { FiChevronRight, FiGrid, FiMapPin, FiGlobe, FiTrendingUp } from "react-icons/fi";
import { C, FONT, GROUPS, HOST_CITIES } from "./constants";
import { Flag, SectionHead } from "./ui";

// ─── GROUP TABLE ──────────────────────────────────────────────
function GroupTable({ group }) {
  return (
    <div style={{ border:`1px solid #eee`, borderRadius:8, overflow:"hidden", background:"white", boxShadow:"0 4px 12px rgba(0,0,0,0.03)" }}>

      {/* Header */}
      <div style={{
        background: "#f8f8f8", padding:"12px 16px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        borderBottom: "1px solid #eee"
      }}>
        <span style={{ color:"#0d0d0d", fontSize:11, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily: FONT.body }}>
          {group.name}
        </span>
        <a href="/standings" style={{
          fontSize:10, fontWeight:800, color:"#888", textDecoration:"none", fontFamily: FONT.body
        }}>
          Détails →
        </a>
      </div>

      {/* Column headers */}
      <div style={{
        padding:"8px 16px",
        display:"grid", gap:4, borderBottom:`1px solid #f5f5f5`,
        gridTemplateColumns:"18px 1fr 24px 24px 28px",
      }}>
        {["","Équipe","J","DG","Pts"].map((h, i) => (
          <span key={i} style={{
            fontSize:9, fontWeight:900, color:"#aaa", textTransform:"uppercase", fontFamily: FONT.body,
            textAlign: i >= 2 ? "center" : "left",
          }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      {group.teams.map((r, i) => (
        <div key={i} style={{
          padding:"12px 16px",
          display:"grid", gap:4, alignItems:"center",
          borderBottom: i < group.teams.length - 1 ? `1px solid #f5f5f5` : "none",
          gridTemplateColumns:"18px 1fr 24px 24px 28px",
        }}>
          <span style={{ fontSize:11, fontWeight:900, color:"#ccc", fontVariantNumeric:"tabular-nums" }}>{r.pos}</span>
          <div style={{ display:"flex", alignItems:"center", gap:8, minWidth:0 }}>
            <Flag code={r.code} size={16}/>
            <span style={{ fontSize:13, fontWeight:700, color: "#0d0d0d", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {r.team}
            </span>
          </div>
          {[r.pld, r.gd, r.pts].map((val, j) => (
            <span key={j} style={{ fontSize:12, color: j === 2 ? "#0d0d0d" : "#666", fontWeight: j === 2 ? 800 : 500, textAlign:"center" }}>
              {val}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── STANDINGS SECTION ────────────────────────────────────────
export function StandingsSection() {
  return (
    <section style={{ background:"#ffffff", padding:"80px 0" }}>
      <div style={{ maxWidth:1380, margin:"0 auto", padding:"0 32px" }}>
        <SectionHead eyebrow="Phase de Groupes" title="Classements" action="Détails complets" href="/standings"/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24, marginBottom: 40 }}>
          {GROUPS.map((g, i) => <GroupTable key={i} group={g}/>)}
        </div>
        <a href="/standings" style={{
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
          width:"100%", padding:"16px 0", borderRadius:100,
          fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em",
          color:"#0d0d0d", border:`1px solid #0d0d0d`, textDecoration:"none", transition:"0.2s"
        }}>
          <FiGrid size={14}/> Voir tous les groupes
        </a>
      </div>
    </section>
  );
}

// ─── CITIES SECTION ───────────────────────────────────────────
export function CitiesSection() {
  return (
    <section style={{ background:"#f8f8f8", borderTop: "1px solid #eee", padding:"80px 0" }}>
      <div style={{ maxWidth:1380, margin:"0 auto", padding:"0 32px" }}>
        <SectionHead eyebrow="Villes Hôtes" title="Destinations 2030" action="Explorer les villes" href="/cities"/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {HOST_CITIES.map((c, i) => (
            <a key={i} href="/cities" style={{
              position:"relative", height:240, borderRadius:12, overflow:"hidden", textDecoration:"none",
              background: c.bg
            }}>
              <img src={`https://flagcdn.com/${c.code}.svg`} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity: 0.6 }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}/>
              <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:24 }}>
                <span style={{ color:"white", fontSize:24, fontWeight:900, textTransform:"uppercase" }}>{c.city}</span>
                <span style={{ color:"rgba(255,255,255,0.8)", fontSize:12, fontWeight:600 }}>{c.country}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
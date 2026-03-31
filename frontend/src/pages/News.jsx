import { useState, useEffect } from "react";
import { 
  NEWS_FEATURED as FEATURED, 
  NEWS_SIDE, 
  NEWS_MORE, 
  FONT, C 
} from "./Home/constants";

export default function News() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  
  useEffect(() => { setMounted(true); }, []);

  const allArticles = [
    { ...FEATURED, featured: true },
    ...NEWS_SIDE,
    ...NEWS_MORE
  ];

  const categories = ["all", "Sélection", "Stades", "Équipes", "Billets", "Médias", "Formation", "Durabilité", "Technologie"];

  const filteredArticles = filter === "all" 
    ? allArticles 
    : allArticles.filter(a => a.tag === filter);

  return (
    <div style={{ 
      fontFamily: FONT.body, 
      background: "#ffffff", 
      color: "#0d0d0d", 
      minHeight: "100vh", 
      opacity: mounted ? 1 : 0, 
      transition: "opacity 0.4s",
      paddingBottom: 100
    }}>
      <section style={{ padding: "80px 32px", maxWidth: 1380, margin: "0 auto" }}>
        
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 64, gap: 32 }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <span style={{ color: "#c8102e", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 12, display: "block", marginBottom: 16 }}>FIFA Newsroom</span>
            <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, margin: 0 }}>Actualités</h1>
          </div>
          <span style={{ 
            background: "#0d0d0d", color: "white", padding: "10px 20px", borderRadius: 100, 
            fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em"
          }}>En Direct du Maroc</span>
        </div>

        {/* FILTERS */}
        <div style={{ display: "flex", gap: 12, marginBottom: 56, overflowX: "auto", paddingBottom: 12 }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: filter === cat ? "#0d0d0d" : "white",
                color: filter === cat ? "white" : "#666",
                border: `1px solid ${filter === cat ? "#0d0d0d" : "#eee"}`,
                padding: "10px 24px",
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s"
              }}
            >
              {cat === "all" ? "Toutes les infos" : cat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 40 }}>
          {filteredArticles.map((a, i) => (
            <div key={i} style={{ 
              cursor: "pointer", 
              gridColumn: a.featured && filter === "all" ? "1 / -1" : "auto",
              display: a.featured && filter === "all" ? "grid" : "block",
              gridTemplateColumns: a.featured && filter === "all" ? "1.2fr 1fr" : "1fr",
              gap: 48,
              background: "#ffffff",
              borderRadius: 24,
              overflow: "hidden",
              transition: "0.3s"
            }}>
              
              <div style={{ 
                borderRadius: 16, 
                overflow: "hidden", 
                height: a.featured && filter === "all" ? 500 : 250, 
                marginBottom: a.featured && filter === "all" ? 0 : 24 
              }}>
                <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ color: "#c8102e", fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>{a.tag}</span>
                  <span style={{ color: "#aaa", fontSize: 12, fontWeight: 600 }}>{a.date}</span>
                </div>
                <h3 style={{ 
                  fontFamily: FONT.display, 
                  fontSize: a.featured && filter === "all" ? 52 : 28, 
                  fontWeight: 900, 
                  textTransform: "uppercase", 
                  margin: "0 0 16px", 
                  lineHeight: 1,
                  color: "#0d0d0d"
                }}>{a.title}</h3>
                {a.desc && <p style={{ color: "#666", fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: "60ch" }}>{a.desc}</p>}
                
                <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 8, color: "#0d0d0d", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Lire l'article <span style={{ fontSize: 18 }}>→</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
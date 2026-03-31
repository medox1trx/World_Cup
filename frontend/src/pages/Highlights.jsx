import { useState, useEffect } from "react";
import { FiPlayCircle, FiEye, FiHeart } from "react-icons/fi";
import { FONT, C } from "./Home/constants";

const VIDEOS = [
  { 
    title: "Maroc vs Espagne - Demi-Finales 2022", 
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80", 
    dur: "4:32", 
    cat: "Match de Légende",
    views: "2.4M",
    likes: "150K"
  },
  { 
    title: "Top 10 : Plus beaux buts de l'histoire", 
    img: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80", 
    dur: "10:15", 
    cat: "Compilations",
    views: "5.1M",
    likes: "420K"
  },
  { 
    title: "Ambiance : Les supporters à Casablanca", 
    img: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80", 
    dur: "6:40", 
    cat: "Fan Experience",
    views: "850K",
    likes: "92K"
  },
];

export default function Highlights() {
  const [mounted, setMounted] = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  
  useEffect(() => { setMounted(true); }, []);

  const cats = ["all", "Match de Légende", "Compilations", "Fan Experience"];
  const filteredVideos = activeCat === "all" ? VIDEOS : VIDEOS.filter(v => v.cat === activeCat);

  return (
    <div style={{ 
      fontFamily: FONT.body, 
      background: "#ffffff", 
      color: "#0d0d0d", 
      minHeight: "100vh", 
      opacity: mounted ? 1 : 0, 
      transition: "opacity 0.6s ease",
      paddingBottom: 100
    }}>
      <section style={{ padding: "100px 32px", maxWidth: 1380, margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ color: "#c8102e", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 13, marginBottom: 20, display: "block" }}>FIFA+ Archive</span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(3.5rem,8vw,7rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9 }}>Temps Forts</h1>
          <p style={{ color: "#666", fontSize: 20, marginTop: 24, maxWidth: 700, margin: "24px auto 0" }}>
            Revivez les moments les plus intenses du football mondial.
          </p>
        </div>

        {/* CATEGORIES */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 64, overflowX: "auto", paddingBottom: 15 }}>
          {cats.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                background: activeCat === cat ? "#0d0d0d" : "#f5f5f5",
                color: activeCat === cat ? "white" : "#666",
                border: "none",
                padding: "12px 28px",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "0.2s"
              }}
            >
              {cat === "all" ? "Toutes les vidéos" : cat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 32 }}>
          {filteredVideos.map((v, i) => (
            <div key={i} style={{ 
              borderRadius: 32, 
              overflow: "hidden", 
              background: "white", 
              border: "1px solid #eee",
              boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
              transition: "0.3s"
            }}>
              <div style={{ height: 260, position: "relative", overflow: "hidden" }}>
                 <img src={v.img} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                 <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.1)" }} />
                 <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
                    <FiPlayCircle size={64} style={{ opacity: 0.9 }} />
                 </div>
                 <div style={{ position: "absolute", bottom: 20, right: 20, background: "rgba(0,0,0,0.8)", color: "white", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 800 }}>{v.dur}</div>
              </div>
              
              <div style={{ padding: 32 }}>
                <span style={{ color: "#c8102e", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 12 }}>{v.cat}</span>
                <h3 style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 900, textTransform: "uppercase", marginBottom: 20, lineHeight: 1.2 }}>{v.title}</h3>
                
                <div style={{ display: "flex", gap: 24, color: "#888", fontSize: 13, fontWeight: 700 }}>
                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}><FiEye /> {v.views}</div>
                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}><FiHeart /> {v.likes}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
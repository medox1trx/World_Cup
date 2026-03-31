import { useState, useEffect } from "react";
import { FONT, C } from "./Home/constants";

const CITIES = [
  { 
    name: "Casablanca", 
    stadium: "Stade Hassan II", 
    cap: "115 000", 
    desc: "Le plus grand stade du monde, futur théâtre de la grande finale 2030.",
    img: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80" 
  },
  { 
    name: "Madrid", 
    stadium: "Santiago Bernabéu", 
    cap: "81 000", 
    desc: "Un temple du football modernisé, situé au coeur de la capitale espagnole.",
    img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80" 
  },
  { 
    name: "Lisbonne", 
    stadium: "Estádio da Luz", 
    cap: "65 000", 
    desc: "La 'Cathédrale' du football portugais, célèbre pour son ambiance électrique.",
    img: "https://images.unsplash.com/photo-1582239401768-3fa44026da73?w=800&q=80" 
  },
  { 
    name: "Rabat", 
    stadium: "Complexe Prince Moulay Abdellah", 
    cap: "68 000", 
    desc: "Une enceinte moderne et durable, joyau de la capitale marocaine.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80" 
  },
];

export default function Cities() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

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
      
      {/* HERO */}
      <section style={{ position: "relative", height: "50vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#f8f8f8" }}>
        <img src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1600&q=85&fit=crop" alt="Hero" 
             style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 32px" }}>
          <span style={{ color: "#c8102e", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 13, marginBottom: 20, display: "block" }}>Destinations 2030</span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(3.5rem,8vw,7rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9 }}>Villes Hôtes</h1>
          <p style={{ color: "#666", fontSize: 20, marginTop: 24, maxWidth: 600, margin: "24px auto 0" }}>
            Explorez les métropoles vibrantes et les arènes légendaires du tournoi.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section style={{ maxWidth: 1380, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 32 }}>
          {CITIES.map((c, i) => (
            <div key={i} style={{ borderRadius: 24, overflow: "hidden", border: "1px solid #eee", background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
              <div style={{ height: 300, overflow: "hidden" }}>
                <img src={c.img} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: 40 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                   <h3 style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 900, textTransform: "uppercase" }}>{c.name}</h3>
                   <span style={{ background: "#c8102e", color: "white", padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 900 }}>{c.cap} places</span>
                </div>
                <p style={{ color: "#c8102e", fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>{c.stadium}</p>
                <p style={{ color: "#666", fontSize: 16, lineHeight: 1.6 }}>{c.desc}</p>
                <button style={{ marginTop: 32, padding: "14px 28px", borderRadius: 100, background: "#0d0d0d", color: "white", border: "none", fontWeight: 800, cursor: "pointer" }}>Détails</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
import { useState, useEffect } from "react";
import { FONT, C } from "./Home/constants";

const HISTORY = [
  { year: "2026", host: "USA / Mexique / Canada", winner: "À venir", img: "https://www.atalayar.com/media/atalayar/images/2023/10/19/2023101911255391424.jpg" },
  { year: "2026", host: "USA / Canada / Mexique", winner: "À venir", img: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800&q=80" },
  { year: "2022", host: "Qatar", winner: "Argentine", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" },
  { year: "2018", host: "Russie", winner: "France", img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80" },
];

export default function Tournaments() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ 
      fontFamily: FONT.body, 
      background: "#ffffff", 
      color: "#0d0d0d", 
      minHeight: "100vh", 
      opacity: mounted ? 1 : 0, 
      transition: "opacity 0.6s ease-out",
      paddingBottom: 100
    }}>
      <section style={{ padding: "100px 32px", maxWidth: 1380, margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ color: "#c8102e", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 13, marginBottom: 20, display: "block" }}>Héritage Mondial</span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(3.5rem,8vw,7rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9 }}>Tournois Historiques</h1>
          <p style={{ color: "#666", fontSize: 20, marginTop: 24, maxWidth: 700, margin: "24px auto 0" }}>
            Un siècle d'émotions, de triomphes et de légendes.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32 }}>
          {HISTORY.map((h, i) => (
            <div key={i} style={{ 
              background: "white", 
              borderRadius: 32, 
              overflow: "hidden", 
              border: "1px solid #eee",
              boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
              transition: "0.3s"
            }}>
              <div style={{ height: 250, overflow: "hidden", position: "relative" }}>
                <img src={h.img} alt={h.year} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.95)", padding: "8px 16px", borderRadius: 12, fontWeight: 900, fontFamily: FONT.display, fontSize: 24 }}>{h.year}</div>
              </div>
              
              <div style={{ padding: 40 }}>
                <span style={{ color: "#c8102e", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 12 }}>
                  {h.year === "2026" ? "ÉDITION FUTURE" : "VAINQUEUR"}
                </span>
                <h3 style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 16 }}>{h.winner}</h3>
                <div style={{ color: "#666", fontSize: 16, fontWeight: 600 }}>📍 {h.host}</div>
                <div style={{ marginTop: 32, height: 4, background: "#f5f5f5", borderRadius: 10 }}>
                   <div style={{ height: "100%", width: "40%", background: "#c8102e", borderRadius: 10 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
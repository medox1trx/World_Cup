import { useState, useEffect } from "react";
import {
  FiMapPin, FiClock, FiWifi, FiShield, FiStar,
  FiArrowRight, FiGlobe, FiMonitor, FiMusic,
  FiShoppingBag, FiCamera, FiZap, FiUsers,
  FiChevronRight, FiChevronDown
} from "react-icons/fi";
import { FONT, C, getCode } from "./Home/constants";
import { Flag } from "./Home/ui";

const D = "'Barlow Condensed', sans-serif";
const B = "'Barlow', sans-serif";

const CITY_IMGS = {
  rabat:       "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=900&q=80&fit=crop",
  madrid:      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=900&q=80&fit=crop",
  barcelone:   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&fit=crop",
  lisbonne:    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop",
  porto:       "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80&fit=crop",
  seville:     "https://images.unsplash.com/photo-1534442845756-8ad9e52fa8a1?w=900&q=80&fit=crop",
};

const ACTIVITIES = [
  { Icon:FiZap, tag:"Gaming", title:"FIFA Gaming Arena", desc:"Tournois quotidiens EA Sports FIFA. Classements live et prix officiels.", img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80" },
  { Icon:FiUsers, tag:"Sport", title:"Terrain 5×5", desc:"Sessions réservables via l'app, disponibles toutes les heures.", img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80" },
  { Icon:FiCamera, tag:"Expérience", title:"Trophy Experience", desc:"Photos officielles avec la Coupe du Monde FIFA originale.", img: "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&q=80" },
];

const CITIES = [
  { name: "Rabat", country: "Maroc", code: "ma", matches: 9, img: CITY_IMGS.rabat, desc: "La capitale marocaine accueille le plus grand stade du tournoi." },
  { name: "Madrid", country: "Espagne", code: "es", matches: 8, img: CITY_IMGS.madrid, desc: "Le temple du football ibérique au Santiago Bernabéu." },
  { name: "Lisbonne", country: "Portugal", code: "pt", matches: 7, img: CITY_IMGS.lisbonne, desc: "Une atmosphère électrique au bord du Tage." },
];

export default function FanZone() {
  const [activeCity, setActiveCity] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ fontFamily: B, background: "#ffffff", color: "#0d0d0d", opacity: mounted ? 1 : 0, transition: "opacity 0.45s", paddingBottom: 100 }}>
      
      {/* Hero */}
      <section style={{ height: "70vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f8f8" }}>
        <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&q=85&fit=crop" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }} alt="Fans" />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 32px" }}>
           <span style={{ color: "#c8102e", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 13, marginBottom: 20, display: "block" }}>Fan Experience</span>
           <h1 style={{ fontFamily: D, fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.85, marginBottom: 32 }}>Fan Zone<br/>FIFA 2030</h1>
           <p style={{ fontSize: 20, color: "#666", maxWidth: 600, margin: "0 auto 40px" }}>Vivez la Coupe du Monde au-delà du stade. 9 sites, 6 pays, une seule passion.</p>
           <a href="#activities" style={{ background: "#0d0d0d", color: "white", padding: "16px 40px", borderRadius: 100, fontWeight: 800, textDecoration: "none" }}>Explorer</a>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" style={{ padding: "100px 32px", maxWidth: 1380, margin: "0 auto" }}>
        <h2 style={{ fontFamily: D, fontSize: 48, fontWeight: 900, textTransform: "uppercase", textAlign: "center", marginBottom: 64 }}>Activités Gratuites</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 32 }}>
          {ACTIVITIES.map((a, i) => (
            <div key={i} style={{ borderRadius: 24, overflow: "hidden", border: "1px solid #eee", background: "white", transition: "0.3s" }}>
              <div style={{ height: 250, overflow: "hidden" }}>
                <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: 32 }}>
                <span style={{ color: "#c8102e", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 12 }}>{a.tag}</span>
                <h3 style={{ fontFamily: D, fontSize: 28, fontWeight: 900, textTransform: "uppercase", marginBottom: 16 }}>{a.title}</h3>
                <p style={{ color: "#666", lineHeight: 1.6, fontSize: 15 }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fan Zones Grid */}
      <section style={{ background: "#fcfcfc", padding: "100px 32px" }}>
        <div style={{ maxWidth: 1380, margin: "0 auto" }}>
          <h2 style={{ fontFamily: D, fontSize: 48, fontWeight: 900, textTransform: "uppercase", textAlign: "center", marginBottom: 20 }}>Sites Hosthotes</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 64 }}>Découvrez les Fan Zones officielles à travers le monde.</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
               {CITIES.map((c, i) => (
                 <button key={i} onClick={() => setActiveCity(i)} style={{
                   textAlign: "left", padding: "24px 32px", borderRadius: 16, border: "1px solid #eee", fontSize: 18, fontWeight: 800,
                   background: activeCity === i ? "#0d0d0d" : "white",
                   color: activeCity === i ? "white" : "#0d0d0d",
                   cursor: "pointer", transition: "0.2s", display: "flex", alignItems: "center", gap: 20
                 }}>
                   <Flag code={c.code} size={24} /> {c.name}
                 </button>
               ))}
            </div>
            <div style={{ background: "white", borderRadius: 24, overflow: "hidden", border: "1px solid #eee", display: "flex", flexDirection: "column" }}>
               <div style={{ height: 400 }}>
                 <img src={CITIES[activeCity].img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={CITIES[activeCity].name} />
               </div>
               <div style={{ padding: 40 }}>
                 <h3 style={{ fontFamily: D, fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 16 }}>Fan Zone {CITIES[activeCity].name}</h3>
                 <p style={{ color: "#666", fontSize: 18, lineHeight: 1.6 }}>{CITIES[activeCity].desc}</p>
                 <div style={{ marginTop: 32, display: "flex", gap: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#666", fontSize: 14 }}>
                       <FiMapPin color="#c8102e" /> Centre Ville
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#666", fontSize: 14 }}>
                       <FiUsers color="#c8102e" /> +50 000 Fans
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

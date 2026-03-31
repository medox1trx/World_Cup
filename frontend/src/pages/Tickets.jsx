import { useState, useEffect } from "react";
import { FiArrowRight, FiCheck, FiShield, FiZap, FiActivity } from "react-icons/fi";
import { FONT, C } from "./Home/constants";

const TICKETS = [
  { 
    cat: "Catégorie 1", 
    price: "250€", 
    desc: "Placement premium en tribune latérale basse, offrant la meilleure vue sur le terrain.",
    img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=700&q=80",
    features: ["Vue latérale optimale", "Accès Salon Premium", "Sièges remboursables"]
  },
  { 
    cat: "Catégorie 2", 
    price: "150€", 
    desc: "Excellente visibilité depuis les tribunes hautes. Un équilibre parfait.",
    img: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=700&q=80",
    features: ["Vue dégagée", "Accès Fan Zone", "Billet digital"]
  },
  { 
    cat: "Catégorie 3", 
    price: "85€", 
    desc: "Plongez au coeur de l'émotion avec les supporters dans les virages.",
    img: "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=700&q=80",
    features: ["Ambiance supporters", "Prix abordable", "Accès Fan Zone"]
  },
];

export default function Tickets() {
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
      <section style={{ height: "60vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1600&q=85&fit=crop" alt="Stade" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 32px" }}>
          <span style={{ color: "#c8102e", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 13, marginBottom: 20, display: "block" }}>Billetterie Officielle</span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(3.5rem,8vw,6.5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9 }}>Sécurisez<br/>Votre Place</h1>
          <p style={{ color: "#666", fontSize: 18, marginTop: 24, maxWidth: 600, margin: "24px auto 0" }}>Rejoignez l'histoire du football en 2030. Choisissez votre catégorie et préparez-vous pour l'émotion.</p>
        </div>
      </section>

      {/* TICKETS */}
      <section style={{ maxWidth: 1380, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32 }}>
          {TICKETS.map((t, i) => (
            <div key={i} style={{ background: "white", borderRadius: 24, overflow: "hidden", border: "1px solid #eee", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div style={{ height: 240, position: "relative" }}>
                 <img src={t.img} alt={t.cat} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                 <div style={{ position: "absolute", top: 24, right: 24, background: "#0d0d0d", color: "white", padding: "8px 20px", borderRadius: 100, fontWeight: 900, fontSize: 18 }}>{t.price}</div>
              </div>
              <div style={{ padding: 40 }}>
                 <h3 style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 16 }}>{t.cat}</h3>
                 <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>{t.desc}</p>
                 <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: 12 }}>
                   {t.features.map((f, j) => (
                     <li key={j} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#444", fontWeight: 600 }}>
                       <FiCheck color="#16a34a" /> {f}
                     </li>
                   ))}
                 </ul>
                 <button style={{ width: "100%", padding: "18px", borderRadius: 100, background: "#0d0d0d", color: "white", fontWeight: 800, border: "none" }}>Sélectionner</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
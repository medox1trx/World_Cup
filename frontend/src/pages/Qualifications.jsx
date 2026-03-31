import { useState, useEffect } from "react";
import { FiGlobe, FiCheckCircle, FiLoader } from "react-icons/fi";
import { FONT, C } from "./Home/constants";

const CONFEDS = [
  { name: "CAF (Afrique)", seats: "9.5", status: "Phase finale en cours", progress: 85, color: "#c8102e" },
  { name: "UEFA (Europe)", seats: "16", status: "Éliminatoires terminés", progress: 100, color: "#16a34a" },
  { name: "CONMEBOL (Amérique du S.)", seats: "6.5", status: "Phase de poules", progress: 60, color: "#2563eb" },
  { name: "AFC (Asie)", seats: "8.5", status: "Troisième tour", progress: 75, color: "#ea580c" },
  { name: "CONCACAF (Amérique du N.)", seats: "6.5", status: "Barrages", progress: 90, color: "#7c3aed" },
  { name: "OFC (Océanie)", seats: "1.5", status: "Qualifications terminées", progress: 100, color: "#65a30d" },
];

export default function Qualifications() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

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
      
      {/* HEADER */}
      <section style={{ padding: "100px 20px 60px", textAlign: "center", background: "#fcfcfc" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 15, background: "rgba(200,16,46,0.05)", padding: "10px 24px", borderRadius: 100, marginBottom: 30 }}>
          <FiGlobe color="#c8102e" />
          <span style={{ color: "#c8102e", fontWeight: 800, textTransform: "uppercase", fontSize: 12, letterSpacing: "0.2em" }}>Statut Mondial des Qualifications</span>
        </div>
        <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(3.5rem,7vw,6.5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9 }}>Road to 2030</h1>
        <p style={{ color: "#666", fontSize: 20, marginTop: 24, maxWidth: 700, margin: "24px auto 0" }}>
          L'état d'avancement des qualifications à travers les six confédérations de la FIFA.
        </p>
      </section>

      {/* GRID */}
      <section style={{ maxWidth: 1380, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 32 }}>
          {CONFEDS.map((conf, i) => (
            <div key={i} style={{ 
              background: "white", 
              borderRadius: 24, 
              padding: 40, 
              border: "1px solid #eee",
              boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
              position: "relative",
              overflow: "hidden"
            }}>
              
              <div style={{ position: "absolute", top: 0, left: 0, width: 6, bottom: 0, background: conf.color }} />
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <h3 style={{ fontFamily: FONT.display, fontSize: 28, fontWeight: 900, textTransform: "uppercase" }}>{conf.name}</h3>
                {conf.progress === 100 ? <FiCheckCircle color="#16a34a" size={28} /> : <FiLoader className="spin" color="#ccc" size={28} />}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 15, fontWeight: 700 }}>
                <span style={{ color: "#888" }}>Places Qualificatives</span>
                <span>{conf.seats}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, fontSize: 15, fontWeight: 700 }}>
                <span style={{ color: "#888" }}>Statut Actuel</span>
                <span style={{ color: conf.color }}>{conf.status}</span>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  <span>Progression</span>
                  <span>{conf.progress}%</span>
                </div>
                <div style={{ height: 8, background: "#f5f5f5", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${conf.progress}%`, background: conf.color, borderRadius: 10, transition: "width 1s ease-out" }} />
                </div>
              </div>

              <button style={{
                marginTop: 40, width: "100%", padding: "16px", background: "#f8f8f8", color: "#0d0d0d",
                border: "none", borderRadius: 12, fontSize: 13, fontWeight: 800,
                textTransform: "uppercase", cursor: "pointer", transition: "0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.background = "#eeeeee"}
              onMouseOut={e => e.currentTarget.style.background = "#f8f8f8"}>
                Voir le classement complet
              </button>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 3s linear infinite; }
      `}</style>
    </div>
  );
}
import { useState, useEffect } from "react";
import { GROUPS as MOCK_GROUPS, FONT, C, CODES } from "./Home/constants";
import { Flag } from "./Home/ui";

const ALL_GROUPS = [
  ...MOCK_GROUPS,
  {
    name: "Groupe D",
    teams: [
      { pos: 1, team: "Allemagne", code: "de", pld: "0", gd: "0", pts: "0" },
      { pos: 2, team: "Belgique", code: "be", pld: "0", gd: "0", pts: "0" },
      { pos: 3, team: "Canada", code: "ca", pld: "0", gd: "0", pts: "0" },
      { pos: 4, team: "Algérie", code: "dz", pld: "0", gd: "0", pts: "0" },
    ]
  },
  {
    name: "Groupe E",
    teams: [
      { pos: 1, team: "Italie", code: "it", pld: "0", gd: "0", pts: "0" },
      { pos: 2, team: "Uruguay", code: "uy", pld: "0", gd: "0", pts: "0" },
      { pos: 3, team: "Sénégal", code: "sn", pld: "0", gd: "0", pts: "0" },
      { pos: 4, team: "Corée du Sud", code: "kr", pld: "0", gd: "0", pts: "0" },
    ]
  },
  {
    name: "Groupe F",
    teams: [
      { pos: 1, team: "Pays-Bas", code: "nl", pld: "0", gd: "0", pts: "0" },
      { pos: 2, team: "Croatie", code: "hr", pld: "0", gd: "0", pts: "0" },
      { pos: 3, team: "Égypte", code: "eg", pld: "0", gd: "0", pts: "0" },
      { pos: 4, team: "Australie", code: "au", pld: "0", gd: "0", pts: "0" },
    ]
  }
];

export default function Standings() {
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
      <section style={{ padding: "80px 32px", maxWidth: 1380, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(3rem,8vw,5.5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 24 }}>Classements</h1>
          <p style={{ color: "#666", fontSize: 18, maxWidth: 650, margin: "0 auto", lineHeight: 1.6 }}>
            Suivez en temps réel l'évolution des 16 groupes de la Coupe du Monde FIFA 2030™. Les deux premiers de chaque groupe se qualifient pour les seizièmes de finale.
          </p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 32 }}>
          {ALL_GROUPS.map((g, i) => (
            <div key={i} style={{ 
              background: "#ffffff", 
              borderRadius: 16, 
              overflow: "hidden", 
              border: "1px solid #eee",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              transition: "0.3s"
            }}>
              
              <div style={{ padding: "24px 32px", background: "#fcfcfc", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 900, textTransform: "uppercase", color: "#0d0d0d", margin: 0 }}>{g.name}</h2>
                <span style={{ fontSize: 10, fontWeight: 900, color: "#c8102e", letterSpacing: "0.1em" }}>MATCHES 0/3</span>
              </div>

              <div style={{ padding: "12px 0" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ color: "#aaa" }}>
                      <th style={{ padding: "12px 32px", fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>Équipe</th>
                      <th style={{ padding: "12px 10px", fontSize: 9, fontWeight: 900, textTransform: "uppercase", textAlign: "center" }}>J</th>
                      <th style={{ padding: "12px 10px", fontSize: 9, fontWeight: 900, textTransform: "uppercase", textAlign: "center" }}>DG</th>
                      <th style={{ padding: "12px 32px", fontSize: 10, fontWeight: 900, textAlign: "center", color: "#0d0d0d" }}>PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.teams.map((t, j) => (
                      <tr key={j} style={{ borderTop: "1px solid #f5f5f5", transition: "background 0.2s" }}>
                        <td style={{ padding: "16px 32px", display: "flex", alignItems: "center", gap: 16 }}>
                          <span style={{ minWidth: 20, fontSize: 12, fontWeight: 900, color: j < 2 ? "#16a34a" : "#ccc" }}>{j + 1}</span>
                          <Flag code={t.code} size={24} />
                          <span style={{ fontSize: 15, fontWeight: 700, color: "#0d0d0d" }}>{t.team}</span>
                        </td>
                        <td style={{ padding: "16px 10px", textAlign: "center", color: "#666", fontWeight: 600 }}>{t.pld}</td>
                        <td style={{ padding: "16px 10px", textAlign: "center", color: "#666", fontWeight: 600 }}>{t.gd}</td>
                        <td style={{ padding: "16px 32px", textAlign: "center", color: "#0d0d0d", fontWeight: 900, fontSize: 18 }}>{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ padding: "20px 32px", background: "#fcfcfc", borderTop: "1px solid #eee", display: "flex", gap: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 800, color: "#888" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 50, background: "#16a34a" }} /> QUALIFIÉ
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 800, color: "#888" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 50, background: "#eee" }} /> ÉLIMINÉ
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
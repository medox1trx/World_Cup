import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiMapPin, FiFilter, FiCalendar, FiSun, FiCloud, FiCloudRain, FiWind, FiZap } from "react-icons/fi";
import { useMatches } from "../hooks/useWorldCup";
import { MATCHES as MOCK_MATCHES, FONT, C, getCode } from "./Home/constants";
import { Flag } from "./Home/ui";

export default function Matches() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  
  const { data: apiMatches, loading } = useMatches();
  
  useEffect(() => { setMounted(true); }, []);

  const displayMatches = (apiMatches && apiMatches.length > 0) ? apiMatches : MOCK_MATCHES;

  const filteredMatches = filter === "all" 
    ? displayMatches 
    : displayMatches.filter(m => m.group_name === filter || m.stage === filter);

  const groups = ["all", ...new Set(displayMatches.map(m => m.group_name))];

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
      <section style={{ padding: "64px 32px", maxWidth: 1380, margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(3rem,8vw,5.5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 24 }}>Calendrier</h1>
          <p style={{ color: "#666", fontSize: 18, maxWidth: 650, margin: "0 auto", lineHeight: 1.6 }}>
            Consultez le programme complet des 104 matchs de la Coupe du Monde FIFA 2030™. Filtrez par groupe ou par phase pour ne rien manquer.
          </p>
        </div>

        {/* FILTERS */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48, overflowX: "auto", paddingBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "#f8f8f8", borderRadius: 100, border: "1px solid #eee", fontSize: 12, fontWeight: 800, color: "#999", textTransform: "uppercase" }}>
            <FiFilter /> FILTRER
          </div>
          {groups.map(g => (
            <button 
              key={g}
              onClick={() => setFilter(g)}
              style={{
                background: filter === g ? "#0d0d0d" : "white",
                color: filter === g ? "white" : "#666",
                border: `1px solid ${filter === g ? "#0d0d0d" : "#eee"}`,
                padding: "10px 24px",
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s"
              }}
            >
              {g === "all" ? "Tous les matchs" : g}
            </button>
          ))}
        </div>

        {loading && <div style={{ textAlign: "center", padding: 48, color: "#999" }}>Chargement des matchs...</div>}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filteredMatches.map((m, i) => (
            <div key={m.id || i} style={{
              background: "#ffffff", border: "1px solid #eee", borderRadius: 16, padding: "28px 40px",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32, 
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)", transition: "0.2s"
            }}>
              
              <div style={{ flex: "1 1 250px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ color: "#c8102e", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {m.group_name || m.stage}
                  </span>
                  <div style={{ width: 4, height: 4, background: "#eee", borderRadius: "50%" }} />
                  <span style={{ color: "#aaa", fontSize: 11, fontWeight: 700 }}>MATCH #{m.id || i + 1}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#0d0d0d", fontSize: 15, fontWeight: 700 }}>
                    <FiCalendar size={16} color="#c8102e" /> {new Date(m.match_date).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', weekday: 'long' })}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#888", fontSize: 13, fontWeight: 500 }}>
                    <FiClock size={16} /> {m.match_time?.substring(0,5)} · <FiMapPin size={16} /> {m.city} ({m.venue})
                  </div>
                  {m.referee && (
                    <div style={{ fontSize: 11, color: "#c8102e", fontWeight: 700, textTransform: "uppercase", marginTop: 4, letterSpacing: '0.05em' }}>
                      Arbitre: {m.referee}
                    </div>
                  )}
                  {m.weather_condition && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#f59e0b", fontWeight: 700, marginTop: 4, textTransform: "uppercase" }}>
                      {m.weather_condition === 'Sunny' && <FiSun size={14} />}
                      {m.weather_condition === 'Cloudy' && <FiCloud size={14} />}
                      {m.weather_condition === 'Rainy' && <FiCloudRain size={14} />}
                      {m.weather_condition === 'Windy' && <FiWind size={14} />}
                      {m.weather_condition === 'Stormy' && <FiZap size={14} />}
                      {m.weather_temp}°C · {m.weather_condition}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ flex: "2 1 400px", display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
                <div style={{ flex: 1, textAlign: "right", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 20 }}>
                  <span style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 900, textTransform: "uppercase" }}>{m.home_team}</span>
                  <Flag code={getCode(m.home_team)} size={32} />
                </div>

                <div style={{ 
                  background: "#f8f8f8", padding: "12px 24px", borderRadius: 12, 
                  fontSize: 24, fontWeight: 900, color: "#0d0d0d", minWidth: 80, textAlign: "center",
                  border: "1px solid #eee", fontFamily: FONT.display
                }}>
                  {m.status === "finished" ? `${m.home_score} - ${m.away_score}` : "VS"}
                </div>

                <div style={{ flex: 1, textAlign: "left", display: "flex", alignItems: "center", gap: 20 }}>
                  <Flag code={getCode(m.away_team)} size={32} />
                  <span style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 900, textTransform: "uppercase" }}>{m.away_team}</span>
                </div>
              </div>

              <div style={{ flex: "0 0 auto" }}>
                <Link to={`/tickets?match_id=${m.id}`} style={{
                  background: "#0d0d0d", color: "white", padding: "12px 28px", borderRadius: 100, 
                  fontSize: 11, fontWeight: 800, textDecoration: "none", textTransform: "uppercase", 
                  letterSpacing: "0.05em", transition: "0.2s", display: "inline-block"
                }}>
                  Billetterie
                </Link>
              </div>

            </div>
          ))}
          
          {filteredMatches.length === 0 && (
            <div style={{ textAlign: "center", padding: "100px 32px", background: "#fcfcfc", borderRadius: 16, border: "2px dashed #eee" }}>
              <p style={{ color: "#aaa", fontSize: 16, fontWeight: 600 }}>Aucun match ne correspond à ce filtre.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
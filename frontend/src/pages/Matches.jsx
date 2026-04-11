import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiMapPin, FiFilter, FiCalendar, FiSun, FiCloud, FiCloudRain, FiWind, FiZap, FiPlayCircle, FiX, FiVideo } from "react-icons/fi";
import { useMatches } from "../hooks/useWorldCup";
import { MATCHES as MOCK_MATCHES, FONT, C, getCode } from "./Home/constants";
import { Flag } from "./Home/ui";

export default function Matches() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Helper to generate a fake recent form sequence for teams
  const getRecentForm = (teamId) => {
    // Generate a pseudo-random form based on string length and first char code
    const base = teamId ? teamId.charCodeAt(0) + teamId.length : 0;
    const forms = [
      ["W", "W", "D", "W", "L"],
      ["W", "L", "W", "W", "W"],
      ["D", "W", "L", "D", "W"],
      ["W", "W", "W", "D", "W"],
      ["L", "D", "W", "L", "W"],
    ];
    return forms[base % forms.length];
  };

  const getFormColor = (res) => {
    if (res === 'W') return '#10b981'; // green
    if (res === 'D') return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  
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
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)", transition: "0.2s", cursor: "pointer"
            }}
            onClick={() => setSelectedMatch(m)}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.02)"; }}
            >
              
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
                  <Flag code={m.home_flag || getCode(m.home_team)} size={32} />
                </div>

                <div style={{ 
                  background: "#f8f8f8", padding: "12px 24px", borderRadius: 12, 
                  fontSize: 24, fontWeight: 900, color: "#0d0d0d", minWidth: 80, textAlign: "center",
                  border: "1px solid #eee", fontFamily: FONT.display
                }}>
                  {m.status === "finished" ? `${m.home_score} - ${m.away_score}` : "VS"}
                </div>

                <div style={{ flex: 1, textAlign: "left", display: "flex", alignItems: "center", gap: 20 }}>
                  <Flag code={m.away_flag || getCode(m.away_team)} size={32} />
                  <span style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 900, textTransform: "uppercase" }}>{m.away_team}</span>
                </div>
              </div>

              <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
                {m.video_url && (
                    <a href={m.video_url} target="_blank" rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      style={{
                      background: "rgba(200, 16, 46, 0.1)", color: "#c8102e", padding: "10px 24px", borderRadius: 100, 
                      fontSize: 10, fontWeight: 800, textDecoration: "none", textTransform: "uppercase", 
                      letterSpacing: "0.05em", transition: "0.2s", display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid rgba(200, 16, 46, 0.2)"
                    }}>
                      <FiPlayCircle size={14} /> Résumé Vidéo
                    </a>
                )}
                <Link to={`/tickets?match_id=${m.id}`} 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                  background: "#0d0d0d", color: "white", padding: "12px 28px", borderRadius: 100, 
                  fontSize: 11, fontWeight: 800, textDecoration: "none", textTransform: "uppercase", 
                  letterSpacing: "0.05em", transition: "0.2s", display: "inline-block", textAlign: "center"
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

      {/* MATCH DETAILS MODAL */}
      {selectedMatch && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(5px)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }} onClick={() => setSelectedMatch(null)}>
          <div style={{
            background: "white", borderRadius: 24, width: "100%", maxWidth: 800,
            overflow: "hidden", position: "relative",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
          }} onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div style={{ padding: "24px 32px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "#c8102e", fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {selectedMatch.group_name || selectedMatch.stage}
                </span>
                <span style={{ color: "#999", fontSize: 13, fontWeight: 700 }}>•</span>
                <span style={{ color: "#888", fontSize: 13, fontWeight: 700 }}>MATCH #{selectedMatch.id}</span>
              </div>
              <button 
                onClick={() => setSelectedMatch(null)}
                style={{ background: "#f5f5f5", border: "none", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#666", transition: "0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e5e5e5"; e.currentTarget.style.color = "#000"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.color = "#666"; }}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "32px" }}>
              
              {/* Score / VS Display */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 40, marginBottom: 40 }}>
                <div style={{ flex: 1, textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <span style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 900, textTransform: "uppercase" }}>{selectedMatch.home_team}</span>
                    <Flag code={selectedMatch.home_flag || getCode(selectedMatch.home_team)} size={48} />
                  </div>
                  {/* Form */}
                  <div style={{ display: "flex", gap: 6 }}>
                    {getRecentForm(selectedMatch.home_team).map((res, idx) => (
                      <span key={idx} style={{ background: getFormColor(res), color: "white", fontSize: 10, fontWeight: 800, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}>
                        {res}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ 
                  background: "#f8f8f8", padding: "16px 28px", borderRadius: 16, 
                  fontSize: 28, fontWeight: 900, color: "#0d0d0d", minWidth: 100, textAlign: "center",
                  border: "1px solid #eee", fontFamily: FONT.display
                }}>
                  {selectedMatch.status === "finished" ? `${selectedMatch.home_score} - ${selectedMatch.away_score}` : "VS"}
                </div>

                <div style={{ flex: 1, textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <Flag code={selectedMatch.away_flag || getCode(selectedMatch.away_team)} size={48} />
                    <span style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 900, textTransform: "uppercase" }}>{selectedMatch.away_team}</span>
                  </div>
                  {/* Form */}
                  <div style={{ display: "flex", gap: 6 }}>
                    {getRecentForm(selectedMatch.away_team).map((res, idx) => (
                      <span key={idx} style={{ background: getFormColor(res), color: "white", fontSize: 10, fontWeight: 800, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}>
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stadium Info */}
              <div style={{ background: "#f8f8f8", borderRadius: 20, padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 900, textTransform: "uppercase", margin: 0, color: "#0d0d0d" }}>
                      {selectedMatch.venue}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#666", fontSize: 14, fontWeight: 600, marginTop: 4 }}>
                      <FiMapPin size={16} /> {selectedMatch.city}
                    </div>
                  </div>
                  <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedMatch.venue + ' stadium')}`} target="_blank" rel="noreferrer" 
                    style={{
                      display: "flex", alignItems: "center", gap: 8, background: "#0d0d0d", color: "white", 
                      padding: "10px 20px", borderRadius: 100, textDecoration: "none", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em"
                    }}>
                    <FiVideo size={16} /> Visite Vidéo
                  </a>
                </div>

                {/* Images */}
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ flex: 1, height: 200, borderRadius: 12, overflow: "hidden" }}>
                    <img src="/images/stadiums/stadium_1.png" alt="Stadium Interior" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, height: 200, borderRadius: 12, overflow: "hidden" }}>
                    <img src="/images/stadiums/stadium_2.png" alt="Stadium Exterior" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
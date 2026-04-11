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

  const clampValue = (min, max) => `clamp(${min}px, ${(max/12.8).toFixed(2)}vw, ${max}px)`;

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
      <style>{`
        .matches-hero { padding: clamp(28px, 5vh, 80px) clamp(10px, 2vw, 24px); max-width: 1380px; margin: 0 auto; }
        .match-list { display: flex; flexDirection: column; gap: 10px; width: 100%; }
        .match-row-card {
           background: #ffffff; border: 1px solid #eee; borderRadius: 12px; padding: clamp(14px, 2.5vw, 24px);
           display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: clamp(10px, 2vw, 20px); 
           box-shadow: 0 4px 15px rgba(0,0,0,0.02); transition: 0.2s; cursor: pointer;
        }
        .match-team-block { display: flex; align-items: center; gap: clamp(6px, 1.5vw, 16px); flex: 1; minWidth: 0; }
        .match-vs-block { 
          background: #f8f8f8; padding: 8px clamp(8px, 1.5vw, 16px); borderRadius: 8px; 
          font-size: clamp(14px, 2.5vw, 20px); fontWeight: 900; color: #0d0d0d; minWidth: 50; textAlign: center;
          border: "1px solid #eee"; fontFamily: ${FONT.display};
        }
        @media (max-width: 860px) {
          .match-row-card { flex-direction: column; align-items: stretch; }
          .match-info-side { flex: 1 1 100% !important; border-bottom: 1px solid #eee; padding-bottom: 12px; }
          .match-teams-side { flex: 1 1 100% !important; justify-content: space-between !important; }
          .match-actions-side { flex: 1 1 100% !important; flex-direction: row !important; }
          .match-actions-side a { flex: 1; justify-content: center; }
        }
        @media (max-width: 480px) {
          .match-teams-side { gap: 6px !important; }
          .match-team-block { flex-direction: column; text-align: center !important; gap: 4px !important; }
          .match-team-block:first-child { align-items: center !important; }
          .match-team-block:last-child { align-items: center !important; }
          .match-team-block span { font-size: 12px !important; }
          .match-vs-block { min-width: 40px; padding: 6px 8px; font-size: 12px; }
          .matches-hero { padding: 16px 10px !important; }
          .matches-hero h1 { font-size: clamp(2rem, 7vw, 3.5rem) !important; }
          .matches-hero p { font-size: 13px !important; padding: 0 8px; }
        }
      `}</style>

      <section className="matches-hero">
        
        <div style={{ textAlign: "center", marginBottom: clampValue(32, 56) }}>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(2rem, 7vw, 5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 16 }}>Calendrier</h1>
          <p style={{ color: "#666", fontSize: "clamp(13px, 1.2vw, 16px)", maxWidth: 550, margin: "0 auto", lineHeight: 1.5 }}>
            Consultez le programme complet des 104 matchs de la Coupe du Monde FIFA 2030™. Filtrez par groupe ou par phase pour ne rien manquer.
          </p>
        </div>

        {/* FILTERS */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, overflowX: "auto", paddingBottom: 6, scrollbarWidth: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", background: "#f8f8f8", borderRadius: 100, border: "1px solid #eee", fontSize: 8, fontWeight: 800, color: "#999", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            <FiFilter size={9} /> FILTRER
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {groups.map(g => (
              <button 
                key={g}
                onClick={() => setFilter(g)}
                style={{
                  background: filter === g ? "#0d0d0d" : "white",
                  color: filter === g ? "white" : "#666",
                  border: `1px solid ${filter === g ? "#0d0d0d" : "#eee"}`,
                  padding: "5px 12px",
                  borderRadius: 100,
                  fontSize: 9,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s"
                }}
              >
                {g === "all" ? "Tous" : g}
              </button>
            ))}
          </div>
        </div>

        {loading && <div style={{ textAlign: "center", padding: 48, color: "#999" }}>Chargement des matchs...</div>}

        <div className="match-list">
          {filteredMatches.map((m, i) => (
            <div key={m.id || i} className="match-row-card"
            onClick={() => setSelectedMatch(m)}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.02)"; }}
            >
              
              <div className="match-info-side" style={{ flex: "1 1 250px" }}>
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
                    <FiClock size={16} /> {m.match_time?.substring(0,5)} · <FiMapPin size={16} /> {m.city}
                  </div>
                </div>
              </div>

              <div className="match-teams-side" style={{ flex: "2 1 350px", display: "flex", justifyContent: "center", alignItems: "center", gap: clampValue(16, 40) }}>
                <div className="match-team-block" style={{ textAlign: "right", justifyContent: "flex-end" }}>
                  <span style={{ fontFamily: FONT.display, fontSize: clampValue(16, 22), fontWeight: 900, textTransform: "uppercase" }}>{m.home_team}</span>
                  <Flag code={m.home_flag || getCode(m.home_team)} size={28} />
                </div>

                <div className="match-vs-block">
                  {m.status === "finished" ? `${m.home_score} - ${m.away_score}` : "VS"}
                </div>

                <div className="match-team-block" style={{ textAlign: "left", justifyContent: "flex-start" }}>
                  <Flag code={m.away_flag || getCode(m.away_team)} size={28} />
                  <span style={{ fontFamily: FONT.display, fontSize: clampValue(16, 22), fontWeight: 900, textTransform: "uppercase" }}>{m.away_team}</span>
                </div>
              </div>

              <div className="match-actions-side" style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
                {m.video_url && (
                    <a href={m.video_url} target="_blank" rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className="fz-btn-secondary"
                      style={{
                      padding: "10px 20px", borderRadius: 100, 
                      fontSize: 10, fontWeight: 800, textDecoration: "none", textTransform: "uppercase", 
                      letterSpacing: "0.05em", transition: "0.2s", display: "inline-flex", alignItems: "center", gap: 6
                    }}>
                      <FiPlayCircle size={14} /> Résumé
                    </a>
                )}
                <Link to={`/tickets?match_id=${m.id}`} 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                  background: "#0d0d0d", color: "white", padding: "10px 24px", borderRadius: 100, 
                  fontSize: 11, fontWeight: 800, textDecoration: "none", textTransform: "uppercase", 
                  letterSpacing: "0.05em", transition: "0.2s", display: "inline-block", textAlign: "center"
                }}>
                  Billets
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

      {/* MATCH DETAIL MODAL */}
      {selectedMatch && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(5px)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 16
        }} onClick={() => setSelectedMatch(null)}>
          <div style={{
            background: "white", borderRadius: 20, width: "100%", maxWidth: 720,
            overflow: "hidden", position: "relative",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
          }} onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#c8102e", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {selectedMatch.group_name || selectedMatch.stage}
                </span>
                <span style={{ color: "#999", fontSize: 11, fontWeight: 700 }}>•</span>
                <span style={{ color: "#888", fontSize: 11, fontWeight: 700 }}>MATCH #{selectedMatch.id}</span>
              </div>
              <button 
                onClick={() => setSelectedMatch(null)}
                style={{ background: "#f5f5f5", border: "none", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#666", transition: "0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e5e5e5"; e.currentTarget.style.color = "#000"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.color = "#666"; }}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "24px 16px" }}>
              
              {/* Score / VS Display */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
                <div style={{ flex: 1, textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, minWidth: 120 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontFamily: FONT.display, fontSize: clampValue(20, 28), fontWeight: 900, textTransform: "uppercase" }}>{selectedMatch.home_team}</span>
                    <Flag code={selectedMatch.home_flag || getCode(selectedMatch.home_team)} size={36} />
                  </div>
                  {/* Form */}
                  <div style={{ display: "flex", gap: 4 }}>
                    {getRecentForm(selectedMatch.home_team).map((res, idx) => (
                      <span key={idx} style={{ background: getFormColor(res), color: "white", fontSize: 9, fontWeight: 800, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 3 }}>
                        {res}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ 
                  background: "#f8f8f8", padding: "12px 20px", borderRadius: 12, 
                  fontSize: clampValue(20, 26), fontWeight: 900, color: "#0d0d0d", minWidth: 80, textAlign: "center",
                  border: "1px solid #eee", fontFamily: FONT.display
                }}>
                  {selectedMatch.status === "finished" ? `${selectedMatch.home_score} - ${selectedMatch.away_score}` : "VS"}
                </div>

                <div style={{ flex: 1, textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, minWidth: 120 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <Flag code={selectedMatch.away_flag || getCode(selectedMatch.away_team)} size={36} />
                    <span style={{ fontFamily: FONT.display, fontSize: clampValue(20, 28), fontWeight: 900, textTransform: "uppercase" }}>{selectedMatch.away_team}</span>
                  </div>
                  {/* Form */}
                  <div style={{ display: "flex", gap: 4 }}>
                    {getRecentForm(selectedMatch.away_team).map((res, idx) => (
                      <span key={idx} style={{ background: getFormColor(res), color: "white", fontSize: 9, fontWeight: 800, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 3 }}>
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stadium Info */}
              <div style={{ background: "#f8f8f8", borderRadius: 16, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <h3 style={{ fontFamily: FONT.display, fontSize: clampValue(16, 22), fontWeight: 900, textTransform: "uppercase", margin: 0, color: "#0d0d0d" }}>
                      {selectedMatch.venue}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#666", fontSize: 12, fontWeight: 600, marginTop: 4 }}>
                      <FiMapPin size={14} /> {selectedMatch.city}
                    </div>
                  </div>
                  <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedMatch.venue + ' stadium')}`} target="_blank" rel="noreferrer" 
                    style={{
                      display: "flex", alignItems: "center", gap: 6, background: "#0d0d0d", color: "white", 
                      padding: "8px 16px", borderRadius: 100, textDecoration: "none", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em"
                    }}>
                    <FiVideo size={12} /> Visite Vidéo
                  </a>
                </div>

                {/* Images */}
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ flex: 1, height: clampValue(100, 160), borderRadius: 8, overflow: "hidden" }}>
                    <img src="/images/stadiums/stadium_1.png" alt="Stadium Interior" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, height: clampValue(100, 160), borderRadius: 8, overflow: "hidden" }}>
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
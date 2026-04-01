import { useState, useEffect } from "react";
import axios from "axios";
import { FONT } from "./Home/constants";
import { Flag } from "./Home/ui";
import { FiSearch, FiStar, FiAward } from "react-icons/fi";

const TEAMS = [
  { name: "Maroc", code: "ma", group: "Groupe A", rank: 12, player: "Achraf Hakimi", img: "https://images.unsplash.com/photo-1518081461904-9d8f13635102?w=500&q=80" },
  { name: "Espagne", code: "es", group: "Groupe G", rank: 3, player: "Lamine Yamal", img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80" },
  { name: "Portugal", code: "pt", group: "Groupe H", rank: 6, player: "Rafael Leão", img: "https://images.unsplash.com/photo-1582239401768-3fa44026da73?w=500&q=80" },
  { name: "Argentine", code: "ar", group: "Groupe B", rank: 1, player: "Lionel Messi", img: "https://images.unsplash.com/photo-1589133465492-4d40026e2a2a?w=500&q=80" },
  { name: "France", code: "fr", group: "Groupe A", rank: 2, player: "Kylian Mbappé", img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500&q=80" },
  { name: "Brésil", code: "br", group: "Groupe B", rank: 5, player: "Vinicius Jr", img: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=500&q=80" },
  { name: "Angleterre", code: "gb", group: "Groupe C", rank: 4, player: "Jude Bellingham", img: "https://images.unsplash.com/photo-1511886929837-329f79011999?w=500&q=80" },
  { name: "Allemagne", code: "de", group: "Groupe D", rank: 16, player: "Jamal Musiala", img: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=500&q=80" },
  { name: "Belgique", code: "be", group: "Groupe D", rank: 8, player: "Kevin De Bruyne", img: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=500&q=80" },
  { name: "Colombie", code: "co", group: "Groupe A", rank: 14, player: "Luis Díaz", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80" },
  { name: "Sénégal", code: "sn", group: "Groupe E", rank: 20, player: "Sadio Mané", img: "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=500&q=80" },
  { name: "Japon", code: "jp", group: "Groupe A", rank: 18, player: "Takefusa Kubo", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80" },
  { name: "USA", code: "us", group: "Groupe B", rank: 13, player: "Christian Pulisic", img: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=500&q=80" },
  { name: "Mexique", code: "mx", group: "Groupe B", rank: 15, player: "Santiago Giménez", img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500&q=80" },
  { name: "Italie", code: "it", group: "Groupe E", rank: 9, player: "Federico Chiesa", img: "https://images.unsplash.com/photo-1559564614-a399728b70ba?w=500&q=80" },
  { name: "Uruguay", code: "uy", group: "Groupe E", rank: 11, player: "Darwin Núñez", img: "https://images.unsplash.com/photo-1510051640316-cee39563ddab?w=500&q=80" },
];

export default function Teams() {
  const { darkMode } = useTheme();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const clampValue = (min, max) => `clamp(${min}px, ${(max / 12.8).toFixed(2)}vw, ${max}px)`;

  const theme = {
    bg: darkMode ? "#080808" : "#f8f9fa",
    card: darkMode ? "#111111" : "#ffffff",
    text: darkMode ? "#ffffff" : "#0d0d0d",
    subText: darkMode ? "#888" : "#666",
    border: darkMode ? "rgba(255,255,255,0.08)" : "#eeeeee",
    accent: C.red,
    inputBg: darkMode ? "#1a1a1a" : "#f8f8f8",
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/teams`);
        setTeams(res.data);
      } catch (err) {
        console.error("Failed to fetch teams:", err);
        setError("Impossible de charger les équipes.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.group_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: FONT.body,
      background: theme.bg,
      color: theme.text,
      minHeight: "100vh",
      transition: "background 0.3s, color 0.3s",
      paddingBottom: 100
    }}>
      <style>{`
        .teams-hero { padding: clamp(32px, 6vh, 100px) var(--section-pad-x); max-width: 1380px; margin: 0 auto; }
        .search-container { position: relative; max-width: 600px; margin: 0 auto; }
        .teams-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: clamp(12px, 2vw, 20px); }
        .team-card {
          background: ${theme.card}; borderRadius: 16px; overflow: hidden; border: 1px solid ${theme.border};
          box-shadow: 0 4px 15px rgba(0,0,0,0.02); transition: 0.3s;
        }
        .team-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); }
        .team-card-img {
          width: 100%;
          height: clamp(120px, 18vh, 180px);
          object-fit: cover;
          object-position: center top;
          display: block;
          background: ${darkMode ? "#1a1a1a" : "#f5f5f5"};
        }
        .team-card-badge { position: absolute; top: 10px; right: 10px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .team-card-body { padding: 14px !important; }
          .team-card-title { font-size: 18px !important; }
          .teams-hero { padding: 80px 10px 16px !important; }
          .teams-hero h1 { font-size: clamp(2rem, 8vw, 4rem) !important; }
          .search-container input { padding: 10px 14px 10px 36px !important; font-size: 13px !important; }
          .team-card-img { height: 140px !important; }
          .team-card-badge { top: 8px; right: 8px; }
        }
      `}</style>

      {/* HEADER SECTION - Matching Standings style but simplified */}
      <section style={{
        padding: "clamp(48px, 10vh, 100px) var(--section-pad-x) clamp(60px, 12vh, 80px)",
        background: darkMode ? "#000" : `linear-gradient(135deg, ${C.black} 0%, #1a1a1a 100%)`,
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        marginBottom: 40
      }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 600, height: 600, background: `radial-gradient(circle, ${C.red}22 0%, transparent 70%)`, borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ color: C.red, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 10, display: "block", marginBottom: 10 }}>FIFA World Cup 2030</span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(2.2rem, 8vw, 5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 20 }}>Nations</h1>
          <p style={{ maxWidth: 600, margin: "0 auto 32px", fontSize: "clamp(14px, 1.5vw, 18px)", opacity: 0.8 }}>Découvrez les équipes qui s'affronteront pour le titre mondial.</p>

          <div className="search-container">
            <FiSearch style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#aaa" }} size={14} />
            <input
              type="text"
              placeholder="Rechercher une nation, un groupe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 100,
                padding: "14px 18px 14px 42px",
                color: "#ffffff",
                fontSize: 14,
                width: "100%",
                outline: "none",
                fontFamily: FONT.body,
                transition: "0.2s",
                backdropFilter: "blur(10px)"
              }}
            />
          </div>
        </div>
      </section>

      <section className="teams-hero" style={{ paddingTop: 0 }}>
        <div className="teams-grid">
          {filteredTeams.map((t, i) => (
            <div key={t.id || i} className="team-card">
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img
                  src={t.image_url || t.img}
                  alt={t.name}
                  className="team-card-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{ display: 'none', position: 'absolute', inset: 0, background: darkMode ? '#1a1a1a' : '#f0f0f0', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: darkMode ? '#333' : '#ddd', textTransform: 'uppercase' }}>{t.name.charAt(0)}</span>
                </div>
                <div className="team-card-badge">
                  <Flag code={t.code} size={20} />
                </div>
              </div>

              <div className="team-card-body" style={{ padding: "clamp(14px, 2.5vw, 24px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h3 className="team-card-title" style={{ fontFamily: FONT.display, fontSize: "clamp(18px, 3.5vw, 28px)", fontWeight: 900, textTransform: "uppercase", margin: 0, lineHeight: 1, color: theme.text }}>{t.name}</h3>
                    <span style={{ color: C.red, fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.group_name || t.group}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: theme.text }}>#{t.rank}</span>
                    <span style={{ display: "block", fontSize: 7, fontWeight: 800, color: theme.subText, textTransform: "uppercase" }}>FIFA Rank</span>
                  </div>
                </div>

                <div style={{ background: darkMode ? "rgba(255,255,255,0.02)" : "#fcfcfc", border: `1px solid ${theme.border}`, borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: theme.border, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FiStar color={C.red} size={12} />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: theme.text, display: "block" }}>{t.key_player || t.player}</span>
                    <span style={{ fontSize: 8, color: theme.subText, fontWeight: 600 }}>Joueur clé</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ color: theme.subText }}>Aucune équipe ne correspond à votre recherche.</p>
          </div>
        )}
      </section>
    </div>
  );
}
import { useState, useEffect } from "react";
import { FONT, C, CODES, getCode } from "./Home/constants";
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
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  
  const clampValue = (min, max) => `clamp(${min}px, ${(max/12.8).toFixed(2)}vw, ${max}px)`;
  
  useEffect(() => { setMounted(true); }, []);

  const filteredTeams = TEAMS.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.group.toLowerCase().includes(search.toLowerCase())
  );

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
        .teams-hero { padding: clamp(32px, 6vh, 100px) var(--section-pad-x); max-width: 1380px; margin: 0 auto; }
        .search-container { position: relative; maxWidth: 600px; margin: 0 auto; }
        .teams-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: clamp(12px, 2vw, 20px); }
        .team-card {
          background: #ffffff; borderRadius: 16px; overflow: hidden; border: 1px solid #eee;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02); transition: 0.3s;
        }
        .team-card-img {
          width: 100%;
          height: clamp(120px, 18vh, 180px);
          object-fit: cover;
          object-position: center top;
          display: block;
          background: #f5f5f5;
        }
        .team-card-badge {
          position: absolute;
          top: 10px;
          right: 10px;
        }
        @media (max-width: 600px) {
          .team-card-body { padding: 14px !important; }
          .team-card-title { font-size: 18px !important; }
          .teams-hero { padding: 16px 10px !important; }
          .teams-hero h1 { font-size: clamp(2rem, 8vw, 4rem) !important; }
          .search-container input { padding: 10px 14px 10px 36px !important; font-size: 13px !important; }
          .team-card-img { height: 140px !important; }
          .team-card-badge { top: 8px; right: 8px; }
        }
      `}</style>

      <section className="teams-hero">
        
        <div style={{ textAlign: "center", marginBottom: clampValue(32, 56) }}>
          <span style={{ color: "#c8102e", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 10, display: "block", marginBottom: 10 }}>FIFA World Cup 2030</span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(2.2rem, 8vw, 5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 20 }}>Nations</h1>
          
          <div className="search-container">
            <FiSearch style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#aaa" }} size={14} />
            <input 
              type="text" 
              placeholder="Rechercher une nation, un groupe..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "#f8f8f8",
                border: "1px solid #eee",
                borderRadius: 100,
                padding: "12px 18px 12px 42px",
                color: "#0d0d0d",
                fontSize: 13,
                width: "100%",
                outline: "none",
                fontFamily: FONT.body,
                transition: "0.2s"
              }}
            />
          </div>
        </div>
        
        <div className="teams-grid">
          {filteredTeams.map((t, i) => (
            <div key={i} className="team-card">
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img 
                  src={t.img} 
                  alt={t.name} 
                  className="team-card-img"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{ display: 'none', position: 'absolute', inset: 0, background: '#f0f0f0', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: '#ddd', textTransform: 'uppercase' }}>{t.name.charAt(0)}</span>
                </div>
                <div className="team-card-badge">
                   <Flag code={t.code} size={20} />
                </div>
              </div>
              
              <div className="team-card-body" style={{ padding: "clamp(14px, 2.5vw, 24px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h3 className="team-card-title" style={{ fontFamily: FONT.display, fontSize: "clamp(18px, 3.5vw, 28px)", fontWeight: 900, textTransform: "uppercase", margin: 0, lineHeight: 1 }}>{t.name}</h3>
                    <span style={{ color: "#c8102e", fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.group}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#0d0d0d" }}>#{t.rank}</span>
                    <span style={{ display: "block", fontSize: 7, fontWeight: 800, color: "#aaa", textTransform: "uppercase" }}>FIFA Rank</span>
                  </div>
                </div>
                
                <div style={{ background: "#fcfcfc", border: "1px solid #f5f5f5", borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                   <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <FiStar color="#c8102e" size={12} />
                   </div>
                   <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#0d0d0d", display: "block" }}>{t.player}</span>
                      <span style={{ fontSize: 8, color: "#aaa", fontWeight: 600 }}>Joueur clé</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
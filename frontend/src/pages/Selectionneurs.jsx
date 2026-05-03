import { useState, useEffect } from "react";
import { getSelectionneurs, getImageUrl } from "../services/api";
import { useTheme } from "../context/ThemeContext";

const D = "'Bebas Neue', sans-serif";
const B = "'DM Sans', sans-serif";

export default function Selectionneurs() {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    getSelectionneurs().then(data => {
      setCoaches(data);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const tBg      = darkMode ? "#0d0d0d" : "#fdfdfd";
  const tText    = darkMode ? "white"   : "#0d0d0d";
  const tCardBg  = darkMode ? "#1a1a1a" : "#f0f0f0";
  const tBorder  = darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const tSubText = darkMode ? "rgba(255,255,255,0.4)"  : "rgba(0,0,0,0.45)";

  return (
    <div style={{
      fontFamily: B,
      background: tBg,
      color: tText,
      opacity: mounted ? 1 : 0,
      transition: "background-color 0.4s, color 0.4s, opacity 0.45s",
      minHeight: "100vh",
    }}>
      <style>{`
        .hw { max-width: 1380px; margin: 0 auto; padding: 0 clamp(16px,3.5vw,52px); }
        .j-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 40px 24px;
        }
        .j-card {
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
      `}</style>

      <section id="selectionneurs-list" style={{ padding: "clamp(56px,8vh,100px) 0" }}>
        <div className="hw">
          <h1 style={{ fontFamily: D, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 60 }}>
            Les Sélectionneurs
          </h1>
          
          {loading ? (
            <div style={{ padding: 60, textAlign: "center", color: tSubText, fontFamily: B }}>
              Chargement des sélectionneurs...
            </div>
          ) : (
            <div className="j-grid">
              {coaches.map((c) => (
                <div key={c.id} className="j-card">
                  <div style={{
                    width: 200, height: 200,
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto 24px",
                    border: `2px solid ${tBorder}`,
                    background: tCardBg,
                    flexShrink: 0,
                  }}>
                    <img
                      src={c.photo
                        ? getImageUrl(c.photo)
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=222222&color=ffffff&size=512`
                      }
                      alt={c.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=222222&color=ffffff&size=512`;
                      }}
                    />
                  </div>
                  <h3 style={{
                    fontFamily: D, fontSize: 24, fontWeight: 900,
                    textTransform: "uppercase", letterSpacing: "0.04em",
                    color: tText, margin: "0 0 8px 0", lineHeight: 1.1,
                  }}>
                    {c.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                    {c.team?.flag && (
                      <img src={`https://flagcdn.com/w40/${c.team.flag.toLowerCase()}.png`} width="20" style={{ borderRadius: 2 }} alt="" />
                    )}
                    <span style={{ fontSize: 13, fontWeight: 700, color: tSubText, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {c.team?.name || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

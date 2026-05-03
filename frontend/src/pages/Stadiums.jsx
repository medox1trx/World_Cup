import { useState, useEffect } from "react";
import { getStadiums, getImageUrl } from "../services/api";
import { useTheme } from "../context/ThemeContext";

const D = "'Bebas Neue', sans-serif";
const B = "'DM Sans', sans-serif";

export default function Stadiums() {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    getStadiums()
      .then(data => {
        const results = Array.isArray(data) ? data : (data.data || []);
        setStadiums(results);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const tBg     = darkMode ? "#0a0a0a" : "#fdfdfd";
  const tText   = darkMode ? "white"   : "#0a0a0a";
  const tCardBg = darkMode ? "#111111" : "#f5f5f5";
  const tBorder = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tSub    = darkMode ? "rgba(255,255,255,0.4)"  : "rgba(0,0,0,0.45)";

  return (
    <div style={{
      fontFamily: B,
      background: tBg,
      color: tText,
      opacity: mounted ? 1 : 0,
      transition: "background-color 0.4s, color 0.4s, opacity 0.45s",
      minHeight: "100vh",
      paddingTop: 60,
    }}>
      <style>{`
        .hw { max-width: 1500px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 80px); }
        .fz-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
          gap: 40px;
          padding: 60px 0 120px;
        }
        .fz-card {
          display: flex;
          flex-direction: column;
        }
        .fz-img-wrap {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 16px;
          overflow: hidden;
          background: ${tCardBg};
          border: 1px solid ${tBorder};
          margin-bottom: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          transition: transform 0.3s ease;
        }
        .fz-img-wrap:hover {
          transform: translateY(-5px);
        }
        .fz-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .fz-name {
          font-family: ${D};
          font-size: 24px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
          line-height: 1;
          color: ${tText};
        }
        
        @media (max-width: 768px) {
          .fz-grid { grid-template-columns: 1fr; gap: 30px; }
          .fz-name { font-size: 20px; }
        }
      `}</style>

      <section style={{ paddingTop: 40 }}>
        <div className="hw">
          <h1 style={{ fontFamily: D, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 60 }}>
            Les Stades
          </h1>
          {loading ? (
            <div style={{ padding: 100, textAlign: "center", color: tSub }}>
              Chargement des stades...
            </div>
          ) : (
            <div className="fz-grid">
              {stadiums.map((s) => (
                <div key={s.id} className="fz-card">
                  <div className="fz-img-wrap">
                    <img
                      src={getImageUrl(s.image_url)}
                      alt={s.name}
                      className="fz-img"
                      onError={e => {
                        e.currentTarget.src = `https://i.pinimg.com/736x/39/0a/45/390a454c565577a5a7bc57597b722328.jpg`;
                      }}
                    />
                  </div>
                  <h3 className="fz-name">{s.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

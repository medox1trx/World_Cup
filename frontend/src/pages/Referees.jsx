import { useState, useEffect } from "react";
import { getReferees, getImageUrl } from "../services/api";
import { useTheme } from "../context/ThemeContext";

const D = "'Bebas Neue', sans-serif";
const B = "'DM Sans', sans-serif";

export default function Referees() {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [referees, setReferees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    getReferees().then(data => {
      const list = data?.data || data;
      setReferees(Array.isArray(list) ? list : []);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const tBg      = darkMode ? "#000000" : "#ffffff";
  const tText    = darkMode ? "#ffffff" : "#000000";
  const tBorder  = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tSubText = darkMode ? "rgba(255,255,255,0.4)"  : "rgba(0,0,0,0.45)";

  return (
    <div style={{
      fontFamily: B,
      background: tBg,
      color: tText,
      opacity: mounted ? 1 : 0,
      transition: "background-color 0.4s, color 0.4s, opacity 0.45s",
      minHeight: "100vh",
      paddingTop: 40
    }}>
      <style>{`
        .hw { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        
        .r-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 60px 20px;
        }

        @media (max-width: 1200px) { .r-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 900px) { .r-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px) { .r-grid { grid-template-columns: repeat(2, 1fr); } }

        .r-item {
          display: flex; flex-direction: column; align-items: center; text-align: center;
          transition: transform 0.3s ease;
        }
        .r-item:hover { transform: translateY(-5px); }

        .r-avatar-container {
          width: 180px; height: 180px; 
          border-radius: 50%; overflow: hidden;
          border: 2px solid ${tBorder}; 
          margin-bottom: 20px; 
          background: ${darkMode ? "#151515" : "#f5f5f5"};
          flex-shrink: 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .r-name {
          font-family: ${D}; 
          font-size: 22px; 
          font-weight: 900; 
          text-transform: uppercase; 
          margin: 0; 
          letter-spacing: 0.04em;
          color: ${tText};
          line-height: 1.1;
        }
      `}</style>

      <section style={{ padding: "60px 0 120px" }}>
        <div className="hw">
          <h1 style={{ fontFamily: D, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 60 }}>
            Les Arbitres
          </h1>
          
          {loading ? (
            <div style={{ padding: 100, textAlign: "center", color: tSubText }}>Chargement...</div>
          ) : (
            <div className="r-grid">
              {referees.map((r) => {
                const fullName = `${r.first_name} ${r.last_name}`;
                const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=222222&color=ffffff&size=512`;
                
                return (
                  <div key={r.id} className="r-item">
                    <div className="r-avatar-container">
                      <img 
                        src={(r.photo_url && r.photo_url !== "") ? getImageUrl(r.photo_url) : fallbackImg} 
                        alt={fullName}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={e => { e.currentTarget.src = fallbackImg; }}
                      />
                    </div>
                    <h3 className="r-name">{fullName}</h3>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { Star, Users, Bed, Bath, MapPin } from "lucide-react";

export default function AccommodationCard({ acc, citySlug }) {
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  return (
    <div style={{ 
      display: "flex",
      flexDirection: "column",
      borderRadius: 24, 
      overflow: "hidden", 
      background: darkMode ? "#1a1a1a" : "white",
      border: `1px solid ${darkMode ? "#222" : "#eee"}`,
      transition: "transform 0.3s, box-shadow 0.3s",
      height: "100%",
      cursor: "pointer",
      position: "relative"
    }}
    onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-10px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
    }}
    onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
    }}>
      
      {/* Badge / Category */}
      <span style={{ 
          position: "absolute", 
          top: 16, left: 16, 
          background: "rgba(255,255,255,0.9)", 
          backdropFilter: "blur(4px)",
          color: "#0d0d0d", 
          padding: "6px 14px", 
          borderRadius: 100, 
          fontSize: 11, 
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          zIndex: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
          {t(`filters.${acc.type}`)}
      </span>

      <div style={{ height: 260, position: "relative" }}>
        <img src={acc.image_url} alt={acc.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ padding: 24, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <h4 style={{ fontSize: 22, fontWeight: 900, color: darkMode ? "white" : "#0d0d0d", margin: 0, lineHeight: 1.2 }}>{acc.name}</h4>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 700, fontSize: 14 }}>
                <Star size={16} fill="#ffb400" stroke="#ffb400" />
                {acc.rating}
            </div>
        </div>

        <p style={{ fontSize: 14, color: darkMode ? "#888" : "#666", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
          <MapPin size={14} style={{opacity: 0.7}} />
          {acc.location}
        </p>

        <div style={{ display: "flex", gap: 16, marginBottom: 20, fontSize: 13, color: darkMode ? "#777" : "#888", fontWeight: 600 }}>
             <span title="Guests" style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={14} /> {acc.capacity}</span>
             <span title="Beds" style={{ display: "flex", alignItems: "center", gap: 4 }}><Bed size={14} /> {acc.beds}</span>
             <span title="Baths" style={{ display: "flex", alignItems: "center", gap: 4 }}><Bath size={14} /> {acc.baths}</span>
        </div>
        
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: `1px solid ${darkMode ? "#222" : "#eee"}` }}>
            <div>
                <span style={{ fontSize: 24, fontWeight: 900, color: "#c8102e" }}>${acc.price_per_night}</span>
                <span style={{ fontSize: 12, color: darkMode ? "#aaa" : "#888", fontWeight: 600 }}> / {t('perNight')}</span>
            </div>
            <Link to={`/cities/${citySlug}/book/${acc.id}`} style={{ textDecoration: "none" }}>
                <button style={{ 
                    padding: "10px 24px", borderRadius: 100, 
                    background: "#0d0d0d", color: "white", 
                    border: "none", fontWeight: 800, fontSize: 14, cursor: "pointer",
                    transition: "all 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#c8102e"}
                onMouseLeave={e => e.currentTarget.style.background = "#0d0d0d"}>
                  {t('bookNow')}
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
}

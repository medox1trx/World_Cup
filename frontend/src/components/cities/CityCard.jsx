import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { getImageUrl } from "../../services/api";
import { Link } from "react-router-dom";

export default function CityCard({ city }) {
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  const tBg     = darkMode ? "#0a0a0a" : "#fdfdfd";
  const tText   = darkMode ? "white"   : "#0a0a0a";
  const tSub    = darkMode ? "rgba(255,255,255,0.4)"  : "rgba(0,0,0,0.45)";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
        <img 
          src={getImageUrl(city.image_url)} 
          alt={city.name} 
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = `https://picsum.photos/seed/${encodeURIComponent(city.name)}/800/450`; 
          }} 
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
        />
      </div>
      <h3 style={{ 
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 28,
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        margin: "0 0 12px 0",
        lineHeight: 1.1,
        color: tText
      }}>{city.name}</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px", marginBottom: "24px" }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "14px", color: tSub, textTransform: "uppercase" }}>
          Pays: {city.country?.name || "N/A"}
        </span>
      </div>
      
      <div style={{ marginTop: "auto", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Link 
          to={`/hotels?city=${encodeURIComponent(city.name)}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 24px",
            background: tText,
            color: tBg,
            borderRadius: "8px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "16px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 0.3s"
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Hébergements
        </Link>
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city.name + ' ' + (city.country?.name || ''))}`}
          target="_blank" 
          rel="noopener noreferrer" 
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 24px",
            background: "transparent",
            color: tText,
            border: `1px solid ${tText}`,
            borderRadius: "8px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "16px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 0.3s"
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Localiser
        </a>
      </div>
    </div>
  );
}

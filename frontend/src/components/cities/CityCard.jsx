import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

export default function CityCard({ city }) {
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  return (
    <div style={{ 
      borderRadius: 16, 
      overflow: "hidden", 
      background: darkMode ? "#1a1a1a" : "white",
      border: `1px solid ${darkMode ? "#333" : "#eee"}`,
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer"
    }}
    onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = darkMode ? "0 12px 30px rgba(0,0,0,0.5)" : "0 12px 30px rgba(0,0,0,0.1)";
    }}
    onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
    }}>
      <div style={{ height: 240, overflow: "hidden", position: "relative" }}>
        <img src={city.image_url || "https://images.unsplash.com/photo-1518115243171-4601fc6bed1a?w=800&q=80"} alt={city.name} onError={(e) => { e.target.onerror = null; e.target.src="https://images.unsplash.com/photo-1518115243171-4601fc6bed1a?w=800&q=80" }} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} />
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
           <h3 style={{ fontSize: 24, fontWeight: 800, color: darkMode ? "white" : "#0d0d0d", margin: 0 }}>{city.name}</h3>
           <span style={{ 
             background: "rgba(200, 16, 46, 0.1)", 
             color: "#c8102e", 
             padding: "4px 10px", 
             borderRadius: 100, 
             fontSize: 12, 
             fontWeight: 700 
           }}>{city.accommodations_count || 0} {t('accommodations')}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
            <span style={{ fontSize: 14, color: darkMode ? "#aaa" : "#666", display: "flex", alignItems: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 8, opacity: 0.8}}><path d="M22 20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8l10-4 10 4v12Z"/><path d="M5 22v-4"/><path d="M19 22v-4"/><path d="M12 22v-6"/><path d="M8 22v-4"/><path d="M16 22v-4"/></svg>
              {city.stadium}
            </span>
            <span style={{ fontSize: 13, color: darkMode ? "#888" : "#888", display: "flex", alignItems: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 8, opacity: 0.8}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {city.match_period}
            </span>
        </div>
        <Link to={`/cities/${city.slug}`} style={{ textDecoration: "none" }}>
            <button style={{ 
                padding: "12px 24px", 
                borderRadius: 100, 
                background: "#c8102e", 
                color: "white", 
                border: "none", 
                fontWeight: 700, 
                cursor: "pointer",
                transition: "background 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#a00c24"}
            onMouseLeave={e => e.currentTarget.style.background = "#c8102e"}>
                {t('cityDetails')}
            </button>
        </Link>
      </div>
    </div>
  );
}

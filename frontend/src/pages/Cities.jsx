import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { getCities } from "../services/api";
import CityCard from "../components/cities/CityCard";
import SkeletonCard from "../components/cities/SkeletonCard";

export default function Cities() {
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getCities()
      .then(res => {
        setCities(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load cities", err);
        setLoading(false);
      });
  }, []);

  const filteredCities = cities.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{
      background: darkMode ? "#0d0d0d" : "#fafafa",
      color: darkMode ? "#ffffff" : "#0d0d0d",
      minHeight: "100vh",
      transition: "background 0.3s, color 0.3s"
    }}>

      {/* HERO SECTION */}
      <section style={{
        position: "relative",
        height: "40vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: darkMode ? "#1a1a1a" : "#f0f0f0"
      }}>
        <img src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1600&q=85&fit=crop" alt="Hero"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1518115243171-4601fc6bed1a?w=800&q=80" }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: darkMode ? 0.3 : 0.15 }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px" }}>
          <span style={{ color: "#c8102e", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", fontSize: 13, marginBottom: 12, display: "block" }}>
            FIFA World Cup 2026™
          </span>
          <h1 style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1, margin: 0 }}>
            {t('hostCities')}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ maxWidth: 1380, margin: "0 auto", padding: "60px 24px" }}>

        {/* Search & Filters */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
          <div style={{ flex: 1, minWidth: 280, maxWidth: 400 }}>
            <input
              type="text"
              placeholder="Search a city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 24px",
                borderRadius: 100,
                border: `1px solid ${darkMode ? "#333" : "#ddd"}`,
                background: darkMode ? "#1a1a1a" : "white",
                color: darkMode ? "white" : "black",
                outline: "none",
                fontSize: 16
              }}
            />
          </div>
        </div>

        {/* GRID */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 32 }}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <>
            {filteredCities.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: darkMode ? "#888" : "#666" }}>
                <h3>{t('noResults')}</h3>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 32 }}>
                {filteredCities.map(city => (
                  <CityCard key={city.id} city={city} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
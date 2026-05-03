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

      <section style={{ maxWidth: 1380, margin: "0 auto", padding: "100px 24px 0" }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 60 }}>
          Les Villes Hôtes
        </h1>
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
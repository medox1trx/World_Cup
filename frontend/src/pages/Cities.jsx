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

  const tBg     = darkMode ? "#0a0a0a" : "#fdfdfd";
  const tText   = darkMode ? "white"   : "#0a0a0a";

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: tBg,
      color: tText,
      minHeight: "100vh",
      paddingTop: 60,
      transition: "background 0.3s, color 0.3s"
    }}>

      <section style={{ maxWidth: 1500, margin: "0 auto", padding: "40px clamp(20px, 5vw, 80px) 0" }}>
        <h1 style={{ 
          fontFamily: "'Bebas Neue', sans-serif", 
          fontSize: "clamp(48px, 8vw, 110px)", 
          fontWeight: 900, 
          textTransform: "uppercase", 
          marginBottom: 32,
          lineHeight: 0.9,
          letterSpacing: "-0.02em"
        }}>
          Les Villes Hôtes
        </h1>
      </section>

      {/* CONTENT */}
      <section style={{ maxWidth: 1500, margin: "0 auto", padding: "0 clamp(20px, 5vw, 80px) 120px" }}>

        {/* GRID */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 40, paddingTop: 40 }}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <>
            {cities.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: darkMode ? "#888" : "#666" }}>
                <h3>{t('noResults')}</h3>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 40, paddingTop: 40 }}>
                {cities.map(city => (
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
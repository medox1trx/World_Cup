import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { getCity, getAccommodations } from "../services/api";
import AccommodationCard from "../components/cities/AccommodationCard";
import SkeletonCard from "../components/cities/SkeletonCard";
import { Home, Filter, ArrowUpDown, ChevronRight } from "lucide-react";

export default function CityDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  
  const [city, setCity] = useState(null);
  const [accommodations, setAccommodations] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, last: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [filters, setFilters] = useState({
      type: "all",
      min_price: "",
      max_price: "",
      capacity: 1,
      sort: "price_asc"
  });

  const fetchCityData = useCallback(() => {
    getCity(slug)
      .then(res => setCity(res.data))
      .catch(err => console.error("Failed to load city", err));
  }, [slug]);

  const fetchAccommodations = useCallback((page = 1) => {
    setLoading(true);
    getAccommodations(slug, { ...filters, page, per_page: 9 })
      .then(res => {
        setAccommodations(res.data.data);
        setPagination({
            current: res.data.current_page,
            last: res.data.last_page,
            total: res.data.total
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load accommodations", err);
        setLoading(false);
      });
  }, [slug, filters]);

  useEffect(() => {
    window.scrollTo(0,0);
    fetchCityData();
  }, [fetchCityData]);

  useEffect(() => {
    fetchAccommodations(1);
  }, [fetchAccommodations]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (!city && loading) {
      return (
          <div style={{ background: darkMode ? "#0d0d0d" : "#fafafa", minHeight: "100vh", paddingTop: 100 }}>
             <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
                <SkeletonCard type="city" />
             </div>
          </div>
      );
  }

  if (!city) return <div style={{ padding: 100, textAlign: "center" }}>City not found</div>;

  return (
    <div style={{ 
      background: darkMode ? "#0d0d0d" : "#fafafa", 
      color: darkMode ? "#ffffff" : "#0d0d0d", 
      minHeight: "100vh",
      transition: "background 0.3s, color 0.3s"
    }}>
      
      {/* Dynamic Hero */}
      <section style={{ position: "relative", height: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#000" }}>
        <img src={city.image_url} alt={city.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px" }}>
          <span style={{ color: "#fff", background: "#c8102e", padding: "4px 12px", borderRadius: 100, fontWeight: 700, fontSize: 13, marginBottom: 16, display: "inline-block" }}>
            FIFA World Cup 2026™
          </span>
          <h1 style={{ fontSize: "clamp(3rem, 6vw, 6rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1, margin: 0, color: "white", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            {city.name}
          </h1>
        </div>
      </section>

      {/* Intro Info */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 60, alignItems: "start" }}>
              <div>
                  <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>About {city.name}</h2>
                  <p style={{ fontSize: 18, lineHeight: 1.7, color: darkMode ? "#bbb" : "#444", marginBottom: 32 }}>{city.description}</p>
              </div>
              <div style={{ display: "grid", gap: 16 }}>
                  <div style={{ background: darkMode ? "#1a1a1a" : "white", padding: 24, borderRadius: 20, border: `1px solid ${darkMode?"#333":"#eee"}` }}>
                      <span style={{ display: "block", fontSize: 11, color: "#c8102e", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>Official Stadium</span>
                      <span style={{ fontSize: 18, fontWeight: 800, marginTop: 4, display: "block" }}>{city.stadium}</span>
                  </div>
                  <div style={{ background: darkMode ? "#1a1a1a" : "white", padding: 24, borderRadius: 20, border: `1px solid ${darkMode?"#333":"#eee"}` }}>
                      <span style={{ display: "block", fontSize: 11, color: "#c8102e", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>Match Period</span>
                      <span style={{ fontSize: 18, fontWeight: 800, marginTop: 4, display: "block" }}>{city.match_period}</span>
                  </div>
              </div>
          </div>
      </section>

      {/* Advanced Filters Bar */}
      <section style={{ position: "sticky", top: 102, zIndex: 10, background: darkMode ? "rgba(13,13,13,0.9)" : "rgba(250,250,250,0.9)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${darkMode ? "#222" : "#eee"}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
              
              <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
                  {["all", "hotel", "apartment", "house"].map(type => (
                      <button key={type} onClick={() => setFilters({...filters, type})} style={{
                          padding: "8px 20px", borderRadius: 100, border: `1px solid ${filters.type === type ? "#c8102e" : (darkMode ? "#333" : "#ddd")}`,
                          background: filters.type === type ? "#c8102e" : "transparent",
                          color: filters.type === type ? "white" : "inherit",
                          fontWeight: 700, cursor: "pointer", fontSize: 14, whiteSpace: "nowrap", transition: "all 0.2s"
                      }}>
                          {t(`filters.${type}`)}
                      </button>
                  ))}
              </div>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>$</span>
                      <input type="number" name="min_price" placeholder="Min" value={filters.min_price} onChange={handleFilterChange} style={{ width: 80, padding: "8px 12px", borderRadius: 8, border: `1px solid ${darkMode?"#333":"#ddd"}`, background: darkMode?"#1a1a1a":"white", color: "inherit" }} />
                      <span>-</span>
                      <input type="number" name="max_price" placeholder="Max" value={filters.max_price} onChange={handleFilterChange} style={{ width: 80, padding: "8px 12px", borderRadius: 8, border: `1px solid ${darkMode?"#333":"#ddd"}`, background: darkMode?"#1a1a1a":"white", color: "inherit" }} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{t('capacity')}</span>
                      <select name="capacity" value={filters.capacity} onChange={handleFilterChange} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${darkMode?"#333":"#ddd"}`, background: darkMode?"#1a1a1a":"white", color: "inherit", fontWeight: 700 }}>
                          {[1,2,3,4,5,6,8,10].map(n => <option key={n} value={n}>{n}+</option>)}
                      </select>
                  </div>

                  <select name="sort" value={filters.sort} onChange={handleFilterChange} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${darkMode?"#333":"#ddd"}`, background: darkMode?"#1a1a1a":"white", color: "inherit", fontWeight: 700 }}>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="rating_desc">Top Rated</option>
                  </select>
              </div>

          </div>
      </section>

      {/* Accommodations Grid */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        
        {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 32 }}>
                {[...Array(6)].map((_,i) => <SkeletonCard key={i} />)}
            </div>
        ) : (
            <>
                {accommodations.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "100px 0", background: darkMode ? "#1a1a1a" : "#fff", borderRadius: 24, border: `1px dashed ${darkMode?"#333":"#ddd"}` }}>
                        <div style={{ color: darkMode ? "#444" : "#ccc", marginBottom: 24 }}>
                            <Home size={64} style={{ margin: "0 auto" }} />
                        </div>
                        <h3 style={{ fontSize: 24, fontWeight: 800 }}>{t('noResults')}</h3>
                        <p style={{ color: darkMode ? "#888" : "#666" }}>Try adjusting your filters to find more stays.</p>
                        <button onClick={() => setFilters({ type: "all", min_price: "", max_price: "", capacity: 1, sort: "price_asc" })} style={{ marginTop: 20, padding: "10px 24px", borderRadius: 100, border: "none", background: "#c8102e", color: "white", fontWeight: 700, cursor: "pointer" }}>Clear All Filters</button>
                    </div>
                ) : (
                    <>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 32, marginBottom: 60 }}>
                            {accommodations.map(acc => (
                                <AccommodationCard key={acc.id} acc={acc} citySlug={city.slug} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.last > 1 && (
                            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                                <button disabled={pagination.current === 1} onClick={() => fetchAccommodations(pagination.current - 1)} style={{ padding: "10px 20px", borderRadius: 100, border: "none", background: darkMode ? "#333" : "#eee", color: "inherit", cursor: "pointer", opacity: pagination.current === 1 ? 0.5 : 1 }}>Previous</button>
                                {[...Array(pagination.last)].map((_, i) => (
                                    <button key={i} onClick={() => fetchAccommodations(i + 1)} style={{ 
                                        width: 44, height: 44, borderRadius: "50%", border: "none", 
                                        background: pagination.current === i + 1 ? "#c8102e" : (darkMode ? "#333" : "#eee"), 
                                        color: pagination.current === i + 1 ? "white" : "inherit", 
                                        fontWeight: 800, cursor: "pointer"
                                    }}>{i + 1}</button>
                                ))}
                                <button disabled={pagination.current === pagination.last} onClick={() => fetchAccommodations(pagination.current + 1)} style={{ padding: "10px 20px", borderRadius: 100, border: "none", background: darkMode ? "#333" : "#eee", color: "inherit", cursor: "pointer", opacity: pagination.current === pagination.last ? 0.5 : 1 }}>Next</button>
                            </div>
                        )}
                    </>
                )}
            </>
        )}
      </section>

    </div>
  );
}

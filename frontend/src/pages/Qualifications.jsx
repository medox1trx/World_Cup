import { useState, useEffect } from "react";
import { TournamentSection } from "./Home/PromoSection";
import { useTheme } from "../context/ThemeContext";

export default function Qualifications() {
  const [mounted, setMounted] = useState(false);
  const { darkMode } = useTheme();
  
  useEffect(() => { 
    setMounted(true); 
  }, []);

  const bg = darkMode ? "#0d0d0d" : "#ffffff";

  return (
    <div style={{ 
      background: bg, 
      minHeight: "100vh", 
      opacity: mounted ? 1 : 0, 
      transition: "opacity 0.6s ease",
      paddingBottom: 100
    }}>
      <style>{`
        .hw { max-width: 1380px; margin: 0 auto; padding: 0 clamp(16px, 3vw, 48px); }
      `}</style>
      <div className="hw" style={{ paddingTop: 100 }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 60, color: darkMode ? "white" : "#0d0d0d" }}>
          Les Qualifications
        </h1>
      </div>
      <TournamentSection hideTitle={true} />
    </div>
  );
}
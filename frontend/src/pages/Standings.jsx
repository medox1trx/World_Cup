import { useState, useEffect } from "react";
import StandingsSection from "./Home/StandingsSection";
import { useTheme } from "../context/ThemeContext";

const D = "'Bebas Neue', sans-serif";
const B = "'DM Sans', sans-serif";

export default function Standings() {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const tBg = darkMode ? "#0d0d0d" : "#ffffff";
  const tText = darkMode ? "white" : "#0d0d0d";

  return (
    <div style={{
      fontFamily: B,
      background: tBg,
      color: tText,
      minHeight: "100vh",
      opacity: mounted ? 1 : 0,
      transition: "background 0.4s, color 0.4s, opacity 0.45s",
    }}>
      <style>{`
        .layout-container {
          max-width: 1380px;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 48px);
        }
      `}</style>

      <div style={{ paddingTop: 80 }}>
        <div className="layout-container" style={{ paddingTop: 40, paddingBottom: 20 }}>
          <h1 style={{
            fontFamily: D,
            fontSize: "clamp(48px, 6vw, 80px)",
            fontWeight: 900,
            textTransform: "uppercase",
            margin: 0,
          }}>
            Le Classement
          </h1>
        </div>

        <StandingsSection hideHeader hideDetails />
      </div>
    </div>
  );
}
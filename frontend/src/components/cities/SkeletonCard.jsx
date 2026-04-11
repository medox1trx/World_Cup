import { useTheme } from "../../context/ThemeContext";

export default function SkeletonCard({ type = "city" }) {
  const { darkMode } = useTheme();
  
  const bg = darkMode ? "#222" : "#f0f0f0";
  const wave = darkMode ? "linear-gradient(90deg, #222 25%, #333 50%, #222 75%)" : "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)";

  return (
    <div style={{ 
      borderRadius: 16, 
      overflow: "hidden", 
      background: darkMode ? "#1a1a1a" : "white",
      border: `1px solid ${darkMode ? "#333" : "#eee"}`
    }}>
      <div style={{ 
        height: type === "city" ? 240 : 200, 
        background: wave,
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite"
      }} />
      <div style={{ padding: 24 }}>
        <div style={{ 
          height: 28, 
          width: "70%", 
          background: wave,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
          marginBottom: 16,
          borderRadius: 4
        }} />
        <div style={{ 
          height: 16, 
          width: "40%", 
          background: wave,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
          marginBottom: 8,
          borderRadius: 4
        }} />
        <div style={{ 
          height: 16, 
          width: "90%", 
          background: wave,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
          marginBottom: 24,
          borderRadius: 4
        }} />
        <div style={{ 
          height: 48, 
          width: type === "city" ? "100px" : "100%", 
          background: wave,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
          borderRadius: 100
        }} />
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

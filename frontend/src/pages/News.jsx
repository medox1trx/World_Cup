import { FiRadio } from "react-icons/fi";

export default function News() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-center px-6">
      <FiRadio className="text-6xl" style={{ color: "#0d0d0d" }} />
      <h1 className="font-display text-5xl tracking-wide" style={{ color: "#0d0d0d", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, textTransform: "uppercase" }}>Actualités</h1>
      <p className="text-sm" style={{ color: "#8a8a8a" }}>Bientôt disponible — toutes les dernières nouvelles de la FIFA World Cup 2030.</p>
    </div>
  );
}
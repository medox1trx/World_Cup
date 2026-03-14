import { FiMapPin } from "react-icons/fi";

export default function Cities() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-center px-6">
      <FiMapPin className="text-6xl" style={{ color: "#0d0d0d" }} />
      <h1 className="font-display text-5xl tracking-wide" style={{ color: "#0d0d0d", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, textTransform: "uppercase" }}>Villes Hôtes</h1>
      <p className="text-sm" style={{ color: "#8a8a8a" }}>Bientôt disponible — explorez les 6 nations hôtes et leurs stades.</p>
    </div>
  );
}
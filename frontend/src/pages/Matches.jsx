<<<<<<< HEAD
import { useTranslation } from "react-i18next";
function Home(){
  const { t } = useTranslation();
  return(
     <h2>{t("homeWorldCup")}</h2>
  );
}

export default Home;
=======
import { MdOutlineEmojiEvents } from "react-icons/md";

export default function Matches() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-center px-6">
      <MdOutlineEmojiEvents className="text-6xl" style={{ color: "#0d0d0d" }} />
      <h1 className="font-display text-5xl tracking-wide" style={{ color: "#0d0d0d", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, textTransform: "uppercase" }}>Matchs</h1>
      <p className="text-sm" style={{ color: "#8a8a8a" }}>Bientôt disponible — calendrier complet avec scores en direct.</p>
    </div>
  );
}
>>>>>>> e7a2f46026e732ac53b4f487cda974313c195070

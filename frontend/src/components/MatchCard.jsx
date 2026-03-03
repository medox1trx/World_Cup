import React from "react";
import { countryCodes } from "../api/countryCodes";
import DateSection from "./DateSection";

// Fonction pour obtenir l'URL de l'image du drapeau
function getFlagUrl(countryName) {
  if (!countryName || countryName === "TBD") return null;
  
  const code = countryCodes[countryName];
  if (!code) return null;

  // Utilisation de flagcdn.com (format w40 = 40px de large)
  return `https://flagcdn.com/w40/${code}.png`;
}

const MatchCard = ({ match }) => {
  const date = new Date(match.match_datetime);
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const homeUrl = getFlagUrl(match.home_team);
  const awayUrl = getFlagUrl(match.away_team);
  
  return (
    <div className="match-card">
      <div className="match-inner">
        <div className="team home">
          {homeUrl ? (
            <img src={homeUrl} alt={match.home_team} className="team-flag-img" />
          ) : (
            <span className="team-flag">🏳️</span>
          )}
          <span className="team-name">{match.home_team}</span>
        </div>

        <div className="match-center">
          <div className="match-time">{timeStr}</div>
        </div>

        <div className="team away">
          {awayUrl ? (
            <img src={awayUrl} alt={match.away_team} className="team-flag-img" />
          ) : (
            <span className="team-flag">🏳️</span>
          )}
          <span className="team-name">{match.away_team}</span>
        </div>
      </div>

      <div className="match-meta">
        <span className="meta-tag">{match.phase.name}</span>
        <div className="meta-separator"></div>
        <span className="meta-tag">{match.group.name}</span>
        <div className="meta-separator"></div>
        <span className="meta-tag">{match.stadium.name} ({match.stadium.city})</span>
      </div>

      {match.away_team.includes("TBD") && (
        <div className="tbd-note">Adversaire à déterminer</div>
      )}
    </div>
  );
};

export default MatchCard;

// pour faciliter les anciens imports qui récupéraient ces fonctions ici,
// on les renvoie depuis l'utilitaire dédié.
export { filterMatches, sortMatches } from "../utils/matchUtils";
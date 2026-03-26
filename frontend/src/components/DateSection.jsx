import React from "react";
import MatchCard from "./MatchCard";

const DateSection = ({ date, matches, onOpenGroup, onOpenAllGroups }) => {
  const dateStr = new Date(date).toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="date-section">
      <div className="date-header">
        <div className="date-label">{dateStr}</div>
        <button className="date-toggle" onClick={onOpenAllGroups}>
          Afficher groupes →
        </button>
      </div>
      <div className="matches-list">
        {matches.map(match => (
          <MatchCard 
            key={match.id} 
            match={match} 
            onOpenGroup={onOpenGroup} 
          />
        ))}
      </div>
    </div>
  );
};


export default DateSection;
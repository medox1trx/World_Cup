import React, { useState } from "react";

const FilterSidebar = ({ phases, teams, onApply, onClear, isOpen, onClose }) => {
  const [selectedPhase, setSelectedPhase] = useState("Tout");
  const [selectedTeam, setSelectedTeam] = useState("Tout");

  const handleApply = () => {
    onApply({ phase: selectedPhase, team: selectedTeam });
    onClose();
  };

  const handleClear = () => {
    setSelectedPhase("Tout");
    setSelectedTeam("Tout");
    onClear();
  };

  return (
    <div className={`filter-sidebar ${isOpen ? "open" : ""}`}>
      <div className="filter-header">
        <h3>Filtres</h3>
        <button onClick={onClose}>×</button>
      </div>

      <div className="filter-section">
        <h4>Étape</h4>
        <select value={selectedPhase} onChange={e => setSelectedPhase(e.target.value)}>
          <option>Tout</option>
          {phases.map(p => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h4>Équipe</h4>
        <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
          <option>Tout</option>
          {teams.map(t => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="filter-buttons">
        <button onClick={handleClear}>EFFACER</button>
        <button onClick={handleApply}>APPLIQUER</button>
      </div>
    </div>
  );
};

export default FilterSidebar;
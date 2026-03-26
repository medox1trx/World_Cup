import React, { useState, useEffect } from "react";
import axios from "axios";
import DateSection from "../../components/DateSection";
import FilterSidebar from "../../components/FilterSidebar";
import GroupModal from "../../components/GroupModal";

const MatchesPage = () => {
  const [matches, setMatches] = useState([]); // pour stocker les données
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("date");
  const [filters, setFilters] = useState({ phase: "Tout", team: "Tout" });
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [modalGroupId, setModalGroupId] = useState(null);
  const [showAllGroups, setShowAllGroups] = useState(false);

  // ⚡ Récupération depuis l'API Laravel
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/matches") // URL de ton API Laravel
      .then(res => {
        setMatches(res.data); // on met les données dans matches
      })
      .catch(err => {
        console.error("Erreur API:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '1.2rem' }}>Chargement des matchs...</div>;

  // Récupérer toutes les phases et équipes disponibles
  const phases = [...new Set(matches.map(m => m.phase?.name))];
  const teams = [...new Set(matches.flatMap(m => [m.home_team, m.away_team]))];

  // Appliquer filtres
  let filteredMatches = matches.filter(m => {
    const phaseOk = filters.phase === "Tout" || m.phase.name === filters.phase;
    const teamOk =
      filters.team === "Tout" || m.home_team === filters.team || m.away_team === filters.team;
    return phaseOk && teamOk;
  });

  // Appliquer tri
  if (sortBy === "date") {
    filteredMatches.sort((a, b) => new Date(a.match_datetime) - new Date(b.match_datetime));
  } else if (sortBy === "phase") {
    filteredMatches.sort((a, b) => a.phase.name.localeCompare(b.phase.name));
  }

  const openGroupModal = (id) => {
    setModalGroupId(id);
    setShowAllGroups(false);
  };

  const openAllGroupsModal = () => {
    setModalGroupId(null);
    setShowAllGroups(true);
  };

  // Grouper par date pour DateSection
  const matchesByDate = {};
  filteredMatches.forEach(m => {
    const dateKey = new Date(m.match_datetime).toDateString();
    if (!matchesByDate[dateKey]) matchesByDate[dateKey] = [];
    matchesByDate[dateKey].push(m);
  });

  return (
    <div className="app-container">
      <div className="controls">
        <label>
          Sort by:{" "}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="phase">Étape</option>
          </select>
        </label>

        <button onClick={() => setSidebarOpen(true)}>Filter</button>
      </div>

      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        phases={phases}
        teams={teams}
        onApply={setFilters}
        onClear={() => setFilters({ phase: "Tout", team: "Tout" })}
      />

      <div className="dates-list">
        {Object.keys(matchesByDate).map(date => (
          <DateSection 
            key={date} 
            date={date} 
            matches={matchesByDate[date]} 
            onOpenGroup={openGroupModal}
            onOpenAllGroups={openAllGroupsModal}
          />
        ))}
      </div>

      {(modalGroupId || showAllGroups) && (
        <GroupModal 
          groupId={modalGroupId} 
          showAll={showAllGroups}
          onClose={() => {
            setModalGroupId(null);
            setShowAllGroups(false);
          }} 
        />
      )}
    </div>
  );
};

export default MatchesPage;

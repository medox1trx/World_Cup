import React, { useEffect, useState } from "react";
import { getMatches } from "../api/api";
import DateSection from "../components/DateSection";
import GroupModal from "../components/GroupModal";

const ScoresAndMatches = () => {
  const [matchesByDate, setMatchesByDate] = useState({});
  const [modalGroupId, setModalGroupId] = useState(null);
  const [showAllGroups, setShowAllGroups] = useState(false);

  useEffect(() => {
    getMatches().then(res => {
      const grouped = {};
      res.data.forEach(match => {
        const dateKey = match.match_datetime.split("T")[0];
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(match);
      });
      setMatchesByDate(grouped);
    });
  }, []);

  const openGroupModal = (id) => {
    setModalGroupId(id);
    setShowAllGroups(false);
  };

  const openAllGroupsModal = () => {
    setModalGroupId(null);
    setShowAllGroups(true);
  };

  return (
    <>
      <main className="main">
        {Object.keys(matchesByDate).sort().map(date => (
          <DateSection 
            key={date} 
            date={date} 
            matches={matchesByDate[date]} 
            onOpenGroup={openGroupModal}
            onOpenAllGroups={openAllGroupsModal}
          />
        ))}
      </main>

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
    </>
  );
};


export default ScoresAndMatches;
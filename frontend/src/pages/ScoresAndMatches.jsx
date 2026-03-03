import React, { useEffect, useState } from "react";
import { getMatches } from "../api/api";
import DateSection from "../components/DateSection";

const ScoresAndMatches = () => {
  const [matchesByDate, setMatchesByDate] = useState({});

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

  return (
    <main className="main">
      {Object.keys(matchesByDate).sort().map(date => (
        <DateSection key={date} date={date} matches={matchesByDate[date]} />
      ))}
    </main>
  );
};

export default ScoresAndMatches;
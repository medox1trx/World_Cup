import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MatchesPage from "./pages/Matches/MatchesPage";
import HostCitiesPage from "./pages/HostCities/HostCitiesPage";
import CityDetailPage from "./pages/CityDetail/CityDetailPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MatchesPage />} />
        <Route path="/host-cities" element={<HostCitiesPage />} />
        <Route path="/host-cities/:id" element={<CityDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
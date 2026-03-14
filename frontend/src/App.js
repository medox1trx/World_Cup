import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import CountdownBanner from "./components/CountdownBanner/CountdownBanner";

import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Standings from "./pages/Standings";
import Teams from "./pages/Teams";
import Qualifications from "./pages/Qualifications";
import Cities from "./pages/Cities";
import Tickets from "./pages/Tickets";
import Hospitality from "./pages/Hospitality";
import Fans from "./pages/Fans";
import Tournaments from "./pages/Tournaments";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      {/* Fixed countdown bar — always on top */}
      <CountdownBanner />

      {/* Header sits below the countdown bar (pt-14 = 56px = banner height) */}
      <div className="pt-14">
        <Header />

        <Routes>
          <Route path="/"              element={<Home />}          />
          <Route path="/matches"       element={<Matches />}       />
          <Route path="/standings"     element={<Standings />}     />
          <Route path="/teams"         element={<Teams />}         />
          <Route path="/qualifications"element={<Qualifications />}/>
          <Route path="/cities"        element={<Cities />}        />
          <Route path="/tickets"       element={<Tickets />}       />
          <Route path="/hospitality"   element={<Hospitality />}   />
          <Route path="/fans"          element={<Fans />}          />
          <Route path="/tournaments"   element={<Tournaments />}   />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
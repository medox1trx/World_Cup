import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountdownBanner from "./components/CountdownBanner/CountdownBanner"; // 40px
import Header          from "./components/Header/Header";                   // 62px

import Home           from "./pages/Home/Home";
import Matches        from "./pages/Matches";
import Standings      from "./pages/Standings";
import Teams          from "./pages/Teams";
import Qualifications from "./pages/Qualifications";
import Cities         from "./pages/Cities";
import Tickets        from "./pages/Tickets";
import Hospitality    from "./pages/Hospitality";
import Fans           from "./pages/Fans";
import Tournaments    from "./pages/Tournaments";

/*
  HEIGHT BUDGET (sticky bars above page content):
  ┌──────────────────────────────┐
  │  CountdownBanner  →  40px   │
  │  Header           →  62px   │
  ├──────────────────────────────┤
  │  Sticky total     → 102px   │
  └──────────────────────────────┘

  Inside <Home> the NewsTicker adds 44px more before the hero.
  So HeroSection uses: calc(100svh - 146px)  (102 + 44)
*/

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      {/* ── STICKY: CountdownBanner + Header (102px total) ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
        <CountdownBanner />  {/* 40px */}
        <Header />           {/* 62px */}
      </div>

      {/* ── PAGE CONTENT ── */}
      <main>
        <Routes>
          <Route path="/"               element={<Home />}           />
          <Route path="/matches"        element={<Matches />}        />
          <Route path="/standings"      element={<Standings />}      />
          <Route path="/teams"          element={<Teams />}          />
          <Route path="/qualifications" element={<Qualifications />} />
          <Route path="/cities"         element={<Cities />}         />
          <Route path="/tickets"        element={<Tickets />}        />
          <Route path="/hospitality"    element={<Hospitality />}    />
          <Route path="/fans"           element={<Fans />}           />
          <Route path="/tournaments"    element={<Tournaments />}    />
        </Routes>
      </main>

    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Standings from "./pages/Standings";
import Teams from "./pages/Teams";
=======
import CountdownBanner from "./components/CountdownBanner/CountdownBanner"; // 40px
import Header          from "./components/Header/Header";                   // 62px
import Footer          from "./components/Footer/Footer";

import Home           from "./pages/Home/Home";
import Matches        from "./pages/Matches";
import Standings      from "./pages/Standings";
import Teams          from "./pages/Teams";
import Highlights     from "./pages/Highlights";
import News           from "./pages/News";
>>>>>>> e7a2f46026e732ac53b4f487cda974313c195070
import Qualifications from "./pages/Qualifications";
import Cities         from "./pages/Cities";
import Tickets        from "./pages/Tickets";
import Hospitality    from "./pages/Hospitality";
import Fans           from "./pages/Fans";
import Tournaments    from "./pages/Tournaments";
import Login          from "./pages/Login";

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

// i18next setup
import "./i18n/i18n";

function App() {
  return (
<<<<<<< HEAD
    <Router>
      {/* Header ثابت فـ جميع الصفحات */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/qualifications" element={<Qualifications />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/hospitality" element={<Hospitality />} />
        <Route path="/fans" element={<Fans />} />
        <Route path="/tournaments" element={<Tournaments />} />
      </Routes>
=======
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      {/* ── STICKY: CountdownBanner + Header (102px total) ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
        <CountdownBanner />
        <Header />
      </div>

      {/* ── PAGE CONTENT ── */}
      <main style={{ minHeight: "calc(100vh - 102px)" }}>
        <Routes>
          <Route path="/"               element={<Home />}           />
          <Route path="/matches"        element={<Matches />}        />
          <Route path="/standings"      element={<Standings />}      />
          <Route path="/teams"          element={<Teams />}          />
          <Route path="/highlights"     element={<Highlights />}     />
          <Route path="/news"           element={<News />}           />
          <Route path="/qualifications" element={<Qualifications />} />
          <Route path="/cities"         element={<Cities />}         />
          <Route path="/tickets"        element={<Tickets />}        />
          <Route path="/hospitality"    element={<Hospitality />}    />
          <Route path="/fans"           element={<Fans />}           />
          <Route path="/tournaments"    element={<Tournaments />}    />
          <Route path="/login"          element={<Login />}          />
        </Routes>
      </main>

      {/* ── FOOTER ── */}
      <Footer />
>>>>>>> e7a2f46026e732ac53b4f487cda974313c195070

      {/* Footer ثابت فـ جميع الصفحات */}
      <Footer />
    </Router>
  );
}

export default App;
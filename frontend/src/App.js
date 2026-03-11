import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
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

// i18next setup
import "./i18n/i18n";

function App() {
  return (
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

      {/* Footer ثابت فـ جميع الصفحات */}
      <Footer />
    </Router>
  );
}

export default App;
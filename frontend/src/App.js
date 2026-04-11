import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountdownBanner from "./components/CountdownBanner/CountdownBanner";
import Header          from "./components/Header/Header";
import Footer          from "./components/Footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider }  from "./context/AuthContext";
import { SeasonProvider } from "./context/SeasonContext";
import { AdminRoute, ProtectedRoute } from "./components/AdminRoute";
import AdminSidebar from "./components/AdminSidebar";
import { useState } from "react";

import Home           from "./pages/Home/Home";
import Matches        from "./pages/Matches";
import Standings      from "./pages/Standings";
import Teams          from "./pages/Teams";
import Highlights     from "./pages/Highlights";
import News           from "./pages/News";
import Qualifications from "./pages/Qualifications";
import Cities         from "./pages/Cities";
import Tickets        from "./pages/Tickets";
import Hospitality    from "./pages/Hospitality";
import Fans           from "./pages/Fans";
import Tournaments    from "./pages/Tournaments";
import Login          from "./pages/Login";
import Register       from "./pages/Register";
import Profile        from "./pages/Profile";
import AdminHighlights  from "./pages/admin/AdminHighlights";
import AdminTeams     from "./pages/admin/AdminTeams";
import AdminTickets   from "./pages/admin/AdminTickets";
import AdminMatches   from "./pages/admin/AdminMatches";

/*
  HEIGHT BUDGET (sticky bars above page content):
  ┌──────────────────────────────┐
  │  CountdownBanner  →  40px   │
  │  Header           →  62px   │
  ├──────────────────────────────┤
  │  Sticky total     → 102px   │
  └──────────────────────────────┘
*/

function App() {
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);

  return (

    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <SeasonProvider>
          <AuthProvider>
            {/* ── FIXED: CountdownBanner + Header (102px total) ── */}
            <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2000 }}>
              <CountdownBanner />
              <Header onOpenAdminSidebar={() => setAdminSidebarOpen(true)} />
            </header>

            <AdminSidebar isOpen={adminSidebarOpen} onClose={() => setAdminSidebarOpen(false)} />


            {/* ── PAGE CONTENT ── */}
            <main style={{ minHeight: "calc(100vh - 102px)", paddingTop: 102 }}>
              <Routes>
                {/* Public routes */}
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

                {/* Auth routes */}
                <Route path="/login"    element={<Login />}    />
                <Route path="/register" element={<Register />} />
                <Route path="/profile"  element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                {/* Admin routes (protected) */}
                <Route path="/admin/highlights" element={<AdminRoute><AdminHighlights /></AdminRoute>} />
                <Route path="/admin/teams" element={<AdminRoute><AdminTeams /></AdminRoute>} />
                <Route path="/admin/tickets" element={<AdminRoute><AdminTickets /></AdminRoute>} />
                <Route path="/admin/matches" element={<AdminRoute><AdminMatches /></AdminRoute>} />
              </Routes>
            </main>

            {/* ── FOOTER ── */}
            <Footer />
          </AuthProvider>
        </SeasonProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

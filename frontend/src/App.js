import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import CountdownBanner from "./components/CountdownBanner/CountdownBanner";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { SeasonProvider } from "./context/SeasonContext";
import { AdminRoute, ProtectedRoute } from "./components/AdminRoute";
import AdminSidebar from "./components/AdminSidebar";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home/Home";
import Matches from "./pages/Matches";
import Standings from "./pages/Standings";
import Teams from "./pages/Teams";
import Highlights from "./pages/Highlights";
import News from "./pages/News";
import Qualifications from "./pages/Qualifications";
<<<<<<< Updated upstream
import Cities from "./pages/Cities";
import CityDetail from "./pages/CityDetail";
import BookingPage from "./pages/BookingPage";
import Tickets from "./pages/Tickets";
import Hospitality from "./pages/Hospitality";
import Fans from "./pages/Fans";
import Tournaments from "./pages/Tournaments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminHighlights from "./pages/admin/AdminHighlights";
import AdminTeams from "./pages/admin/AdminTeams";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminMatches from "./pages/admin/AdminMatches";
import AdminReferees from "./pages/admin/AdminReferees";
import AdminNews from "./pages/admin/AdminNews";
=======
import Cities         from "./pages/Cities";
import CityDetail     from "./pages/CityDetail";
import BookingPage    from "./pages/BookingPage";
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
import AdminFanZones  from "./pages/admin/AdminFanZones";
>>>>>>> Stashed changes

/*
  HEIGHT BUDGET (sticky bars above page content):
  ┌──────────────────────────────┐
  │  CountdownBanner  →  40px   │
  │  Header           →  62px   │
  ├──────────────────────────────┤
  │  Sticky total     → 102px   │
  └──────────────────────────────┘
*/

/* Wrapper that scales down non-home pages slightly */
function ScaledContent({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div style={isHome ? undefined : { zoom: 0.9 }}>
      {children}
    </div>
  );
}

function App() {
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);

  return (

    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <SeasonProvider>
          <AuthProvider>
            <Toaster position="top-right" reverseOrder={false} />
            {/* ── FIXED: CountdownBanner + Header (102px total) ── */}
            <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2000 }}>
              <CountdownBanner />
              <Header onOpenAdminSidebar={() => setAdminSidebarOpen(true)} />
            </header>

            <AdminSidebar isOpen={adminSidebarOpen} onClose={() => setAdminSidebarOpen(false)} />


            {/* ── PAGE CONTENT ── */}
            <main style={{ minHeight: "calc(100vh - 102px)", paddingTop: 102 }}>
              <ScaledContent>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/matches" element={<Matches />} />
                  <Route path="/standings" element={<Standings />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/highlights" element={<Highlights />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/qualifications" element={<Qualifications />} />
                  <Route path="/cities" element={<Cities />} />
                  <Route path="/cities/:slug" element={<CityDetail />} />
                  <Route path="/cities/:slug/book/:id" element={<BookingPage />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/hospitality" element={<Hospitality />} />
                  <Route path="/fans" element={<Fans />} />
                  <Route path="/tournaments" element={<Tournaments />} />

                  {/* Auth routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

<<<<<<< Updated upstream
                  {/* Admin routes (protected) */}
                  <Route path="/admin/highlights" element={<AdminRoute><AdminHighlights /></AdminRoute>} />
                  <Route path="/admin/teams" element={<AdminRoute><AdminTeams /></AdminRoute>} />
                  <Route path="/admin/news" element={<AdminRoute><AdminNews /></AdminRoute>} />
                  <Route path="/admin/tickets" element={<AdminRoute><AdminTickets /></AdminRoute>} />
                  <Route path="/admin/matches" element={<AdminRoute><AdminMatches /></AdminRoute>} />
                  <Route path="/admin/referees" element={<AdminRoute><AdminReferees /></AdminRoute>} />
                </Routes>
              </ScaledContent>
=======
                {/* Admin routes (protected) */}
                <Route path="/admin/highlights" element={<AdminRoute><AdminHighlights /></AdminRoute>} />
                <Route path="/admin/teams" element={<AdminRoute><AdminTeams /></AdminRoute>} />
                <Route path="/admin/tickets" element={<AdminRoute><AdminTickets /></AdminRoute>} />
                <Route path="/admin/matches" element={<AdminRoute><AdminMatches /></AdminRoute>} />
                <Route path="/admin/fanzones" element={<AdminRoute><AdminFanZones /></AdminRoute>} />
              </Routes>
>>>>>>> Stashed changes
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

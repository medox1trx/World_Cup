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
import TeamDetail from "./pages/TeamDetail";
import Highlights from "./pages/Highlights";
import News from "./pages/News";
import Qualifications from "./pages/Qualifications";
import Cities from "./pages/Cities";
import CityDetail from "./pages/CityDetail";
import BookingPage from "./pages/BookingPage";
import Tickets from "./pages/Tickets";
import Hospitality from "./pages/Hospitality";
import Fans from "./pages/Fans";
import Joueurs from "./pages/Joueurs";
import Selectionneurs from "./pages/Selectionneurs";
import Referees from "./pages/Referees";
import Tournaments from "./pages/Tournaments";
import Stadiums from "./pages/Stadiums";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminHighlights from "./pages/admin/AdminHighlights";
import AdminTeams from "./pages/admin/AdminTeams";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminMatches from "./pages/admin/AdminMatches";
import AdminReferees from "./pages/admin/AdminReferees";
import AdminNews from "./pages/admin/AdminNews";
import AdminFanZones from "./pages/admin/AdminFanZones";
import AdminTicker from "./pages/admin/AdminTicker";
import AdminHospitality from "./pages/admin/AdminHospitality";
import AdminJoueurs from "./pages/admin/AdminJoueurs";
import AdminSelectionneurs from "./pages/admin/AdminSelectionneurs";
import AdminPays from "./pages/admin/AdminPays";
import AdminVilles from "./pages/admin/AdminVilles";
import AdminStadiums from "./pages/admin/AdminStadiums";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminTournament from "./pages/admin/AdminTournament";

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
            <Toaster position="top-right" reverseOrder={false} />
            
            {/* Header stays full width but content inside can be centered */}
            <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2000 }}>
              <CountdownBanner />
              <Header onOpenAdminSidebar={() => setAdminSidebarOpen(true)} />
            </header>
 
            <AdminSidebar isOpen={adminSidebarOpen} onClose={() => setAdminSidebarOpen(false)} />

            {/* Main content: full bleed backgrounds, centered inner content */}
            <main style={{ minHeight: "calc(100vh - 102px)", paddingTop: 102 }}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/matches" element={<Matches />} />
                  <Route path="/standings" element={<Standings />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/teams/:id" element={<TeamDetail />} />
                  <Route path="/highlights" element={<Highlights />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/qualifications" element={<Qualifications />} />
                  <Route path="/cities" element={<Cities />} />
                  <Route path="/cities/:slug" element={<CityDetail />} />
                  <Route path="/cities/:slug/book/:id" element={<BookingPage />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/hospitality" element={<Hospitality />} />
                  <Route path="/fans" element={<Fans />} />
                  <Route path="/joueurs" element={<Joueurs />} />
                  <Route path="/selectionneurs" element={<Selectionneurs />} />
                  <Route path="/referees" element={<Referees />} />
                  <Route path="/tournaments" element={<Tournaments />} />
                  <Route path="/stadiums" element={<Stadiums />} />

                  {/* Auth routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                  {/* Admin routes (protected) */}
                  <Route path="/admin/highlights" element={<AdminRoute><AdminHighlights /></AdminRoute>} />
                  <Route path="/admin/teams" element={<AdminRoute><AdminTeams /></AdminRoute>} />
                  <Route path="/admin/news" element={<AdminRoute><AdminNews /></AdminRoute>} />
                  <Route path="/admin/tickets" element={<AdminRoute><AdminTickets /></AdminRoute>} />
                  <Route path="/admin/matches" element={<AdminRoute><AdminMatches /></AdminRoute>} />
                  <Route path="/admin/referees" element={<AdminRoute><AdminReferees /></AdminRoute>} />
                  <Route path="/admin/fanzones" element={<AdminRoute><AdminFanZones /></AdminRoute>} />
                  <Route path="/admin/ticker" element={<AdminRoute><AdminTicker /></AdminRoute>} />
                  <Route path="/admin/hospitality" element={<AdminRoute><AdminHospitality /></AdminRoute>} />
                  <Route path="/admin/joueurs" element={<AdminRoute><AdminJoueurs /></AdminRoute>} />
                  <Route path="/admin/selectionneurs" element={<AdminRoute><AdminSelectionneurs /></AdminRoute>} />
                  <Route path="/admin/pays" element={<AdminRoute><AdminPays /></AdminRoute>} />
                  <Route path="/admin/villes" element={<AdminRoute><AdminVilles /></AdminRoute>} />
                  <Route path="/admin/stadiums" element={<AdminRoute><AdminStadiums /></AdminRoute>} />
                  <Route path="/admin/reservations" element={<AdminRoute><AdminReservations /></AdminRoute>} />
                  <Route path="/admin/tournament" element={<AdminRoute><AdminTournament /></AdminRoute>} />
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

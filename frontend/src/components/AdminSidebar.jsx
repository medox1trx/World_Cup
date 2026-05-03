import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiX, FiVideo, FiCalendar, FiUsers, FiFileText, FiShield, FiMapPin, FiRadio, FiStar, FiGlobe, FiList } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const AdminSidebar = ({ isOpen, onClose }) => {
  const { darkMode } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        :root {
          --as-bg: ${darkMode ? '#0d0d0d' : '#ffffff'};
          --as-text: ${darkMode ? 'white' : '#0d0d0d'};
          --as-muted: ${darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
          --as-hover: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
          --as-border: ${darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
          --as-active-bg: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          --as-accent: ${darkMode ? '#ffffff' : '#0d0d0d'};
          --as-shadow: ${darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'};
        }

        .admin-sidebar-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(${isOpen ? '12px' : '0px'});
          z-index: 3000; opacity: ${isOpen ? 1 : 0};
          pointer-events: ${isOpen ? 'all' : 'none'}; transition: all 0.4s ease;
        }

        .admin-sidebar {
          position: fixed; top: 0; left: 0; width: 300px; height: 100%;
          background: var(--as-bg); z-index: 3001;
          transform: translateX(${isOpen ? '0' : '-100%'});
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border-right: 1px solid var(--as-border);
          display: flex; flex-direction: column;
          box-shadow: 20px 0 60px var(--as-shadow);
        }

        .sidebar-header {
          padding: 32px 24px; display: flex; align-items: center; justify-content: space-between;
        }

        .sidebar-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 32px; font-weight: 900;
          color: var(--as-text); letter-spacing: 0.05em; text-transform: uppercase;
        }

        .sidebar-close {
          background: var(--as-hover); border: none; color: var(--as-text); cursor: pointer;
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; transition: 0.3s;
        }
        .sidebar-close:hover { background: var(--as-accent); color: ${darkMode ? '#0d0d0d' : '#ffffff'}; }

        .sidebar-content { flex: 1; padding: 0 16px 32px; overflow-y: auto; }

        .sidebar-group-label {
          font-family: 'Bebas Neue', sans-serif; font-size: 11px; font-weight: 800;
          color: var(--as-muted); text-transform: uppercase; letter-spacing: 0.15em;
          margin: 24px 0 12px 12px;
        }

        .sidebar-link {
          display: flex; align-items: center; gap: 14px; padding: 14px 18px;
          color: var(--as-text) !important; text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
          border-radius: 12px; transition: all 0.2s; margin-bottom: 4px;
        }
        .sidebar-link:hover { background: var(--as-hover); }
        .sidebar-link.active { background: var(--as-active-bg); border: 1px solid var(--as-border); }
        .sidebar-link svg { font-size: 18px; opacity: 0.7; }
        .sidebar-link.active svg { opacity: 1; }
      `}</style>

      <div className="admin-sidebar-overlay" onClick={onClose} />
      
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Admin</h2>
          <button className="sidebar-close" onClick={onClose}><FiX size={20} /></button>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-group-label">Media</div>
          <Link to="/admin/news" className={`sidebar-link ${isActive('/admin/news') ? 'active' : ''}`} onClick={onClose}><FiFileText /> <span>Actualités</span></Link>
          <Link to="/admin/highlights" className={`sidebar-link ${isActive('/admin/highlights') ? 'active' : ''}`} onClick={onClose}><FiVideo /> <span>Vidéos</span></Link>
          <Link to="/admin/ticker" className={`sidebar-link ${isActive('/admin/ticker') ? 'active' : ''}`} onClick={onClose}><FiRadio /> <span>Ticker Live</span></Link>
          
          <div className="sidebar-group-label">Compétition</div>
          <Link to="/admin/matches" className={`sidebar-link ${isActive('/admin/matches') ? 'active' : ''}`} onClick={onClose}><FiCalendar /> <span>Calendrier Matchs</span></Link>
          <Link to="/admin/tournament" className={`sidebar-link ${isActive('/admin/tournament') ? 'active' : ''}`} onClick={onClose}><FiGlobe /> <span>Tableau Tournoi</span></Link>
          <Link to="/admin/teams" className={`sidebar-link ${isActive('/admin/teams') ? 'active' : ''}`} onClick={onClose}><FiUsers /> <span>Équipes</span></Link>
          <Link to="/admin/joueurs" className={`sidebar-link ${isActive('/admin/joueurs') ? 'active' : ''}`} onClick={onClose}><FiUsers /> <span>Joueurs</span></Link>
          <Link to="/admin/selectionneurs" className={`sidebar-link ${isActive('/admin/selectionneurs') ? 'active' : ''}`} onClick={onClose}><FiUsers /> <span>Sélectionneurs</span></Link>
          <Link to="/admin/referees" className={`sidebar-link ${isActive('/admin/referees') ? 'active' : ''}`} onClick={onClose}><FiShield /> <span>Arbitres</span></Link>
          
          <div className="sidebar-group-label">Réservations</div>
          <Link to="/admin/reservations" className={`sidebar-link ${isActive('/admin/reservations') ? 'active' : ''}`} onClick={onClose}><FiList /> <span>Réservations</span></Link>
          <Link to="/admin/tickets" className={`sidebar-link ${isActive('/admin/tickets') ? 'active' : ''}`} onClick={onClose}><FiFileText /> <span>Billetterie</span></Link>
          <Link to="/admin/hospitality" className={`sidebar-link ${isActive('/admin/hospitality') ? 'active' : ''}`} onClick={onClose}><FiStar /> <span>Hospitalité</span></Link>
          <Link to="/admin/fanzones" className={`sidebar-link ${isActive('/admin/fanzones') ? 'active' : ''}`} onClick={onClose}><FiMapPin /> <span>Fan Zones</span></Link>
          
          <div className="sidebar-group-label">Infrastructure</div>
          <Link to="/admin/stadiums" className={`sidebar-link ${isActive('/admin/stadiums') ? 'active' : ''}`} onClick={onClose}><FiMapPin /> <span>Stades</span></Link>
          <Link to="/admin/villes" className={`sidebar-link ${isActive('/admin/villes') ? 'active' : ''}`} onClick={onClose}><FiMapPin /> <span>Villes</span></Link>
          <Link to="/admin/pays" className={`sidebar-link ${isActive('/admin/pays') ? 'active' : ''}`} onClick={onClose}><FiGlobe /> <span>Pays</span></Link>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

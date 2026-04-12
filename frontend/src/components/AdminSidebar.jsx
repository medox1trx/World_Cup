import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiX, FiVideo, FiCalendar, FiUsers, FiFileText, FiPieChart, FiShield, FiMapPin, FiRadio, FiStar } from 'react-icons/fi';
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
          --as-active-bg: ${darkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)'};
          --as-accent: #ef4444;
          --as-shadow: ${darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'};
        }

        .admin-sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${darkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)'};
          backdrop-filter: blur(${isOpen ? '8px' : '0px'});
          z-index: 3000;
          opacity: ${isOpen ? 1 : 0};
          pointer-events: ${isOpen ? 'all' : 'none'};
          transition: all 0.4s ease;
        }

        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100%;
          background: var(--as-bg);
          z-index: 3001;
          transform: translateX(${isOpen ? '0' : '-100%'});
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border-right: 1px solid var(--as-border);
          display: flex;
          flex-direction: column;
          box-shadow: 20px 0 60px var(--as-shadow);
        }

        .sidebar-header {
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: ${darkMode ? 'transparent' : 'linear-gradient(to bottom, #fcfcfc, #ffffff)'};
        }

        .sidebar-title-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sidebar-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 26px;
          font-weight: 900;
          color: var(--as-text);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1;
        }

        .sidebar-subtitle {
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: var(--as-accent);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          opacity: 0.8;
        }

        .sidebar-close {
          background: var(--as-hover);
          border: none;
          color: var(--as-text);
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          opacity: 0.6;
        }

        .sidebar-close:hover {
          opacity: 1;
          background: var(--as-accent);
          color: white;
          transform: rotate(90deg);
        }

        .sidebar-content {
          flex: 1;
          padding: 10px 16px;
          overflow-y: auto;
        }

        .sidebar-group-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: var(--as-muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 24px 0 12px 12px;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          color: var(--as-text);
          text-decoration: none;
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 6px;
          opacity: 0.7;
          position: relative;
          overflow: hidden;
        }

        .sidebar-link:hover {
          opacity: 1;
          background: var(--as-hover);
          padding-left: 22px;
          color: var(--as-accent);
        }

        .sidebar-link.active {
          opacity: 1;
          background: var(--as-active-bg);
          color: var(--as-accent);
        }

        .sidebar-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 20px;
          background: var(--as-accent);
          border-radius: 0 4px 4px 0;
        }

        .sidebar-link svg {
          font-size: 20px;
          flex-shrink: 0;
        }

        .sidebar-link span {
          letter-spacing: 0.01em;
        }

        .sidebar-footer {
          padding: 24px;
          border-top: 1px solid var(--as-border);
          background: ${darkMode ? 'transparent' : '#f9f9f9'};
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 8px;
          border-radius: 12px;
        }

        .sidebar-user-avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ef4444, #991b1b);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
          font-size: 16px;
        }

        .sidebar-user-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .sidebar-user-name {
          font-size: 15px;
          font-weight: 800;
          color: var(--as-text);
          font-family: 'Barlow Condensed', sans-serif;
          text-transform: uppercase;
        }

        .sidebar-user-role {
          font-size: 10px;
          color: var(--as-accent);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
        }

        /* Subtitle style */
        .sidebar-group-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

      `}</style>

      <div className="admin-sidebar-overlay" onClick={onClose} />
      
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title-wrap">
            <span className="sidebar-subtitle">Control Panel</span>
            <span className="sidebar-title">Admin Space</span>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-group-label">Gestion de Contenu</div>
          
          <Link to="/admin/highlights" className={`sidebar-link ${isActive('/admin/highlights') ? 'active' : ''}`} onClick={onClose}>
            <FiVideo />
            <span>Vidéos / Temps Forts</span>
          </Link>

          <Link to="/admin/news" className={`sidebar-link ${isActive('/admin/news') ? 'active' : ''}`} onClick={onClose}>
            <FiFileText />
            <span>Actualités</span>
          </Link>

          <Link to="/admin/ticker" className={`sidebar-link ${isActive('/admin/ticker') ? 'active' : ''}`} onClick={onClose}>
            <FiRadio />
            <span>Bandeau Ticker</span>
          </Link>
          
          <Link to="/admin/matches" className={`sidebar-link ${isActive('/admin/matches') ? 'active' : ''}`} onClick={onClose}>
            <FiCalendar />
            <span>Matchs & Calendrier</span>
          </Link>
          
          <Link to="/admin/teams" className={`sidebar-link ${isActive('/admin/teams') ? 'active' : ''}`} onClick={onClose}>
            <FiUsers />
            <span>Équipes & Joueurs</span>
          </Link>
          
          <Link to="/admin/tickets" className={`sidebar-link ${isActive('/admin/tickets') ? 'active' : ''}`} onClick={onClose}>
            <FiFileText />
            <span>Billetterie & Ventes</span>
          </Link>

          <Link to="/admin/hospitality" className={`sidebar-link ${isActive('/admin/hospitality') ? 'active' : ''}`} onClick={onClose}>
            <FiStar />
            <span>Hospitalité</span>
          </Link>
          
          <Link to="/admin/fanzones" className={`sidebar-link ${isActive('/admin/fanzones') ? 'active' : ''}`} onClick={onClose}>
            <FiMapPin />
            <span>Fan Zones</span>
          </Link>

          <Link to="/admin/referees" className={`sidebar-link ${isActive('/admin/referees') ? 'active' : ''}`} onClick={onClose}>
            <FiShield />
            <span>Arbitres</span>
          </Link>

          <div className="sidebar-group-label">Analytique</div>
          
          <div className="sidebar-link" style={{ cursor: 'default' }}>
            <FiPieChart />
            <span>Tableau de Bord</span>
            <span style={{ marginLeft: 'auto', fontSize: '9px', background: 'var(--as-accent)', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>SOON</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">AD</div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">Administrateur</span>
              <span className="sidebar-user-role">Accès Total</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

import { useTheme } from "../../context/ThemeContext";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

export default function AdminNews() {
  const { darkMode } = useTheme();

  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card         = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary  = darkMode ? "#ffffff"                  : "#0d0d0d";
  const textSecondary= darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const surface      = darkMode ? "#171717"                  : "#f5f5f5";
  const accent       = darkMode ? "#ffffff"                  : "#0d0d0d";
  const accentContrast= darkMode ? "#0d0d0d"                 : "#ffffff";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        .admin-page {
          background: ${bg}; min-height: calc(100vh - 102px);
          padding: clamp(24px,5vw,48px);
          transition: background 0.3s;
        }
        .admin-inner { max-width: 1100px; margin: 0 auto; }
        .admin-header { margin-bottom: 28px; }
        .admin-title {
          font-family: ${FD}; font-size: clamp(24px,4vw,36px); font-weight: 900;
          letter-spacing: 0.04em; text-transform: uppercase; color: ${textPrimary};
          margin: 0 0 6px; transition: color 0.3s;
        }
        .admin-sub {
          font-family: ${FB}; font-size: 13px; color: ${textSecondary};
          margin: 0; transition: color 0.3s;
        }
        .admin-table {
          width: 100%; border-collapse: collapse;
          background: ${card}; border-radius: 8px; overflow: hidden;
          border: 1px solid ${border}; transition: background 0.3s, border-color 0.3s;
        }
        .admin-table th {
          font-family: ${FB}; font-size: 9px; font-weight: 900;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: ${textSecondary}; background: ${surface};
          padding: 12px 16px; text-align: left;
          border-bottom: 1px solid ${border};
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }
        .admin-table td {
          font-family: ${FB}; font-size: 13px; color: ${textPrimary};
          padding: 14px 16px; border-bottom: 1px solid ${border};
          transition: color 0.3s, border-color 0.3s;
        }
        .admin-table tr:last-child td { border-bottom: none; }
        .admin-table tr:hover td { background: ${darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"}; }
        .admin-badge {
          display: inline-block; padding: 3px 10px; border-radius: 100px;
          font-family: ${FB}; font-size: 10px; font-weight: 700;
          letter-spacing: 0.06em;
        }
        .admin-badge.published { background: rgba(34,197,94,0.15); color: #16a34a; }
        .admin-badge.draft { background: rgba(234,179,8,0.15); color: #ca8a04; }
        .admin-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px; border-radius: 100px; border: none; cursor: pointer;
          font-family: ${FD}; font-size: 11px; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          background: ${accent}; color: ${accentContrast};
          transition: opacity 0.3s, background 0.3s, color 0.3s;
        }
        .admin-btn:hover { opacity: 0.9; }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <h1 className="admin-title">Gestion des Actualités</h1>
            <p className="admin-sub">Créer, modifier et publier des articles</p>
          </div>

          <button className="admin-btn" style={{ marginBottom: 20 }}>+ Nouvel article</button>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Bienvenue pour le Tirage au Sort de la Coupe du Monde 2030</td>
                <td><span className="admin-badge published">Publié</span></td>
                <td>14 Mar 2026</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Le Stade Hassan II homologué par la FIFA</td>
                <td><span className="admin-badge published">Publié</span></td>
                <td>13 Mar 2026</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Billets Phase 2 — 8 millions de demandes</td>
                <td><span className="admin-badge draft">Brouillon</span></td>
                <td>10 Mar 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

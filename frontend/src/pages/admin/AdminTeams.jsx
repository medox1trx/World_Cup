import { useTheme } from "../../context/ThemeContext";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

export default function AdminTeams() {
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
        .admin-flag {
          width: 28px; height: 20px; object-fit: cover; border-radius: 2px;
          display: inline-block; vertical-align: middle; margin-right: 8px;
        }
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
            <h1 className="admin-title">Gestion des Équipes</h1>
            <p className="admin-sub">Gérer les équipes participantes à la Coupe du Monde 2030</p>
          </div>

          <button className="admin-btn" style={{ marginBottom: 20 }}>+ Ajouter une équipe</button>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Équipe</th>
                <th>Groupe</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, team: "France",     code: "fr", group: "A", status: "Confirmé" },
                { id: 2, team: "Maroc",      code: "ma", group: "A", status: "Confirmé" },
                { id: 3, team: "Brésil",     code: "br", group: "B", status: "Confirmé" },
                { id: 4, team: "Argentine",  code: "ar", group: "B", status: "Confirmé" },
                { id: 5, team: "Espagne",    code: "es", group: "C", status: "Confirmé" },
                { id: 6, team: "Angleterre", code: "gb", group: "C", status: "Confirmé" },
              ].map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>
                    <img className="admin-flag" src={`https://flagcdn.com/w40/${t.code}.png`} alt={t.team} />
                    {t.team}
                  </td>
                  <td>Groupe {t.group}</td>
                  <td>{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

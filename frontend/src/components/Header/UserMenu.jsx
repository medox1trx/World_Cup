import { Link } from "react-router-dom";
import "./UserMenu.css";
import { useTranslation } from "react-i18next";

function UserMenu() {
  const user = JSON.parse(localStorage.getItem("user"));// katkhelina n7wlo l json obbjet bach n9dero nst3mloh f l condition 
  const { t } = useTranslation();
  return (
    <div className="user-menu">
      {user ? (
        <span className="welcome">Welcome {user.name}</span>
      ) : (
        <Link className="login-btn" to="/login">
          {t("login")}
        </Link>
      )}
    </div>
  );
}

export default UserMenu;
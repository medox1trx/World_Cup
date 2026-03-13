import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function UserMenu() {
  const user = JSON.parse(localStorage.getItem("user")); // parse JSON
  const { t } = useTranslation();

  return (
    <div className="flex items-center font-sans">
      {user ? (
        <span className="text-white font-medium mr-2">
          Welcome {user.name}
        </span>
      ) : (
        <Link
          to="/login"
          className="px-3 py-2 rounded-full bg-[#1b1b1b] border-2 border-[#f7b500] text-white text-sm transition-all duration-300 hover:bg-[#f7b500] hover:text-black"
        >
          {t("login")}
        </Link>
      )}
    </div>
  );
}

export default UserMenu;
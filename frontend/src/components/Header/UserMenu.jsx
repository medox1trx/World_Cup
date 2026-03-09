import { Link } from "react-router-dom";
import "./UserMenu.css";

function UserMenu() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="user-menu">
      {user ? (
        <span className="welcome">Welcome {user.name}</span>
      ) : (
        <Link className="login-btn" to="/login">
          Login
        </Link>
      )}
    </div>
  );
}

export default UserMenu;
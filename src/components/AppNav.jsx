import { Link, useNavigate } from "react-router-dom";
import styles from "./AppNav.module.css";
import { useAuth } from "../contexts/AuthContext";

function AppNav({ className }) {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }


  return (
    <nav className={`${styles.navbar} ${styles[className]}`}>
      <div className={styles.logo}>🌱 Gardener</div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/app" className={styles.link}>
            Garden App
          </Link>
        </li>
        <li>
          <Link to="/app/add-plant" className={styles.link}>
            + Add Plant
          </Link>
        </li>
      </ul>
      <div className={styles.right}>
        <p></p>
        <p>
          <span className={styles.user}>{user} 👤</span>
        </p>
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AppNav;

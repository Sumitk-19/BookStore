import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        BookNest
      </Link>

      <div style={styles.links}>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        ) : (
          <>
            <span style={styles.user}>
              Hi, {user.name}
            </span>

            <Link to="/orders">My Orders</Link>
            <Link to="/cart">Cart</Link>


            {isAdmin && (
              <>
              <Link to="/admin" style={styles.link}>
                Admin
              </Link>
              <Link to="/admin/orders">Orders</Link>
              </>

            )}

            <button onClick={logoutHandler} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#000",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  user: {
    fontWeight: "500",
  },
  button: {
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default Navbar;

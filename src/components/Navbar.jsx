import { useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div>
        <div className="logo">
          <h1>PMS</h1>
          <p>Project Management System</p>
        </div>

        <div className="nav-links">
          <button
            className={
              location.pathname === "/dashboard"
                ? "active-btn"
                : ""
            }
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className={
              location.pathname === "/projects"
                ? "active-btn"
                : ""
            }
            onClick={() => navigate("/projects")}
          >
            Projects
          </button>

          <button
            className={
              location.pathname === "/developers"
                ? "active-btn"
                : ""
            }
            onClick={() => navigate("/developers")}
          >
            Developers
          </button>

          <button
            className={
              location.pathname === "/tasks"
                ? "active-btn"
                : ""
            }
            onClick={() => navigate("/tasks")}
          >
            Tasks
          </button>
        </div>
      </div>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
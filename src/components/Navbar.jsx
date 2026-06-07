import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <button onClick={() => navigate("/dashboard")}>
        Dashboard
      </button>

      <button onClick={() => navigate("/projects")}>
        Projects
      </button>

      <button onClick={() => navigate("/developers")}>
        Developers
      </button>

      <button onClick={() => navigate("/tasks")}>
        Tasks
      </button>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
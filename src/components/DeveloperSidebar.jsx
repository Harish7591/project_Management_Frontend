import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import "../styles/developer.css";

const DeveloperSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const developerName =
    localStorage.getItem("developerName") ||
    "Developer";

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dev-sidebar">
      <div>
        <div className="dev-logo">
          <div className="logo-box">
            PMS
          </div>

          <div className="portal-text">
            Developer Portal
          </div>
        </div>

        <div className="dev-menu">
          <button
            className={
              location.pathname === "/my-tasks"
                ? "dev-active"
                : ""
            }
            onClick={() =>
              navigate("/my-tasks")
            }
          >
            📋 My Tasks
          </button>
        </div>
      </div>

      <div className="dev-footer">
        <div className="dev-user">
          <h4>{developerName}</h4>
          <p>Developer</p>
        </div>

        <button
          className="dev-logout"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default DeveloperSidebar;
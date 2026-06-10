import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

const Dashboard = () => {
  const role = localStorage.getItem("role");

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Dashboard
        </h1>

        <p className="dashboard-subtitle">
          Welcome back, {role}
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <h2>12</h2>
            <p>Total Projects</p>
          </div>

          <div className="stat-card">
            <h2>8</h2>
            <p>Developers</p>
          </div>

          <div className="stat-card">
            <h2>45</h2>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h2>30</h2>
            <p>Completed Tasks</p>
          </div>
        </div>

        <div className="bottom-grid">
          <div className="info-card">
            <h3>Recent Projects</h3>

            <ul>
              <li>Project Management System</li>
              <li>E-Commerce Platform</li>
              <li>Mobile App Development</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>Recent Tasks</h3>

            <ul>
              <li>Build Login API</li>
              <li>JWT Authentication</li>
              <li>Dashboard UI</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
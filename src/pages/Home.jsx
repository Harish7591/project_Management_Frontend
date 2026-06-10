// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div style={{ padding: "50px" }}>
//       <h1>Project Management System</h1>

//       <button
//         onClick={() => navigate("/login")}
//         style={{ marginRight: "10px" }}
//       >
//         Admin Login
//       </button>

//       <button onClick={() => navigate("/developer-login")}>
//         Developer Login
//       </button>
//     </div>
//   );
// };

// export default Home;

import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      {/* Left Side */}
      <div className="landing-left">

        <div className="logo-circle">
          PMS
        </div>

        <h1>
          Project Management
          <br />
          System
        </h1>

        <p>
          Manage projects, assign developers,
          track tasks and monitor team progress
          from a centralized platform.
        </p>

        <div className="landing-buttons">
          <button
            className="btn-admin"
            onClick={() => navigate("/login")}
          >
            Admin Login
          </button>

          <button
            className="btn-dev"
            onClick={() => navigate("/developer-login")}
          >
            Developer Login
          </button>
        </div>

      </div>

      {/* Right Side */}
      <div className="landing-right">

        <div className="feature-card">

          <h2>Why PMS ?</h2>

          <div className="feature-item">
            📁 Project Management
          </div>

          <div className="feature-item">
            👨‍💻 Developer Assignment
          </div>

          <div className="feature-item">
            ✅ Task Tracking
          </div>

          <div className="feature-item">
            📊 Progress Monitoring
          </div>

          <div className="feature-item">
            🚀 Productivity Dashboard
          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;
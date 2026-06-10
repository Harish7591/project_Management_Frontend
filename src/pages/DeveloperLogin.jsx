import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { developerLogin } from "../api/developerApi";
import "../styles/login.css";

const DeveloperLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await developerLogin(formData);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        "developer"
      );

      navigate("/my-tasks");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="developer-login-container">

      <div className="developer-left">

        <div className="dev-logo">
          👨‍💻
        </div>

        <h1>Developer Portal</h1>

        <p>
          Access your assigned projects,
          track tasks, update progress,
          and collaborate with your team.
        </p>

        <div className="dev-features">
          <div>✓ View Assigned Tasks</div>
          <div>✓ Update Task Status</div>
          <div>✓ Project Tracking</div>
          <div>✓ Team Collaboration</div>
        </div>

      </div>

      <div className="developer-right">

        <div className="developer-card">

          <h2>Developer Login</h2>

          <p>
            Sign in to continue
          </p>

          <form onSubmit={handleSubmit}>

            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Developer Email"
              onChange={handleChange}
            />

            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <button
              className="login-btn"
              type="submit"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default DeveloperLogin;
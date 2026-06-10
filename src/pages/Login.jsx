import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import "../styles/login.css";

const Login = () => {
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
      const response = await loginUser(formData);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
  <div className="login-container">
    <div className="login-card">

      <div className="logo-circle">
        P
      </div>

      <div className="login-title">
        <h1>Admin Login</h1>
        <p>
          Sign in to manage projects
          and developers
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email"
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
          type="submit"
          className="login-btn"
        >
          Login
        </button>
      </form>

    </div>
  </div>
);
};

export default Login;
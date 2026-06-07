import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

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
    <div style={{ padding: "50px" }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
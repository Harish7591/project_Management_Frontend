import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { developerLogin } from "../api/developerApi";

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

      alert("Developer Login Success");

      navigate("/my-tasks");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h1>Developer Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default DeveloperLogin;
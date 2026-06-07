import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "50px" }}>
      <h1>Project Management System</h1>

      <button
        onClick={() => navigate("/login")}
        style={{ marginRight: "10px" }}
      >
        Admin Login
      </button>

      <button onClick={() => navigate("/developer-login")}>
        Developer Login
      </button>
    </div>
  );
};

export default Home;
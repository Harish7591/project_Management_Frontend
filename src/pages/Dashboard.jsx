import Navbar from "../components/Navbar";

const Dashboard = () => {
  const role = localStorage.getItem("role");

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>

        <h3>Role: {role}</h3>

        <p>Welcome to Project Management System</p>
      </div>
    </>
  );
};

export default Dashboard;
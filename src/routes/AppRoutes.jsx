import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import Developers from "../pages/Developers";
import DeveloperLogin from "../pages/DeveloperLogin";
import MyTasks from "../pages/MyTasks";
import Home from "../pages/Home";

import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Admin Login */}
      <Route path="/login" element={<Login />} />

      {/* Developer Login */}
      <Route path="/developer-login" element={<DeveloperLogin />} />

      {/* Register */}
      <Route path="/register" element={<Register />} />

      {/* Admin Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        }
      />

      <Route
        path="/developers"
        element={
          <PrivateRoute>
            <Developers />
          </PrivateRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />

      {/* Developer Page */}
      <Route path="/my-tasks" element={<MyTasks />} />

    </Routes>
  );
};

export default AppRoutes;
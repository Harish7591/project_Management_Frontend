import { useEffect, useState } from "react";
import {
  getMyTasks,
  updateTaskStatus,
} from "../api/developerApi";

import DeveloperSidebar from "../components/DeveloperSidebar";
import "../styles/developer.css";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  const developerName =
    localStorage.getItem("developerName") ||
    "Developer";

  const fetchTasks = async () => {
    try {
      const res = await getMyTasks();
      setTasks(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = (
    taskId,
    status
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId
          ? { ...task, status }
          : task
      )
    );
  };

  const submitStatus = async (
    taskId,
    status
  ) => {
    try {
      await updateTaskStatus(
        taskId,
        status
      );

      alert("Status Updated Successfully");

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Status Update Failed");
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  return (
    <>
      <DeveloperSidebar />

      <div className="developer-container">

        <div className="developer-header">
          <h1>
            Welcome Back, {developerName} 👨‍💻
          </h1>

          <p>
            Manage and update your assigned
            tasks efficiently.
          </p>
        </div>

        <div className="developer-stats">

          <div className="developer-stat-card assigned">
            <h2>{tasks.length}</h2>
            <p>Assigned Tasks</p>
          </div>

          <div className="developer-stat-card progress">
            <h2>{inProgressTasks}</h2>
            <p>In Progress</p>
          </div>

          <div className="developer-stat-card completed">
            <h2>{completedTasks}</h2>
            <p>Completed</p>
          </div>

        </div>

        <div className="task-board">
          <h2>📋 My Tasks</h2>

          {tasks.length === 0 ? (
            <div className="empty-task">
              No tasks assigned yet.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                className="task-card"
                key={task._id}
              >
                <div className="task-header">

                  <div>
                    <h3>{task.title}</h3>

                    <p className="task-desc">
                      {task.description}
                    </p>

                    {task.projectId && (
                      <p className="task-project">
                        Project:
                        {" "}
                        {task.projectId
                          ?.projectName ||
                          "N/A"}
                      </p>
                    )}

                    {task.dueDate && (
                      <p className="task-date">
                        Due:
                        {" "}
                        {new Date(
                          task.dueDate
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <span
                    className={`priority-badge ${task.priority}`}
                  >
                    {task.priority}
                  </span>

                </div>

                <div className="task-actions">

                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(
                        task._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Completed">
                      Completed
                    </option>
                  </select>

                  <button
                    onClick={() =>
                      submitStatus(
                        task._id,
                        task.status
                      )
                    }
                  >
                    Update
                  </button>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
};

export default MyTasks;
import { useEffect, useState } from "react";
import {
  getMyTasks,
  updateTaskStatus,
} from "../api/developerApi";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      <h1>My Tasks</h1>

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>
            <strong>Priority :</strong>{" "}
            {task.priority}
          </p>

          <p>
            <strong>Status :</strong>{" "}
            {task.status}
          </p>

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
            style={{
              marginLeft: "10px",
            }}
            onClick={() =>
              submitStatus(
                task._id,
                task.status
              )
            }
          >
            Submit
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyTasks;
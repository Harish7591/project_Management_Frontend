import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/admin.css";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/taskApi";

import { getProjects } from "../api/projectApi";
import { getDevelopers } from "../api/developerApi";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedDeveloper: "",
    priority: "Medium",
    dueDate: "",
  });

  const loadData = async () => {
    try {
      const taskRes = await getTasks();
      const projectRes = await getProjects();
      const developerRes =
        await getDevelopers();

      setTasks(taskRes.data.data || []);
      setProjects(projectRes.data.data || []);
      setDevelopers(
        developerRes.data.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateTask(
          editingId,
          formData
        );

        alert("Task Updated Successfully");
      } else {
        await createTask(formData);

        alert("Task Created Successfully");
      }

      setFormData({
        title: "",
        description: "",
        projectId: "",
        assignedDeveloper: "",
        priority: "Medium",
        dueDate: "",
      });

      setEditingId(null);

      loadData();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed"
      );
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);

    setFormData({
      title: task.title || "",
      description:
        task.description || "",

      projectId:
        task.projectId?._id ||
        task.projectId ||
        "",

      assignedDeveloper:
        task.assignedDeveloper?._id ||
        task.assignedDeveloper ||
        "",

      priority:
        task.priority || "Medium",

      dueDate:
        task.dueDate?.split("T")[0] || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      alert("Task Deleted");

      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
  <Navbar />

  <div className="page-container">
    <h1 className="page-title">
      Tasks Management
    </h1>

    <div className="form-card">
      <h2>
        {editingId
          ? "Update Task"
          : "Create Task"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            className="form-input"
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
          />

          <select
            className="form-select"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            className="form-select"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
          >
            <option value="">
              Select Project
            </option>

            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.projectName}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            name="assignedDeveloper"
            value={
              formData.assignedDeveloper
            }
            onChange={handleChange}
          >
            <option value="">
              Select Developer
            </option>

            {developers.map((dev) => (
              <option
                key={dev._id}
                value={dev._id}
              >
                {dev.name}
              </option>
            ))}
          </select>

          <input
            className="form-input"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <br />

        <textarea
          className="form-textarea"
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br />

        <button
          className="primary-btn"
          type="submit"
        >
          {editingId
            ? "Update Task"
            : "Create Task"}
        </button>
      </form>
    </div>

    <div className="data-grid">
      {tasks.map((task) => (
        <div key={task._id} className="data-card">
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>
            <strong>Project:</strong>{" "}
            {task.projectId?.projectName}
          </p>

          <p>
            <strong>Developer:</strong>{" "}
            {task.assignedDeveloper?.name}
          </p>

          <p>
            <strong>Priority:</strong>{" "}
            {task.priority}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {task.status}
          </p>

          <div className="action-buttons">
            <button
              className="edit-btn"
              onClick={() => handleEdit(task)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                handleDelete(task._id)
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</>
  );
};

export default Tasks;
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

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

      <div style={{ padding: "20px" }}>
        <h1>Tasks</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
          />

          <br />
          <br />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <br />
          <br />

          <select
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

          <br />
          <br />

          <select
            name="assignedDeveloper"
            value={formData.assignedDeveloper}
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

          <br />
          <br />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">
              Medium
            </option>
            <option value="High">
              High
            </option>
          </select>

          <br />
          <br />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <br />
          <br />

          <button type="submit">
            {editingId
              ? "Update Task"
              : "Create Task"}
          </button>
        </form>

        <hr />

        <h2>Task List</h2>

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
              Project:{" "}
              {
                task.projectId
                  ?.projectName
              }
            </p>

            <p>
              Developer:{" "}
              {
                task
                  .assignedDeveloper
                  ?.name
              }
            </p>

            <p>
              Priority:
              {" "}
              {task.priority}
            </p>

            <p>
              Status:
              {" "}
              {task.status}
            </p>

            <button
              onClick={() =>
                handleEdit(task)
              }
            >
              Edit
            </button>

            {" "}

            <button
              onClick={() =>
                handleDelete(task._id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tasks;
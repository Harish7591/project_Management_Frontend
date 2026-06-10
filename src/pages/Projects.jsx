import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";
import "../styles/admin.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProjects();
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
        await updateProject(editingId, formData);

        alert("Project Updated Successfully");
      } else {
        await createProject(formData);

        alert("Project Created Successfully");
      }

      setFormData({
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Active",
      });

      setEditingId(null);

      loadProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);

    setFormData({
      projectName: project.projectName || "",
      description: project.description || "",
      startDate:
        project.startDate?.split("T")[0] || "",
      endDate:
        project.endDate?.split("T")[0] || "",
      status: project.status || "Active",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);

      alert("Project Deleted");

      loadProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
  <Navbar />

  <div className="page-container">
    <h1 className="page-title">Projects Management</h1>

    <div className="form-card">
      <h2>
        {editingId ? "Update Project" : "Create Project"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            className="form-input"
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={handleChange}
          />

          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>

          <input
            className="form-input"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />

          <input
            className="form-input"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <br />

        <textarea
          className="form-textarea"
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br />

        <button className="primary-btn" type="submit">
          {editingId ? "Update Project" : "Create Project"}
        </button>
      </form>
    </div>

    <div className="data-grid">
      {projects.map((project) => (
        <div key={project._id} className="data-card">
          <h3>{project.projectName}</h3>

          <p>{project.description}</p>

          <p>
            <strong>Status:</strong> {project.status}
          </p>

          <div className="action-buttons">
            <button
              className="edit-btn"
              onClick={() => handleEdit(project)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(project._id)}
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

export default Projects;
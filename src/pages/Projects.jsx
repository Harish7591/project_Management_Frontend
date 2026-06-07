import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";

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

      <div style={{ padding: "20px" }}>
        <h1>Projects</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={formData.projectName}
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

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />

          <br />
          <br />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>

          <br />
          <br />

          <button type="submit">
            {editingId
              ? "Update Project"
              : "Create Project"}
          </button>
        </form>

        <hr />

        <h2>Project List</h2>

        {projects.map((project) => (
          <div
            key={project._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{project.projectName}</h3>

            <p>{project.description}</p>

            <p>Status: {project.status}</p>

            <button
              onClick={() =>
                handleEdit(project)
              }
            >
              Edit
            </button>

            {" "}

            <button
              onClick={() =>
                handleDelete(project._id)
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

export default Projects;
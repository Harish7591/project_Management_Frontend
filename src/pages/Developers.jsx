import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/admin.css";
import {
  getDevelopers,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} from "../api/developerApi";

const Developers = () => {
  const [developers, setDevelopers] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const loadDevelopers = async () => {
    try {
      const response = await getDevelopers();
      setDevelopers(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDevelopers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateDeveloper(editingId, formData);

        alert("Developer Updated Successfully");
      } else {
        await createDeveloper(formData);

        alert("Developer Created Successfully");
      }

      resetForm();
      loadDevelopers();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (developer) => {
    setEditingId(developer._id);

    setFormData({
      name: developer.name,
      email: developer.email,
      password: "",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this developer?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDeveloper(id);

      alert("Developer Deleted Successfully");

      loadDevelopers();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <>
  <Navbar />

  <div className="page-container">
    <h1 className="page-title">
      Developers Management
    </h1>

    <div className="form-card">
      <h2>
        {editingId
          ? "Update Developer"
          : "Create Developer"}
      </h2>

      <div className="form-grid">
        <input
          className="form-input"
          type="text"
          name="name"
          placeholder="Developer Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <br />

      <button
        className="primary-btn"
        onClick={handleSubmit}
      >
        {editingId
          ? "Update Developer"
          : "Create Developer"}
      </button>

      {editingId && (
        <button
          className="cancel-btn"
          onClick={resetForm}
        >
          Cancel
        </button>
      )}
    </div>

    <div className="data-grid">
      {developers.map((dev) => (
        <div key={dev._id} className="data-card">
          <h3>{dev.name}</h3>

          <p>{dev.email}</p>

          <p>{dev.role}</p>

          <div className="action-buttons">
            <button
              className="edit-btn"
              onClick={() => handleEdit(dev)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                handleDelete(dev._id)
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

export default Developers;
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

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

      <div style={{ padding: "20px" }}>
        <h1>Developers</h1>

        <div
          style={{
            border: "1px solid black",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <h2>
            {editingId
              ? "Update Developer"
              : "Create Developer"}
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="password"
            name="password"
            placeholder={
              editingId
                ? "New Password"
                : "Password"
            }
            value={formData.password}
            onChange={handleChange}
          />

          <br />
          <br />

          <button onClick={handleSubmit}>
            {editingId
              ? "Update Developer"
              : "Create Developer"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              style={{
                marginLeft: "10px",
              }}
            >
              Cancel
            </button>
          )}
        </div>

        {developers.map((dev) => (
          <div
            key={dev._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{dev.name}</h3>

            <p>{dev.email}</p>

            <p>{dev.role}</p>

            <button
              onClick={() =>
                handleEdit(dev)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(dev._id)
              }
              style={{
                marginLeft: "10px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Developers;
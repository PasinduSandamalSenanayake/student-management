import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../assets/styles/AdminModule.css";

const AdminModule = () => {
  const [modules, setModules] = useState([
    { id: 1, course: "Mathematics", moduleName: "Algebra" },
    { id: 2, course: "Sciences", moduleName: "Tree" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ course: "", moduleName: "" });
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const courseOptions = ["Mathematics", "Science", "History", "ICT", "English"];

  const filteredModules = modules.filter(
    (module) =>
      module.moduleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditModule = () => {
    if (formData.course && formData.moduleName) {
      if (editingModuleId !== null) {
        setModules(
          modules.map((module) =>
            module.id === editingModuleId
              ? { id: editingModuleId, ...formData }
              : module
          )
        );
      } else {
        setModules([...modules, { id: Date.now(), ...formData }]);
      }
      resetForm();
    }
  };

  const handleEdit = (module) => {
    setFormData(module);
    setEditingModuleId(module.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  const resetForm = () => {
    setFormData({ course: "", moduleName: "" });
    setEditingModuleId(null);
    setShowModal(false);
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Modules</h2>
        <div className="module-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="add-module-button"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            Add Module
          </button>
        </div>
      </div>

      <p>Here you can manage module details associated with courses.</p>

      <ul className="module-list">
        {filteredModules.map((module) => (
          <li key={module.id} className="module-item">
            <div className="module-info">
              <strong>{module.moduleName}</strong>
              <br />
              <small>Course: {module.course}</small>
            </div>
            <div className="module-actions">
              <FaEdit
                onClick={() => handleEdit(module)}
                className="action-icon edit"
              />
              <FaTrash
                onClick={() => handleDelete(module.id)}
                className="action-icon delete"
              />
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingModuleId ? "Edit Module" : "Add New Module"}</h3>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              {courseOptions.map((course, idx) => (
                <option key={idx} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="moduleName"
              value={formData.moduleName}
              onChange={handleChange}
              placeholder="Module Name"
            />
            <div className="modal-buttons">
              <button onClick={handleAddOrEditModule} className="modal-button">
                {editingModuleId ? "Update" : "Add"}
              </button>
              <button onClick={resetForm} className="modal-button cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModule;

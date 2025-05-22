import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../assets/styles/AdminResults.css"; // Reusing existing styles

const AdminResult = () => {
  const [results, setResults] = useState([
    { id: 1, subject: "Mathematics", marks: 95 },
    { id: 2, subject: "Physics", marks: 88 },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [marks, setMarks] = useState("");
  const [editingResultId, setEditingResultId] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [remarks, setRemarks] = useState("");

  const [students, setStudents] = useState([]);
  const [module, setModule] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admin/students", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch students");

        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/results", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch results");

        const data = await res.json();
        setResults(data); // Store entire result objects
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    fetchResults();

    fetchStudents();
  }, []);

  const fetchModule = async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/modules/student/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch modules");

      const data = await res.json();
      console.log("Fetched modules:", data);

      setModule(data.modules);
    } catch (err) {
      console.error("Error fetching modules:", err);
    }
  };

  const handleAddOrEditResult = async () => {
    if (studentName && moduleName && marks && remarks) {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studentId: studentName,
            moduleId: moduleName,
            marks: parseInt(marks),
            remarks: remarks, // updated
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to save result.");
        }

        alert("Result added successfully!");
        setShowModal(false);

        // Optionally update your local state
        setResults((prev) => [
          ...prev,
          {
            id: data.result._id,
            subject:
              module.find((m) => m._id === moduleName)?.moduleName || "Unknown",
            marks: data.result.marks,
            // remarks: data.result.remarks
          },
        ]);

        // Clear form fields
        setStudentName("");
        setModuleName("");
        setMarks("");
        setRemarks("");
        setEditingResultId(null);
      } catch (err) {
        console.error("Error saving result:", err);
        alert(err.message);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleEdit = (result) => {
    setSubjectName(result.subject);
    setMarks(result.marks);
    setEditingResultId(result.id);
    setRemarks(result.remarks);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/results/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to delete result");

        setResults(results.filter((r) => r._id !== id));
      } catch (err) {
        console.error("Error deleting result:", err);
        alert("Failed to delete result.");
      }
    }
  };

  const filteredResults = results.filter(
    (res) =>
      res?.student?.fullName &&
      res.student.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="course-container">
      <div className="course-header">
        <h2>Results</h2>
        <div className="course-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search by subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="add-course-button"
            onClick={() => {
              setShowModal(true);
              setEditingResultId(null);
              setSubjectName("");
              setMarks("");
            }}
          >
            Add Result
          </button>
        </div>
      </div>
      <p>Here you can manage result details.</p>

      <ul className="course-list scrollable-list">
        {filteredResults.map((res) => (
          <li key={res._id} className="course-item">
            <span>
              <h3>Student: {res.student?.fullName || "Unknown"}</h3>
              <p>Course: {res.student?.course?.name || "N/A"}</p>
              <p>Module: {res.module?.moduleName || "N/A"}</p>
              <p>Marks: {res.marks}</p>
              <p>Grade: {res.grade}</p>
              <p>Remarks: {res.remarks}</p>
            </span>
            <div className="course-actions">
              <FaEdit
                onClick={() => handleEdit(res)}
                className="action-icon edit"
              />
              <FaTrash
                onClick={() => handleDelete(res._id)}
                className="action-icon delete"
              />
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingResultId ? "Edit Result" : "Add New Result"}</h3>

            <select
              value={studentName}
              onChange={(e) => {
                const selectedId = e.target.value;
                setStudentName(selectedId);
                fetchModule(selectedId);
              }}
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.fullName}
                </option>
              ))}
            </select>

            {/* Module Dropdown */}
            <select
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            >
              <option value="">Select Module</option>
              {Array.isArray(module) && module.length > 0 ? (
                module.map((mod) => (
                  <option key={mod._id} value={mod._id}>
                    {mod.moduleName}
                  </option>
                ))
              ) : (
                <option disabled>No modules found</option>
              )}
            </select>

            {/* Marks Input */}
            <input
              type="text"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="Marks"
            />

            {/* Remarks Input */}
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Remarks"
            />

            <div className="modal-buttons">
              <button onClick={handleAddOrEditResult} className="modal-button">
                {editingResultId ? "Update" : "Add"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setStudentName("");
                  setModuleName("");
                  setMarks("");
                  setRemarks("");
                  setEditingResultId(null);
                }}
                className="modal-button cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResult;

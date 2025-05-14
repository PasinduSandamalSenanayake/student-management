
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../assets/styles/AdminCourse.css";
import React, { useEffect, useState } from 'react';

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [editingCourseId, setEditingCourseId] = useState(null);

  const handleAddOrEditCourse = async () => {
    if (courseName.trim()) {
      if (editingCourseId !== null) {
        setCourses(
          courses.map((course) =>
            course.id === editingCourseId
              ? { ...course, name: courseName }
              : course
          )
        );
      } else {
        try {
          const token = localStorage.getItem("token");

          const response = await fetch("http://localhost:5000/api/courses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: courseName }),
          });

          if (response.ok) {
            const data = await response.json();
            setCourses([
              ...courses,
              {
                id: data.course._id, // Use MongoDB _id
                name: data.course.name,
              },
            ]);
          } else {
            console.error("Failed to add course");
          }
        } catch (error) {
          console.error("Error adding course:", error);
        }
      }

      setCourseName("");
      setEditingCourseId(null);
      setShowModal(false);
    }
  };

  const handleEdit = (course) => {
    setCourseName(course.name);
    setEditingCourseId(course.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="course-container">
      <div className="course-header">
        <h2>Courses</h2>
        <div className="course-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="add-course-button"
            onClick={() => {
              setShowModal(true);
              setEditingCourseId(null);
              setCourseName("");
            }}
          >
            Add Course
          </button>
        </div>
      </div>
      <p>Here you can manage your course details.</p>

      <ul className="course-list scrollable-list">
        {filteredCourses.map((course) => (
          <li key={course._id} className="course-item">
            <span>{course.name}</span>
            <div className="course-actions">
              <FaEdit
                onClick={() => handleEdit(course)}
                className="action-icon edit"
              />
              <FaTrash
                onClick={() => handleDelete(course.id)}
                className="action-icon delete"
              />
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingCourseId ? "Edit Course" : "Add New Course"}</h3>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Course Name"
            />
            <div className="modal-buttons">
              <button onClick={handleAddOrEditCourse} className="modal-button">
                {editingCourseId ? "Update" : "Add"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setCourseName("");
                  setEditingCourseId(null);
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

export default AdminCourse;

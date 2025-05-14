import React, { useEffect, useState } from "react";
import "../../assets/styles/AdminDashboard.css";
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie } from "react-icons/fa";

const AdminDashboard = () => {
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    const fetchCourseCount = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/courses/count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTotalCourses(data.totalCourses);
        } else {
          console.error("Failed to fetch course count");
        }
      } catch (error) {
        console.error("Error fetching course count:", error);
      }
    };

    fetchCourseCount();
  }, []);

  return (
    <div className="dashboard-cards-container">
      <div className="dashboard-card orange">
        <div className="card-content">
          <h2>1256</h2>
          <p>Students</p>
        </div>
        <FaUserGraduate className="card-icon" />
      </div>

      <div className="dashboard-card purple">
        <div className="card-content">
          <h2>{totalCourses}</h2>
          <p>Courses</p>
        </div>
        <FaChalkboardTeacher className="card-icon" />
      </div>

      <div className="dashboard-card blue">
        <div className="card-content">
          <h2>102</h2>
          <p>Private Teachers</p>
        </div>
        <FaUserTie className="card-icon" />
      </div>
    </div>
  );
};

export default AdminDashboard;

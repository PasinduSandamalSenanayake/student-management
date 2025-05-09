import React from "react";
import "../../assets/styles/AdminDashboard.css";
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie } from "react-icons/fa";

const AdminDashboard = () => {
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
          <h2>18</h2>
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

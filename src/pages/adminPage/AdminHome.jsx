import React, { useState } from "react";
import '../../assets/styles/AdminHome.css';
import AdminDashboard from "./AdminDashboard"; 

const AdminHome = () => {
  const [selectedSection, setSelectedSection] = useState("Dashboard");

  const renderContent = () => {
    switch (selectedSection) {
      case "Dashboard":
        return <AdminDashboard/>;
        
      case "Course":
        return (
          <div className="section-content">
            <h2>Courses</h2>
            <p>Here you can manage your course details.</p>
            {/* Add course management components here */}
          </div>
        );
      case "Students":
        return (
          <div className="section-content">
            <h2>Students</h2>
            <p>Manage student records and enrollments.</p>
          </div>
        );
      case "Billing":
        return (
          <div className="section-content">
            <h2>Billing</h2>
            <p>View and manage billing details.</p>
          </div>
        );
      case "Module":
        return (
          <div className="section-content">
            <h2>Modules</h2>
            <p>Create and edit module content.</p>
          </div>
        );
      case "Exams":
        return (
          <div className="section-content">
            <h2>Exams</h2>
            <p>Setup and manage exams for students.</p>
          </div>
        );
      default:
        return <div>Select a section to display content.</div>;
    }
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="logo">Edurise</div>
        <nav className="nav-links">
          {["Dashboard", "Course", "Students", "Billing", "Module", "Exams"].map(item => (
            <a
              key={item}
              href="#"
              className={selectedSection === item ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setSelectedSection(item);
              }}
            >
              {item}
            </a>
          ))}
          <a className="features-new" href="#">
            Features <span className="new-tag">NEW</span>
          </a>
        </nav>
      </aside>

      <main className="main-content">
        {renderContent()}
        <div className="support-btn">
          <button>Support</button>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;

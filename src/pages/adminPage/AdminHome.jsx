import React, { useState } from "react";
import '../../assets/styles/AdminHome.css';
import AdminDashboard from "./AdminDashboard"; 
import AdminCourse from "./AdminCourse";
import AdminStudent from "./AdminStudent";
import AdminModule from "./AdminModule";

const AdminHome = () => {
  const [selectedSection, setSelectedSection] = useState("Dashboard");

  const renderContent = () => {
    switch (selectedSection) {
      case "Dashboard":
        return <AdminDashboard/>;

      case "Course":
        return <AdminCourse/>;

      case "Students":
        return <AdminStudent/>;

      case "Payment":
        return (
          <div className="section-content">
            <h2>Payment</h2>
            <p>View and manage billing details.</p>
          </div>
        );
      case "Module":
        return <AdminModule/>;
        
      case "Results":
        return (
          <div className="section-content">
            <h2>Results</h2>
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
          {["Dashboard", "Course", "Students", "Payment", "Module", "Results"].map(item => (
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

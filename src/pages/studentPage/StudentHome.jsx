import React, { useState } from 'react';
import '../../assets/styles/StudentHome.css';
import Module from './Module';
import Result from './Result';
import PaymentPopup from './Payment'; // 👈 Import here

const StudentHome = () => {
    const [showModules, setShowModules] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showPayment, setShowPayment] = useState(false); // 👈 State for payment popup

    const handleLogout = () => {
        window.location.href = '/';
    };

    return (
        <div className="student-home">
            <header className="student-header">
                <h1 className="student-title">EDURISE Student Portal</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>

            <section className="student-widgets">
                <div className="widget" onClick={() => setShowModules(true)}>
                    <h3>My Modules</h3>
                    <p>View and manage your enrolled courses.</p>
                </div>

                <div className="widget">
                    <h3>Assignments</h3>
                    <p>Check deadlines and submit assignments.</p>
                </div>

                <div className="widget" onClick={() => setShowResults(true)}>
                    <h3>Results</h3>
                    <p>Track your academic progress here.</p>
                </div>

                <div className="widget" onClick={() => setShowPayment(true)}> {/* 👈 Show payment popup */}
                    <h3>Payment</h3>
                    <p>Your payment Details here.</p>
                </div>
            </section>

            {showModules && <Module onClose={() => setShowModules(false)} />}
            {showResults && <Result onClose={() => setShowResults(false)} />}
            {showPayment && <PaymentPopup onClose={() => setShowPayment(false)} />} {/* 👈 Payment popup */}
        </div>
    );
};

export default StudentHome;

// src/pages/StudentLogin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/StudentLogin.css';

const StudentLogin = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Optional: validate login here
        navigate('/studenthome'); // ✅ navigate after "login"
    };

    return (
        <div className="login-container">
            <h2>Student Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default StudentLogin;

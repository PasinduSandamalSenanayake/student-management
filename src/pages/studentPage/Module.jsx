// src/pages/Module.jsx
import React from 'react';
import '../../assets/styles/Module.css';

const Module = ({ onClose }) => {
    const modules = [
        "Mathematics I",
        "Programming Fundamentals",
        "Database Systems",
        "Web Development",
        "Software Engineering",
        "Computer Networks"
    ];

    return (
        <div className="module-overlay">
            <div className="module-popup">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>My Modules</h2>
                
                <ul>
                    {modules.map((mod, index) => (
                        <li key={index}>{mod}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Module;

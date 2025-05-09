// src/pages/Result.jsx
import React from 'react';
import '../../assets/styles/Result.css';

const Result = ({ onClose }) => {
    const results = [
        { module: "Mathematics I", grade: "A" },
        { module: "Programming Fundamentals", grade: "B+" },
        { module: "Database Systems", grade: "A-" },
        { module: "Web Development", grade: "B" },
        { module: "Software Engineering", grade: "A" },
        { module: "Computer Networks", grade: "B+" }
    ];

    return (
        <div className="result-overlay">
            <div className="result-popup">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Your Results</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Module</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((res, index) => (
                            <tr key={index}>
                                <td>{res.module}</td>
                                <td>{res.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Result;

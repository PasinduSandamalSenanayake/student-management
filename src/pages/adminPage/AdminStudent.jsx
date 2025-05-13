import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../assets/styles/AdminStudent.css';

const AdminStudent = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      address: '123 Main Street',
      course: 'Mathematics',
      nic: '123456789V',
      mobile: '0712345678',
    },
    {
        id: 2,
        fullName: 'kasun',
        address: '123 Main Street',
        course: 'Mathematics',
        nic: '223456789V',
        mobile: '0722345678',
      },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    course: '',
    nic: '',
    mobile: '',
  });
  const [editingStudentId, setEditingStudentId] = useState(null);

  const courses = ['Mathematics', 'Science', 'History', 'ICT', 'English'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditStudent = () => {
    const { fullName, address, course, nic, mobile } = formData;
    if (fullName && address && course && nic && mobile) {
      if (editingStudentId !== null) {
        setStudents(students.map(student =>
          student.id === editingStudentId ? { id: editingStudentId, ...formData } : student
        ));
      } else {
        setStudents([...students, { id: Date.now(), ...formData }]);
      }
      resetForm();
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditingStudentId(student.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      address: '',
      course: '',
      nic: '',
      mobile: '',
    });
    setEditingStudentId(null);
    setShowModal(false);
  };

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="student-container">
      <div className="student-header">
        <h2>Students</h2>
        <div className="student-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, NIC or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="add-student-button" onClick={() => {
            resetForm();
            setShowModal(true);
          }}>
            Add Student
          </button>
        </div>
      </div>
      <p>Here you can manage your student details.</p>

      <ul className="student-list">
        {filteredStudents.map((student) => (
          <li key={student.id} className="student-item">
            <div className="student-info">
              <strong>{student.fullName}</strong><br />
              <small>NIC: {student.nic}</small><br />
              <small>Course: {student.course}</small><br />
              <small>Mobile: {student.mobile}</small><br />
              <small>Address: {student.address}</small>
            </div>
            <div className="student-actions">
              <FaEdit onClick={() => handleEdit(student)} className="action-icon edit" />
              <FaTrash onClick={() => handleDelete(student.id)} className="action-icon delete" />
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingStudentId ? 'Edit Student' : 'Add New Student'}</h3>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
            <select name="course" value={formData.course} onChange={handleChange}>
              <option value="">Select Course</option>
              {courses.map((course, idx) => (
                <option key={idx} value={course}>{course}</option>
              ))}
            </select>
            <input type="text" name="nic" value={formData.nic} onChange={handleChange} placeholder="NIC" />
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" />
            <div className="modal-buttons">
              <button onClick={handleAddOrEditStudent} className="modal-button">
                {editingStudentId ? 'Update' : 'Add'}
              </button>
              <button onClick={resetForm} className="modal-button cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudent;

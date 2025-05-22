import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../assets/styles/AdminModule.css";

const AdminPayment = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null, // For tracking edit mode
    userId: "",
    amount: "",
    status: "Pending",
    paymentMethod: "",
    description: "",
  });

  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admin/students", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch students");

        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/payments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch payments");

        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };

    fetchStudents();
    fetchPayments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      userId: "",
      amount: "",
      status: "Pending",
      paymentMethod: "",
      description: "",
    });
    setShowModal(false);
  };

  const filteredPayments = payments.filter((payment) => {
    const nameMatch = payment.studentId?.fullName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === "" || payment.status === statusFilter;
    return nameMatch && statusMatch;
  });

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Payments</h2>
        <div className="module-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="search-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <button
            className="add-module-button"
            onClick={() => {
              setFormData({
                id: null,
                userId: "",
                amount: "",
                status: "Pending",
                paymentMethod: "",
                description: "",
              });
              setShowModal(true);
            }}
          >
            Add Payment
          </button>
        </div>
      </div>

      <p>Manage payment records for users and courses.</p>

      <ul className="module-list">
        {filteredPayments.map((payment) => (
          <li key={payment._id} className="module-item">
            <div className="module-info">
              <strong>{payment.studentId?.fullName}</strong>
              <br />
              <small>
                Amount: ${payment.amount} | Status: {payment.status}
                <br />
                Description: {payment.description}
              </small>
            </div>
            <div className="module-actions">
              <FaEdit
                onClick={() => {
                  setFormData({
                    id: payment._id,
                    userId: payment.studentId?._id,
                    amount: payment.amount,
                    status: payment.status,
                    paymentMethod: payment.method,
                    description: payment.description,
                  });
                  setShowModal(true);
                }}
                className="action-icon edit"
              />
              <FaTrash
                onClick={async () => {
                  if (
                    !window.confirm(
                      "Are you sure you want to delete this payment?"
                    )
                  )
                    return;

                  try {
                    const token = localStorage.getItem("token");
                    const res = await fetch(
                      `http://localhost:5000/api/payments/${payment._id}`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    if (!res.ok) throw new Error("Failed to delete payment");

                    const data = await res.json();
                    console.log("Payment deleted:", data.message);

                    // Remove the payment from the state list
                    setPayments((prev) =>
                      prev.filter((p) => p._id !== payment._id)
                    );
                  } catch (err) {
                    console.error("Error deleting payment:", err);
                    alert("Error deleting payment"); // <--- This only runs if something goes wrong
                  }
                }}
                className="action-icon delete"
              />
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{formData.id ? "Edit Payment" : "Add New Payment"}</h3>

            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.fullName}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Payment Amount"
            />

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
            </select>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Payment Description"
            ></textarea>

            <div className="modal-buttons">
              <button
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  const paymentData = {
                    studentId: formData.userId,
                    amount: Number(formData.amount),
                    method: formData.paymentMethod,
                    status: formData.status,
                    description: formData.description,
                  };

                  try {
                    const res = await fetch(
                      formData.id
                        ? `http://localhost:5000/api/payments/${formData.id}`
                        : "http://localhost:5000/api/payments",
                      {
                        method: formData.id ? "PUT" : "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(paymentData),
                      }
                    );

                    if (!res.ok) throw new Error("Failed to save payment");

                    const data = await res.json();
                    console.log("Payment saved:", data);

                    // Reload or refetch updated payment list
                    resetForm();
                    window.location.reload();
                  } catch (err) {
                    console.error("Error saving payment:", err);
                    alert("Error saving payment");
                  }
                }}
                className="modal-button"
              >
                Save
              </button>
              <button onClick={resetForm} className="modal-button cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayment;

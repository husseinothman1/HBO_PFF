// src/pages/MaintenanceReq.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MaintenanceReq.css";
import API from "../api"; // Make sure api.js exists

export default function MaintenanceReq() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    brand: "",
    issue: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/maintenance", formData);
      alert("Maintenance request submitted!");
      navigate("/maintenance-appreciation"); // redirect to thank you page
    } catch (err) {
      console.error("Failed to submit request:", err);
      alert("Failed to submit request. Try again.");
    }
  };

  return (
    <div className="page maintenance-page">
      <h1>Maintenance Request</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Device Brand:
          <input
            type="text"
            name="brand"
            required
            value={formData.brand}
            onChange={handleChange}
          />
        </label>
        <label>
          Issue Description:
          <textarea
            rows="3"
            name="issue"
            required
            value={formData.issue}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ShippingInfo.css";

export default function ShippingInfo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    idNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shipping info submitted:", formData);
    // You can send formData to your backend here
    navigate("/payment"); // Navigate to the payment page
  };

  return (
    <div className="page shipping-page">
      <h1>Shipping Information</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          ID Number:
          <input
            type="number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Continue to Payment</button>
      </form>
    </div>
  );
}

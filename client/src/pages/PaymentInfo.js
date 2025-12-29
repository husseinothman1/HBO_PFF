// src/pages/PaymentInfo.js
import React, { useState } from "react";
import "../styles/PaymentInfo.css";
import API from "../api"; // Make sure api.js exists

export default function PaymentInfo({ orderId }) {
  const [method, setMethod] = useState("cod");
  const [cardData, setCardData] = useState({ number: "", expiry: "", cvv: "" });

  const handleCardChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        orderId, 
        paymentMethod: method, 
        cardInfo: method === "card" ? cardData : null 
      };
      await API.post("/orders/payment", payload);
      alert("Payment submitted successfully!");
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="page payment-page">
      <h1>Payment Information</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          Cash on Delivery
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Credit / Debit Card
        </label>

        {method === "card" && (
          <div className="card-fields">
            <input
              type="number"
              name="number"
              placeholder="Card Number"
              value={cardData.number}
              onChange={handleCardChange}
              required
            />
            <input
              type="month"
              name="expiry"
              placeholder="Expiry Date"
              value={cardData.expiry}
              onChange={handleCardChange}
              required
            />
            <input
              type="number"
              name="cvv"
              placeholder="CVV"
              value={cardData.cvv}
              onChange={handleCardChange}
              required
            />
          </div>
        )}

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

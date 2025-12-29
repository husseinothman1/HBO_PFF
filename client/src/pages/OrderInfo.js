// src/pages/OrderInfo.js
import React, { useEffect, useState } from "react";
import "../styles/Orederinfo.css";
import API from "../api"; // Make sure api.js exists

export default function OrderInfo() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        setOrders(res.data); // backend should return array of orders
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="page order-info-page">
      <h1>Order Information</h1>
      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user || "N/A"}</td>
                <td>
                  {order.products
                    ? order.products.map((p) => p.name).join(", ")
                    : "N/A"}
                </td>
                <td>€{order.total || 0}</td>
                <td>{order.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

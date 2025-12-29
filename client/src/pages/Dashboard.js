// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import API from "../api"; // Make sure api.js exists

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    maintenanceRequests: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setStats(res.data); // backend should return an object with these keys
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="page dashboard-page">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <p>Total Orders: {stats.totalOrders}</p>
        <p>Total Products: {stats.totalProducts}</p>
        <p>Maintenance Requests: {stats.maintenanceRequests}</p>
      </div>
    </div>
  );
}

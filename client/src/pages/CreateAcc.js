// src/pages/CreateAcc.js
import React, { useState } from "react";
import "../styles/CreateAcc.css";
import API from "../api"; // Make sure you have api.js with baseURL

export default function CreateAcc() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { username, password });
      alert("Admin account created successfully!");
      console.log(res.data);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("Failed to create account. Try again.");
    }
  };

  return (
    <div className="page create-account-page">
      <h1>Create Admin Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

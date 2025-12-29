// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://hbo-pff.onrender.com", // backend URL
});

export default API;

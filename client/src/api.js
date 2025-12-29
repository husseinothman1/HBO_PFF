// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "srv-d59cfqje5dus73ef37eg", // backend URL
});

export default API;

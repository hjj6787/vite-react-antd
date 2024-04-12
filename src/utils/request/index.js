// src/axios.js
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL;
const request = axios.create({
  baseURL: apiBaseUrl,
  timeout: 1000,
});

export default request;

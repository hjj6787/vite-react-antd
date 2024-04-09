// src/axios.js
import axios from "axios";

const request = axios.create({
  baseURL: "/", // 假设你的开发服务器是运行在 localhost:3000
  timeout: 1000,
});

export default request;

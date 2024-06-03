// src/axios.js
import axios from "axios";
import { useLoading } from "../../component/Loading/Loading";
import { store } from "../../store/index";
const token = store.getState().user.token;

// 创建 Axios 实例
const Api = axios.create({
  baseURL: "http://localhost:3000/", // 你的 API 基础 URL
  timeout: 30000, // 请求超时时间
  headers: {
    "Content-Type": "application/json", // 设置默认请求头
    Accept: "application/json",
  },
});
// 请求拦截器
Api.interceptors.request.use(
  (config) => {
    // 这里可以在发送请求之前对配置做一些处理
    // 例如，添加 Authorization header

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // setLoading(true);
    return config;
  },
  (error) => {
    // 处理请求错误
    // setLoading(false);
    return Promise.reject(error);
  }
);

// 响应拦截器
Api.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // setLoading(true);
    return response.data;
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      // 服务器返回的错误响应
      console.error("Server Error:", error.response);
    } else if (error.request) {
      // 请求已发出，但未收到响应
      console.error("Network Error:", error.request);
    } else {
      // 发生在设置请求时的其他错误
      console.error("Error:", error.message);
    }
    // setLoading(false);
    return Promise.reject(error);
  }
);
export default Api;

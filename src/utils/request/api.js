import axios from "axios";

// 创建 Axios 实例
const Api = axios.create({
  baseURL: "http://localhost:3000/", // 你的 API 基础 URL
  timeout: 10000, // 请求超时时间
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
    const token = localStorage.getItem("token"); // 假设 token 存储在 localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
Api.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
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
    return Promise.reject(error);
  }
);

export const Getuser = async (data) => {
  try {
    const response = await Api.post(`user/Tlogin`, data);
    // console.log(response.data);
    localStorage.setItem("token", response.data.token);
    return response;
  } catch (error) {
    console.error("Failed to fetch resource:", error);
    throw error;
  }
};
export const Getuserlist = async () => {
  try {
    const response = await Api.get(`user/userlist`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const Loginbody = async (postdata, params) => {
  try {
    const response = await Api.post(`user/loginbody`, postdata);
    return response;
  } catch (error) {
    throw error;
  }
};

export default Api;

import axios from "axios";

// const API_BASE_URL = "http://react.genzuni.website";
// const API_BASE_URL = "http://188.121.111.8:3001";
const API_BASE_URL = "http://188.121.104.25:3001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.response.use(
  (data) => {
    return data;
  },
  (error) => {
    // if (error.response?.status === 401) {
    //   localStorage.removeItem("token");
    //   window.location.href = "/auth";
    // }
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      console.warn("خطای دسترسی از سمت سرور");
    }
    return Promise.reject(error);
  },
);

apiClient.interceptors.request.use(
  (opt) => {
    const token = localStorage.getItem("token");
    if (token) {
      opt.headers.Authorization = `Bearer ${token}`;
    }
    return opt;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;

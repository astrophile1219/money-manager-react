import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// List of endpoints that do not require authorization header
const excludeEndpoints = [
  "/login",
  "/register",
  "/status",
  "/activate",
  "/health",
];

// Request interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    // Check if the current URL is in the excluded list
    const shouldSkipToken = excludeEndpoints.some((endpoint) => {
      return config.url?.includes(endpoint);
    });

    // If it's not an excluded endpoint, add the token
    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor
axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server Error: Please try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout: Please try again!");
    }
    return Promise.reject(error);
  },
);

export default axiosConfig;

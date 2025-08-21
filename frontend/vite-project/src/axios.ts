import axios from "axios";

const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8555", 
  withCredentials: true, // if you’re using cookies/auth
});

export default axiosRequest;

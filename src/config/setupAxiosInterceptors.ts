import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

axios.defaults.headers.common["Authorization"] =
  `Bearer ${localStorage.getItem("jwt")}`;

const setupAxiosInterceptors = () => {};

export default setupAxiosInterceptors;

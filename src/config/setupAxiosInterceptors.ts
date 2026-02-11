import axios from "axios";

axios.defaults.baseURL = import.meta.env.BASE_URL ?? "http://localhost:8080";

const setupAxiosInterceptors = () => {};

export default setupAxiosInterceptors;

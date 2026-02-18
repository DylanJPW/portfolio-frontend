import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import setupAxiosInterceptors from "./config/setupAxiosInterceptors";
import App from "./App";
import "./index.css";

setupAxiosInterceptors();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { getStore } from "./config/store";
import setupAxiosInterceptors from "./config/setupAxiosInterceptors";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";

const store = getStore();

setupAxiosInterceptors();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

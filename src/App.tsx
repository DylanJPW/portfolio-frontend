import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Header } from "./components/header/Header";
import { Router } from "./router";
import { SectionProvider } from "./components/shared/SectionContext";
import { AuthProvider } from "./components/login/AuthContext";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <SectionProvider>
        <div className="app">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Router />} />
            </Routes>
          </BrowserRouter>
        </div>
      </SectionProvider>
    </AuthProvider>
  );
}

export default App;

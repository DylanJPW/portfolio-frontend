import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Router } from "./router";
import { SectionProvider } from "./components/shared/SectionContext";
import "./App.scss";
import {
  AuthContext,
  type AuthContextType,
} from "./components/login/AuthContext";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const authContextValue: AuthContextType = {
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
  };

  return (
    <AuthContext value={authContextValue}>
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
    </AuthContext>
  );
}

export default App;

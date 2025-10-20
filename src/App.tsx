import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Router } from "./router";
import { SectionProvider } from "./components/shared/SectionContext";
import "./App.scss";

function App() {
  return (
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
  );
}

export default App;

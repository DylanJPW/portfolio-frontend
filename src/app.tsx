import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/header";
import "./app.scss";
import { Router } from "./router";

function App() {
  return (
    <div className="app">
      <Header />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Router />} />
          </Routes>
        </BrowserRouter>
    </ div>
  );
}

export default App;

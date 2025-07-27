import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/header";
import "./app.scss";
import { Router } from "./router";

function App() {
  return (
    <div className="app container-fluid">
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

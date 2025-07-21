import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/home-page/home-page";
import { AboutMePage } from "./components/about-me-page/about-me-page";
import { Header } from "./components/header/header";
import "./app.scss";
import { ProjectsPage } from "./components/projects-page/projects-page";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

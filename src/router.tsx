import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/home-page/HomePage";
import { ProjectsSection } from "./components/projects-page/ProjectsSection";

export const Router = () => {
  return (
    <div className="router content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsSection />} />
      </Routes>
    </div>
  );
};

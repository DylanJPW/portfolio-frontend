import { Route, Routes } from "react-router-dom"
import { HomePage } from "./components/home-page/HomePage"
import { AboutMePage } from "./components/about-me-page/AboutMePage"
import { ProjectsPage } from "./components/projects-page/ProjectsPage"


export const Router = () => {

  return (
    <div className="router content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </div>
  )
}
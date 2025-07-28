import { Route, Routes } from "react-router-dom"
import { HomePage } from "./components/home-page/home-page"
import { AboutMePage } from "./components/about-me-page/about-me-page"
import { ProjectsPage } from "./components/projects-page/projects-page"
import { PlanetSim } from "./components/planet-sim/planet-sim"


export const Router = () => {

  return (
    <div className="router content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/planet-sim" element={<PlanetSim />} />
      </Routes>
    </div>
  )
}
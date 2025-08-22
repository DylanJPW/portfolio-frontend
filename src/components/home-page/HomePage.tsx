import { AboutMePage } from "../about-me-page/AboutMePage";
import { ProjectsPage } from "../projects-page/ProjectsPage";
import "./HomePage.scss";

export const HomePage = () => {
  return (
    <div
      id="home"
      className="container d-flex flex-column home-page--height justify-content-center"
    >
      <AboutMePage />
      <ProjectsPage isOverview={true} projectLimit={4} />
    </div>
  );
};

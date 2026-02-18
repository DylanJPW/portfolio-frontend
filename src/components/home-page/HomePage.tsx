import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { AboutMePage } from "./AboutMeSection";
import { ExperienceSection } from "./ExperienceSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "../projects-page/ProjectsSection";
import { useEditPage } from "../cv/useEditPage";
import "./HomePage.scss";

export const HomePage = () => {
  const { pageContent, pageContentLoaded, getLatestCV } = useEditPage();

  useEffect(() => {
    if (!pageContentLoaded) getLatestCV();
  }, []);

  if (!pageContentLoaded) {
    return (
      <div className="d-flex flex-row align-items-center">
        <Spinner />
        <span className="ps-2 loading--font-size">Loading...</span>
      </div>
    );
  }

  return (
    <div
      id="home"
      className="d-flex flex-column w-100 smooth-scroll overflow-y-scroll"
    >
      <AboutMePage pageContent={pageContent} />
      <SkillsSection skillList={pageContent.skillList} />
      <ExperienceSection experienceList={pageContent.experienceList} />
      <ProjectsSection />
    </div>
  );
};

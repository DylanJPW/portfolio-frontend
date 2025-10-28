import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { AboutMePage } from "./AboutMeSection";
import { ExperienceSection } from "./ExperienceSection";
import { SkillsSection } from "./SkillsSection";
import { getLatestCV } from "../cv/edit-page.reducer";
import { ProjectsSection } from "../projects-page/ProjectsSection";
import { HeaderIsland } from "../header/HeaderIsland";
import "./HomePage.scss";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { pageContent, pageContentLoaded } = useAppSelector(
    (state) => state.cv
  );

  useEffect(() => {
    dispatch(getLatestCV());
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
    <div id="home" className="d-flex flex-row w-100 smooth-scroll">
      <HeaderIsland />
      <AboutMePage pageContent={pageContent} />
      <SkillsSection skillList={pageContent.skillList} />
      <ExperienceSection experienceList={pageContent.experienceList} />
      <ProjectsSection />
    </div>
  );
};

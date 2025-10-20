import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { AboutMePage } from "./AboutMeSection";
import { ExperienceSection } from "./ExperienceSection";
import { SkillsSection } from "./SkillsSection";
import { getLatestCV } from "../cv/edit-page.reducer";
import "./HomePage.scss";
import { SectionProvider } from "../shared/SectionContext";
import { ProjectsSection } from "../projects-page/ProjectsSection";

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
    <SectionProvider>
      <div id="home" className="d-flex flex-column w-100">
        <AboutMePage pageContent={pageContent} />
        <SkillsSection skillList={pageContent.skillList} />
        <ExperienceSection experienceList={pageContent.experienceList} />
        <ProjectsSection />
      </div>
    </SectionProvider>
  );
};

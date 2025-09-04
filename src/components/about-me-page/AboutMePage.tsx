import { SocialMediaLinks } from "../shared/SocialMediaLinks";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { getLatestCV } from "../cv/edit-page.reducer";
import { Spinner } from "react-bootstrap";
import { SkillsAndExpSection } from "./SkillsAndExpSection";
import './AboutMePage.scss';
import { SectionScrollButton } from "../shared/SectionScrollButton";

export const AboutMePage = () => {
  const dispatch = useAppDispatch();
  const { pageContent, pageContentLoaded } = useAppSelector(
    (state) => state.cv
  );

  useEffect(() => {
    dispatch(getLatestCV());
  }, []);



  return (
    <div
      id="about-me-section"
      className="d-flex flex-column text-center align-items-center h-100 position-relative"
    >
      {!pageContentLoaded ? (
        <div className="d-flex flex-row align-items-center">
          <Spinner />
          <span className="ps-2 loading--font-size">Loading...</span>
        </div>
      ) : (
        <>
          <div
            id="bio"
            className="d-flex flex-row w-100 h-100 justify-content-center bg-light"
          >
            <div className="d-flex flex-column w-50 screen-height justify-content-center ">
              <div>
                <h1>Full Stack Developer</h1>
                <p>With a focus on frontend development in React</p>
              </div>
              <div>
                <p className="px-5">{pageContent.summary.trim()}</p>
              </div>
            </div>
            <div className="d-flex flex-column w-50 h-100 align-items-center justify-content-center">
              <img
                src="./profilePicture.png"
                className="img-thumbnail w-50 bg-light border-radius-50"
              ></img>
              <div className="d-flex flex-row justify-content-center">
                <SocialMediaLinks />
              </div>
            </div>
          </div>
          <SectionScrollButton buttonText="Skills" sectionId="skills" />
          <div id="skills" className="w-100 h-100 border-start">
            <SkillsAndExpSection cvData={pageContent} />
          </div>
        </>
      )}
    </div>
  );
};

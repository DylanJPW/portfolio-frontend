import { SocialMediaLinks } from "../shared/SocialMediaLinks";
import { SkillsAccordion } from "./SkillsAccordion";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { getLatestCV } from "../cv/edit-page.reducer";
import { Spinner } from "react-bootstrap";

export const AboutMePage = () => {
  const dispatch = useAppDispatch();
  const { pageContent, pageContentLoaded } = useAppSelector((state) => state.cv);

  useEffect(() => {
    dispatch(getLatestCV());
  }, []);

  return (
    <div
      id="about-me-section"
      className="container-fluid d-flex flex-column text-center align-items-center justify-content-center section--height"
    >
      {!pageContentLoaded ? (
        <div className="d-flex flex-row align-items-center">
          <Spinner />
          <span className="ps-2 loading--font-size">Loading...</span>
        </div>
      ) : (
        <>
          <div className="row pb-4">
            <div className="col">
              <h1>Full Stack Developer</h1>
              <p>With a focus on frontend development in React</p>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex flex-column border-end border-3 justify-content-center">
              <h2>About Me</h2>
              <p className="px-5">{pageContent.summary.trim()}</p>
            </div>
            <div className="col">
              <img
                src="./profilePicture.png"
                className="img-thumbnail w-50 profile-picture--border-radius"
              ></img>
              <div className="d-flex flex-row justify-content-center">
                <SocialMediaLinks />
              </div>
            </div>
          </div>
          <div id="skills" className="row w-100 pt-4">
            <SkillsAccordion cvData={pageContent} />
          </div>
        </>
      )}
    </div>
  );
};

import { SocialMediaLinks } from "../shared/SocialMediaLinks";
import { SkillsAccordion } from "./SkillsAccordion";
import './AboutMePag.scss'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { getCV } from "../cv/cv.reducer";

export const AboutMePage = () => {
  const dispatch = useAppDispatch();
  const { cv, loaded } = useAppSelector((state) => state.cv)

  useEffect(() => {
    dispatch(getCV(1));
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <div
      id="about-me-section"
      className="container-fluid d-flex flex-column text-center align-items-center justify-content-center section--height"
    >
      <div className="row pb-4">
        <div className="col ">
          <h1>Full Stack Developer</h1>
          <p>With a focus on frontend development in React</p>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex flex-column border-end border-3 justify-content-center">
          <h2>About Me</h2>
          <p className="px-5">
            {cv.summary.trim()}
          </p>
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
        <SkillsAccordion cvData={cv}/>
      </div>
    </div>
  );
};

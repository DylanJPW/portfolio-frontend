import { SocialMediaLinks } from "../shared/SocialMediaLinks";
import { CVObject } from "../cv/types";
import { Section } from "../shared/Section";

interface AboutMeSectionProps {
  pageContent: CVObject;
}

export const AboutMePage = ({ pageContent }: AboutMeSectionProps) => {
  return (
    <Section id="about-me-section" title="About Me">
      <div className="d-flex flex-row w-100 justify-content-center screen-height">
        <div className="d-flex flex-column w-50 justify-content-center ">
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
    </Section>
  );
};

import { useState } from "react";
import { type ExperienceObject } from "../cv/types";
import { Section } from "../shared/Section";
import "./ExperienceSection.scss";

interface ExperienceItemProps {
  experienceItem: ExperienceObject;
}

const ExperienceItem = ({ experienceItem }: ExperienceItemProps) => {
  const { companyName, position, startDate, endDate, description, image } =
    experienceItem;
  const [expanded, setExpanded] = useState(false);

  const dateRange = `${startDate} - ${endDate ?? "Current"}`;

  return (
    <div className="col-12 col-md-6 col-sm-12 mb-3">
      <div
        className="card experience-card flex-row border-0 shadow-sm h-100 align-items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          {image?.imageUrl && (
            <img
              className="project-image"
              src={image.imageUrl}
              alt={image.altText}
              width={300}
              height={200}
            />
          )}
        </div>
        <div className="card-body d-flex flex-column justify-content-space-between">
          <h5 className="card-title mb-1">{companyName}</h5>
          <h6 className="card-subtitle text-muted mb-2">{position}</h6>

          <div className="experience-details">
            <p className="text-secondary small date-range">{dateRange}</p>
            <p
              className={`card-text text-secondary small description ${
                expanded ? "expanded" : ""
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ExperienceSectionProps {
  experienceList: ExperienceObject[];
}

export const ExperienceSection = ({
  experienceList,
}: ExperienceSectionProps) => {
  return (
    <Section id="experience-section" title="Experience">
      <div className="flex-grow-1 d-flex flex-column justify-content-center w-100 screen-height">
        <h2>Experience & Education</h2>
        <div className="row justify-content-center">
          {experienceList.map((experience) => (
            <ExperienceItem experienceItem={experience} />
          ))}
        </div>
      </div>
    </Section>
  );
};

import { useState } from "react";
import { ExperienceObject } from "../cv/types";
import { Section } from "../shared/Section";
import './ExperienceSection.scss';

interface ExperienceItemProps {
  experienceItem: ExperienceObject;
}

const ExperienceItem = ({ experienceItem }: ExperienceItemProps) => {
  const { companyName, position, startDate, endDate, description } =
    experienceItem;
  const [expanded, setExpanded] = useState(false);

  const dateRange = `${startDate} - ${endDate ?? "Current"}`;

  return (
    <div className="col-12 col-md-6 mb-3">
      <div className="card experience-card border-0 shadow-sm h-100">
        <div className="card-body d-flex flex-column justify-content-space-between">
          <h5 className="card-title mb-1">{companyName}</h5>
          <h6 className="card-subtitle text-muted mb-2">{position}</h6>
          <p className="text-secondary small mb-3">{dateRange}</p>

          {expanded && (
            <p className="card-text text-secondary small">{description}</p>
          )}

          <button
            className="btn btn-link p-0 text-decoration-none small"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
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
        <div className="row">
          {experienceList.map((experience) => (
            <ExperienceItem experienceItem={experience} />
          ))}
        </div>
      </div>
    </Section>
  );
};

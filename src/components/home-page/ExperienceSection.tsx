import { ExperienceObject } from "../cv/types";
import { Section } from "../shared/Section";
import { SectionScrollButtonGroup } from "../shared/SectionScrollButtonGroup";

interface ExperienceItemProps {
  experienceItem: ExperienceObject;
}

const ExperienceItem = ({ experienceItem }: ExperienceItemProps) => {
  const { companyName, position, startDate, endDate, description } =
    experienceItem;

  const dateRange = `${startDate} - ${endDate ?? "Current"}`;

  return (
    <div className="border-top py-2">
      <div>
        <h4>
          {companyName}, {position}
        </h4>
        <h5>{dateRange}</h5>
      </div>
      <div>{description}</div>
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
    <Section id="experience-section">
      <div className="flex-grow-1 d-flex flex-column justify-content-center screen-height">
        <h2>Experience & Education</h2>
        <div className="row">
          {experienceList.map((experience) => (
            <ExperienceItem experienceItem={experience} />
          ))}
        </div>
      </div>
      <SectionScrollButtonGroup
        buttons={[
          {
            buttonText: "Skills",
            sectionId: "skills-section",
            isUpButton: true,
          },
        ]}
      />
    </Section>
  );
};

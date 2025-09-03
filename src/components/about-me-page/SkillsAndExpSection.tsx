import {
  CVObject,
  ExperienceObject,
  SkillObject,
  SkillType,
} from "../cv/types";
import { useMemo } from "react";
import "./SkillsAndExpSection.scss";

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

function splitSkills(skills: SkillObject[]): [SkillObject[], SkillObject[]] {
  const techSkills = [] as SkillObject[];
  const softSkills = [] as SkillObject[];

  skills.forEach((skill) =>
    skill.type === SkillType.HARD
      ? techSkills.push(skill)
      : softSkills.push(skill)
  );

  return [techSkills, softSkills];
}

function handleScrollButton() {
  document.getElementById("experience-section")?.scrollIntoView({behavior: "smooth"});
}

interface SkillsSectionProps {
  techSkills: SkillObject[];
  softSkills: SkillObject[];
}

const SkillsSection = ({ techSkills, softSkills }: SkillsSectionProps) => {
  return (
    <div
      id="skills-section"
      className="d-flex flex-column h-100"
    >
      <div className="flex-grow-1 d-flex flex-column justify-content-center">
        <h2>Skills</h2>
        <div className="row">
          {[techSkills, softSkills].map((list, index) => {
            const title = `${index === 0 ? "Technical" : "Soft"} Skills`;
            return (
              <div className="col">
                <h3>{title}</h3>
                <ul className="list-group list-group-flush">
                  {Object.values(list).map((skill) => (
                    <li className="list-group-item">{skill.name}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface ExperienceSectionProps {
  experienceList: ExperienceObject[];
}

const ExperienceSection = ({ experienceList }: ExperienceSectionProps) => {
  return (
    <div
      id="experience-section"
      className="d-flex flex-column h-100 justify-content-center"
    >
      <h2>Experience & Education</h2>
      <div className="row">
        {experienceList.map((experience) => (
          <ExperienceItem experienceItem={experience} />
        ))}
      </div>
    </div>
  );
};

interface SkillsAndExpSectionProps {
  cvData: CVObject;
}

export const SkillsAndExpSection = ({ cvData }: SkillsAndExpSectionProps) => {
  const { skillList, experienceList } = cvData;
  const [techSkills, softSkills] = splitSkills(skillList);

  const [hasSkills, hasExperience] = useMemo<[boolean, boolean]>(() => {
    return [
      techSkills?.length > 0 || softSkills?.length > 0,
      experienceList?.length > 0,
    ];
  }, [skillList, experienceList]);

  return (
    <div className="h-100">
      <div
        id="skill-and-exp-section"
        className="h-100 overflow-x-hidden overflow-y-auto px-3"
      >
        {hasSkills && (
          <SkillsSection techSkills={techSkills} softSkills={softSkills} />
        )}
        {hasExperience && <ExperienceSection experienceList={experienceList} />}
      </div>
      <button
        className="btn btn-primary scroll-button justify-content-center align-items-center align-self-center mb-4"
        onClick={() => handleScrollButton()}
      >
        <i className="bi bi-chevron-down"></i>
      </button>
    </div>
  );
};

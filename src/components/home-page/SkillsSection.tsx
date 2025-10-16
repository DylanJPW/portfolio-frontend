import { SkillObject, SkillType } from "../cv/types";
import { Section } from "../shared/Section";
import { SectionScrollButtonGroup } from "../shared/SectionScrollButton";

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

interface SkillsSectionProps {
  skillList: SkillObject[];
}

export const SkillsSection = ({ skillList }: SkillsSectionProps) => {
  const [techSkills, softSkills] = splitSkills(skillList);

  return (
    <Section id="skills-section">
      <div className="flex-grow-1 d-flex flex-column justify-content-center w-100 screen-height">
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
      <SectionScrollButtonGroup
        buttons={[
          {
            buttonText: "Experience",
            sectionId: "experience-section",
          },
          {
            buttonText: "About Me",
            sectionId: "about-me-section",
            isUpButton: true,
          },
        ]}
      />
    </Section>
  );
};

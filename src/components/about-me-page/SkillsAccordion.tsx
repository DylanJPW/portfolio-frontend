import { Accordion, Col, Container, Row } from "react-bootstrap";
import {
  CVObject,
  ExperienceObject,
  SkillObject,
  SkillType,
} from "../cv/types";

interface ExperienceItemProps {
  experienceItem: ExperienceObject;
}

const ExperienceItem = ({ experienceItem }: ExperienceItemProps) => {
  const { companyName, position, startDate, endDate, description } =
    experienceItem;

  const dateRange = `${startDate} - ${endDate ?? "Current"}`;

  return (
    <Row className="align-items-center border-bottom py-2">
      <Col>
        <h4>
          {companyName}, {position}
        </h4>
        <h5>{dateRange}</h5>
      </Col>
      <Col>{description}</Col>
    </Row>
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

interface SkillsAccordionProps {
  cvData: CVObject;
}

export const SkillsAccordion = ({ cvData }: SkillsAccordionProps) => {
  const { skillList, experienceList } = cvData;
  const [techSkills, softSkills] = splitSkills(skillList);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Skills</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <h3>Technical Skills</h3>
              <ul>
                {Object.values(techSkills).map((skill) => (
                  <li>{skill.name}</li>
                ))}
              </ul>
            </Col>
            <Col>
              <h3>Soft Skills</h3>
              <ul>
                {Object.values(softSkills).map((skill) => (
                  <li>{skill.name}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Experience & Education</Accordion.Header>
        <Accordion.Body className="d-flex text-start ">
          <Container>
            <Row className="text-center">
              <Col>
                <h3>Company / University</h3>
              </Col>
              <Col>
                <h3>Description</h3>
              </Col>
            </Row>
            <Row className="align-items-center">
              {experienceList.map((experience) => (
                <ExperienceItem experienceItem={experience} />
              ))}
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

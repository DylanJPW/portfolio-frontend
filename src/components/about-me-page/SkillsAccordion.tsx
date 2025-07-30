import { Accordion, Col, Container, Row } from "react-bootstrap";

export const SkillsAccordion = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Skills</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <h3>Technical Skills</h3>
              <ul>
                <li>Typescript, React</li>
                <li>Unit testing, JUnit </li>
                <li>Java, Spring Boot </li>
                <li>SQL</li>
                <li>Git, Bitbucket</li>
              </ul>
            </Col>
            <Col>
              <h3>Soft Skills</h3>
              <ul>
                <li>Communication</li>
                <li>Teamworking </li>
                <li>Problem Solving</li>
                <li>Quick Learning</li>
                <li>Good Attention to Detail</li>
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
              <Col>
                <h4>IT CONSULTANT, FDM GROUP</h4>
                <h5>4th September 2023 - Current</h5>
              </Col>
              <Col>
                <ul>
                  <li>
                    I am currently working as an IT Consultant, on placement as
                    a fullstack Java developer for Citibank Belfast.
                  </li>
                  <li>
                    I have been working on an internal application with a major
                    focus on the frontend, making use of React and Jest, with
                    some backend work as well, involving Java, Spring, and SQL.
                  </li>
                  <li>
                    As part of an agile team, I have become very familiar with
                    the agile way of working, taking part in daily standups,
                    grooming sessions, retrospectives, and working through
                    sprints.
                  </li>
                  <li>
                    I've also made significant use of Git and Bitbucket for
                    version control, reviewing other developers' code and having
                    my own work reviewed.
                  </li>
                  <li>
                    Before being placed, I went through 3 months of software
                    development training.
                  </li>
                  <li>
                    I covered OOP using Java, JavaScript, SQL, web design with
                    the Spring Framework and React, testing with JUnit, the
                    Agile Framework, and other topics.
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

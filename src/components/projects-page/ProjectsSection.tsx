import { ProjectCard } from "./ProjectCard";
import { useEffect, useMemo, useState } from "react";
import { getProjects } from "./projects.reducer";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { Button } from "react-bootstrap";
import { AddProjectModal } from "./AddProjectModal";
import { Project } from "./types";
import { Section } from "../shared/Section";
import "./ProjectsSection.scss";

interface ProjectsPageProps {
  isOverview?: boolean;
  projectLimit?: number;
}

export const ProjectsSection = ({
  isOverview = false,
  projectLimit = 3,
}: ProjectsPageProps) => {
  const dispatch = useAppDispatch();
  const { projects, loaded } = useAppSelector((state) => state.projects);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<
    number | undefined
  >(undefined);

  const selectedProject = useMemo<Project>(
    () =>
      projects.find((project) => project.id === selectedProjectId) ||
      ({} as Project),
    [selectedProjectId]
  );

  useEffect(() => {
    if (!loaded) {
      dispatch(getProjects());
    }
  }, []);

  function handleOnClickAdd() {
    setSelectedProjectId(undefined);
    setShowModal(true);
  }

  return (
    <Section id="projects-section" title="Projects">
      <div className="container-fluid d-flex flex-column text-center align-items-center justify-content-center bg-light screen-height screen-width px-3">
        <h1>Projects</h1>
        <p>This is the projects page content.</p>
        {!isOverview && (
          <Button variant="primary" onClick={() => handleOnClickAdd()}>
            Add Project
          </Button>
        )}
        <div className="project-list container d-flex justify-content-center row row-cols-3 gx-5">
          {loaded &&
            Object.values(projects)
              .splice(0, projectLimit)
              .map((project, index) => (
                <ProjectCard
                  key={index}
                  {...project}
                  setShowEditModal={setShowModal}
                  setSelectedProjectId={setSelectedProjectId}
                  isOverview={isOverview}
                />
              ))}
        </div>
        <AddProjectModal
          show={showModal}
          setShow={setShowModal}
          project={selectedProject}
        />
      </div>
    </Section>
  );
};

import { useContext, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import { useProjects } from "./useProjects";
import { AddProjectModal } from "./AddProjectModal";
import { type Project } from "./types";
import { Section } from "../shared/Section";
import { AuthContext } from "../login/AuthContext";
import "./ProjectsSection.scss";

interface ProjectsPageProps {
  isOverview?: boolean;
  projectLimit?: number;
}

export const ProjectsSection = ({ projectLimit = 3 }: ProjectsPageProps) => {
  const { projects, loaded, addProject, deleteProject, updateProject } =
    useProjects();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<
    number | undefined
  >(undefined);

  const { isLoggedIn } = useContext(AuthContext);

  const selectedProject = useMemo<Project>(
    () =>
      projects.find((project) => project.id === selectedProjectId) ||
      ({} as Project),
    [selectedProjectId],
  );

  function handleOnClickAdd() {
    setSelectedProjectId(undefined);
    setShowModal(true);
  }

  return (
    <Section id="projects-section" title="Projects">
      <div className="container-fluid d-flex flex-column text-center align-items-center justify-content-center screen-height">
        <h1>Projects</h1>
        <p>This is the projects page content.</p>
        {isLoggedIn && (
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
                  deleteProject={deleteProject}
                />
              ))}
        </div>
        <AddProjectModal
          show={showModal}
          setShow={setShowModal}
          project={selectedProject}
          updateProject={updateProject}
          addProject={addProject}
        />
      </div>
    </Section>
  );
};

import { ProjectCard } from "./project-card";
import { useEffect, useMemo, useState } from "react";
import { getProjects } from "./projects.reducer";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { Button } from "react-bootstrap";
import { AddProjectModal } from "./add-project-modal";
import { Project } from "./types";

export const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const {projects, loaded} = useAppSelector((state) => state.projects);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>(undefined);

  const selectedProject = useMemo<Project>(() => projects.find((project) => project.id === selectedProjectId) || {} as Project, [selectedProjectId])

  useEffect(() => {
    if (!loaded) {
      dispatch(getProjects());
    }
  }, []);

  function handleOnClickAdd () {
    setSelectedProjectId(undefined);
    setShowModal(true);
  }

  return (
    <div className="projects-page">
      <h1>Projects</h1>
      <p>This is the projects page content.</p>
      <Button variant="primary" onClick={() => handleOnClickAdd()}>Add Project</Button>
      <div className="project-list-container">
        {loaded && Object.values(projects).map((project, index) => (
          <ProjectCard key={index} {...project} setShowEditModal={setShowModal} setSelectedProjectId={setSelectedProjectId}/>
        ))}
      </div>
      <AddProjectModal show={showModal} setShow={setShowModal} project={selectedProject}/>
    </div>
  );
};

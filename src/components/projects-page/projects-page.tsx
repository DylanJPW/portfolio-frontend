import { ProjectCard } from "./project-card";
import { useEffect, useState } from "react";
import { getProjects } from "./projects.reducer";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { Button } from "react-bootstrap";
import { AddProjectModal } from "./add-project-modal";

export const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const {projects, loaded} = useAppSelector((state) => state.projects);

  const [showModal, setShowModal] = useState<boolean>(false);

  console.log("Test projects:", projects);

  useEffect(() => {
    if (!loaded) {
      // Dispatch the action to fetch projects
      dispatch(getProjects());
    }
  }, []);

  return (
    <div className="projects-page">
      <h1>Projects</h1>
      <p>This is the projects page content.</p>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Project</Button>
      <div className="project-list-container">
        {loaded && Object.values(projects).map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
      <AddProjectModal show={showModal} setShow={setShowModal}/>
    </div>
  );
};

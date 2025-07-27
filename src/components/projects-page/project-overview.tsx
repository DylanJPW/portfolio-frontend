import { Button } from "react-bootstrap"
import { AddProjectModal } from "./add-project-modal"
import { ProjectCard } from "./project-card"
import { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { getProjects } from "./projects.reducer";
import { Project } from "./types";


export const ProjectOverview = () => {
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
  
  return (
    <div className="projects-page">
      <h1>Projects</h1>
      <p>This is the projects page content.</p>
      <div className="project-list-container">
        {loaded && Object.values(projects).map((project, index) => (
          <ProjectCard key={index} {...project} setShowEditModal={setShowModal} setSelectedProjectId={setSelectedProjectId}/>
        ))}
      </div>
    </div>
  )
}
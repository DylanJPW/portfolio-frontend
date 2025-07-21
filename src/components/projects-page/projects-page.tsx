import { ProjectCard } from "./project-card";
import { useEffect } from "react";
import { getProjects } from "./projects.reducer";
import { useAppDispatch, useAppSelector } from "../../config/store";

export const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const {projects, loaded} = useAppSelector((state) => state.projects);

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
      {loaded && Object.values(projects).map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
};

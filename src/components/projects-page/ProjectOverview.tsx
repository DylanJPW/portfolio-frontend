import { ProjectCard } from "./ProjectCard";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { getProjects } from "./projects.reducer";

export const ProjectOverview = () => {
  const dispatch = useAppDispatch();
  const { projects, loaded } = useAppSelector((state) => state.projects);

  const [_showModal, setShowModal] = useState<boolean>(false);
  const [_selectedProjectId, setSelectedProjectId] = useState<
    number | undefined
  >(undefined);

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
        {loaded &&
          Object.values(projects).map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              setShowEditModal={setShowModal}
              setSelectedProjectId={setSelectedProjectId}
            />
          ))}
      </div>
    </div>
  );
};

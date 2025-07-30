import { Button } from "react-bootstrap";
import { Project } from "./types";
import { useAppDispatch } from "../../config/store";
import { deleteProject, getProjects } from "./projects.reducer";

interface ProjectCardProps extends Project {
  setShowEditModal: (value: boolean) => void;
  setSelectedProjectId: (value: number) => void;
  isOverview?: boolean;
}

export const ProjectCard = ({ id, name, description, image, repoLink, tags, setShowEditModal, setSelectedProjectId, isOverview = false }: ProjectCardProps) => {
  const dispatch = useAppDispatch();

  function handleOnClickEdit() {
    setSelectedProjectId(id);
    setShowEditModal(true);
  }

  async function handleOnClickDelete() {
    await dispatch(deleteProject(id));
    dispatch(getProjects());
  }

  return (
    <div className="card project-card col d-flex flex-column align-items-center mx-3">
      <h2 className="project-name">{name}</h2>
      {image?.imageUrl && <img className="project-image" src={image.imageUrl} alt={image.altText} width={300} height={200}/>}
      <p className="project-description">{description}</p>
      <div className="project-repo-link">Link to Git Repo: {repoLink}</div>
      <div className="project-tags">Tags: {tags?.join(", ")}</div>
      { !isOverview && 
        <div className="project-buttons-container d-flex flex-row">
          <Button className="me-3" variant="secondary" onClick={() => handleOnClickEdit()}>Edit</Button>
          <Button variant="outline-danger" onClick={() => handleOnClickDelete()}>Delete</Button>
        </div>
      }
    </div>
  );
};

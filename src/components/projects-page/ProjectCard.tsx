import { Button } from "react-bootstrap";
import { type Project } from "./types";
import { useAuth } from "../login/AuthContext";

interface ProjectCardProps extends Project {
  setShowEditModal: (value: boolean) => void;
  setSelectedProjectId: (value: number) => void;
  deleteProject: (value: number) => void;
}

export const ProjectCard = ({
  id,
  name,
  description,
  image,
  repoLink,
  tags,
  setShowEditModal,
  setSelectedProjectId,
  deleteProject,
}: ProjectCardProps) => {
  const { isLoggedIn } = useAuth();

  function handleOnClickEdit() {
    setSelectedProjectId(id);
    setShowEditModal(true);
  }

  async function handleOnClickDelete() {
    await deleteProject(id);
  }

  return (
    <div className="card project-card col d-flex flex-column align-items-center mx-3">
      <h2 className="project-name">{name}</h2>
      {image?.imageUrl && (
        <img
          className="project-image"
          src={image.imageUrl}
          alt={image.altText}
          width={300}
          height={200}
        />
      )}
      <p className="project-description">{description}</p>
      <div className="project-repo-link">Link to Git Repo: {repoLink}</div>
      <div className="project-tags">Tags: {tags?.join(", ")}</div>
      {isLoggedIn && (
        <div className="project-buttons-container d-flex flex-row">
          <Button
            className="me-3"
            variant="secondary"
            onClick={() => handleOnClickEdit()}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => handleOnClickDelete()}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

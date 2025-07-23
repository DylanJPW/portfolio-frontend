import { Button } from "react-bootstrap";
import { Project } from "./types";
import { useAppDispatch } from "../../config/store";
import { deleteProject, getProjects } from "./projects.reducer";

export const ProjectCard = ({ id, name, description, image, repoLink, tags }: Project) => {
  const dispatch = useAppDispatch();

  const handleOnClick = async () => {
    await dispatch(deleteProject(id));
    dispatch(getProjects());
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      {image?.imageUrl && <img src={image.imageUrl} alt={image.altText} width={300} height={200}/>}
      <p>{description}</p>
      <div>Link to Git Repo: {repoLink}</div>
      <div>Tags: {tags?.join(", ")}</div>
      <Button onClick={() => handleOnClick()}>Delete</Button>
    </div>
  );
};

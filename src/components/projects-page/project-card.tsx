import { Project } from "./types";

export const ProjectCard = ({ name, description, image, repoLink, tags }: Project) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      {image?.imageUrl && <img src={image.imageUrl} alt={image.altText} />}
      <p>{description}</p>
      <div>Link to Git Repo: {repoLink}</div>
      <div>Tags: {tags?.join(", ")}</div>
    </div>
  );
};

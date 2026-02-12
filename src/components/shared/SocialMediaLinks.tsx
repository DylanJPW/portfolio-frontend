import { EMAIL_LINK, GITHUB_URL, LINKEDIN_URL } from "../../constants";

export const SocialMediaLinks = () => {
  return (
    <div className="flex flex-row gap-3">
      <a href={EMAIL_LINK} target="_blank" rel="noopener noreferrer">
        <i className="bi bi-envelope-at-fill fs-2 text-body"></i>
      </a>
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
        <i className="bi bi-linkedin fs-2 text-body"></i>
      </a>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        <i className="bi bi-github fs-2 text-body"></i>
      </a>
    </div>
  );
};

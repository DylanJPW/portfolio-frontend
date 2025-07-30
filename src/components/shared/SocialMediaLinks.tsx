import { GITHUB_URL, LINKEDIN_URL } from "../../constants"

export const SocialMediaLinks = () => {
  return (
    <>
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
        <i className="bi bi-linkedin fs-2 pe-3 text-body"></i>
      </a>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        <i className="bi bi-github fs-2 text-body"></i>
      </a>
    </>
  )
}
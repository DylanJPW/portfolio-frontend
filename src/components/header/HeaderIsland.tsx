import { useSectionContext } from "../shared/SectionContext";
import "./HeaderIsland.scss";

export const HeaderIsland = () => {
  const { sections, activeSectionId, setActiveSectionId } = useSectionContext();

  return (
    <div className="header-island">
      {sections.map((section) => {
        const isActive = activeSectionId === section.id;

        return (
          <div className={`section-link-container ${isActive ? "active" : ""}`}>
            <a
              className={`section-link`}
              href={`/#${section.id}`}
              onClick={() => setActiveSectionId(section.id)}
            >
              {section.title}
            </a>
          </div>
        );
      })}
    </div>
  );
};

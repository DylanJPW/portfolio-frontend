interface SectionScrollButtonProps {
  buttonText: string;
  sectionId: string;
  direction: 'up' | 'down'
}

export const SectionScrollButton = ({
  buttonText,
  sectionId,
  direction,
}: SectionScrollButtonProps) => {
  function handleScrollButton() {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button
      className="btn btn-primary scroll-button d-flex flex-row justify-content-center align-items-center mb-4 position-absolute"
      onClick={() => handleScrollButton()}
    >
      <i className={`bi bi-chevron-${direction}`}></i>
      <span className="scroll-button-text">{buttonText}</span>
    </button>
  );
};

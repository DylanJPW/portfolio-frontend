interface SectionScrollButtonProps {
  buttonText: string;
  sectionId: string;
}

export const SectionScrollButton = ({
  buttonText,
  sectionId,
}: SectionScrollButtonProps) => {
  function handleScrollButton() {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button
      className="btn btn-primary scroll-button d-flex flex-row justify-content-center align-items-center mb-4 position-absolute"
      onClick={() => handleScrollButton()}
    >
      <i className="bi bi-chevron-down"></i>
      <span className="scroll-button-text">{buttonText}</span>
    </button>
  );
};

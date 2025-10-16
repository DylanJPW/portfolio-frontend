import "./SectionScrollButtonGroup.scss";

interface SectionScrollButtonProps {
  buttonText: string;
  sectionId: string;
  isUpButton?: boolean;
}

const SectionScrollButton = ({
  buttonText,
  sectionId,
  isUpButton = false,
}: SectionScrollButtonProps) => {
  function handleScrollButton() {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }

  const direction = isUpButton ? "up" : "down";

  return (
    <button
      className="btn btn-dark scroll-button d-flex flex-row justify-content-center align-items-center mb-4 mx-2"
      onClick={() => handleScrollButton()}
    >
      <i className={`bi bi-chevron-${direction}`}></i>
      <span className="scroll-button-text">{buttonText}</span>
    </button>
  );
};

interface SectionScrollButtonGroupProps {
  buttons: SectionScrollButtonProps[];
}

export const SectionScrollButtonGroup = ({
  buttons,
}: SectionScrollButtonGroupProps) => {
  return (
    <div className="scroll-button-group">
      {buttons.map((button) => (
        <SectionScrollButton key={button.sectionId} {...button} />
      ))}
    </div>
  );
};

import { ReactNode, useEffect } from "react";
import {
  SectionScrollButtonGroup,
  SectionScrollButtonProps,
} from "./SectionScrollButtonGroup";
import { useSections } from "./SectionContext";

export interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export const Section = (props: SectionProps) => {
  const { id, title, children } = props;
  const { sections, registerSection } = useSections();

  useEffect(() => {
    registerSection({ id, title });
  }, [id, title, registerSection]);

  const index = sections.findIndex((s) => s.id === id);
  const prevSection = index > 0 ? sections[index - 1] : null;
  const nextSection = index < sections.length - 1 ? sections[index + 1] : null

  const buttons: SectionScrollButtonProps[] = [
    ...(prevSection
      ? [
          {
            buttonText: prevSection.title,
            sectionId: prevSection.id,
            isUpButton: true,
          },
        ]
      : []),
    ...(nextSection
      ? [{ buttonText: nextSection.title, sectionId: nextSection.id }]
      : []),
  ];

  return (
    <div
      id={id}
      className="d-flex flex-column w-100 text-center align-items-center position-relative px-3"
    >
      {children}
      <SectionScrollButtonGroup buttons={buttons} />
    </div>
  );
};

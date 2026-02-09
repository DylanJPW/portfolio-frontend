import { ReactNode, useEffect } from "react";
import { useSectionContext } from "./SectionContext";

export interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export const Section = (props: SectionProps) => {
  const { id, title, children } = props;
  const { registerSection } = useSectionContext();

  useEffect(() => {
    registerSection({ id, title });
  }, [id, title, registerSection]);

  return (
    <div
      id={id}
      className="d-flex flex-column w-100 text-center align-items-center position-relative px-3"
    >
      {children}
    </div>
  );
};

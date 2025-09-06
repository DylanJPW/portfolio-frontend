import { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
}

export const Section = ({ id, children }: SectionProps) => {
  return (
    <div
      id={id}
      className="d-flex flex-column w-100 text-center align-items-center position-relative px-3"
    >
      {children}
    </div>
  );
};

import { createContext, ReactNode, useContext, useState } from "react";

interface SectionInfo {
  id: string;
  title: string;
}

interface SectionContextType {
  sections: SectionInfo[];
  activeSectionId: string;
  setActiveSectionId: (value: string) => void;
  registerSection: (section: SectionInfo) => void;
}

const SectionContext = createContext<SectionContextType>({
  sections: [],
  activeSectionId: "",
  setActiveSectionId: () => {},
  registerSection: () => {},
});

interface SectionProviderProps {
  children: ReactNode;
}

export const SectionProvider = ({ children }: SectionProviderProps) => {
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  function registerSection(section: SectionInfo) {
    setSections((prev) =>
      prev.find((s) => s.id === section.id) ? prev : [...prev, section]
    );
  }

  return (
    <SectionContext.Provider
      value={{ sections, activeSectionId, setActiveSectionId, registerSection }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export function useSectionContext() {
  return useContext(SectionContext);
}

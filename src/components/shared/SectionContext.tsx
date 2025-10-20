import { createContext, ReactNode, useContext, useState } from "react";

interface SectionInfo {
  id: string;
  title: string;
}

interface SectionContextType {
  sections: SectionInfo[];
  registerSection: (section: SectionInfo) => void;
}

const SectionContext = createContext<SectionContextType>({
  sections: [],
  registerSection: () => {},
});

interface SectionProviderProps {
  children: ReactNode;
};

export const SectionProvider = ({
  children,
}: SectionProviderProps) => {
  const [sections, setSections] = useState<SectionInfo[]>([]);

  function registerSection(section: SectionInfo) {
    setSections((prev) => (prev.find((s) => s.id === section.id) ? prev : [...prev, section]));
  }

  return (
    <SectionContext.Provider value={{ sections, registerSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export function useSections() {
  return useContext(SectionContext);
}
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

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
  const initialActiveSectionId = window?.location?.hash
    ? window.location.hash.slice(1)
    : "about-me-section";
  const [activeSectionId, setActiveSectionId] = useState<string>(
    initialActiveSectionId
  );

  function registerSection(section: SectionInfo) {
    setSections((prev) =>
      prev.find((s) => s.id === section.id) ? prev : [...prev, section]
    );
  }

  // Scroll to section on initial load if there's a hash
  const hasNavigatedToHash = useRef<boolean>(false);
  useEffect(() => {
    if (hasNavigatedToHash.current) return;

    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        hasNavigatedToHash.current = true;
      }
    }
  }, [sections]);

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

import { useState } from "react";
import axios from "axios";
import { type CVObject, SkillType } from "./types";
import mockCVData from "./mock-cv-info.json";

const mockCV: CVObject = {
  ...mockCVData,
  skillList: mockCVData.skillList.map((skill) => ({
    ...skill,
    type: skill.type as SkillType,
  })),
  uploadDate: new Date(mockCVData.uploadDate),
};

const requestURL = "api/cv";

export function useEditPage() {
  const [pageContent, setPageContent] = useState<CVObject>(mockCV);
  const [parsedCV, setParsedCV] = useState<CVObject>(mockCV);
  const [pageContentLoaded, setPageContentLoaded] = useState<boolean>(false);
  const [parsedCVLoaded, setParsedCVLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getParsedCV = async (cvFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", cvFile);
      const res = await axios.post(requestURL + "parseCVFile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setParsedCV(res.data);
      setParsedCVLoaded(true);
    } catch (e) {
      setError("Failed to read CV");
      setParsedCVLoaded(true);
    }
  };

  const saveCV = async (cv: CVObject) => {
    await axios.post(requestURL + "/saveCV", cv);
  };

  const getCVById = async (cvId: number) => {
    const res = await axios.get(requestURL + `/getCV/${cvId}`);
    setPageContent(res.data);
  };

  const getLatestCV = async () => {
    try {
      const res = await axios.get(requestURL + `/getLatestCV`);
      setPageContent(res.data);
      setPageContentLoaded(true);
    } catch (e) {
      setError("Failed to load latest CV");
      setPageContentLoaded(true);
    }
  };

  return {
    pageContent,
    parsedCV,
    pageContentLoaded,
    parsedCVLoaded,
    error,
    getParsedCV,
    saveCV,
    getCVById,
    getLatestCV,
  };
}

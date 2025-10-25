import { ImageObject } from "../../types";

export interface CVObject {
  id: number;
  summary: string;
  experienceList: ExperienceObject[];
  skillList: SkillObject[];
  uploadDate: Date;
}

export interface ExperienceObject {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  image?: ImageObject;
}

export interface SkillObject {
  name: string;
  type: SkillType;
  yearsExperience: number;
  description: string;
  image?: ImageObject;
}

export enum SkillType {
  SOFT = "SOFT",
  HARD = "HARD",
}

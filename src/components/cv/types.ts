import { type ImageObject } from "../../types";

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

export const SkillType = {
  SOFT: "SOFT",
  HARD: "HARD",
} as const;

export type SkillType = (typeof SkillType)[keyof typeof SkillType];

export interface CVObject {
  id: number;
  summary: string;
  experienceList: ExperienceObject[];
  skillList: SkillObject[];
  uploadDate: Date;
}

export interface ExperienceObject {
  id: number;
  companyName: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
}

export interface SkillObject {
  id: number;
  name: string;
  type: SkillType;
  yearsExperience: number;
  description: string;
}

export enum SkillType {
  SOFT = 'SOFT',
  HARD = 'HARD',
}
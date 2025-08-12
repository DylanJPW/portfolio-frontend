export interface CVObject {
  id: number;
  summary: string;
  experienceList: ExperienceObject[];
  skillList: SkillObject[];
  uploadDate: Date;
}

export interface ExperienceObject {
  id: number;
  cvId: number;
  companyName: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface SkillObject {
  id: number;
  name: string;
  type: SkillType;
  yearsExpereince: number;
  description: string;
}

export enum SkillType {
  SOFT = 'SOFT',
  HARD = 'HARD',
}
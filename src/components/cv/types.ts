export interface CVObject {
  id: number;
  summary: string;
  experience: ExperienceObject[];
  Skills: SkillObject[];
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
  cvId: number;
  name: string;
  skillType: SkillType;
  yearsExpereince: number;
  description: string;
}

enum SkillType {
  SOFT = 'Soft',
  HARD = 'Hard',
}
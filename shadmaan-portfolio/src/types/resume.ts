export type ResumeVariant = 'fullstack' | 'powerplatform';

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface QuickStat {
  label: string;
  value: string;
}

export interface ResumeData {
  variant: ResumeVariant;
  name: string;
  title: string;
  tagline: string;
  summary: string;
  about: string;
  contact: ContactInfo;
  stats: QuickStat[];
  experience: ExperienceItem[];
  skills: SkillGroup[];
  resumePdfPath: string;
  pageTitle: string;
}

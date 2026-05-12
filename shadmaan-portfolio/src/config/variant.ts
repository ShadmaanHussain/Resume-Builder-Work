import type { ResumeData, ResumeVariant } from '@/types/resume';
import { fullstackData } from '@/data/fullstack';
import { powerplatformData } from '@/data/powerplatform';

const isVariant = (v: string | undefined): v is ResumeVariant =>
  v === 'fullstack' || v === 'powerplatform';

export const activeVariant: ResumeVariant = isVariant(import.meta.env.VITE_RESUME_VARIANT)
  ? import.meta.env.VITE_RESUME_VARIANT
  : 'fullstack';

export const activeResume: ResumeData =
  activeVariant === 'powerplatform' ? powerplatformData : fullstackData;

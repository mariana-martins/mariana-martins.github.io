import type { PortfolioData } from '@/types';

import { contact } from './contact';
import { experience } from './experience';
import { funFacts } from './funFacts';
import { introduction } from './introduction';
import { picks } from './picks';
import { projects } from './projects';
import { skills } from './skills';

/** One module per domain; this file only assembles them */
export const data: PortfolioData = {
  introduction,
  projects,
  experience,
  skills,
  funFacts,
  contact,
  picks,
};

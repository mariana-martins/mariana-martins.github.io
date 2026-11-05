import type { PortfolioData } from '@/types';

import { contact } from './contact';
import { experience } from './experience';
import { funFacts } from './funFacts';
import { introduction } from './introduction';
import { picks } from './picks';
import { profile } from './profile';
import { projects } from './projects';
import { skills } from './skills';

export const data: PortfolioData = {
  profile,
  introduction,
  projects,
  experience,
  skills,
  funFacts,
  contact,
  picks,
};

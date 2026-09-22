import type { PickOfCategory } from '@/types';

/** Newest finish first; undated entries sit at the end */
export const courses: Array<PickOfCategory<'course'>> = [
  {
    id: 'subatomic',
    title: 'Subatomic: The Complete Guide To Design Tokens',
    author: 'Brad Frost',
    featured: true,
    category: 'course',
    status: 'completed',
    rating: 4,
    finishedAt: '2025-06',
    link: 'https://bradfrost.com/blog/post/introducing-subatomic-the-complete-guide-to-design-tokens/',
  },
  {
    id: 'ai-and-design-systems',
    title: 'AI and Design Systems',
    author: 'Brad Frost',
    featured: true,
    category: 'course',
    status: 'in-progress',
    link: 'https://aianddesign.systems/',
  },
  {
    id: 'total-typescript',
    title: 'Total Typescript',
    author: 'Matt Pocock',
    featured: true,
    category: 'course',
    status: 'in-progress',
    link: 'https://www.totaltypescript.com/',
  },
];

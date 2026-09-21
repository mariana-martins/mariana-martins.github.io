import type { PickItem } from '@/types';

/**
 * Margot's Picks. The main page shows the first LEARNING_SHELF_LIMIT entries
 * in this order; the drawer lists them all, sorted by the user.
 */
export const picks: PickItem[] = [
  {
    id: 'ai-and-design-systems',
    title: 'AI and Design Systems',
    author: 'Brad Frost',
    category: 'course',
    status: 'in-progress',
    link: 'https://aianddesign.systems/',
  },
  {
    id: 'subatomic',
    title: 'Subatomic: The Complete Guide To Design Tokens',
    author: 'Brad Frost',
    category: 'course',
    status: 'completed',
    rating: 5,
    finishedAt: '2025-06',
    link: 'https://bradfrost.com/blog/post/introducing-subatomic-the-complete-guide-to-design-tokens/',
  },
  {
    id: 'total-typescript',
    title: 'Total Typescript',
    author: 'Matt Pocock',
    category: 'course',
    status: 'in-progress',
    link: 'https://www.totaltypescript.com/',
  },
  {
    id: 'design-systems',
    title:
      'Design Systems: A practical guide to creating design languages for digital products',
    author: 'Alla Kholmatova',
    category: 'book',
    status: 'planned',
    link: 'https://www.smashingmagazine.com/design-systems-book/',
  },
  {
    id: 'give-and-take',
    title: 'Give and Take: Why Helping Others Drives Success',
    author: 'Adam Grant',
    category: 'book',
    status: 'planned',
    link: 'https://adamgrant.net/book/give-and-take/',
  },
  {
    id: 'untamed',
    title: 'Untamed',
    author: 'Glennon Doyle',
    category: 'book',
    status: 'completed',
    rating: 5,
    finishedAt: '2022-03',
    note: 'The book that taught me to trust my intuition.',
  },
  {
    id: 'lotr-fellowship',
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    director: 'Peter Jackson',
    year: 2001,
    category: 'movie',
    status: 'completed',
    rating: 5,
    finishedAt: '2024-12',
    note: 'Extended edition only, obviously.',
  },
  {
    id: 'from',
    title: 'FROM',
    creator: 'John Griffin',
    year: 2022,
    category: 'series',
    status: 'in-progress',
    note: 'Nobody leaves. I keep coming back.',
  },
];

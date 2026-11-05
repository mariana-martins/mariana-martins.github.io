import type React from 'react';

import { App } from '@/App';
import { PATHS } from '@/constants';
import { contact } from '@/data/contact';

export interface Route {
  path: string;
  title: string;
  description: string;
  load: () => Promise<{ default: React.ComponentType }>;
  notFound?: boolean;
}

const SITE_NAME = contact.name;

export const routes: Route[] = [
  {
    path: PATHS.home,
    title: `${SITE_NAME} | Frontend & Design Engineer`,
    description:
      'Mariana Martins Menezes, Frontend & Design Engineer in Melbourne. Accessible, high-performance React and TypeScript interfaces, design systems and a UI/UX design background.',
    load: () => Promise.resolve({ default: App }),
  },
  {
    path: PATHS.fitMySpace,
    title: `Fit My Space case study | ${SITE_NAME}`,
    description:
      'How Fit My Space was built: a three-tier design token pipeline with Style Dictionary, Radix-based components with accessibility enforced by the types, and Next.js rendering chosen per page.',
    load: () => import('@/pages/FitMySpacePage'),
  },
  {
    path: PATHS.siteBuild,
    title: `How this site was built | ${SITE_NAME}`,
    description:
      'Ten years of one portfolio, from a Bootstrap page in 2016 to a prerendered React site whose accessibility is measured on its rendered pixels.',
    load: () => import('@/pages/SiteBuildPage'),
  },
];

const notFoundRoute: Route = {
  path: PATHS.notFound,
  title: `Page not found | ${SITE_NAME}`,
  description: 'There is no page at this address.',
  load: () => import('@/pages/NotFoundPage'),
  notFound: true,
};

export const prerenderedRoutes: Route[] = [...routes, notFoundRoute];

export function findRoute(pathname: string): Route {
  const withoutIndex = pathname.replace(/index\.html$/, '');
  const normalised = withoutIndex.endsWith('/')
    ? withoutIndex
    : `${withoutIndex}/`;
  return routes.find((route) => route.path === normalised) ?? notFoundRoute;
}

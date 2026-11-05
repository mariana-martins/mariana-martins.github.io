import React from 'react';

import { ArticleHeader } from '@components/Article/Article';
import { ButtonLink } from '@components/ButtonLink/ButtonLink';
import { PageShell } from '@components/PageShell/PageShell';
import { ArrowRight, Home } from 'lucide-react';

import { PATHS, PROJECTS_CRUMB } from '@/constants';
import { notFound } from '@/data/pages/notFound';

export default function NotFoundPage(): React.JSX.Element {
  return (
    <PageShell breadcrumbs={[{ label: notFound.title }]}>
      <ArticleHeader
        eyebrow={notFound.eyebrow}
        title={notFound.title}
        lead={notFound.lead}
        divider={false}
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href={PATHS.home} icon={Home}>
            Go to the home page
          </ButtonLink>
          <ButtonLink
            href={PROJECTS_CRUMB.href}
            variant="secondary"
            icon={ArrowRight}
          >
            See the projects
          </ButtonLink>
        </div>
      </ArticleHeader>
    </PageShell>
  );
}

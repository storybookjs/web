import type { FC } from 'react';
import Link from 'next/link';
import { Container } from '@repo/ui';
import { Testimonial } from '../testimonial';
import { IllustratedFeatureList } from '../illustrated-feature-list';
import { Branch, Document as Doc, Overlap, Search } from './icons';
import { LogoGitlab } from './logo-gitlab';

const features = [
  {
    icon: <Search />,
    title: 'Find any component or page in your app',
    description: 'Storybook is a single source of truth for UI.',
    link: {
      label: 'Learn about search',
      href: '/docs/get-started/browse-stories#sidebar-and-canvas',
    },
    media: '/home/document/homepage-search-stories-lg.mp4',
    poster: '/home/document/homepage-search-stories-poster-lg.jpg',
  },
  {
    icon: <Doc />,
    title: 'Generate UI docs automatically',
    description: 'Write Markdown and build custom docs.',
    link: {
      label: 'Learn about docs addon',
      href: '/docs/writing-docs/introduction',
    },
    media: '/home/document/homepage-component-document-lg.mp4',
    poster: '/home/document/homepage-component-document-poster-lg.jpg',
  },
  {
    icon: <Overlap />,
    title: 'Reuse components across pages and apps',
    description: 'Every story is a use case that you can reuse.',
    link: {
      label: 'Learn about reuse',
      href: '/docs/get-started/browse-stories#use-stories-to-build-uis',
    },
    media: '/home/document/homepage-reuse-components-across-apps-lg.mp4',
    poster:
      '/home/document/homepage-reuse-components-across-apps-poster-lg.jpg',
  },
  {
    icon: <Branch />,
    title: 'Track component history and versions',
    description: 'QA unexpected bugs by going back in time.',
    link: {
      label: 'Learn about versioning',
      href: '/docs/sharing/publish-storybook#versioning-and-history',
    },
    media: '/home/document/homepage-component-history-lg.mp4',
    poster: '/home/document/homepage-component-history-poster-lg.jpg',
  },
];

export const Document: FC = () => {
  return (
    <div className="overflow-hidden border-b border-zinc-600 pt-12 sm:pt-20 md:pt-28">
      {features.map((feature) => (
        <Link
          as="video"
          href={feature.media}
          key={feature.title}
          rel="preload"
        />
      ))}
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Document UI for your team to reuse
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            Storybook brings together UI, examples, and documentation in one
            place. That helps your team and AI agents adopt existing UI
            patterns.
          </p>
        </div>
      </Container>
      <IllustratedFeatureList
        alignment="right"
        bgColor="#c3eeaf"
        features={features}
      />
      <Testimonial
        avatarUrl="https://avatars0.githubusercontent.com/u/3028593?s=460&v=4"
        jobTitle="Author of Building Design Systems"
        logo={<LogoGitlab />}
        name="Taurie Davis"
        text="“Storybook has made developing components more streamlined by allowing us to easily include technical documentation within our design system!”"
      />
    </div>
  );
};

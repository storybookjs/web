import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import {
  Accessibility,
  Document,
  Eye,
  Interact,
  Pipeline,
  Pixel,
} from './icons';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}

const features: Feature[] = [
  {
    icon: <Eye />,
    title: 'Track edge cases',
    href: '/docs/writing-stories',
    description: 'Stories are reproductions you can debug in dev and QA.',
  },
  {
    icon: <Pixel />,
    title: 'Visual test appearance',
    href: '/docs/writing-tests/visual-testing',
    description: 'Pinpoint UI changes down to the pixel.',
  },
  {
    icon: <Interact />,
    title: 'Interaction test behavior',
    href: '/docs/writing-tests/interaction-testing',
    description: 'Simulate user behavior and assert in the browser.',
  },
  {
    icon: <Accessibility />,
    title: 'Accessibility tests',
    href: '/docs/writing-tests/accessibility-testing',
    description: 'Check every story for WCAG and ARIA issues.',
  },
  {
    icon: <Document />,
    title: 'Coverage reports',
    href: '/docs/writing-tests/test-coverage',
    description: 'Find which parts of your UI need tested.',
  },
  {
    icon: <Pipeline />,
    title: 'Test in CI',
    href: '/docs/writing-tests/in-ci',
    description:
      'Run story tests in CI and see the results as a status check on each pull request.',
  },
];

/**
 * Outlined facet cards with the icon beside the text. Borrows the Visual ·
 * Accessibility · Interaction facet row on /features/test (1px white/10
 * outline, 5px radius, 40px icon on the left). Each card links to its docs
 * page, named by its title, and lifts on hover like the Develop framework
 * tiles.
 */
export const FeatureGrid: FC = () => (
  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
    {features.map(({ icon, title, description, href }, index) => (
      <li className="flex" key={title}>
        <Link
          className="flex w-full items-start gap-5 rounded-[5px] border border-white/10 p-5 transition-[transform,border-color] hover:-translate-y-1 hover:border-zinc-400 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6"
          aria-labelledby={`verify-feature-${String(index)}`}
          href={href}
        >
          <div aria-hidden className="h-10 w-10 shrink-0 relative top-[2px]">
            {icon}
          </div>
          <div>
            <h3
              className="font-bold leading-6 text-white"
              id={`verify-feature-${String(index)}`}
            >
              {title}
            </h3>
            <p className="mt-1 leading-6 text-white/80">{description}</p>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);

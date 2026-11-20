import type { FC, ReactNode } from 'react';
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
}

const features: Feature[] = [
  {
    icon: <Eye />,
    title: 'Spot test',
    description: 'Stories are tests you can debug in dev and QA.',
  },
  {
    icon: <Pixel />,
    title: 'Visual test appearance',
    description: 'Pinpoint UI changes down to the pixel.',
  },
  {
    icon: <Interact />,
    title: 'Interaction test behavior',
    description: 'Simulate user behavior and assert in the browser.',
  },
  {
    icon: <Accessibility />,
    title: 'Accessibility tests',
    description: 'Check every story for WCAG and ARIA issues.',
  },
  {
    icon: <Document />,
    title: 'Coverage Reports',
    description: 'Track how much of your frontend code is tested.',
  },
  {
    icon: <Pipeline />,
    title: 'Test in CI',
    description:
      'Run the same story tests in CI and see the results as a status check on each pull request.',
  },
];

/**
 * Outlined facet cards with the icon beside the text. Borrows the Visual ·
 * Accessibility · Interaction facet row on /features/test (1px white/10
 * outline, 5px radius, 40px icon on the left).
 */
export const FeatureGrid: FC = () => (
  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
    {features.map(({ icon, title, description }) => (
      <li
        className="flex items-start gap-5 rounded-[5px] border border-white/10 p-5 sm:p-6"
        key={title}
      >
        <div className="h-10 w-10 shrink-0">{icon}</div>
        <div>
          <h3 className="font-bold leading-6 text-white">{title}</h3>
          <p className="mt-1 leading-6 text-white/80">{description}</p>
        </div>
      </li>
    ))}
  </ul>
);

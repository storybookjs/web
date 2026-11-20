import type { ReactNode } from 'react';
import {
  Accessibility,
  Document,
  Eye,
  Interact,
  Pipeline,
  Pixel,
} from '../icons';

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  /** The icon's main colour, used for tints and glows in some variants */
  hue: string;
}

export const features: Feature[] = [
  {
    icon: <Eye />,
    title: 'Spot test',
    description: 'Stories are tests you can debug in dev and QA.',
    hue: '#79C9FC',
  },
  {
    icon: <Pixel />,
    title: 'Visual test appearance',
    description: 'Pinpoint UI changes down to the pixel.',
    hue: '#37D5D3',
  },
  {
    icon: <Interact />,
    title: 'Interaction test behavior',
    description:
      'Simulate user behavior and assert in the browser. Failures point to the story and assertion that broke.',
    hue: '#1EA7FD',
  },
  {
    icon: <Accessibility />,
    title: 'Accessibility tests',
    description: 'Check every story for WCAG and ARIA issues.',
    hue: '#A849FF',
  },
  {
    icon: <Document />,
    title: 'Coverage Reports',
    description: 'Track how much of your frontend code is tested.',
    hue: '#FEBD32',
  },
  {
    icon: <Pipeline />,
    title: 'Test in CI',
    description:
      'Run the same story tests in CI and see the results as a status check on each pull request.',
    hue: '#A0DB77',
  },
];

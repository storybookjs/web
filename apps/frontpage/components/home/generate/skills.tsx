import type { FC } from 'react';
import type { FeatureItem } from '../illustrated-feature-list';
import { IllustratedFeatureList } from '../illustrated-feature-list';
import { AgentReuse } from '../document/agent-media';
import { Code, Eye, Projects } from '../test/icons';
import { ComponentDocsMedia } from './component-docs-media';
import { AgentTest } from './skill-icons';
import { TestStoriesRunMedia } from './test-stories-run-media';
import { UIReviewMedia } from './ui-review-media';
import { UIWorkflowMedia } from './ui-workflow-media';
import { WriteStoriesMedia } from './write-stories-media';

/** Panel color behind every skill's visual */
export const SKILLS_PANEL_COLOR = '#6F2CAC';

/** The five Storybook agent skills. UI workflow runs the other four, so it comes last */
export const skills: FeatureItem[] = [
  {
    icon: <AgentReuse />,
    title: 'Component docs',
    description:
      'Looks up components in your Storybook, including their props and usage examples, and reuses them instead of building new ones.',
    link: {
      label: 'Learn about component docs',
      href: '/docs/ai/skills/component-docs',
    },
    illustration: <ComponentDocsMedia />,
  },
  {
    icon: <Code />,
    title: 'Write stories',
    description:
      'Writes a story for each state a component can reach, such as loading, empty, error, and disabled.',
    link: {
      label: 'Learn about writing stories',
      href: '/docs/ai/skills/write-stories',
    },
    illustration: <WriteStoriesMedia />,
  },
  {
    icon: <AgentTest />,
    title: 'Test stories',
    description:
      'Runs the tests with accessibility checks of the stories it changed, fixes what fails, and runs them again.',
    link: {
      label: 'Learn about testing stories',
      href: '/docs/ai/skills/test-stories',
    },
    illustration: <TestStoriesRunMedia />,
  },
  {
    icon: <Eye />,
    title: 'UI review',
    description:
      'Review the changes, not the diff. A review groups the stories a change affects, so you can check them in one place.',
    link: {
      label: 'Learn about UI review',
      href: '/docs/ai/skills/ui-review',
    },
    illustration: <UIReviewMedia />,
  },
  {
    icon: <Projects />,
    title: 'UI workflow',
    description:
      'Looks up existing components, writes or updates stories for each change, runs story tests, and publishes a review.',
    link: {
      label: 'Learn about the UI workflow',
      href: '/docs/ai/skills/ui-workflow',
    },
    illustration: <UIWorkflowMedia />,
  },
];

export const Skills: FC = () => (
  <IllustratedFeatureList
    alignment="right"
    bgColor={SKILLS_PANEL_COLOR}
    features={skills}
  />
);

import type { FC } from 'react';
import type { FeatureItem } from '../illustrated-feature-list';
import { IllustratedFeatureList } from '../illustrated-feature-list';
import { AgentReuse, DocumentAgentMedia } from '../document/agent-media';
import { Code, Eye, Projects } from '../test/icons';
import { ChangedStories } from './changed-stories';
import { ReviewSummary } from './review-summary';
import { FitWindow } from './fit-window';
import { GenerateUIAnimation } from './generate-ui-animation';
import { AgentTest, TestStoriesMedia } from './test-stories-media';

/** Panel color behind every skill's visual */
export const SKILLS_PANEL_COLOR = '#6F2CAC';

/** The five Storybook agent skills, in the order the UI workflow runs them */
export const skills: FeatureItem[] = [
  {
    icon: <Projects />,
    title: 'UI workflow',
    description:
      'Looks up existing components, writes or updates stories for each change, runs story tests, and publishes a review.',
    link: {
      label: 'Learn about the UI workflow',
      href: '/docs/ai/skills/ui-workflow',
    },
    illustration: (
      <FitWindow width={760}>
        <GenerateUIAnimation />
      </FitWindow>
    ),
  },
  {
    icon: <AgentReuse />,
    title: 'Component docs',
    description:
      'Chooses the right component and uses only correct props.',
    link: {
      label: 'Learn about component docs',
      href: '/docs/ai/skills/component-docs',
    },
    illustration: <DocumentAgentMedia />,
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
    illustration: (
      <FitWindow width={560}>
        <ChangedStories />
      </FitWindow>
    ),
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
    illustration: <TestStoriesMedia />,
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
    illustration: (
      <FitWindow mobileWidth={520} width={760}>
        <ReviewSummary />
      </FitWindow>
    ),
  },
];

export const Skills: FC = () => (
  <IllustratedFeatureList
    alignment="right"
    bgColor={SKILLS_PANEL_COLOR}
    features={skills}
  />
);

import preview from '../../../../.storybook/preview';
import { SKILLS_PANEL_COLOR } from '../skills';
import { AgentCard, SkillStage, StorybookWindow } from './skill-stage';

const meta = preview.meta({
  title: 'Home/Generate/SkillStage',
  component: SkillStage,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div
        className="h-[480px] w-[480px] rounded-lg"
        style={{ backgroundColor: SKILLS_PANEL_COLOR }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'An empty skill stage',
    window: (
      <StorybookWindow>
        <div className="flex h-[300px] items-center justify-center text-sm text-[#5C6570]">
          Storybook page
        </div>
      </StorybookWindow>
    ),
    agent: (
      <AgentCard file="Button.tsx" status="Working on it" statusKey="act">
        <div className="h-12 rounded border border-zinc-700 bg-zinc-800" />
      </AgentCard>
    ),
  },
});

/** The window and agent card in their fixed slots */
export const Default = meta.story({});

/** The agent card's settled status turns green */
export const Done = meta.story({
  args: {
    agent: (
      <AgentCard done file="Button.tsx" status="All done" statusKey="settle">
        <div className="h-12 rounded border border-zinc-700 bg-zinc-800" />
      </AgentCard>
    ),
  },
});

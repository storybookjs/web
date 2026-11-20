import { expect } from 'storybook/test';
import preview from '../../../.storybook/preview';
import { Skills } from './skills';

const meta = preview.meta({
  title: 'Home/Generate/Skills',
  component: Skills,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200], pauseAnimationAtEnd: true },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground pb-12">
        <Story />
      </div>
    ),
  ],
});

/** UI workflow is selected first */
export const Default = meta.story({});

/** Each skill swaps in its own visual */
export const UIReviewSelected = meta.story({
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /UI review/ });
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  },
});

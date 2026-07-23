import type { ComponentProps } from 'react';
import { useMotionValue } from 'framer-motion';
import preview from '../../../../.storybook/preview';
import { VSCode } from './vscode';

const meta = preview.meta({
  title: 'Home/Develop/Demo/VSCode',
  component: VSCode,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="relative w-[1000px] h-[600px] bg-zinc-900">
        <Story />
      </div>
    ),
  ],
  render: function Render() {
    const scrollProgress = useMotionValue(0);
    const appearProgress = useMotionValue(1);
    return <VSCode appearProgress={appearProgress} scrollProgress={scrollProgress} />;
  },
  args: {} as ComponentProps<typeof VSCode>,
});

export const Default = meta.story({});

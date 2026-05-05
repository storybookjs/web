import preview from '../../.storybook/preview';
import { Container } from './index';

const meta = preview.meta({
  title: 'Container',
  component: Container,
  parameters: { layout: 'fullscreen' },
  args: {
    children: (
      <div className="ui-bg-blue-100 ui-py-12 ui-text-center">
        Container content
      </div>
    ),
  },
});

export const Default = meta.story({});

export const Small = meta.story({ args: { variant: 'small' } });

import type { Meta, StoryObj } from '@storybook/react';
import { Pre } from './pre';

const meta = {
  title: 'Pre',
  component: Pre,
} satisfies Meta<typeof Pre>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    raw: `import { Meta, Canvas } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';
  
<Meta of={ButtonStories} />
  
<Canvas of={ButtonStories.Primary} />
    `,
    children: (
      <code
        data-language="js"
        data-theme="Firefox Light"
        style={{ display: 'grid' }}
      >
        <span data-line="">
          <span style={{ color: '#DD00A9' }}>import</span>
          <span style={{ color: '#4A4A4F' }}>{` {`}</span>
          <span style={{ color: '#0074E8' }}> Meta</span>
          <span style={{ color: '#939393' }}>, </span>
          <span style={{ color: '#0074E8' }}>Canvas</span>
          <span style={{ color: '#4A4A4F' }}>{` }`}</span>
          <span style={{ color: '#DD00A9' }}> from</span>
          <span style={{ color: '#003EAA' }}>{` '@storybook/blocks'`}</span>
          <span style={{ color: '#939393' }}>;</span>
        </span>
        <span data-line="">
          <span style={{ color: '#DD00A9' }}>import</span>
          <span style={{ color: '#4A4A4F' }}> *</span>
          <span style={{ color: '#DD00A9' }}> as</span>
          <span style={{ color: '#0074E8' }}> ButtonStories</span>
          <span style={{ color: '#DD00A9' }}> from</span>
          <span style={{ color: '#003EAA' }}>{` './Button.stories'`}</span>
          <span style={{ color: '#939393' }}>;</span>
        </span>
        <span data-line=""> </span>
        <span data-line="">
          <span style={{ color: '#767676' }}>&lt;</span>
          <span style={{ color: '#8000D7' }}>Meta</span>
          <span style={{ color: '#939393' }}> of</span>
          <span style={{ color: '#4A4A4F' }}>{`={`}</span>
          <span style={{ color: '#0074E8' }}>ButtonStories</span>
          <span style={{ color: '#4A4A4F' }}>{`}`}</span>
          <span style={{ color: '#767676' }}> /&gt;</span>
        </span>
        <span data-line=""> </span>
        <span data-line="">
          <span style={{ color: '#767676' }}>&lt;</span>
          <span style={{ color: '#8000D7' }}>Canvas</span>
          <span style={{ color: '#939393' }}> of</span>
          <span style={{ color: '#4A4A4F' }}>{`={`}</span>
          <span style={{ color: '#8000D7' }}>ButtonStories</span>
          <span style={{ color: '#4A4A4F' }}>.</span>
          <span style={{ color: '#058B00' }}>Primary</span>
          <span style={{ color: '#4A4A4F' }}>{`}`}</span>
          <span style={{ color: '#767676' }}> /&gt;</span>
        </span>
      </code>
    ),
  },
};

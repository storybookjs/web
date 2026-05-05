import preview from '../../../.storybook/preview';
import { Figure } from './figure';
import { Figcaption } from './figcaption';

const meta = preview.meta({
  title: 'MDX/Figure',
  component: Figure,
  parameters: { layout: 'centered' },
});

export const WithCaption = meta.story({
  args: {
    children: (
      <>
        <pre className="ui-bg-zinc-100 ui-p-4 ui-rounded">
          console.log(&quot;hello&quot;)
        </pre>
        <Figcaption>example.ts</Figcaption>
      </>
    ),
  },
});

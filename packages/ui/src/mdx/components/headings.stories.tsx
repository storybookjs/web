import preview from '../../../.storybook/preview';
import { H1, H2, H3, H4, H5 } from './headings';

const meta = preview.meta({
  title: 'MDX/Headings',
  component: H1,
  parameters: { layout: 'padded' },
});

export const AllLevels = meta.story({
  render: () => (
    <div>
      <H1 id="h1">Heading 1</H1>
      <H2 id="h2">Heading 2</H2>
      <H3 id="h3">Heading 3</H3>
      <H4 id="h4">Heading 4</H4>
      <H5 id="h5">Heading 5</H5>
    </div>
  ),
});

export const SingleH2 = meta.story({
  render: () => <H2 id="section">Section title</H2>,
});

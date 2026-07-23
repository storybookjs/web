import preview from '../../../.storybook/preview';
import { OrderedList, UnorderedList, ListItem } from './lists';

const meta = preview.meta({
  title: 'MDX/Lists',
  component: UnorderedList,
  parameters: { layout: 'padded' },
});

export const Unordered = meta.story({
  render: () => (
    <UnorderedList>
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
      <ListItem>Third item</ListItem>
    </UnorderedList>
  ),
});

export const Ordered = meta.story({
  render: () => (
    <OrderedList>
      <ListItem>Install Storybook</ListItem>
      <ListItem>Write your first story</ListItem>
      <ListItem>Run the test suite</ListItem>
    </OrderedList>
  ),
});

import preview from '../../../.storybook/preview';
import { Table } from './table';
import { Tr } from './tr';
import { Th } from './th';
import { Td } from './td';

const meta = preview.meta({
  title: 'MDX/Table',
  component: Table,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({
  render: () => (
    <Table>
      <thead>
        <Tr>
          <Th>Prop</Th>
          <Th>Type</Th>
          <Th>Description</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>
            <code>variant</code>
          </Td>
          <Td>
            <code>string</code>
          </Td>
          <Td>Visual style of the component</Td>
        </Tr>
        <Tr>
          <Td>
            <code>size</code>
          </Td>
          <Td>
            <code>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</code>
          </Td>
          <Td>Size variant</Td>
        </Tr>
      </tbody>
    </Table>
  ),
});

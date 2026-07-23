import preview from '../../.storybook/preview';
import { ScrollArea } from './scroll-area';

const meta = preview.meta({
  title: 'UI/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
});

const items = Array.from({ length: 30 }, (_, i) => `Item ${String(i + 1)}`);

export const Default = meta.story({
  args: {
    className: 'h-[200px] w-[300px] rounded border border-slate-200 p-4',
    children: (
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
});

export const ShortContent = meta.story({
  args: {
    className: 'h-[200px] w-[300px] rounded border border-slate-200 p-4',
    children: (
      <ul className="space-y-2 text-sm">
        <li>Just a few items</li>
        <li>No scroll needed</li>
        <li>End</li>
      </ul>
    ),
  },
});

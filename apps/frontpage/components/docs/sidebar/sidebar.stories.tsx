import preview from '../../../.storybook/preview';
import { Sidebar } from './sidebar';

const meta = preview.meta({
  title: 'Docs/Sidebar/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
});

export const Default = meta.story({
  args: {
    children: (
      <div className="space-y-2">
        <div className="text-sm font-bold">Section</div>
        <div className="text-sm text-zinc-600">Item one</div>
        <div className="text-sm text-zinc-600">Item two</div>
        <div className="text-sm text-zinc-600">Item three</div>
      </div>
    ),
  },
});

export const LongContent = meta.story({
  args: {
    children: (
      <ul className="space-y-1">
        {Array.from({ length: 60 }).map((_, i) => (
          <li
            className="text-sm text-zinc-600"
            // eslint-disable-next-line react/no-array-index-key -- fixture
            key={i}
          >
            Sidebar item {i + 1}
          </li>
        ))}
      </ul>
    ),
  },
});

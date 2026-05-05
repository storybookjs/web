import { useState } from 'react';
import { expect, screen } from 'storybook/test';
import preview from '../../.storybook/preview';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './index';

const meta = preview.meta({
  title: 'DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
});

export const Basic = meta.story({
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="ui-rounded ui-border ui-px-3 ui-py-1">
        Open menu
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }));
    await expect(
      await screen.findByRole('menuitem', { name: 'Profile' }),
    ).toBeInTheDocument();
  },
});

export const WithCheckboxes = meta.story({
  render: function Render() {
    const [bookmarks, setBookmarks] = useState(true);
    const [urls, setUrls] = useState(false);
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="ui-rounded ui-border ui-px-3 ui-py-1">
          View
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
            Show bookmarks
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={urls} onCheckedChange={setUrls}>
            Show URLs
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'View' }));
  },
});

export const WithRadios = meta.story({
  render: function Render() {
    const [position, setPosition] = useState('bottom');
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="ui-rounded ui-border ui-px-3 ui-py-1">
          Panel position
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Panel position' }));
  },
});

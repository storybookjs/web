import type { FC } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronSmallDownIcon } from '@storybook/icons';
import Link from 'next/link';
import { Button } from '../../ui/button';

interface MenuItemProps {
  id: string;
  label: string;
  href: string;
}

interface MenuProps {
  label: string;
  items: MenuItemProps[];
}

export const MobileMenu: FC<MenuProps> = ({ items, label }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DropdownMenu.Trigger asChild>
          <Button className="md:hidden" size="sm" variant="ghostHome">
            {label} <ChevronSmallDownIcon />
          </Button>
        </DropdownMenu.Trigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className="min-w-[200px] ml-1 bg-white rounded p-1 shadow-xl will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-50"
          sideOffset={4}
        >
          <DropdownMenu.Group>
            {items.map((item) => (
              <DropdownMenu.Item asChild key={item.id}>
                <Link
                  className="flex data-[highlighted]:bg-slate-100 select-none outline-none rounded text-sm px-3 h-8 items-center"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

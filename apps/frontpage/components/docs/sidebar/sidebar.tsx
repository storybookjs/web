'use client';

import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { cn } from '@repo/utils';
import { usePathname } from 'next/navigation';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ScrollBar } from '../../ui/scroll-area';
import {
  APIIcon,
  ChangelogIcon,
  DocsIcon,
  IntegrationsIcon,
  TutorialsIcon,
} from './icons';

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <nav className="w-[228px] hidden md:block sticky self-start top-[72px]">
      <ScrollAreaPrimitive.Root className="relative overflow-hidden h-[calc(100vh-72px)] w-full">
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
          <div className="py-12 pl-1 pr-4">
            <nav className="flex flex-col gap-1.5 text-sm font-medium">
              <Line
                href="/docs"
                icon={<DocsIcon />}
                isActive={
                  pathname.startsWith('/docs') &&
                  !pathname.startsWith('/docs/api')
                }
                label="Documentation"
              />
              <Line
                href="/docs/api"
                icon={<APIIcon />}
                isActive={pathname.startsWith('/docs/api')}
                label="API"
              />
              <Line
                href="/#"
                icon={<TutorialsIcon />}
                isActive={pathname === '/tutorials'}
                label="Tutorials"
              />
              <Line
                href="/integrations"
                icon={<IntegrationsIcon />}
                isActive={false}
                label="Integrations"
              />
              <Line
                href="/releases"
                icon={<ChangelogIcon />}
                isActive={pathname.startsWith('/releases')}
                label="Changelog"
              />
            </nav>
            {children}
          </div>
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar className="pt-12 pb-6" />
      </ScrollAreaPrimitive.Root>
    </nav>
  );
};

export const Line: FC<{
  isActive: boolean;
  href: string;
  icon: ReactNode;
  label: string;
}> = ({ isActive, href, label, icon }) => (
  <Link
    className={cn(
      'flex items-center gap-3 hover:text-blue-500 transition-colors px-2 h-8 font-bold',
      isActive && 'text-blue-500',
    )}
    href={href}
  >
    {icon}
    {label}
  </Link>
);

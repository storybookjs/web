"use client";

import { FC } from "react";
import { StorybookLogo } from "../logos/storybook";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  BookmarkHollowIcon,
  ChevronSmallDownIcon,
  GlobeIcon,
  RSSIcon,
  StarHollowIcon,
} from "@storybook/icons";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const headerVariants = cva(
  "w-full lg:border-b lg:border-slate-100 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90",
  {
    variants: {
      variant: {
        home: "",
        docs: "sticky top-0 z-40 backdrop-blur",
      },
    },
    defaultVariants: {
      variant: "home",
    },
  }
);

export interface HeaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof headerVariants> {}

export const Header: FC<HeaderProps> = ({ variant }) => {
  return (
    <header className={cn(headerVariants({ variant }))}>
      <div className="max-w-8xl mx-auto">
        <div className="h-18 py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0 flex items-center">
          <div className="flex gap-6 items-center">
            <Link href="/">
              <StorybookLogo />
            </Link>
            <NavigationMenu.Root>
              <NavigationMenu.List className="flex gap-2">
                <NavigationMenu.Item>
                  <NavigationMenuLink title="Why" href="#" />
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenuLink title="Showcase" href="#" />
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenuLink title="Docs" href="/docs" />
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenuLink title="Integrations" href="#" />
                </NavigationMenu.Item>
                <NavigationMenu.Item className="relative">
                  <NavigationMenuTrigger title="Community" />
                  <NavigationMenu.Content className="absolute top-8 left-0 p-3 shadow-xl z-30 bg-white min-w-[288px] rounded">
                    <DropdownLink
                      href="#"
                      title="Get involved"
                      description="Join thousands of frontend devs to learn and share"
                      icon={
                        <StarHollowIcon size={20} className="text-yellow-500" />
                      }
                    />
                    <DropdownLink
                      href="#"
                      title="Blog & updates"
                      description="News and updates from the Storybook team"
                      icon={<RSSIcon size={20} className="text-purple-500" />}
                    />
                    <DropdownLink
                      href="#"
                      title="Find jobs"
                      description="Browse job board for roles that use Storybook"
                      icon={
                        <BookmarkHollowIcon
                          size={20}
                          className="text-cyan-500"
                        />
                      }
                    />
                    <DropdownLink
                      href="#"
                      title="Speak at conferences"
                      description="Submit talks to conferences about Storybook"
                      icon={<GlobeIcon size={20} className="text-blue-500" />}
                    />
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenuLink title="Enterprise" href="#" />
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>
        </div>
        <div className="flex items-center p-4 border-b border-slate-900/10 lg:hidden dark:border-slate-50/[0.06]">
          Submenu
        </div>
      </div>
    </header>
  );
};

interface NavigationMenuTriggerProps {
  title: string;
}

const NavigationMenuTrigger: FC<NavigationMenuTriggerProps> = ({ title }) => {
  return (
    <NavigationMenu.Trigger className="h-8 hover:bg-blue-100 text-slate-500 hover:text-blue-500 transition-colors group flex select-none items-center justify-between gap-1 rounded px-2 text-sm font-bold dark:text-white dark:hover:bg-blue-900">
      {title}
      <ChevronSmallDownIcon
        className="text-violet10 relative top-[1px] transition-transform ease-in group-data-[state=open]:-rotate-180"
        aria-hidden
      />
    </NavigationMenu.Trigger>
  );
};

interface NavigationMenuLinkProps {
  title: string;
  href: string;
}

const NavigationMenuLink: FC<NavigationMenuLinkProps> = ({ title, href }) => {
  const pathname = usePathname();

  return (
    <NavigationMenu.Link
      className={cn(
        "h-8 hover:bg-blue-100 text-slate-500 hover:text-blue-500 transition-colors group flex select-none items-center justify-between gap-2 rounded px-2 text-sm font-bold dark:text-white dark:hover:bg-blue-900",
        pathname === href && "bg-blue-100 text-blue-500"
      )}
      href={href}
    >
      {title}
    </NavigationMenu.Link>
  );
};

interface DropdownLinkProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

const DropdownLink: FC<DropdownLinkProps> = ({
  title,
  href,
  description,
  icon,
}) => {
  return (
    <NavigationMenu.Link
      className="group flex gap-4 p-3 leading-none transition-colors"
      href={href}
    >
      {icon && <div className="flex-1 mt-1">{icon}</div>}
      <div>
        <div className="text-sm font-bold group-hover:text-blue-500">
          {title}
        </div>
        <div className="text-sm">{description}</div>
      </div>
    </NavigationMenu.Link>
  );
};

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
import { cn } from "../../lib/tailwind";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search } from "./search";
import { MobileMenu } from "./mobile-menu";
import { Submenu } from "./submenu";
import { Button } from "../ui/button";

export const Header: FC<HeaderProps> = ({
  variant = "home",
  tree,
  activeVersion,
}) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "w-full",
        variant === "home" && "bg-[#181C22] lg:border-b lg:border-zinc-700",
        variant === "system" &&
          "sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-zinc-900/80 lg:border-b lg:border-zinc-200 dark:border-zinc-700"
      )}
    >
      <div className="max-w-8xl mx-auto">
        <div
          className={cn(
            "h-18 py-4 px-4 sm:px-8 md:px-8 lg:border-0 flex items-center justify-between",
            variant === "home" && "border-b border-zinc-700",
            variant === "system" &&
              "border-b border-zinc-200 dark:border-zinc-700"
          )}
        >
          <div className="flex gap-6 items-center">
            <Link href="/" className="pl-2 md:pl-0">
              <StorybookLogo color={variant === "home" ? "white" : "system"} />
            </Link>
            <NavigationMenu.Root className="max-[920px]:hidden">
              <NavigationMenu.List className="flex gap-2">
                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Button
                      asChild
                      variant={variant === "home" ? "ghostHome" : "ghostSystem"}
                      size="md"
                    >
                      <a href="#">Why</a>
                    </Button>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Button
                      asChild
                      variant={variant === "home" ? "ghostHome" : "ghostSystem"}
                      size="md"
                    >
                      <a href="#">Showcase</a>
                    </Button>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Button
                      asChild
                      active={pathname === "/docs" ? "system" : undefined}
                      variant={variant === "home" ? "ghostHome" : "ghostSystem"}
                      size="md"
                    >
                      <Link href="/docs">Docs</Link>
                    </Button>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Button
                      asChild
                      variant={variant === "home" ? "ghostHome" : "ghostSystem"}
                      size="md"
                    >
                      <a href="#">Integrations</a>
                    </Button>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item className="relative">
                  <NavigationMenu.Trigger asChild>
                    <Button
                      variant={variant === "home" ? "ghostHome" : "ghostSystem"}
                      size="md"
                    >
                      Community
                      <ChevronSmallDownIcon
                        className="top-px transition-transform ease-in group-data-[state=open]:-rotate-180"
                        aria-hidden
                      />
                    </Button>
                  </NavigationMenu.Trigger>
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
                  <NavigationMenu.Link asChild>
                    <Button
                      asChild
                      variant={variant === "home" ? "ghostHome" : "ghostSystem"}
                      size="md"
                    >
                      <a href="#">Enterprise</a>
                    </Button>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>
          <Search variant={variant} />
          <MobileMenu variant={variant} />
        </div>
        {pathname.startsWith("/docs") && (
          <Submenu
            variant={variant}
            tree={tree}
            activeVersion={activeVersion}
          />
        )}
      </div>
    </header>
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

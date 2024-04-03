import { FC, ReactNode } from "react";
import { MenuIcon } from "@storybook/icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { cn } from "@/lib/tailwind";

export const MobileMenu: FC<HeaderProps> = ({ variant }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            "group flex items-center justify-center gap-2 text-sm text-zinc-500 font-bold hover:bg-blue-100 hover:text-blue-500  dark:text-white dark:hover:bg-blue-500/10 h-9 w-9 rounded min-[920px]:hidden",
            variant === "home" && "text-white"
          )}
        >
          <MenuIcon size={18} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white w-screen md:w-64 h-[80vh] md:h-[50vh] rounded-b-lg md:rounded-lg shadow-xl data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-50 md:border md:border-zinc-200 mt-6 md:mt-2"
          align="end"
        >
          <ScrollArea.Root className="w-full h-full" type="always">
            <ScrollArea.Viewport className="w-full h-full p-4 md:p-6 md:pt-5">
              <DropdownLabel>Why</DropdownLabel>
              <DropdownItem href="/docs/get-started/why-storybook">
                Why Storybook
              </DropdownItem>
              <DropdownItem
                href="https://www.componentdriven.org/"
                isExternal
                target="_blank"
              >
                Component-driven UI
              </DropdownItem>

              <DropdownLabel>Docs</DropdownLabel>
              <DropdownItem href="/docs">Guides</DropdownItem>
              <DropdownItem href="/tutorials">Tutorials</DropdownItem>
              <DropdownItem href="releases">Changelog</DropdownItem>

              <DropdownLabel>Showcase</DropdownLabel>
              <DropdownItem href="https://storybook.js.org/showcase" isExternal>
                Explore
              </DropdownItem>
              <DropdownItem
                href="https://storybook.js.org/showcase/projects"
                isExternal
              >
                Projects
              </DropdownItem>
              <DropdownItem
                href="https://storybook.js.org/showcase/glossary"
                isExternal
              >
                Component glossary
              </DropdownItem>

              <DropdownLabel>Community</DropdownLabel>
              <DropdownItem href="https://storybook.js.org/integrations">
                Integrations
              </DropdownItem>
              <DropdownItem href="/community">Get involved</DropdownItem>
              <DropdownItem href="https://storybook.js.org/blog">
                Blog
              </DropdownItem>
              <DropdownItem href="https://chromatic-ui.notion.site/Storybook-Jobs-Board-950e001e4a114a39980a5b09c3a3b3e1?pvs=4">
                Jobs board
              </DropdownItem>
              <DropdownItem href="https://chromatic-ui.notion.site/Give-a-conference-talk-about-Storybook-e8d8e78d4d0a448a811a8d927194c527?pvs=4">
                Conference board
              </DropdownItem>

              <DropdownLabel>Chromatic</DropdownLabel>
              <DropdownItem
                href="https://www.chromatic.com/?utm_source=storybook_website&utm_medium=link&utm_campaign=storybook"
                isExternal
                target="_blank"
              >
                Visual testing
              </DropdownItem>
              <DropdownItem
                href="https://www.chromatic.com/sales?utm_source=storybook_website&utm_medium=link&utm_campaign=storybook"
                isExternal
                target="_blank"
              >
                Enterprise
              </DropdownItem>
              <ScrollArea.Scrollbar
                className="flex select-none touch-none p-1 w-4 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="flex-1 bg-zinc-200 rounded-full" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Viewport>
          </ScrollArea.Root>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface DropdownLabelProps {
  children: ReactNode;
}

interface DropdownItemProps {
  children: ReactNode;
  isExternal?: boolean;
  href: string;
  target?: "_blank" | "_self";
}

export const DropdownLabel: FC<DropdownLabelProps> = ({ children }) => (
  <DropdownMenu.Label className="text-md md:text-sm h-10 flex items-center mt-4 first:mt-0">
    {children}
  </DropdownMenu.Label>
);

export const DropdownItem: FC<DropdownItemProps> = ({
  children,
  isExternal,
  href,
  target = "_self",
}) => (
  <DropdownMenu.Item
    className="text-md md:text-sm h-10 md:h-8 flex items-center border-l border-l-zinc-200 ml-1 pl-3 text-zinc-500"
    asChild
  >
    {isExternal ? (
      <a href={href} target={target}>
        {children}
      </a>
    ) : (
      <Link href={href}>{children}</Link>
    )}
  </DropdownMenu.Item>
);

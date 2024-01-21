import { FC } from "react";
import { MenuIcon } from "@storybook/icons";
import { usePathname } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { NavDocs } from "../docs/sidebar/nav-docs";
import { cn } from "@/lib/tailwind";

export const Submenu: FC<HeaderProps> = ({ variant, tree, activeVersion }) => {
  const pathname = usePathname();
  const activeSection = tree?.find((node) => node.slug.startsWith(pathname));

  let title = "";
  if (activeSection?.sidebar?.title) {
    title = activeSection.sidebar.title;
  } else if (activeSection?.title) {
    title = activeSection.title;
  }

  return (
    <div
      className={cn(
        "flex items-center p-4 sm:px-8 md:hidden gap-2 text-sm",
        variant === "home" && "border-b border-zinc-700 text-white",
        variant === "system" && "border-b border-zinc-200 dark:border-zinc-700"
      )}
    >
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
            className="bg-white w-screen md:w-64 h-[74vh] md:h-[50vh] rounded-b-lg md:rounded-lg shadow-xl data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade md:border md:border-zinc-200 mt-[17px] md:mt-2"
            align="end"
          >
            <ScrollArea.Root className="w-full h-full">
              <ScrollArea.Viewport className="w-full h-full p-4 md:p-6 md:pt-5">
                {activeVersion && (
                  <NavDocs tree={tree} activeVersion={activeVersion} />
                )}
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
      <div className="font-bold">{title}</div>
    </div>
  );
};

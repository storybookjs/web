"use client";

import Link from "next/link";
import { ScrollBar } from "@/components/ui/scroll-area";
import { FC, ReactNode } from "react";
import { ChangelogIcon, DocsIcon, TutorialsIcon } from "./icons";
import { cn } from "@/lib/tailwind";
import { usePathname } from "next/navigation";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <nav className="w-[228px] hidden md:block sticky self-start top-[72px]">
      <ScrollAreaPrimitive.Root className="relative overflow-hidden h-[calc(100vh-72px)] w-full">
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
          <div className="py-12 pr-4 pl-1">
            <nav className="flex flex-col gap-1.5 text-sm font-medium">
              <Link
                href="/docs"
                className={cn(
                  "flex items-center gap-3 hover:text-blue-500 transition-colors px-2 h-8",
                  pathname === "/docs" && "text-blue-500"
                )}
              >
                <DocsIcon />
                Documentation
              </Link>
              <Link
                href="#"
                className={cn(
                  "flex items-center gap-3 hover:text-blue-500 transition-colors px-2 h-8",
                  pathname === "/tutorials" && "text-blue-500"
                )}
              >
                <TutorialsIcon />
                Tutorials
              </Link>
              <Link
                href="/releases"
                className={cn(
                  "flex items-center gap-3 hover:text-blue-500 transition-colors px-2 h-8",
                  pathname.startsWith("/releases") && "text-blue-500"
                )}
              >
                <ChangelogIcon />
                Changelog
              </Link>
            </nav>
            {children}
          </div>
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar className="pt-12 pb-6" />
      </ScrollAreaPrimitive.Root>
    </nav>
  );
};

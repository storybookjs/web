"use client";

import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as Accordion from "@radix-ui/react-accordion";

import { FC } from "react";
import { ChevronSmallRightIcon } from "@storybook/icons";

interface SidebarProps {
  tree: TreeNodeProps[] | undefined;
}

export const Sidebar: FC<SidebarProps> = ({ tree }) => {
  return (
    <nav className="w-[228px] max-[848px]:hidden block sticky self-start top-[72px]">
      <ScrollArea className="h-[calc(100vh-72px)] w-full">
        <ul className="py-12 pr-4">
          {tree
            ? tree.map((lvl1) => (
                <li key={lvl1.id}>
                  <Link
                    href={`/docs/${lvl1.slug}`}
                    className="block text-sm font-bold mt-6 h-8"
                  >
                    {lvl1.shortTitle}
                  </Link>
                  {lvl1.children &&
                    lvl1.children.length > 0 &&
                    lvl1.showAsTabs === false && (
                      <ul>
                        {lvl1.children.map((lvl2) => (
                          <Accordion.Root
                            type="single"
                            collapsible
                            asChild
                            key={lvl2.id}
                          >
                            <li>
                              {(!lvl2.children || lvl2.showAsTabs) && (
                                <Link
                                  href={`/docs/${lvl1.slug}/${lvl2.slug}`}
                                  className="flex items-center text-sm h-8"
                                >
                                  {lvl2.shortTitle}
                                </Link>
                              )}
                              {!lvl2.showAsTabs &&
                                lvl2.children &&
                                lvl2.children.length > 0 && (
                                  <Accordion.Item value="item-1">
                                    <Accordion.Trigger asChild>
                                      <button className="group flex justify-between items-center text-sm w-full h-8">
                                        {lvl2.shortTitle}
                                        <ChevronSmallRightIcon
                                          className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-90"
                                          aria-hidden
                                        />
                                      </button>
                                    </Accordion.Trigger>
                                    <Accordion.Content>
                                      <ul>
                                        {lvl2.children.map((lvl3) => (
                                          <li key={lvl3.id} className="ml-4">
                                            <Link
                                              href={`/docs/${lvl1.slug}/${lvl2.slug}/${lvl3.slug}`}
                                              className="flex items-center text-sm h-8 border-l border-zinc-200 p-4"
                                            >
                                              {lvl3.shortTitle}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </Accordion.Content>
                                  </Accordion.Item>
                                )}
                            </li>
                          </Accordion.Root>
                        ))}
                      </ul>
                    )}
                </li>
              ))
            : []}
        </ul>
      </ScrollArea>
    </nav>
  );
};

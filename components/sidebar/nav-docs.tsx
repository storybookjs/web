"use client";

import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { FC, Fragment } from "react";
import { ChevronSmallRightIcon } from "@storybook/icons";
import { VersionSelector } from "./version-selector";

interface NavDocsProps {
  tree: TreeNodeProps[] | undefined;
}

export const NavDocs: FC<NavDocsProps> = ({ tree }) => {
  return (
    <Fragment>
      <VersionSelector />
      <ul className="mt-9">
        {tree
          ? tree.map((lvl1) => (
              <li key={lvl1.path}>
                <Link
                  href={`/docs/${lvl1.slug}`}
                  className="flex items-center text-sm font-bold mt-6 h-8 hover:text-blue-500 transition-colors px-2"
                >
                  {lvl1.shortTitle}
                </Link>
                {lvl1.children && lvl1.children.length > 0 && (
                  <ul>
                    {lvl1.children.map((lvl2) => {
                      if (lvl2.name === "index") return null;
                      if (lvl2.name === "api") return null;
                      return (
                        <Accordion.Root
                          type="single"
                          collapsible
                          asChild
                          key={lvl2.path}
                        >
                          <li>
                            {(!lvl2.children ||
                              lvl2.children.length === 0 ||
                              lvl2.showAsTabs) && (
                              <Link
                                href={`/docs/${lvl1.slug}/${lvl2.slug}`}
                                className="flex items-center text-sm h-8 text-zinc-600 hover:text-blue-500 transition-colors px-2"
                              >
                                {lvl2.shortTitle}
                              </Link>
                            )}
                            {lvl2.children &&
                              lvl2.children.length > 0 &&
                              !lvl2.showAsTabs && (
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
                                      {lvl2.children.map((lvl3) => {
                                        if (lvl3.name === "index") return null;
                                        if (lvl3.name === "api") return null;
                                        return (
                                          <li key={lvl3.path} className="ml-4">
                                            <Link
                                              href={`/docs/${lvl1.slug}/${lvl2.slug}/${lvl3.slug}`}
                                              className="flex items-center text-sm h-8 border-l border-zinc-200 p-4"
                                            >
                                              {lvl3.shortTitle}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </Accordion.Content>
                                </Accordion.Item>
                              )}
                          </li>
                        </Accordion.Root>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))
          : []}
      </ul>
    </Fragment>
  );
};

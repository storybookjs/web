"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/tailwind";
import { FC } from "react";

interface TableOfContentProps {
  headings: {
    id: string;
    slug: string;
    title: string;
    level: number;
  }[];
}

export const TableOfContent: FC<TableOfContentProps> = ({ headings }) => {
  return (
    <nav className="w-[228px] max-[1148px]:hidden block sticky self-start top-[72px]">
      <ScrollArea className="h-[calc(100vh-72px)] w-full">
        <div className="py-12 ">
          <div className="block text-sm font-bold h-8">On this page</div>
          <ul className="mt-4">
            {headings?.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.slug}`}
                  className={cn(
                    "flex items-center text-sm text-zinc-700 hover:text-blue-500 transition-colors w-full mb-3",
                    heading.level > 2 && "ml-5"
                  )}
                >
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>
    </nav>
  );
};

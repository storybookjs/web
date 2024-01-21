"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/tailwind";
import { ElementOrSelector, inView, useInView } from "framer-motion";
import { Dispatch, FC, SetStateAction, useLayoutEffect, useState } from "react";

interface TableOfContentProps {
  headings?: {
    id: string;
    slug: string;
    title: string;
    level: number;
  }[];
}

interface ElementProps {
  heading: {
    id: string;
    slug: string;
    title: string;
    level: number;
  };
  isInView: string[];
  setIsInView: Dispatch<SetStateAction<string[]>>;
}

export const TableOfContent: FC<TableOfContentProps> = ({ headings }) => {
  const [isInView, setIsInView] = useState<string[]>([]);

  return (
    <nav className="w-[228px] max-[1148px]:hidden block sticky self-start top-[72px]">
      <ScrollArea className="h-[calc(100vh-72px)] w-full">
        <div className="py-12 ">
          <div className="block text-sm font-bold h-8">On this page</div>
          <ul className="mt-4">
            {headings?.map((heading) => {
              return (
                <Element
                  key={heading.id}
                  heading={heading}
                  isInView={isInView}
                  setIsInView={setIsInView}
                />
              );
            })}
          </ul>
        </div>
      </ScrollArea>
    </nav>
  );
};

const Element: FC<ElementProps> = ({ heading, isInView, setIsInView }) => {
  useLayoutEffect(() => {
    const box = document.getElementById(heading.slug) as ElementOrSelector;

    inView(box, (inView) => {
      console.log(inView);

      setIsInView((value) => [...value, heading.slug]);

      return () =>
        setIsInView((value) => value.filter((slug) => slug !== heading.slug));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(isInView);

  return (
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
  );
};

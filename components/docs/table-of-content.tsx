"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/tailwind";
import { ElementOrSelector, inView } from "framer-motion";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useScrollDirection } from "react-use-scroll-direction";

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
    <nav className="w-[228px] hidden lg:block sticky self-start top-[72px]">
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
  const { isScrollingUp } = useScrollDirection();

  // This is quite a dirty solution that don't always work.
  // TODO: Find a better solution.
  useEffect(() => {
    const box = document.getElementById(heading.slug) as ElementOrSelector;

    inView(box, () => {
      const isInArray = isInView.includes(heading.slug);
      !isInArray && isScrollingUp
        ? setIsInView((value) => [...new Set([heading.slug, ...value])])
        : setIsInView((value) => [...new Set([...value, heading.slug])]);

      return () =>
        setIsInView((value) => value.filter((slug) => slug !== heading.slug));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrollingUp]);

  const active =
    isInView.length > 0 ? isInView[0].includes(heading.slug) : false;

  return (
    <li key={heading.id}>
      <a
        href={`#${heading.slug}`}
        className={cn(
          "flex items-center text-sm text-zinc-700 hover:text-blue-500 transition-colors w-full mb-3",
          heading.level > 2 && "ml-5",
          active && "text-blue-500"
        )}
      >
        {heading.title}
      </a>
    </li>
  );
};

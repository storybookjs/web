"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FC } from "react";

interface TableOfContentProps {}

export const TableOfContent: FC<TableOfContentProps> = () => {
  return (
    <nav className="w-[228px] max-[1148px]:hidden block sticky self-start top-[72px]">
      <ScrollArea className="h-[calc(100vh-72px)] w-full">
        <div className="py-12 ">
          <div className="block text-sm font-bold h-8">On this page</div>
        </div>
      </ScrollArea>
    </nav>
  );
};

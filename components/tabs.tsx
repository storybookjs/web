import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

interface Props {
  tabAPI?: TreeNodeProps;
  lastSegment: string;
  pathGuide: string;
}

export const Tabs: FC<Props> = ({ pathGuide, lastSegment }) => {
  return (
    <div className="flex gap-4 mt-6">
      <Link
        href={pathGuide}
        className={cn(
          "border-b",
          lastSegment !== "api" && "border-b border-blue-500 text-blue-500"
        )}
      >
        Guide
      </Link>
      <Link
        href={`${pathGuide}/api`}
        className={cn(
          "border-b",
          lastSegment === "api" && "border-b border-blue-500 text-blue-500"
        )}
      >
        API
      </Link>
    </div>
  );
};

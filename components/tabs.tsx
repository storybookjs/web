"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

interface Props {
  pathIndex: string;
  pathApi: string;
  isIndex: boolean;
  isApi: boolean;
}

export const Tabs: FC<Props> = ({ pathIndex, pathApi, isIndex, isApi }) => {
  return (
    <div className="flex gap-4 mt-6">
      <Link
        href={isIndex ? pathIndex : pathApi}
        className={cn(
          "border-b",
          isIndex && "border-b border-blue-500 text-blue-500"
        )}
      >
        Guide
      </Link>
      <Link
        href={isIndex ? `${pathIndex}/api` : `${pathApi}/api`}
        className={cn(
          "border-b",
          isApi && "border-b border-blue-500 text-blue-500"
        )}
      >
        API
      </Link>
    </div>
  );
};

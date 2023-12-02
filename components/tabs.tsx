import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

interface Props {
  path: string;
  isIndex: boolean;
  isApi: boolean;
}

export const Tabs: FC<Props> = ({ path, isIndex, isApi }) => {
  return (
    <div className="flex gap-4 mt-6">
      <Link
        href={path}
        className={cn(
          "border-b",
          isIndex && "border-b border-blue-500 text-blue-500"
        )}
      >
        Guide
      </Link>
      <Link
        href={`${path}/api`}
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

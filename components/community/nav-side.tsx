"use client";

import { useCommunity } from "@/app/community/provider";
import { cn } from "@/lib/utils";
import { FC } from "react";

export const NavSide: FC = () => {
  const { activeSegment, setActiveSegment } = useCommunity();

  return (
    <div className="w-[200px] hidden lg:block sticky self-start top-28">
      {[
        { label: "⭐  Support", href: "#support" },
        { label: "🎪  Events & streams", href: "#events-streams" },
        { label: "⚡️  Brand & resources", href: "#brand-resources" },
        { label: "🌎  Maintainer team", href: "#maintainer-team" },
        { label: "🛠  Contribute", href: "#contribute" },
        { label: "💅  Sponsor", href: "#sponsor" },
      ].map(({ label, href }) => {
        // Remove # from href
        const hrefWithoutHash = href.slice(1);
        const isActive = activeSegment === hrefWithoutHash;

        return (
          <a
            key={href}
            href={href}
            className={cn(
              "h-10 flex items-center",
              isActive && "text-blue-500"
            )}
            onClick={() =>
              setTimeout(() => setActiveSegment(hrefWithoutHash), 10)
            }
          >
            <span>{label}</span>
          </a>
        );
      })}
    </div>
  );
};

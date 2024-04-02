import { cn, container } from "../../lib/tailwind";
import { FC } from "react";
import { Form } from "./form";
import Link from "next/link";
import { StorybookLogo } from "../logos/storybook";
import { ChromaticLogo } from "../logos/chromatic";
import { footerNav } from "./nav";

export interface FooterProps {
  variant?: "system" | "home";
}

export const Footer: FC<FooterProps> = ({ variant = "system" }) => {
  return (
    <div
      className={cn(
        variant !== "home" &&
          "bg-slate-50 text-slate-800 border-t border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-700",
        variant === "home" &&
          "bg-homeBackground text-white border-t border-zinc-700"
      )}
    >
      <div className={cn(container, "lg:px-8 py-12")}>
        <Form variant={variant} />
        <div className="flex mb-6 sm:mb-20 flex-wrap">
          {footerNav.map((nav) => (
            <div
              key={nav.title}
              className="w-full sm:w-1/2 md:flex-1 flex flex-col gap-3 mb-12 md:mb-0"
            >
              <div className="text-md font-bold">{nav.title}</div>
              {nav.links.map((link) => {
                if (link.isExternal)
                  return (
                    <a
                      key={link.title}
                      href={link.href}
                      target="_blank"
                      className={cn(
                        "text-zinc-600 hover:text-blue-500 transition-colors text-md",
                        variant === "home" && "text-zinc-400",
                        variant !== "home" && "text-zinc-600 dark:text-zinc-400"
                      )}
                    >
                      {link.title}
                    </a>
                  );
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={cn(
                      "text-zinc-600 hover:text-blue-500 transition-colors text-md",
                      variant === "home" && "text-zinc-400",
                      variant !== "home" && "text-zinc-600 dark:text-zinc-400"
                    )}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-12 sm:gap-0">
          <div className="flex gap-4 sm:gap-8">
            <div
              className={cn(
                "border-r border-zinc-200 pr-4 sm:pr-8 dark:border-zinc-600",
                variant === "home" && "border-zinc-600"
              )}
            >
              <div
                className={cn(
                  "text-sm mb-2",
                  variant === "home" && "text-zinc-400",
                  variant !== "home" && "text-zinc-600 dark:text-zinc-400"
                )}
              >
                Open source software
              </div>
              <StorybookLogo color={variant === "home" ? "white" : "system"} />
            </div>
            <div>
              <div
                className={cn(
                  "text-sm mb-2",
                  variant === "home" && "text-zinc-400",
                  variant !== "home" && "text-zinc-600 dark:text-zinc-400"
                )}
              >
                Maintained by
              </div>
              <ChromaticLogo color={variant === "home" ? "white" : "system"} />
            </div>
          </div>
          <div
            className={cn(
              "text-sm",
              variant === "home" && "text-zinc-400",
              variant !== "home" && "text-zinc-600 dark:text-zinc-400"
            )}
          >
            Special thanks to{" "}
            <a
              className={cn(
                "text-zinc-600 hover:text-blue-500 transition-colors text-md",
                variant === "home" && "text-white",
                variant !== "home" && "text-zinc-600 dark:text-white"
              )}
              href="https://netlify.com"
            >
              Netlify
            </a>{" "}
            and{" "}
            <a
              className={cn(
                "text-zinc-600 hover:text-blue-500 transition-colors text-md",
                variant === "home" && "text-white",
                variant !== "home" && "text-zinc-600 dark:text-white"
              )}
              href="https://circleci.com"
            >
              CircleCi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

import { cn } from "../../lib/utils";
import { FC } from "react";
import { Form } from "./form";
import Link from "next/link";
import { StorybookLogo } from "../logos/storybook";
import { ChromaticLogo } from "../logos/chromatic";

export interface FooterProps {
  variant?: "system" | "home";
}

export const Footer: FC<FooterProps> = ({ variant = "system" }) => {
  return (
    <div
      className={cn(
        variant !== "home" &&
          "bg-slate-50 text-slate-800 border-t border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-700",
        variant === "home" && "bg-zinc-900 text-white border-t border-zinc-700"
      )}
    >
      <div className="max-w-8xl mx-auto px-4 lg:px-8 py-12">
        <Form variant={variant} />
        <div className="flex mb-20">
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-md font-bold">Why</div>
            <A variant={variant} href="/docs/get-started/why-storybook">
              Why Storybook
            </A>
            <A variant={variant} href="https://componentdriven.org/" isExternal>
              Component driven UI
            </A>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-md font-bold">Docs</div>
            <A variant={variant} href="/docs">
              Guides
            </A>
            <A variant={variant} href="/tutorials">
              Tutorials
            </A>
            <A variant={variant} href="/releases">
              Changelog
            </A>
            <A variant={variant} href="/docs/configure/telemetry">
              Telemetry
            </A>
            <A variant={variant} href="/status">
              Status
            </A>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-md font-bold">Community</div>
            <A variant={variant} href="/integrations">
              Integrations
            </A>
            <A variant={variant} href="/community">
              Get involved
            </A>
            <A variant={variant} href="/releases">
              Blog
            </A>
            <A
              variant={variant}
              href="https://chromatic-ui.notion.site/Storybook-Jobs-Board-950e001e4a114a39980a5b09c3a3b3e1?pvs=4"
              isExternal
            >
              Find jobs
            </A>
            <A
              variant={variant}
              href="https://chromatic-ui.notion.site/Give-a-conference-talk-about-Storybook-e8d8e78d4d0a448a811a8d927194c527?pvs=4"
            >
              Speak at conferences
            </A>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-md font-bold">Showcase</div>
            <A variant={variant} href="/showcase" isExternal>
              Find jobs
            </A>
            <A variant={variant} href="/showcase/projects" isExternal>
              Speak at conferences
            </A>
            <A variant={variant} href="/showcase/glossary" isExternal>
              Component glossary
            </A>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-8">
            <div
              className={cn(
                "border-r border-zinc-200 pr-8 dark:border-zinc-600",
                variant === "home" && "border-zinc-600"
              )}
            >
              <div
                className={cn(
                  "text-md mb-2",
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
                  "text-md mb-2",
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
              "text-md",
              variant === "home" && "text-zinc-400",
              variant !== "home" && "text-zinc-600 dark:text-zinc-400"
            )}
          >
            Special thanks to{" "}
            <A variant={variant} href="https://netlify.com" isExternal>
              Netlify
            </A>{" "}
            and{" "}
            <A variant={variant} href="https://circleci.com" isExternal>
              CircleCi
            </A>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AProps {
  href: string;
  children: string;
  isExternal?: boolean;
  variant: FooterProps["variant"];
}

const A: FC<AProps> = ({ href, children, isExternal, variant }) => {
  if (isExternal)
    return (
      <a
        href={href}
        target="_blank"
        className={cn(
          "text-zinc-600 hover:text-blue-500 transition-colors text-md",
          variant === "home" && "text-zinc-400",
          variant !== "home" && "text-zinc-600 dark:text-zinc-400"
        )}
      >
        {children}
      </a>
    );

  return (
    <Link
      href={href}
      className={cn(
        "text-zinc-600 hover:text-blue-500 transition-colors text-md",
        variant === "home" && "text-zinc-400",
        variant !== "home" && "text-zinc-600 dark:text-zinc-400"
      )}
    >
      {children}
    </Link>
  );
};

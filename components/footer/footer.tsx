import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";
import { Form } from "./form";
import Link from "next/link";

const footerVariants = cva("w-full min-h-[400px]", {
  variants: {
    variant: {
      default:
        "bg-slate-50 text-slate-800 border-t border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-700",
      home: "bg-zinc-900 text-white border-t border-zinc-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface FooterProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof footerVariants> {}

export const Footer: FC<FooterProps> = ({ variant }) => {
  return (
    <div className={cn(footerVariants({ variant }))}>
      <div className="max-w-8xl mx-auto px-4 lg:px-8 py-12">
        <Form />
        <div className="flex">
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-md font-bold">Why</div>
            <A href="/docs/get-started/why-storybook">Why Storybook</A>
            <A href="https://componentdriven.org/" isExternal>
              Component driven UI
            </A>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-md font-bold">Docs</div>
            <A href="/docs">Guides</A>
            <A href="/tutorials">Tutorials</A>
            <A href="/releases">Changelog</A>
            <A href="/docs/configure/telemetry">Telemetry</A>
            <A href="/status">Status</A>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-md font-bold">Community</div>
            <A href="/integrations">Integrations</A>
            <A href="/community">Get involved</A>
            <A href="/releases">Blog</A>
            <A
              href="https://chromatic-ui.notion.site/Storybook-Jobs-Board-950e001e4a114a39980a5b09c3a3b3e1?pvs=4"
              isExternal
            >
              Find jobs
            </A>
            <A href="https://chromatic-ui.notion.site/Give-a-conference-talk-about-Storybook-e8d8e78d4d0a448a811a8d927194c527?pvs=4">
              Speak at conferences
            </A>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-md font-bold">Showcase</div>
            <A href="/showcase" isExternal>
              Find jobs
            </A>
            <A href="/showcase/projects" isExternal>
              Speak at conferences
            </A>
            <A href="/showcase/glossary" isExternal>
              Component glossary
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
}

const A: FC<AProps> = ({ href, children, isExternal }) => {
  if (isExternal)
    return (
      <a
        href={href}
        target="_blank"
        className="text-zinc-600 hover:text-blue-500 transition-colors text-md"
      >
        {children}
      </a>
    );

  return (
    <Link
      href={href}
      className="text-zinc-600 hover:text-blue-500 transition-colors text-md"
    >
      {children}
    </Link>
  );
};

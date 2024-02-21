import { FC, ReactNode } from "react";
import {
  DiscordIcon,
  GithubIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@storybook/icons";
import { FooterProps } from "./footer";
import { cn } from "@/lib/tailwind";
import { NewsletterForm } from "../newsletter-form/form";

interface FormProps {
  variant?: FooterProps["variant"];
}

export const Form: FC<FormProps> = ({ variant }) => {
  return (
    <div className="mb-14">
      <div className="text-md font-bold mb-4">Join the community</div>
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:justify-between lg:items-center">
        <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <NewsletterForm variant={variant === "home" ? "dark" : "system"} />
          <div className="text-zinc-400">6,378 developers and counting</div>
        </div>
        <div className="flex items-center gap-4">
          <Circle href="http://github.com/storybookjs" variant={variant}>
            <GithubIcon size={18} />
          </Circle>
          <Circle href="https://twitter.com/storybookjs" variant={variant}>
            <TwitterIcon size={18} />
          </Circle>
          <Circle href="https://discord.gg/storybook" variant={variant}>
            <DiscordIcon size={18} />
          </Circle>
          <Circle
            href="https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg"
            variant={variant}
          >
            <YoutubeIcon size={18} />
          </Circle>
        </div>
      </div>
    </div>
  );
};

interface CircleProps {
  children: ReactNode;
  href: string;
  variant?: FooterProps["variant"];
}

const Circle: FC<CircleProps> = ({ children, href, variant }) => {
  return (
    <a
      href={href}
      target="_blank"
      className={cn(
        "flex items-center justify-center border border-zinc-200 rounded-full h-12 w-12 hover:-translate-y-1 transition-all",
        variant === "home" && "border border-zinc-700 hover:border-zinc-400",
        variant !== "home" &&
          "bg-white hover:border-zinc-400 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-500"
      )}
    >
      {children}
    </a>
  );
};

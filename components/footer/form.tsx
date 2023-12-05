import { FC } from "react";
import { Button } from "../ui/button";
import {
  DiscordIcon,
  GithubIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@storybook/icons";

export const Form: FC = () => {
  return (
    <div className="mb-14">
      <div className="text-md font-bold mb-4">Join the community</div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <form className="relative w-[360px] h-12">
            <input
              type="text"
              placeholder="you@domain.com"
              className="bg-white rounded-md pl-4 pr-[100px] w-full h-full border border-zinc-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <Button
              variant="solid"
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Subscribe
            </Button>
          </form>
          <div>6,378 developers and counting</div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="http://github.com/storybookjs"
            target="_blank"
            className="flex items-center justify-center border border-zinc-200 rounded-full h-12 w-12 bg-white hover:-translate-y-1 hover:border-zinc-400 transition-all"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://twitter.com/storybookjs"
            target="_blank"
            className="flex items-center justify-center border border-zinc-200 rounded-full h-12 w-12 bg-white hover:-translate-y-1 hover:border-zinc-400 transition-all"
          >
            <TwitterIcon size={18} />
          </a>
          <a
            href="https://discord.gg/storybook"
            target="_blank"
            className="flex items-center justify-center border border-zinc-200 rounded-full h-12 w-12 bg-white hover:-translate-y-1 hover:border-zinc-400 transition-all"
          >
            <DiscordIcon size={18} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg"
            target="_blank"
            className="flex items-center justify-center border border-zinc-200 rounded-full h-12 w-12 bg-white hover:-translate-y-1 hover:border-zinc-400 transition-all"
          >
            <YoutubeIcon size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

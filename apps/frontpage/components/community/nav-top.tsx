import { cn, container } from '@repo/utils';
import {
  DiscordIcon,
  GithubIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@storybook/icons';
import { FC } from 'react';

export const NavTop: FC = () => {
  return (
    <div className="w-full h-10 border-b border-zinc-200">
      <div
        className={cn(container, 'h-full flex justify-between items-center')}
      >
        <div className="flex h-full">
          <a className="flex items-center px-[15px] h-full shadow-[0_-3px_0_0_inset] font-bold text-sm text-blue-500 shadow-blue-500">
            Get involved
          </a>
          <a
            href="/blog"
            className="flex items-center px-[15px] h-full font-bold text-sm text-zinc-400 transition-all hover:-translate-y-px hover:text-blue-500"
          >
            Blog
          </a>
        </div>
        <div className="items-center hidden gap-3 md:flex">
          <div>Join the community:</div>
          <a
            href="https://github.com/storybookjs"
            target="_blank"
            aria-label="Github"
            className="transition-colors text-zinc-500 hover:text-zinc-800"
          >
            <GithubIcon />
          </a>
          <a
            href="https://discord.gg/storybook"
            target="_blank"
            aria-label="Discord"
            className="transition-colors text-zinc-500 hover:text-zinc-800"
          >
            <DiscordIcon />
          </a>
          <a
            href="https://twitter.com/storybookjs"
            target="_blank"
            aria-label="Twitter"
            className="transition-colors text-zinc-500 hover:text-zinc-800"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg"
            target="_blank"
            aria-label="Youtube"
            className="transition-colors text-zinc-500 hover:text-zinc-800"
          >
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

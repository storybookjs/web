import { Container } from '@repo/ui';
import {
  DiscordIcon,
  GithubIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@storybook/icons';
import type { FC } from 'react';

export const NavTop: FC = () => {
  return (
    <div className="w-full h-10 border-b border-zinc-200 dark:border-slate-700">
      <Container className="h-full flex justify-between items-center">
        <div className="flex h-full">
          <a
            className="flex items-center px-[15px] h-full shadow-[0_-3px_0_0_inset] font-bold text-sm text-blue-500 shadow-blue-500"
            href="/community"
          >
            Get involved
          </a>
          <a
            className="flex items-center px-[15px] h-full font-bold text-sm text-zinc-400 transition-all hover:-translate-y-px hover:text-blue-500"
            href="/blog"
          >
            Blog
          </a>
        </div>
        <div className="items-center hidden gap-3 md:flex">
          <div>Join the community:</div>
          <a
            aria-label="Github"
            className="transition-colors text-zinc-500 hover:text-zinc-800"
            href="https://github.com/storybookjs"
            rel="noreferrer"
            target="_blank"
          >
            <GithubIcon />
          </a>
          <a
            aria-label="Discord"
            className="transition-colors text-zinc-500 hover:text-zinc-800"
            href="https://discord.gg/storybook"
            rel="noreferrer"
            target="_blank"
          >
            <DiscordIcon />
          </a>
          <a
            aria-label="Twitter"
            className="transition-colors text-zinc-500 hover:text-zinc-800"
            href="https://twitter.com/storybookjs"
            rel="noreferrer"
            target="_blank"
          >
            <TwitterIcon />
          </a>
          <a
            aria-label="Youtube"
            className="transition-colors text-zinc-500 hover:text-zinc-800"
            href="https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg"
            rel="noreferrer"
            target="_blank"
          >
            <YoutubeIcon />
          </a>
        </div>
      </Container>
    </div>
  );
};

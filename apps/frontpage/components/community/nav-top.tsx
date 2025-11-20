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
    <div className="h-10 w-full border-b border-zinc-200 dark:border-slate-800">
      <Container className="flex h-full items-center justify-between">
        <div className="flex h-full">
          <a
            className="flex h-full items-center px-[15px] text-sm font-bold text-blue-500 shadow-[0_-3px_0_0_inset] shadow-blue-500"
            href="/community/"
          >
            Get involved
          </a>
          <a
            className="flex h-full items-center px-[15px] text-sm font-bold text-zinc-400 transition-all hover:-translate-y-px hover:text-blue-500"
            href="/blog/"
          >
            Blog
          </a>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <div>Join the community:</div>
          <a
            aria-label="Github"
            className="text-zinc-500 transition-colors hover:text-zinc-800"
            href="https://github.com/storybookjs"
            rel="noreferrer"
            target="_blank"
          >
            <GithubIcon />
          </a>
          <a
            aria-label="Discord"
            className="text-zinc-500 transition-colors hover:text-zinc-800"
            href="https://discord.gg/storybook"
            rel="noreferrer"
            target="_blank"
          >
            <DiscordIcon />
          </a>
          <a
            aria-label="Twitter"
            className="text-zinc-500 transition-colors hover:text-zinc-800"
            href="https://twitter.com/storybookjs"
            rel="noreferrer"
            target="_blank"
          >
            <TwitterIcon />
          </a>
          <a
            aria-label="Youtube"
            className="text-zinc-500 transition-colors hover:text-zinc-800"
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

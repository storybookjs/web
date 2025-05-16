import { ChevronSmallRightIcon, DiscordIcon, XIcon } from '@storybook/icons';
import type { FC } from 'react';
import { BlueSkyIcon } from '@repo/ui';
import { Youtube } from '../logos/youtube';
import { Section } from './section';

export const Events: FC = () => {
  return (
    <Section className="relative mb-8 md:mb-16" id="events-streams">
      <h2 className="mb-2 text-2xl font-bold">Join live events & streams</h2>
      <p className="mb-8">
        Storybook&apos;s thriving community can help answer your questions.
        Developers of all skill levels welcome.
      </p>
      <div className="mb-8 flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-700">
          <Youtube size={40} />
          <div className="flex-1">
            <h2 className="text-lg font-bold">Subscribe to YouTube channel</h2>
            <p className="mb-3 text-zinc-500">
              Watch insider previews, feature demos, and interviews.
            </p>
            <a
              className="flex items-center gap-2 text-blue-500"
              href="https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg"
            >
              Watch now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
        <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-700">
          <DiscordIcon className="h-10 w-10 text-[#5a65ea]" />
          <div className="flex-1">
            <h2 className="text-lg font-bold">Follow #announcements chat</h2>
            <p className="mb-3 text-zinc-500">
              Join our community chat to learn about live events and streams.
            </p>
            <a
              className="flex items-center gap-2 text-blue-500"
              href="https://discord.gg/storybook"
            >
              Chat now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="mb-8 flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-700">
          <BlueSkyIcon className="h-10 w-10" color="#0085ff" />
          <div className="flex-1">
            <h2 className="text-lg font-bold">Follow on BlueSky</h2>
            <p className="mb-3 text-zinc-500">
              Get the latest event updates from Storybook maintainers.
            </p>
            <a
              className="flex items-center gap-2 text-blue-500"
              href="https://twitter.com/storybookjs"
            >
              Follow now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
        <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-700">
          <XIcon className="h-10 w-10" />
          <div className="flex-1">
            <h2 className="text-lg font-bold">Follow on X</h2>
            <p className="mb-3 text-zinc-500">
              Get the latest event updates from Storybook maintainers.
            </p>
            <a
              className="flex items-center gap-2 text-blue-500"
              href="https://twitter.com/storybookjs"
            >
              Follow now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

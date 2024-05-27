import { ChevronSmallRightIcon, DiscordIcon } from '@storybook/icons';
import type { FC } from 'react';
import { Section } from './section';

export const Contribute: FC = () => {
  return (
    <Section className="relative mb-8 md:mb-16" id="contribute">
      <h2 className="font-bold text-2xl mb-2">Contribute to Storybook</h2>
      <p className="mb-8">
        Join 2,137+ open source contributors building Storybook, the
        industry-standard frontend workshop.
      </p>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1 border border-zinc-300 dark:border-slate-700 rounded p-6 md:p-8 flex gap-4 md:gap-6">
          <svg
            className="w-10 h-10 flex-shrink-0"
            fill="none"
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0C4.79083 0 3 1.79083 3 4V44C3 46.2092 4.79083 48 7 48H41C43.2092 48 45 46.2092 45 44V9L36 0H7Z"
              fill="#D7F7F6"
            />
            <rect
              fill="#37D5D3"
              fillOpacity="0.85"
              height="5"
              rx="2"
              width="9"
              x="9"
              y="17"
            />
            <rect
              fill="#37D5D3"
              fillOpacity="0.85"
              height="5"
              rx="2"
              width="19"
              x="20"
              y="17"
            />
            <rect
              fill="#37D5D3"
              fillOpacity="0.85"
              height="5"
              rx="2"
              width="9"
              x="9"
              y="26"
            />
            <rect
              fill="#37D5D3"
              fillOpacity="0.85"
              height="5"
              rx="2"
              width="19"
              x="20"
              y="26"
            />
            <rect
              fill="#37D5D3"
              fillOpacity="0.85"
              height="5"
              rx="2"
              width="9"
              x="9"
              y="35"
            />
            <rect
              fill="#37D5D3"
              fillOpacity="0.85"
              height="5"
              rx="2"
              width="19"
              x="20"
              y="35"
            />
            <path
              d="M36 0V5C36 7.20914 37.7909 9 40 9H45L36 0Z"
              fill="#37D5D3"
              fillOpacity="0.85"
            />
          </svg>
          <div className="flex-1">
            <h2 className="font-bold text-lg">Write or update docs</h2>
            <p className="mb-3 text-zinc-500 dark:text-slate-400">
              Teach fellow developers how to take advantage of Storybook. Help
              write, edit, and improve docs.
            </p>
            <a
              className="flex gap-2 items-center text-blue-500"
              href="https://storybook.js.org/docs"
            >
              Get started with docs
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
        <div className="flex-1 border border-zinc-300 dark:border-slate-700 rounded p-6 md:p-8 flex gap-4 md:gap-6">
          <svg
            className="w-10 h-10 flex-shrink-0"
            role="img"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.802 15.211c2.815-3.172 6.415-5.25 10.115-5.992v-4.61a2.589 2.589 0 0 1 5.178 0v4.467a13.516 13.516 0 0 1 8.152 4.465l3.66-2.113a2.589 2.589 0 0 1 2.588 4.485l-3.598 2.077c1.41 3.7 1.486 8.088.074 12.33L11.802 15.21Zm4.01 28.178 8.462-14.657 11.192 6.462c-4.603 7.218-12.824 10.538-19.655 8.195ZM11.326 40.8c-5.444-4.744-6.68-13.524-2.73-21.12l11.192 6.463L11.327 40.8Z"
              fill="#FA7240"
              fillRule="evenodd"
            />
          </svg>
          <div className="flex-1">
            <h2 className="font-bold text-lg">Find and report issues</h2>
            <p className="mb-3 text-zinc-500 dark:text-slate-400">
              Please report issues, someone else may have the same issue.
            </p>
            <a
              className="flex gap-2 items-center text-blue-500"
              href="https://github.com/storybookjs/storybook/issues"
            >
              View GitHub issues
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 border border-zinc-300 dark:border-slate-700 rounded p-6 md:p-8 flex gap-4 md:gap-6">
          <svg
            className="w-10 h-10 flex-shrink-0"
            role="img"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <rect
                fill="#69BD45"
                height="16"
                opacity="0.7"
                rx="4"
                width="16"
                x="2"
                y="5"
              />
              <rect
                fill="#1EA7FD"
                height="16"
                opacity="0.7"
                rx="4"
                width="16"
                x="2"
                y="27"
              />
              <rect
                fill="#37D5D3"
                height="16"
                opacity="0.7"
                rx="4"
                width="16"
                x="32"
                y="16"
              />
              <path
                d="M18 13h1c2.8 0 4 1.5 5.8 5.4l.2.5c1.4 3.1 2.2 4.1 3.9 4.1H32v3h-3.1c-1.7 0-2.5 1-3.9 4.1l-.2.5C23 34.5 21.8 36 19 36h-1v-3h1c1.1 0 1.8-.8 3-3.6l.3-.5c.8-2 1.7-3.4 2.6-4.4-1-1-1.8-2.4-2.6-4.4l-.3-.5c-1.2-2.8-1.9-3.6-3-3.6h-1v-3z"
                fill="#66BF3C"
                fillRule="nonzero"
                opacity="0.2"
              />
            </g>
          </svg>
          <div className="flex-1">
            <h2 className="font-bold text-lg">Send a pull request</h2>
            <p className="mb-3 text-zinc-500 dark:text-slate-400">
              Want to create a new feature or improve existing functionality?
              PRs welcomed and encouraged.
            </p>
            {/* <a
              href="https://storybook.js.org/docs"
              className="flex gap-2 items-center text-blue-500"
            >
              Learn how to contribute
              <ChevronSmallRightIcon />
            </a> */}
          </div>
        </div>
        <div className="flex-1 border border-zinc-300 dark:border-slate-700 rounded p-6 md:p-8 flex gap-4 md:gap-6">
          <DiscordIcon className="w-10 h-10 flex-shrink-0 text-[#5a65ea]" />
          <div className="flex-1">
            <h2 className="font-bold text-lg">Join #contributing chat</h2>
            <p className="mb-3 text-zinc-500 dark:text-slate-400">
              Coordinate with other contributors by joining our chat
            </p>
            <a
              className="flex gap-2 items-center text-blue-500"
              href="https://discord.gg/storybook"
            >
              Chat now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

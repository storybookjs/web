import { ChevronSmallRightIcon, StorybookIcon } from '@storybook/icons';
import type { FC } from 'react';
import { Section } from './section';

export const BrandAndResources: FC = () => {
  return (
    <Section className="relative mb-8 md:mb-16" id="brand-resources">
      <h2 className="mb-2 text-2xl font-bold">
        Use brand & presentation resources
      </h2>
      <p className="mb-8">
        The easiest way to get involved is to share Storybook with fellow
        developers, colleagues, and friends.
      </p>
      <div className="mb-8 flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-700">
          <StorybookIcon className="h-10 w-10 text-[#ff4785]" />
          <div className="flex-1">
            <h2 className="text-lg font-bold">Logo and brand</h2>
            <p className="mb-3 text-zinc-500 dark:text-slate-400">
              Use the Storybook logo, typography, colors, and images.
            </p>
            <div className="flex items-center gap-4">
              <a
                className="flex items-center gap-2 text-blue-500"
                href="https://github.com/storybookjs/brand"
              >
                Get logo
                <ChevronSmallRightIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-700">
          <svg
            className="h-10 w-10"
            role="img"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="m37.6 2.7 8.9 14.6a1.5 1.5 0 0 1-1.3 2.3H27.5a1.5 1.5 0 0 1-1.3-2.3l8.9-14.6a1.5 1.5 0 0 1 2.5 0z"
                fill="#61C1FD"
              />
              <rect
                fill="#FFC445"
                height="18"
                rx="4"
                width="18"
                x="28"
                y="28"
              />
              <path
                d="M12 47a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                fill="#37D5D3"
              />
              <path d="M3 19C3 9.6 10.2 2 19 2v17H3z" fill="#FC8562" />
            </g>
          </svg>
          <div className="flex-1">
            <h2 className="text-lg font-bold">Give a talk</h2>
            <p className="mb-3 text-zinc-500 dark:text-slate-400">
              Download presentation slides (Keynote, PDF).
            </p>
            <a
              className="flex items-center gap-2 text-blue-500"
              href="https://github.com/storybookjs/brand/tree/master/presentation"
            >
              Download now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

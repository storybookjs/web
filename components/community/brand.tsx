import { ChevronSmallRightIcon, StorybookIcon } from "@storybook/icons";
import { FC } from "react";

export const BrandAndResources: FC = () => {
  return (
    <div className="relative mb-8 md:mb-16">
      <div id="brand-resources" className="absolute -top-28" />
      <h2 className="font-bold text-2xl mb-2">
        Use brand & presentation resources
      </h2>
      <p className="mb-8">
        The easiest way to get involved is to share Storybook with fellow
        developers, colleagues, and friends.
      </p>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1 border border-zinc-300 rounded p-6 md:p-8 flex gap-4 md:gap-6">
          <StorybookIcon className="w-10 h-10 text-[#ff4785]" />
          <div className="flex-1">
            <h2 className="font-bold text-lg">Logo and brand</h2>
            <p className="mb-3 text-zinc-500">
              Use the Storybook logo, typography, colors, and images.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/storybookjs/brand"
                className="flex gap-2 items-center text-blue-500"
              >
                Get logo
                <ChevronSmallRightIcon />
              </a>
              <a
                href="https://github.com/storybookjs/design-system"
                className="flex gap-2 items-center text-blue-500"
              >
                View design system
                <ChevronSmallRightIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 border border-zinc-300 rounded p-6 md:p-8 flex gap-4 md:gap-6">
          <svg
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            className="w-10 h-10"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="m37.6 2.7 8.9 14.6a1.5 1.5 0 0 1-1.3 2.3H27.5a1.5 1.5 0 0 1-1.3-2.3l8.9-14.6a1.5 1.5 0 0 1 2.5 0z"
                fill="#61C1FD"
              ></path>
              <rect
                fill="#FFC445"
                x="28"
                y="28"
                width="18"
                height="18"
                rx="4"
              ></rect>
              <path
                d="M12 47a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                fill="#37D5D3"
              ></path>
              <path d="M3 19C3 9.6 10.2 2 19 2v17H3z" fill="#FC8562"></path>
            </g>
          </svg>
          <div className="flex-1">
            <h2 className="font-bold text-lg">Give a talk</h2>
            <p className="mb-3 text-zinc-500">
              Download presentation slides (Keynote, PDF).
            </p>
            <a
              href="https://github.com/storybookjs/brand/tree/master/presentation"
              className="flex gap-2 items-center text-blue-500"
            >
              Download now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

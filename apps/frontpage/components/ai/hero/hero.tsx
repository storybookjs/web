'use client';

import { Container } from '@repo/ui';
import { CommandButton } from './command-button';
import { IntegrationLogos } from './integration-logos';

export function Hero() {
  return (
    <div className="border-b border-white/10">
      <Container className="relative z-20 justify-between gap-20 overflow-hidden pb-12 pt-12 text-white sm:pb-20 md:pb-28 md:pt-24 lg:px-8">
        <h1 className="flex-1 text-4xl font-bold max-sm:max-w-80 md:text-[56px]/[70px]">
          Storybook for{' '}
          <span className="bg-gradient-to-tr from-[#90B7C1] to-[#E1C72B] to-75% bg-clip-text text-transparent">
            AI
          </span>
        </h1>
        <div className="mb-8 flex-1 pt-4 md:mb-20">
          <p className="mb-8 max-w-[600px] leading-7 sm:mb-12">
            Storybook gives agents structured UI context and test feedback.
            Components, props, stories, and docs define what agents can build.
            Tests return failures so agents can correct changes before review.
          </p>
          <div className="flex flex-col gap-12 md:flex-row md:gap-10">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold">Get started</span>
              <CommandButton
                command="npx storybook add addon-mcp"
                variant="primary"
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold">Made for version 10.1+</span>
              <CommandButton
                command="npx storybook@10 upgrade"
                variant="secondary"
              />
            </div>
          </div>
        </div>

        {/* Hero Illustration Placeholder */}
        <div className="flex h-[300px] w-full items-center justify-center rounded-lg border border-zinc-600 bg-zinc-800/50 text-zinc-500 md:h-[400px]">
          [Placeholder: Hero Illustration]
        </div>

        <IntegrationLogos />
      </Container>
    </div>
  );
}

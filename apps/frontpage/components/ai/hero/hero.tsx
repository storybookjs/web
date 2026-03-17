'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@repo/ui';
import { CommandButton } from './command-button';
import { IntegrationLogos } from './integration-logos';

export function Hero() {
  return (
    <div className="border-b border-white/10">
      <Container className="relative z-20 justify-between gap-20 pt-12 text-white md:pt-24 lg:px-8">
        <h1 className="flex-1 text-3xl font-bold md:text-[40px]/[48px] lg:text-[56px]/[70px]">
          Now AI can ship production UI
        </h1>
        <div className="mb-16 flex-1 pt-4 md:mb-20">
          <p className="mb-8 leading-7 sm:mb-12 md:max-w-[600px]">
            Storybook gives agents structured UI context and test feedback.
            Components, props, stories, and docs define what agents can build.
            Tests return failures so agents can self-correct.
          </p>
          <div className="flex flex-col flex-wrap gap-5 md:flex-row md:items-center">
            <CommandButton
              className="hidden sm:flex"
              command="npx storybook add @storybook/addon-mcp"
              variant="primary"
            />
            <Link
              className="text-md flex h-12 items-center justify-center rounded-full border border-white bg-transparent px-6 font-bold text-white"
              href="/docs"
            >
              Go to docs
            </Link>
            <span className="text-white/60">
              Requires v10.3+ and React, more frameworks soon
            </span>
          </div>
        </div>
      </Container>

      <div className="relative overflow-x-clip">
        <Image
          src="/ai/bg-gradient.svg"
          alt=""
          className="3xl:w-full absolute left-1/2 top-1/2 h-auto w-[136%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-cover 2xl:w-[110%]"
          width={1679}
          height={1228}
        />

        <Container>
          <div className="relative mb-6 overflow-hidden rounded-md ring-1 ring-white/10">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="relative"
              poster="/ai/storybook-ai-hero.png"
            >
              <source src="/ai/storybook-ai-hero.m4v" type="video/mp4" />
            </video>
          </div>
        </Container>
      </div>

      <Container
        variant="small"
        className="relative z-20 justify-between gap-20 pb-12 text-white sm:pb-20 md:pb-28 lg:px-8"
      >
        <IntegrationLogos />
      </Container>
    </div>
  );
}

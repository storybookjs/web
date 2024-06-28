import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { Testimonial } from '../testimonial';
import { LogoCloudbees } from './logo-cloudbee';
import { PublishIntegrations } from './publish-integrations';
import { EmbedIntegrations } from './embed-integrations';
import { TestIntegrations } from './test-integrations';

export function Share() {
  return (
    <div className="overflow-hidden border-b border-zinc-600 pt-12 sm:pt-20 md:pt-28">
      <Container className="justify-between gap-20 text-white md:flex">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Share how the UI actually works
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 max-w-[520px] leading-7">
            Stories show how UIs actually work not just a static design of how
            they&apos;re supposed to work. That keeps everyone aligned on
            what&apos;s currently in production.
          </p>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col gap-8 pt-12 sm:gap-16 md:flex-row md:items-center md:gap-24 md:pt-40">
          <div className="flex max-w-[520px] flex-shrink-0 flex-col gap-6 text-white md:max-w-[320px]">
            <h3 className="text-2xl font-bold">
              Publish Storybook to get sign off from teammates
            </h3>
            <p className="text-md leading-7">
              Publish Storybook as a website for stakeholders to reference. Your
              team can check that the UI looks right without touching code.
            </p>
            <Link
              className="flex items-center gap-2 font-bold text-blue-500"
              href="/docs/sharing/publish-storybook"
            >
              Publish Storybook
              <ChevronSmallRightIcon />
            </Link>
          </div>
          <PublishIntegrations />
        </div>
        <div className="flex flex-col gap-8 pt-12 sm:gap-16 md:flex-row md:items-center md:gap-24 md:pt-48">
          <div className="flex max-w-[520px] flex-shrink-0 flex-col gap-6 text-white md:max-w-[320px]">
            <h3 className="text-2xl font-bold">
              Embed stories in wikis, Markdown, and Figma
            </h3>
            <p className="text-md leading-7">
              Embed stories to showcase your work to teammates and the developer
              community. Works with the oEmbed standard.
            </p>
            <Link
              className="flex items-center gap-2 font-bold text-blue-500"
              href="/docs/sharing/embed"
            >
              Embed stories
              <ChevronSmallRightIcon />
            </Link>
          </div>
          <EmbedIntegrations />
        </div>
        <div className="flex flex-col gap-8 pt-12 sm:gap-16 md:flex-row md:items-center md:gap-24 md:pt-48">
          <div className="flex max-w-[520px] flex-shrink-0 flex-col gap-6 text-white md:max-w-[320px]">
            <h3 className="text-2xl font-bold">
              <span className="inline-block rounded border border-zinc-600 bg-zinc-800 px-2 font-mono text-[19px]">
                import
              </span>{' '}
              stories into other JavaScript tooling
            </h3>
            <p className="text-md leading-7">
              Stories are a portable standard based on ES6 modules. Write
              stories once and import them into any JavaScript library.
            </p>
            <Link
              className="flex items-center gap-2 font-bold text-blue-500"
              href="/docs/writing-tests/stories-in-unit-tests"
            >
              Reuse stories in tests and libraries
              <ChevronSmallRightIcon />
            </Link>
          </div>
          <TestIntegrations />
        </div>
      </Container>
      <Testimonial
        avatarUrl="https://avatars2.githubusercontent.com/u/8724083?s=460&v=4"
        jobTitle="Author of Building Design Systems"
        logo={<LogoCloudbees />}
        name="Sarrah Vesselov"
        text="“Storybook is my go-to when starting a new design system. It makes
            getting something in place quick and easy for both design and
            engineering.”"
      />
    </div>
  );
}

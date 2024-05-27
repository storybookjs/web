import { ChevronSmallRightIcon } from '@storybook/icons';
import Image from 'next/image';
import Link from 'next/link';

export function HomeResources() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 mb-12 sm:grid-cols-2">
        <Card href="/docs/essentials" title="Essential addons" />
        <Card href="/docs/integrations" title="Addon catalog" />
        <Card external href="/integrations" title="Recipes" />
        <Card href="/docs/builders" title="Builders" />
        <Card href="/docs/contribute" title="How to migrate" />
        <Card href="/docs/migration-guide" title="Migrate to 8.0" />
        <Card href="/docs/faq" title="FAQ" />
      </div>
      <div className="grid grid-cols-1 gap-4 pt-12 mb-6 border-t sm:grid-cols-2 border-slate-200 dark:border-slate-700">
        <div>
          <h3 className="mb-2 text-xl font-bold">Need some help?</h3>
          <a
            className="flex items-center gap-1 text-blue-500 transition-colors hover:text-blue-600"
            href="https://github.com/storybookjs/storybook/discussions/categories/help"
            rel="noopener"
            target="_blank"
          >
            Join a discussion on GitHub
            <ChevronSmallRightIcon />
          </a>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-bold">Latest product updates</h3>
          <a
            className="flex items-center gap-1 text-blue-500 transition-colors hover:text-blue-600"
            href="https://storybook.js.org/releases/"
            rel="noopener"
            target="_blank"
          >
            See changelog
            <ChevronSmallRightIcon />
          </a>
        </div>
      </div>
    </>
  );
}

function Card({
  href,
  title,
  external = false,
}: {
  href: string;
  title: string;
  external?: boolean;
}) {
  const Slot = external ? 'a' : Link;

  return (
    <Slot
      className="flex items-center gap-3 text-blue-500 transition-colors hover:text-blue-600"
      href={href}
    >
      <Image alt="" height="20" src="/images/icons/icon-more.svg" width="20" />
      {title}
    </Slot>
  );
}

import { ChevronSmallRightIcon } from '@storybook/icons';
import Image from 'next/image';
import Link from 'next/link';

export const HomeResources = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 mb-12 sm:grid-cols-2">
        <Card href="/docs/essentials" title="Essential addons" />
        <Card href="/docs/integrations" title="Addon catalog" />
        <Card href="/integrations" title="Recipes" external />
        <Card href="/docs/builders" title="Builders" />
        <Card href="/docs/contribute" title="How to migrate" />
        <Card href="/docs/migration-guide" title="Migrate to 8.0" />
        <Card href="/docs/faq" title="FAQ" />
      </div>
      <div className="grid grid-cols-1 gap-4 pt-12 mb-6 border-t sm:grid-cols-2 border-slate-200">
        <div>
          <h3 className="mb-2 text-xl font-bold">Need some help?</h3>
          <a
            href="https://github.com/storybookjs/storybook/discussions/categories/help"
            target="_blank"
            className="flex items-center gap-1 text-blue-500 transition-colors hover:text-blue-600"
          >
            Join a discussion on GitHub
            <ChevronSmallRightIcon />
          </a>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-bold">Latest product updates</h3>
          <a
            href="https://storybook.js.org/releases/"
            target="_blank"
            className="flex items-center gap-1 text-blue-500 transition-colors hover:text-blue-600"
          >
            See changelog
            <ChevronSmallRightIcon />
          </a>
        </div>
      </div>
    </>
  );
};

const Card = ({
  href,
  title,
  external = false,
}: {
  href: string;
  title: string;
  external?: boolean;
}) => {
  const Slot = external ? 'a' : Link;

  return (
    <Slot
      href={href}
      className="flex items-center gap-3 text-blue-500 transition-colors hover:text-blue-600"
    >
      <Image src="/images/icons/icon-more.svg" width="20" height="20" alt="" />
      {title}
    </Slot>
  );
};

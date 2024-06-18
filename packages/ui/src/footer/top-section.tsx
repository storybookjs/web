import type { FC, ReactNode } from 'react';
import { DiscordIcon, GithubIcon, XIcon, YoutubeIcon } from '@storybook/icons';
import { cn } from '@repo/utils';
import { NewsletterForm } from '../newsletter-form';
import type { FooterProps } from '.';

interface TopSectionProps {
  variant?: FooterProps['variant'];
}

export function TopSection({ variant }: TopSectionProps): JSX.Element {
  return (
    <div className="ui-mb-14">
      <div className="ui-mb-4 ui-font-bold ui-text-md">Join the community</div>
      <div className="ui-flex ui-flex-col ui-items-start ui-gap-8 lg:ui-flex-row lg:ui-justify-between lg:ui-items-center">
        <div className="ui-flex ui-flex-col ui-w-full sm:ui-w-auto ui-gap-4 sm:ui-flex-row sm:ui-items-center sm:ui-gap-6">
          <NewsletterForm />
          <div className="ui-text-slate-400 w-full">
            6,378 developers and counting
          </div>
        </div>
        <div className="ui-flex ui-items-center ui-gap-4">
          <Circle href="http://github.com/storybookjs" variant={variant}>
            <GithubIcon size={18} />
          </Circle>
          <Circle href="https://twitter.com/storybookjs" variant={variant}>
            <XIcon size={18} />
          </Circle>
          <Circle href="https://discord.gg/storybook" variant={variant}>
            <DiscordIcon size={18} />
          </Circle>
          <Circle
            href="https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg"
            variant={variant}
          >
            <YoutubeIcon size={18} />
          </Circle>
        </div>
      </div>
    </div>
  );
}

interface CircleProps {
  children: ReactNode;
  href: string;
  variant?: FooterProps['variant'];
}

const Circle: FC<CircleProps> = ({ children, href, variant }) => {
  return (
    <a
      className={cn(
        'ui-flex ui-items-center ui-justify-center ui-border ui-border-zinc-200 ui-rounded-full ui-h-12 ui-w-12 hover:-ui-translate-y-1 ui-transition-all',
        variant === 'home' &&
          'ui-border ui-border-zinc-700 hover:ui-border-zinc-400',
        variant !== 'home' &&
          'ui-bg-white hover:ui-border-zinc-400 dark:ui-bg-slate-900 dark:ui-border-slate-700 dark:hover:ui-border-slate-500',
      )}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
};

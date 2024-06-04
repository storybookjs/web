import type { FC, ReactNode } from 'react';
import { DiscordIcon, GithubIcon, YoutubeIcon } from '@storybook/icons';
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
          <div className="ui-text-zinc-400">6,378 developers and counting</div>
        </div>
        <div className="ui-flex ui-items-center ui-gap-4">
          <Circle href="http://github.com/storybookjs" variant={variant}>
            <GithubIcon size={18} />
          </Circle>
          <Circle href="https://twitter.com/storybookjs" variant={variant}>
            <svg
              aria-label="Twitter"
              fill="none"
              height="18"
              viewBox="0 0 14 14"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.02.446h2.137L8.49 5.816l5.51 7.28H9.67L6.298 8.683l-3.88 4.413H.282l5.004-5.735L0 .446h4.442l3.064 4.048L11.02.446zm-.759 11.357h1.18L3.796 1.655H2.502l7.759 10.148z"
                fill="#fff"
              />
            </svg>
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

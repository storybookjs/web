import Image from 'next/image';
import { ShareAltIcon } from '@storybook/icons';
import type { Integration } from '../types';

interface IntegrationCardProps {
  integration: Integration;
}

export const IntegrationCard = ({ integration }: IntegrationCardProps) => {
  const { name, platform, description, href, icon, image } = integration;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group flex flex-col overflow-hidden rounded border border-zinc-300 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-500"
    >
      <div className="relative aspect-video w-full border-b border-zinc-300 bg-zinc-50 dark:border-slate-800 dark:bg-slate-800">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-4">
          <Image
            src={icon}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="font-bold">{name}</div>
            <div className="text-sm text-zinc-600 dark:text-slate-400">
              {platform}
            </div>
          </div>
          <ShareAltIcon
            aria-label="Opens in a new tab"
            className="flex-shrink-0 text-zinc-500 transition-colors group-hover:text-blue-500 dark:text-slate-400"
          />
        </div>
        <p className="text-black dark:text-slate-400">{description}</p>
      </div>
    </a>
  );
};

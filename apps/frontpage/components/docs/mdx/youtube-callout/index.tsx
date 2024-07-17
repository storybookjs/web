'use client';

import { ChevronSmallDownIcon, YoutubeIcon } from '@storybook/icons';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { Youtube } from '../../../logos/youtube';
import styles from './styles.module.css';

interface YouTubeCalloutProps {
  id: string;
  open?: boolean;
  summary?: string;
  title: string;
  params?: string;
}

// `.yt-lite` styles from: https://github.com/ibrahimcesar/react-lite-youtube-embed#option-1
// `.lty-playbtn` styles emulate YouTube's thumbnail play button

export function YouTubeCallout({
  id,
  summary = 'Watch a video tutorial on the Storybook channel',
  title,
  params,
}: YouTubeCalloutProps) {
  return (
    <details className="group cursor-pointer overflow-hidden rounded border border-zinc-300 dark:border-slate-700 [&[open]>summary]:!mb-0 [&[open]]:before:hidden">
      <summary className="flex h-12 items-center gap-2 px-4 marker:hidden">
        <Youtube size={24} className="mr-2" />
        {summary}
        <ChevronSmallDownIcon className="group-[&[open]]:rotate-180" />
      </summary>
      <div className={styles.details}>
        <LiteYouTubeEmbed id={id} params={params} title={title} />
      </div>
    </details>
  );
}

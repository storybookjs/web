'use client';

import { ChevronSmallDownIcon, YoutubeIcon } from '@storybook/icons';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
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
    <details className="group rounded border border-zinc-300 overflow-hidden cursor-pointer [&[open]]:before:hidden [&[open]>summary]:!mb-0">
      <summary className="marker:hidden flex items-center gap-2 h-12 px-4">
        <YoutubeIcon className="text-red-500 mr-px" size={18} />
        {summary}
        <ChevronSmallDownIcon className="group-[&[open]]:rotate-180" />
      </summary>
      <div className={styles.details}>
        <LiteYouTubeEmbed id={id} params={params} title={title} />
      </div>
    </details>
  );
}

'use client';

import ReactPlayer from 'react-player/youtube';

export const YoutubePlayer = ({ url }: { url: string }) => {
  return <ReactPlayer url={url} />;
};

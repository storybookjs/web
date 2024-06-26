import fs from 'node:fs';
import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

type ImageProps = DetailedHTMLProps<
  HTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

type VideoProps = ImageProps & {
  activeVersion: string;
  src?: string;
};

export const Video: FC<VideoProps> = ({ src, activeVersion }) => {
  const pathWithoutRoot = src?.replace('../_assets/', '');
  const path = `/docs-assets/${activeVersion}/${pathWithoutRoot}`;
  const localPath = `public${path}`;

  console.log('VIDEO', path, localPath);

  // Check if the file exists
  const fileExists = fs.existsSync(localPath);
  if (!fileExists) return null;

  return (
    <video autoPlay className="mb-6" loop muted playsInline>
      <source src={path} type="video/mp4" />
    </video>
  );
};

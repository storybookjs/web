import fs from 'node:fs';
import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

type ImageProps = DetailedHTMLProps<
  HTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

interface VideoProps extends ImageProps {
  activeVersion: string;
  src?: string;
}

export const Video: FC<VideoProps> = ({ src, activeVersion }) => {
  const pathWithoutRoot = src?.replace('../_assets/', '');
  const path = `/docs/${activeVersion}/${pathWithoutRoot}`;
  const localPath = `public${path}`;

  // Check if the file exists
  const fileExists = fs.existsSync(localPath);
  if (!fileExists) return null;

  return (
    <video autoPlay loop muted playsInline className="mb-6">
      <source src={path} type="video/mp4" />
    </video>
  );
};

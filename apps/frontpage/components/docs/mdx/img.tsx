import fs from 'node:fs';
import Image from 'next/image';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import sizeOf from 'image-size';

type ImageProps = DetailedHTMLProps<
  HTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

interface ImgProps extends ImageProps {
  activeVersion: string;
  src?: string;
  alt?: string;
}

export function Img({ src, alt, activeVersion }: ImgProps) {
  const pathWithoutRoot = src?.replace(/^(?:\.\.\/)+_assets\//, '');
  const path = `/docs-assets/${activeVersion}/${pathWithoutRoot ?? ''}`;
  const localPath = `public${path}`;

  // Check if the file exists
  const fileExists = fs.existsSync(localPath);
  if (!fileExists) return null;

  // Get the dimensions of the image
  const dimensions = sizeOf(localPath);

  if (!dimensions.width || !dimensions.height) return null;

  return (
    <Image
      alt={alt ?? ''}
      height={dimensions.height}
      src={path}
      width={dimensions.width}
    />
  );
}

import Image from "next/image";
import { FC } from "react";
import sizeOf from "image-size";
import fs from "fs";

interface Props {
  src: string;
  alt: string;
  activeVersion: string;
}

export const Img: FC<Props> = ({ src, alt, activeVersion }) => {
  const pathWithoutDotSlash = src.replace(/^\.\//, "");
  const path = `/docs/${activeVersion}/${pathWithoutDotSlash}`;
  const localPath = `public${path}`;

  // Check if the file exists
  const fileExists = fs.existsSync(localPath);
  if (!fileExists) return null;

  // Get the dimensions of the image
  const dimensions = sizeOf(localPath);

  if (!dimensions.width || !dimensions.height) return null;

  return (
    <Image
      width={dimensions.width}
      height={dimensions.height}
      className="text-blue-700"
      src={path}
      alt={alt}
    />
  );
};

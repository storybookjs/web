import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import sizeOf from "image-size";
import fs from "fs";

type ImageProps = DetailedHTMLProps<
  HTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

interface Props extends ImageProps {
  activeVersion: string;
  src?: string;
  alt?: string;
}

export const Img = ({ src, alt, activeVersion }: Props) => {
  const pathWithoutRoot = src?.replace("../_assets/", "");
  const path = `/docs/${activeVersion}/${pathWithoutRoot}`;
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
      className="my-6"
      src={path}
      alt={alt || ""}
    />
  );
};

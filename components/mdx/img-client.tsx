"use client";

import Image from "next/image";
import { FC } from "react";
import sizeOf from "image-size";
import fs from "fs";
import { usePathname } from "next/navigation";
import { DocsVersion } from "@/docs-versions";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const ImgClient: FC<Props> = ({ src, alt, width, height }) => {
  const pathname = usePathname();

  console.log("coco", pathname);

  return (
    <Image
      width={width}
      height={height}
      className="text-blue-700"
      src={src}
      alt={alt}
    />
  );
};

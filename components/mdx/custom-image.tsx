import Image from "next/image";
import { FC } from "react";

type Props = {
  src: string;
  alt: string;
  priority?: string;
};

export const CustomImage: FC<Props> = ({ src, alt, priority }) => {
  const prty = priority ? true : false;

  return (
    <div className="w-full h-full">
      <Image
        className="rounded-lg mx-auto"
        src={src}
        alt={alt}
        width={650}
        height={650}
        priority={prty}
      />
    </div>
  );
};

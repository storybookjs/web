import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import fs from "fs";

type ImageProps = DetailedHTMLProps<
  HTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

interface Props extends ImageProps {
  activeVersion: string;
  src?: string;
}

export const Video: FC<Props> = ({ src, activeVersion }) => {
  const pathWithoutRoot = src?.replace("../_assets/", "");
  const path = `/docs/${activeVersion}/${pathWithoutRoot}`;
  const localPath = `public${path}`;

  // Check if the file exists
  const fileExists = fs.existsSync(localPath);
  if (!fileExists) return null;

  return (
    <video autoPlay muted playsInline loop>
      <source src={path} type="video/mp4" />
    </video>
  );
};

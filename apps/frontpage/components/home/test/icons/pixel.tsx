import * as React from "react";
import type { SVGProps } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
}

export function Pixel({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) {
  return <svg
    aria-labelledby={titleId}
    role="img"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="#37D5D3" fillOpacity={0.9} fillRule="evenodd">
      <path d="M8 4h16v20H4V8a4 4 0 0 1 4-4z" opacity={0.2} />
      <path d="M40 4H24v20h20V8a4 4 0 0 0-4-4z" opacity={0.4} />
      <path d="M4 40V24h20v20H8a4 4 0 0 1-4-4z" opacity={0.6} />
      <path d="M44 40V24H24v20h16a4 4 0 0 0 4-4z" opacity={0.3} />
    </g>
  </svg>
}

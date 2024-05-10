import * as React from "react";
import type { SVGProps } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
}

export function Code({
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
    <g fill="none" fillRule="evenodd">
      <rect fill="#FD8460" height={8} rx={4} width={24} x={2} y={2} />
      <rect fill="#FFD57C" height={8} rx={4} width={27} x={20} y={26} />
      <rect fill="#79C9FC" height={8} rx={4} width={17} x={9} y={38} />
      <rect fill="#79C9FC" height={8} rx={4} width={27} x={9} y={14} />
    </g>
  </svg>
}

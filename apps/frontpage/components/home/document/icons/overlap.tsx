import * as React from "react";
import type { SVGProps } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
}

export function Overlap({
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
      <rect fill="#FC521F" height={24} opacity={0.7} rx={4} width={24} y={6} />
      <rect
        fill="#FFC445"
        height={24}
        opacity={0.7}
        rx={4}
        width={24}
        x={12}
        y={12}
      />
      <rect
        fill="#1EA7FD"
        height={24}
        opacity={0.7}
        rx={4}
        width={24}
        x={24}
        y={18}
      />
    </g>
  </svg>
}

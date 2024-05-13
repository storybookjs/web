import * as React from "react";
import type { SVGProps } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
}

export function Interact({
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
      <circle cx={24} cy={24} fill="#1EA7FD" opacity={0.1} r={24} />
      <circle cx={24} cy={24} fill="#1EA7FD" opacity={0.2} r={16} />
      <circle cx={24} cy={24} fill="#79C9FC" r={8} />
      <path
        d="M33.3 45.5c-.5 0-.9-.3-1-.7l-7.7-19.2a1.2 1.2 0 0 1 1.5-1.5l19.2 7.6c.4.2.7.6.7 1 0 .6-.2 1-.7 1.2L40 36.6l4.1 4.1c.5.5.5 1.2 0 1.7L42.6 44c-.5.4-1.3.4-1.7 0l-4-4-2.5 5c-.2.4-.7.6-1.1.6z"
        fill="#333"
      />
      <path
        d="m36.4 37.6-2.9 5.9-7-17.5L44 33l-6.4 3.2 4.9 4.8-1.4 1.3z"
        fill="#FFF"
      />
    </g>
  </svg>
}

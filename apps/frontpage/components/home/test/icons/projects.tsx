import * as React from "react";
import type { SVGProps } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
}

export function Projects({
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
      <path
        d="M16 3h23a3 3 0 0 1 0 6H16a3 3 0 0 1 0-6Zm0 24h27a3 3 0 0 1 0 6H16a3 3 0 0 1 0-6Zm0 12h14a3 3 0 0 1 0 6H16a3 3 0 0 1 0-6Zm0-24h20a3 3 0 0 1 0 6H16a3 3 0 0 1 0-6Z"
        fill="#79C9FC"
      />
      <path
        d="M6.782 5.513c.29.19.29.5 0 .689L1.527 9.633a.436.436 0 0 1-.234.081C1.12 9.714 1 9.558 1 9.29V2.425C1 2.156 1.12 2 1.293 2c.07 0 .15.026.234.08l5.255 3.433Zm0 12c.29.19.29.5 0 .689l-5.255 3.431a.436.436 0 0 1-.234.081c-.173 0-.293-.156-.293-.425v-6.864c0-.269.12-.425.293-.425.07 0 .15.026.234.08l5.255 3.433Zm0 24c.29.19.29.5 0 .689l-5.255 3.431a.436.436 0 0 1-.234.081c-.173 0-.293-.156-.293-.425v-6.864c0-.269.12-.425.293-.425.07 0 .15.026.234.08l5.255 3.433Z"
        fill="#A0DB77"
      />
      <rect fill="#FD8460" height={7} rx={3.5} width={7} y={26.5} />
    </g>
  </svg>
}

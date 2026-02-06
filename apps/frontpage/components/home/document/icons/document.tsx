import * as React from 'react';
import type { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

export function Document({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      aria-labelledby={titleId}
      fill="none"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M7 0C4.79083 0 3 1.79083 3 4V44C3 46.2092 4.79083 48 7 48H41C43.2092 48 45 46.2092 45 44V9L36 0H7Z"
        fill="#D7F7F6"
      />
      <rect
        fill="#37D5D3"
        fillOpacity="0.85"
        height="5"
        rx="2"
        width="9"
        x="9"
        y="17"
      />
      <rect
        fill="#37D5D3"
        fillOpacity="0.85"
        height="5"
        rx="2"
        width="19"
        x="20"
        y="17"
      />
      <rect
        fill="#37D5D3"
        fillOpacity="0.85"
        height="5"
        rx="2"
        width="9"
        x="9"
        y="26"
      />
      <rect
        fill="#37D5D3"
        fillOpacity="0.85"
        height="5"
        rx="2"
        width="19"
        x="20"
        y="26"
      />
      <rect
        fill="#37D5D3"
        fillOpacity="0.85"
        height="5"
        rx="2"
        width="9"
        x="9"
        y="35"
      />
      <rect
        fill="#37D5D3"
        fillOpacity="0.85"
        height="5"
        rx="2"
        width="19"
        x="20"
        y="35"
      />
      <path
        d="M36 0V5C36 7.20914 37.7909 9 40 9H45L36 0Z"
        fill="#37D5D3"
        fillOpacity="0.85"
      />
    </svg>
  );
}

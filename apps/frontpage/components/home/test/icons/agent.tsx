import * as React from 'react';
import type { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

export function Agent({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
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
        {/* Circular arrow representing feedback loop */}
        <path
          d="M24 12a12 12 0 0 1 10.4 6"
          stroke="#333"
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />
        <path d="M32.5 14.5l2 4.5 4.5-2" stroke="#333" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path
          d="M24 36a12 12 0 0 1-10.4-6"
          stroke="#333"
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />
        <path d="M15.5 33.5l-2-4.5-4.5 2" stroke="#333" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

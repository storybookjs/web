import * as React from 'react';
import type { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

export function Pipeline({
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
        <circle cx={24} cy={24} fill="#A0DB77" fillOpacity={0.3} r={24} />
        <rect fill="#A0DB77" height={4} rx={2} width={24} x={9} y={22} />
        <circle cx={11} cy={24} fill="#A0DB77" r={4.5} />
        <circle cx={22} cy={24} fill="#A0DB77" r={4.5} />
        <circle cx={35} cy={24} fill="#A0DB77" r={8} />
        <path
          d="m31.5 24.2 2.5 2.5 5-5"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
        />
      </g>
    </svg>
  );
}

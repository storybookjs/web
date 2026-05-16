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
      role="img"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="#FFE8B6"
        d="M7 0a4 4 0 0 0-4 4v40a4 4 0 0 0 4 4h34a4 4 0 0 0 4-4V9l-9-9H7Z"
      />
      <rect width={9} height={5} x={9} y={17} fill="#FEBD32" rx={2} />
      <rect width={19} height={5} x={20} y={17} fill="#FEBD32" rx={2} />
      <rect width={9} height={5} x={9} y={26} fill="#FEBD32" rx={2} />
      <rect width={19} height={5} x={20} y={26} fill="#FEBD32" rx={2} />
      <rect width={9} height={5} x={9} y={35} fill="#FEBD32" rx={2} />
      <rect width={19} height={5} x={20} y={35} fill="#FEBD32" rx={2} />
      <path fill="#FEBD32" d="M36 0v5a4 4 0 0 0 4 4h5l-9-9Z" />
    </svg>
  );
}

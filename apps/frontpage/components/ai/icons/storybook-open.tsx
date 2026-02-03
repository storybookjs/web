import * as React from 'react';
import type { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

export const StorybookOpen = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    role="img"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#FF4785"
      fillOpacity="0.5"
      fillRule="evenodd"
      d="M20 10.435a4.364 4.364 0 0 1 3.515-4.28l11.272-2.236A4.364 4.364 0 0 1 40 8.199V27.07a4.364 4.364 0 0 1-3.515 4.28l-11.272 2.236A4.364 4.364 0 0 1 20 29.306z"
      clipRule="evenodd"
    />
    <path
      fill="#FF4785"
      fillOpacity="0.7"
      fillRule="evenodd"
      d="M0 8.199a4.364 4.364 0 0 1 5.213-4.28l11.272 2.235A4.364 4.364 0 0 1 20 10.434v18.872a4.364 4.364 0 0 1-5.213 4.28L3.515 31.35A4.364 4.364 0 0 1 0 27.07z"
      clipRule="evenodd"
    />
    <path
      fill="#FF4785"
      fillRule="evenodd"
      d="M18.182 7.139s1.59.312 2.321 1.08c.73.767 1.315 3.068 1.315 3.068V33.7c0 2.316 1.157 5.569 1.157 5.569l-2.472-3.154-1.428 3.154s-.893-2.927-.893-5.37V7.14Z"
      clipRule="evenodd"
    />
  </svg>
);

import type { SVGProps } from 'react';

/** List icon, drawn in the same flat, filled style as the other home icons */
export function AgentTest(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect fill="#A470D5" height={40} rx={10} width={40} x={2} y={6} />
        <path
          d="m12.5 26.5 6 6 13-14"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={4.5}
        />
        <path
          d="M40 0c.6 3.9 2.1 5.4 6 6-3.9.6-5.4 2.1-6 6-.6-3.9-2.1-5.4-6-6 3.9-.6 5.4-2.1 6-6Z"
          fill="#FFC445"
        />
      </g>
    </svg>
  );
}

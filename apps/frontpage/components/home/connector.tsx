import React from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';
import { cn } from '@repo/utils';

interface ConnectorProps {
  name: string;
  progress: MotionValue<number>;
  className?: string;
}

export function Connector({
  name,
  progress,
  className,
  ...props
}: ConnectorProps) {
  const pathLength = useTransform(progress, [0, 0.75], [0, 1], { clamp: true });
  const scale = useTransform(progress, [0.75, 1], [0, 1], { clamp: true });

  return (
    <motion.svg
      className={cn('block', className)}
      fill="none"
      height="145"
      viewBox="0 0 263 145"
      width="263"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <motion.circle cx="256" cy="140" fill="#1EA7FD" r="5" style={{ scale }} />
      <path
        d="M252.5 134.5C195.5 53.001 98.4998 0.999337 10.0003 0.999647"
        mask={`url(#${name}-connector-mask)`}
        stroke="#1EA7FD"
        strokeDasharray="6 4"
        strokeWidth="2"
      />
      <defs>
        <mask id={`${name}-connector-mask`} maskUnits="userSpaceOnUse">
          <motion.path
            d="M10.0003,0.999647C98.4998,0.999337 195.5,53.001 252.5,134.5"
            stroke="#fff"
            strokeDasharray="0 1"
            strokeWidth="4"
            style={{ pathLength }}
          />
        </mask>
      </defs>
    </motion.svg>
  );
}

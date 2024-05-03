import { cn } from '@repo/utils';
import { CheckIcon, ChevronSmallRightIcon } from '@storybook/icons';
import Link from 'next/link';
import React, { FC, ReactNode } from 'react';

interface FeatureStepProps {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  href: string;
  linkLabel: string;
  logoBgColor?: string;
}

export const FeatureStep: FC<FeatureStepProps> = ({
  icon = <CheckIcon size={24} />,
  title,
  description,
  href,
  linkLabel,
  logoBgColor,
}) => (
  <div className="flex flex-col items-center max-w-[480px] my-12 mx-auto">
    <div className="w-0.5 h-28 mb-2 bg-gradient-to-b from-white/5 to-white/20" />
    <div
      className={cn(
        'flex items-center justify-center w-10 h-10 rounded-full p-[10px] mb-5 bg-green-500 text-white',
        logoBgColor,
      )}
    >
      {icon}
    </div>
    <div className="mb-3 text-2xl font-bold text-center text-white">
      {title}
    </div>
    <div className="mb-5 text-center text-white">{description}</div>
    <Link
      href={href}
      className="flex items-center gap-2 font-bold text-blue-500"
    >
      {linkLabel}
      <ChevronSmallRightIcon />
    </Link>
  </div>
);

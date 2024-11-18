'use client';

import type { FC } from 'react';
import { SimpleArrow } from './simple-arrow';
import { Video } from './video';

interface EyebrowProps {
  href: string;
  title: string;
}

export const Eyebrow: FC<EyebrowProps> = ({ href, title }) => {
  return (
    <div className="ui-text-sm ui-font-normal ui-flex ui-justify-center ui-py-[10px] ui-px-[20px] ui-text-white ui-bg-black ui-bg-gradient-to-r ui-from-[#340000] ui-via-black ui-to-[#000040]">
      <a
        href={href}
        className="ui-flex ui-justify-center ui-items-center ui-gap-2"
      >
        <Video />
        {title}
        <SimpleArrow />
      </a>
    </div>
  );
};

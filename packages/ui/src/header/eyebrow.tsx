'use client';

import * as React from 'react';
import { SimpleArrow } from './simple-arrow';
import { Video } from './video';

interface EyebrowProps {
  href?: string;
  title: React.ReactNode;
}

export const Eyebrow: React.FC<EyebrowProps> = ({ href, title }) => {
  return (
    <div className="ui-text-sm ui-font-normal ui-flex ui-justify-center ui-py-[10px] ui-px-[20px] ui-text-white ui-bg-black ui-bg-gradient-to-r ui-from-[#340000] ui-via-black ui-to-[#000040]">
      {href ? (
        <a
          href={href}
          className="ui-flex ui-justify-center ui-items-center ui-gap-2"
        >
          {/* @ts-expect-error - Not only is it typed, but it also functions correctly */}
          <Video className="ui-flex-none" />
          {title}
          {/* @ts-expect-error - Not only is it typed, but it also functions correctly */}
          <SimpleArrow className="ui-flex-none ui-hidden sm:ui-inline" />
        </a>
      ) : (
        <span
          className="ui-flex ui-flex-wrap ui-justify-start ui-items-center ui-gap-2"
        >
          {title}
        </span>
      )}
    </div>
  );
};

'use client';

import { useCommunity } from '../../app/community/provider';
import { useInView } from 'framer-motion';
import { FC, ReactNode, useEffect, useRef } from 'react';

interface AnchorProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const Section: FC<AnchorProps> = ({ id, children, className }) => {
  const ref = useRef(null);
  const refInView = useInView(ref);
  const { setActiveSegment } = useCommunity();

  useEffect(() => {
    if (refInView) {
      setActiveSegment(id);
    }
  }, [id, refInView, setActiveSegment]);

  return (
    <div ref={ref} className={className}>
      <div id={id} className="absolute -top-28" />
      {children}
    </div>
  );
};

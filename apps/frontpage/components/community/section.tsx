'use client';

import { useInView } from 'framer-motion';
import type { FC, ReactNode} from 'react';
import { useEffect, useRef } from 'react';
import { useCommunity } from '../../app/community/provider';

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
    <div className={className} ref={ref}>
      <div className="absolute -top-28" id={id} />
      {children}
    </div>
  );
};

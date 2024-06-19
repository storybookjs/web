'use client';

import { useEffect, type FC, type ReactNode } from 'react';
import { useFigure } from './figure-provider';

interface PreProps {
  children?: ReactNode;
}

export const Figcaption: FC<PreProps> = (props) => {
  const { setTitle } = useFigure();

  useEffect(() => {
    setTitle(props.children as string);
  }, []);

  return (
    <figcaption {...props} className="hidden">
      {props.children}
    </figcaption>
  );
};

'use client';

import { useContext, useEffect, type FC, type ReactNode } from 'react';
import { FigureContext } from './figure-provider';

interface PreProps {
  children?: ReactNode;
}

export const Figcaption: FC<PreProps> = (props) => {
  const context = useContext(FigureContext);
  const { setTitle } = context || {};

  useEffect(() => {
    setTitle && setTitle(props.children as string);
  }, []);

  return (
    <figcaption {...props} className="hidden">
      {props.children}
    </figcaption>
  );
};

'use client';

import { useContext, useEffect, type FC, type ReactNode } from 'react';
import { FigureContext } from './figure-provider';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type FigcaptionProps = {
  children?: ReactNode;
};

export const Figcaption: FC<FigcaptionProps> = (props) => {
  const context = useContext(FigureContext);
  const { setTitle } = context || {};

  useEffect(() => {
    setTitle && setTitle(props.children as string);
  }, []);

  return (
    <figcaption {...props} className="ui-hidden">
      {props.children}
    </figcaption>
  );
};

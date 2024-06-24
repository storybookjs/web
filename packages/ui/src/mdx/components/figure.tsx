import type { FC, ReactNode } from 'react';
import { FigureProvider } from './figure-provider';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type FigureProps = {
  children?: ReactNode;
};

export const Figure: FC<FigureProps> = (props) => {
  return (
    <FigureProvider>
      <figure {...props}>{props.children}</figure>
    </FigureProvider>
  );
};

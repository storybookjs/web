import type { FC, ReactNode } from 'react';
import { FigureProvider } from './figure-provider';

interface PreProps {
  children?: ReactNode;
}

export const Figure: FC<PreProps> = (props) => {
  return (
    <FigureProvider>
      <figure {...props}>{props.children}</figure>
    </FigureProvider>
  );
};

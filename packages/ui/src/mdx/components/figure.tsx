import type { ReactNode } from 'react';
import { FigureProvider } from './figure-provider';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type FigureProps = {
  children?: ReactNode;
};

export function Figure(props: FigureProps): JSX.Element {
  return (
    <FigureProvider>
      <figure {...props}>{props.children}</figure>
    </FigureProvider>
  );
}

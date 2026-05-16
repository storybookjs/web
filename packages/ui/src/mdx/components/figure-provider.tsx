'use client';

import type { FC, ReactNode } from 'react';
import { createContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
export type FigureContextProps = {
  title: string;
  setTitle: (id: string) => void;
};

export const FigureContext = createContext<FigureContextProps | undefined>(
  undefined,
);

export const FigureProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<string>('');

  return (
    <FigureContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      {children}
    </FigureContext.Provider>
  );
};

'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

export interface FigureContextProps {
  title: string;
  setTitle: (id: string) => void;
}

export const FigureContext = createContext<FigureContextProps | undefined>(
  undefined,
);

export function FigureProvider({ children }: { children: ReactNode }) {
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
}

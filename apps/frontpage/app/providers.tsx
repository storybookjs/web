"use client";

import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

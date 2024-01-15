"use client";

import { renderers } from "@/docs-renderers";
import { getCookie, setCookie } from "cookies-next";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  activeRenderer: null | string;
  setRenderer: (id: string) => void;
}

const DocsContext = createContext<Props | undefined>(undefined);

export function DocsProvider({ children }: { children: ReactNode }) {
  const [activeRenderer, setActiveRenderer] = useState<null | string>(null);

  const cookie = getCookie("sb-docs-renderer");

  useEffect(() => {
    if (cookie) {
      setActiveRenderer(cookie);
    } else {
      setActiveRenderer(renderers[0].id);
    }
  }, [cookie]);

  const setRenderer = (id: string) => {
    setActiveRenderer(id);
    setCookie("sb-docs-renderer", id);
  };

  return (
    <DocsContext.Provider
      value={{
        activeRenderer,
        setRenderer,
      }}
    >
      {children}
    </DocsContext.Provider>
  );
}

export function useDocs() {
  const context = useContext(DocsContext);
  if (context === undefined) {
    throw new Error("useDocs must be used within a DocsProvider");
  }
  return context;
}

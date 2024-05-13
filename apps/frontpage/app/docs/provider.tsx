'use client';

import { languages, packageManagers, renderers } from '@repo/utils';
import { getCookie, setCookie } from 'cookies-next';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface DocsContextProps {
  activeRenderer: null | string;
  setRenderer: (id: string) => void;
  activeLanguage: null | string;
  setLanguage: (id: string) => void;
  activePackageManager: null | string;
  setPackageManager: (id: string) => void;
}

const DocsContext = createContext<DocsContextProps | undefined>(undefined);

export function DocsProvider({ children }: { children: ReactNode }) {
  const [activeRenderer, setActiveRenderer] = useState<null | string>(null);
  const [activeLanguage, setActiveLanguage] = useState<null | string>(null);
  const [activePackageManager, setActivePackageManager] = useState<
    null | string
  >(null);

  const cookieRendererId = 'sb-docs-renderer';
  const cookieLanguageId = 'sb-docs-language';
  const cookiePackageManagerId = 'sb-docs-package-manager';

  useEffect(() => {
    const cookieRenderer = getCookie(cookieRendererId);
    const cookieLanguage = getCookie(cookieLanguageId);
    const cookiePackageManager = getCookie(cookiePackageManagerId);

    if (cookieRenderer) {
      setActiveRenderer(cookieRenderer);
    } else {
      setActiveRenderer(renderers[0]?.id || '');
    }

    if (cookieLanguage) {
      setActiveLanguage(cookieLanguage);
    } else {
      setActiveLanguage(languages[0]?.id || '');
    }

    if (cookiePackageManager) {
      setActivePackageManager(cookiePackageManager);
    } else {
      setActivePackageManager(packageManagers[0]?.id || '');
    }
  }, []);

  const setRenderer = (id: string) => {
    setActiveRenderer(id);
    setCookie(cookieRendererId, id);
  };

  const setLanguage = (id: string) => {
    setActiveLanguage(id);
    setCookie(cookieLanguageId, id);
  };

  const setPackageManager = (id: string) => {
    setActivePackageManager(id);
    setCookie(cookiePackageManagerId, id);
  };

  return (
    <DocsContext.Provider
      value={{
        activeRenderer,
        setRenderer,
        activeLanguage,
        setLanguage,
        activePackageManager,
        setPackageManager,
      }}
    >
      {children}
    </DocsContext.Provider>
  );
}

export function useDocs() {
  const context = useContext(DocsContext);
  if (context === undefined) {
    throw new Error('useDocs must be used within a DocsProvider');
  }
  return context;
}

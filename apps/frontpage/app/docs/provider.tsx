'use client';

import { languages, packageManagers, renderers } from '@repo/utils';
import { getCookie, setCookie } from 'cookies-next';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  cookieLanguageId,
  cookiePackageManagerId,
  cookieRenderId,
} from '../../constants';
import { useSearchParams } from 'next/navigation';

export interface DocsContextProps {
  activeRenderer: null | string;
  setRenderer: (id: string) => void;
  activeLanguage: null | string;
  setLanguage: (id: string) => void;
  activePackageManager: null | string;
  setPackageManager: (id: string) => void;
}

export const DocsContext = createContext<DocsContextProps | undefined>(
  undefined,
);

export function DocsProvider({ children }: { children: ReactNode }) {
  const [activeRenderer, setActiveRenderer] = useState<null | string>(
    renderers[0].id,
  );
  const [activeLanguage, setActiveLanguage] = useState<null | string>(
    languages[0].id,
  );
  const [activePackageManager, setActivePackageManager] = useState<
    null | string
  >(packageManagers[0].id);

  useEffect(() => {
    const cookieRenderer = getCookie(cookieRenderId);
    const cookieLanguage = getCookie(cookieLanguageId);
    const cookiePackageManager = getCookie(cookiePackageManagerId);

    if (cookieRenderer) {
      setActiveRenderer(cookieRenderer);
    } else {
      setCookie(cookieRenderId, renderers[0].id);
    }

    if (cookieLanguage) {
      setActiveLanguage(cookieLanguage);
    } else {
      setCookie(cookieLanguageId, languages[0].id);
    }

    if (cookiePackageManager) {
      setActivePackageManager(cookiePackageManager);
    } else {
      setCookie(cookiePackageManagerId, packageManagers[0].id);
    }
  }, []);

  const setRenderer = (id: string) => {
    setActiveRenderer(id);
    setCookie(cookieRenderId, id);
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

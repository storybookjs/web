'use client';

import { languages, packageManagers, renderers } from '@repo/utils';
import { getCookie, setCookie } from 'cookies-next';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  cookieLanguageId,
  cookiePackageManagerId,
  cookieRenderId,
  cookieSnippetTabsId,
} from '../../constants';

export interface DocsContextProps {
  activeRenderer: null | string;
  setRenderer: (id: string) => void;
  activeLanguage: null | string;
  activeSnippetTabs: string[];
  setLanguage: (id: string) => void;
  activePackageManager: null | string;
  setPackageManager: (id: string) => void;
  setSnippetTabs: (id: string) => void;
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
  const [activeSnippetTabs, setActiveSnippetTabs] = useState<string[]>([]);

  useEffect(() => {
    const cookieRenderer = getCookie(cookieRenderId);
    const cookieLanguage = getCookie(cookieLanguageId);
    const cookiePackageManager = getCookie(cookiePackageManagerId);
    const cookieSnippetTabs = getCookie(cookieSnippetTabsId);

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

    if (cookieSnippetTabs) {
      setActiveSnippetTabs(cookieSnippetTabs.split(',').map(decodeURIComponent));
    } else {
      setCookie(cookieSnippetTabsId, '');
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

  const setSnippetTabs = (id: string) => {
    setActiveSnippetTabs((prev) => [id, ...prev.filter((tab) => tab !== id)]);
    setCookie(
      cookieSnippetTabsId,
      [id, ...activeSnippetTabs.filter((tab) => tab !== id)].join(','),
    );
  };

  return (
    <DocsContext.Provider
      value={{
        activeRenderer,
        setRenderer,
        activeLanguage,
        activeSnippetTabs,
        setLanguage,
        activePackageManager,
        setPackageManager,
        setSnippetTabs,
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

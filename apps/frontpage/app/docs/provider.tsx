'use client';

import { getVersion, languages, packageManagers, renderers } from '@repo/utils';
import { getCookie, setCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  cookieLanguageId,
  cookiePackageManagerId,
  cookieRenderId,
  cookieSnippetTabsId,
  cookieDismissalsId,
} from '../../constants';
import {
  docsVersionOffersRenamedCsfTabs,
  remapCsfTabTitle,
} from './remap-csf-tab-titles';

export interface DocsContextProps {
  activeRenderer: null | string;
  setRenderer: (id: string) => void;
  activeLanguage: null | string;
  activeSnippetTabs: null | string[];
  activeDismissals: null | string[];
  setLanguage: (id: string) => void;
  activePackageManager: null | string;
  setPackageManager: (id: string) => void;
  setSnippetTabs: (id: string) => void;
  setDismissals: (id: string) => void;
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
  const [activeDismissals, setActiveDismissals] = useState<string[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    const cookieRenderer = getCookie(cookieRenderId);
    const cookieLanguage = getCookie(cookieLanguageId);
    const cookiePackageManager = getCookie(cookiePackageManagerId);
    const cookieSnippetTabs = getCookie(cookieSnippetTabsId);
    const cookieDismissals = getCookie(cookieDismissalsId);

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
      const storedTabs = cookieSnippetTabs.split(',').map(decodeURIComponent);
      // The snippet-tabs cookie is site-wide, but tab titles are per docs version: the
      // CSF tab rename only exists on versions whose content ships the new titles
      // (version 11 and later; older pinned versions keep the pre-rename titles).
      // Remap the in-memory values for such pages; the durable cookie write-back
      // happens where the page's offered tabs are known (the snippet-tab resolution),
      // so the cookie is only ever rewritten when the page offers the target tab.
      const pageOffersRenamedTabs = docsVersionOffersRenamedCsfTabs(
        getVersion(pathname ? pathname.replace('/docs/', '').split('/') : []),
      );
      const remappedTabs = storedTabs.map((tab) =>
        pageOffersRenamedTabs ? remapCsfTabTitle(tab) : tab,
      );

      setActiveSnippetTabs(remappedTabs);
    } else {
      setCookie(cookieSnippetTabsId, '');
    }

    if (cookieDismissals) {
      setActiveDismissals(cookieDismissals.split(',').map(decodeURIComponent));
    }
    // Re-runs on client-side navigation between docs pages, so the gate above tracks
    // the page currently being viewed.
  }, [pathname]);

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

  const setDismissals = (id: string) => {
    setActiveDismissals((prev) => [id, ...prev.filter((dismissal) => dismissal !== id)]);
    setCookie(
      cookieDismissalsId,
      [id, ...activeDismissals.filter((dismissal) => dismissal !== id)].join(','),
    );
  };

  return (
    <DocsContext.Provider
      value={{
        activeRenderer,
        setRenderer,
        activeLanguage,
        activeSnippetTabs,
        activeDismissals,
        setLanguage,
        activePackageManager,
        setPackageManager,
        setSnippetTabs,
        setDismissals,
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

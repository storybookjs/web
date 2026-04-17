'use client';

import { type FC, useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDocs } from '../../app/docs/provider';
import { Button } from './button';

export const CopyMarkdownButton: FC = () => {
  const pathname = usePathname();
  const { activeRenderer, activeLanguage } = useDocs();
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    const mdApiPath = pathname.replace(/^\/docs\//, '/md-api/');
    const params = new URLSearchParams();
    if (activeRenderer) params.set('renderer', activeRenderer);
    if (activeLanguage) params.set('language', activeLanguage);

    const url = `${mdApiPath}?${params.toString()}`;

    void fetch(url)
      .then((response) => response.text())
      .then((text) => navigator.clipboard.writeText(text))
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
  }, [pathname, activeRenderer, activeLanguage]);

  return (
    <Button onClick={handleClick}>
      {copied ? 'Copied!' : 'Copy markdown'}
    </Button>
  );
};

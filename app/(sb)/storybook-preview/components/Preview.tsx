/* eslint-disable no-underscore-dangle */

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  PreviewWithSelection,
  addons,
  UrlStore,
  WebView,
} from '@storybook/nextjs-server/preview-api';
import { createBrowserChannel } from '@storybook/nextjs-server/channels';
import type { StoryIndex } from '@storybook/nextjs-server/types';
import { setArgs } from './args';
import { previewHtml } from './previewHtml';

global.FEATURES = { storyStoreV7: true };

// A version of the URL store that doesn't change route when the selection changes
// (as we change the URL as part of rendering the story)
class StaticUrlStore extends UrlStore {
  setSelection(selection: Parameters<typeof UrlStore.prototype.setSelection>[0]) {
    this.selection = selection;
  }
}

// Construct a CSF file from all the index entries on a path
function pathToCSFile(allEntries: StoryIndex['entries'], path: string) {
  const entries = Object.values(allEntries || []).filter(
    ({ importPath }: any) => importPath === path
  ) as { id: string; name: string; title: string }[];

  if (entries.length === 0) throw new Error(`Couldn't find import path ${path}, this is odd`);

  const mappedEntries: [string, { name: string }][] = entries.map(({ id, name }) => [
    id.split('--')[1],
    { name },
  ]);

  return Object.fromEntries([['default', { title: entries[0].title }] as const, ...mappedEntries]);
}

export const Preview = ({ previewPath }: { previewPath: string }) => {
  const router = useRouter();
  useEffect(() => {
    if (!window.__STORYBOOK_ADDONS_CHANNEL__) {
      const channel = createBrowserChannel({ page: 'preview' });
      addons.setChannel(channel);
      window.__STORYBOOK_ADDONS_CHANNEL__ = channel;
    }

    if (!window.__STORYBOOK_PREVIEW__) {
      const preview = new PreviewWithSelection(new StaticUrlStore(), new WebView());
      preview.initialize({
        importFn: async (path) => pathToCSFile(preview.storyStore.storyIndex!.entries, path),
        getProjectAnnotations: () => ({
          render: () => {},
          renderToCanvas: async ({ id, showMain, storyContext: { args } }) => {
            setArgs(previewPath, id, args);
            await router.push(`/${previewPath}/${id}`);
            showMain();
          },
        }),
      });
      window.__STORYBOOK_PREVIEW__ = preview;
    }

    // Render the the SB UI (ie iframe.html / preview.ejs) in a non-react way to ensure
    // it doesn't get ripped down when a new route renders
    if (!document.querySelector('#storybook-docs')) {
      document.body.insertAdjacentHTML('beforeend', previewHtml);
    }

    return () => {};
  }, []);
  return <></>;
};

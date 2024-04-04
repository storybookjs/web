/**
 * ********************************************
 * ** List of versions of the documentation  **
 * ********************************************
 *
 * For each version, you must specify 2 things:
 * Label - We will use this for the sidebar.
 * ID - We will use it to create folders.
 * Branch, tag or commit - Used to fetch data.
 *
 **/

export interface DocsVersion {
  label: string;
  id: string;
  branch?: string;
  tag?: string;
  commit?: string;
}

export const docsVersions: DocsVersion[] = [
  {
    label: "Version Test 1",
    id: "8.0",
    branch: "charles-docs-new-structure-2",
  },
  {
    label: "Version Test 2",
    id: "8.0-test-2",
    branch: "charles-docs-new-structure",
  },
  // {
  //   label: "Verion 8.0 - Alpha 7",
  //   id: "8.0.0-alpha.7",
  //   tag: "v8.0.0-alpha.7",
  // },
  // {
  //   label: "Version 7.6.7",
  //   id: "7.6.7",
  //   tag: "v7.6.7",
  // },
  // {
  //   label: "Version 6.5.16",
  //   id: "6.5.16",
  //   tag: "v6.5.16",
  // },
];

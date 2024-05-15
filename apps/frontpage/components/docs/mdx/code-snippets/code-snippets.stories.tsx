import type { Meta, StoryObj } from '@storybook/react';
import { CodeSnippetsComponent } from './code-snippets';

const meta = {
  title: 'CodeSnippets',
  component: CodeSnippetsComponent,
} satisfies Meta<typeof CodeSnippetsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = [
  {
    language: 'js',
    renderer: 'common',
    packageManager: 'npm',
    content:
      '<figure data-rehype-pretty-code-figure=""><pre class="Firefox Light" style="background-color:#FFFFFF;color:#939393" tabindex="0" data-language="shell" data-theme="Firefox Light"><code data-language="shell" data-theme="Firefox Light" style="display: grid;"><span data-line=""><span style="color:#058B00;font-style:italic">npx</span><span style="color:#4A4A4F"> storybook@latest</span><span style="color:#4A4A4F"> automigrate</span></span></code></pre></figure>',
  },
  {
    language: 'js',
    renderer: 'common',
    packageManager: 'pnpm',
    content:
      '<figure data-rehype-pretty-code-figure=""><pre class="Firefox Light" style="background-color:#FFFFFF;color:#939393" tabindex="0" data-language="shell" data-theme="Firefox Light"><code data-language="shell" data-theme="Firefox Light" style="display: grid;"><span data-line=""><span style="color:#058B00;font-style:italic">pnpm</span><span style="color:#4A4A4F"> dlx</span><span style="color:#4A4A4F"> storybook@latest</span><span style="color:#4A4A4F"> automigrate</span></span></code></pre></figure>',
  },
  {
    language: 'js',
    renderer: 'common',
    packageManager: 'yarn',
    content:
      '<figure data-rehype-pretty-code-figure=""><pre class="Firefox Light" style="background-color:#FFFFFF;color:#939393" tabindex="0" data-language="shell" data-theme="Firefox Light"><code data-language="shell" data-theme="Firefox Light" style="display: grid;"><span data-line=""><span style="color:#058B00;font-style:italic">yarn</span><span style="color:#4A4A4F"> dlx</span><span style="color:#4A4A4F"> storybook@latest</span><span style="color:#4A4A4F"> automigrate</span></span></code></pre></figure>',
  },
];

export const Primary: Story = {
  args: {
    content,
    activeLanguage: 'js',
    activePackageManager: 'npm',
    setLanguage: () => {},
    setPackageManager: () => {},
  },
};

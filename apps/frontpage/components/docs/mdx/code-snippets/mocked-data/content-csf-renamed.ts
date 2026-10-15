/**
 * Mirrors the upstream docs after the CSF snippet tab rename lands in
 * storybookjs/storybook: the current syntax is titled `CSF`, the legacy one
 * `CSF (Legacy)`. The content order is deliberately the reverse of the displayed
 * order, so stories can pin the exact-title precedence sort; `Story File` stands in
 * for any non-CSF tab, which must keep its content order.
 */
export const contentCSFRenamed = [
  {
    language: 'js',
    renderer: 'react',
    tabTitle: 'CSF (Legacy)',
    raw: 'console.log(process.env.STORYBOOK_THEME);\nconsole.log(process.env.STORYBOOK_DATA_KEY);',
    content:
      '<figure data-rehype-pretty-code-figure=""><pre class="Firefox Light" style="--shiki-dark:#abb2bf;--shiki-light:#939393;--shiki-dark-bg:#0F172A;--shiki-light-bg:#FFFFFF" tabindex="0" data-language="js" data-theme="one-dark-pro Firefox Light"><code data-language="js" data-theme="one-dark-pro Firefox Light" style="display: grid;"><span data-line=""><span style="--shiki-dark:#E5C07B;--shiki-light:#8000D7">console</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#058B00;--shiki-dark-font-style:italic">log</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">(</span><span style="--shiki-dark:#E5C07B;--shiki-light:#8000D7">process</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E06C75;--shiki-light:#E06C75">env</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E06C75;--shiki-light:#E06C75">STORYBOOK_THEME</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">)</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#939393">;</span></span>\n<span data-line=""><span style="--shiki-dark:#E5C07B;--shiki-light:#8000D7">console</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#058B00;--shiki-dark-font-style:italic">log</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">(</span><span style="--shiki-dark:#E5C07B;--shiki-light:#8000D7">process</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E06C75;--shiki-light:#E06C75">env</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E06C75;--shiki-light:#E06C75">STORYBOOK_DATA_KEY</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">)</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#939393">;</span></span></code></pre></figure>',
  },
  {
    language: 'js',
    renderer: 'react',
    tabTitle: 'CSF',
    raw: 'console.log(import.meta.env.STORYBOOK_THEME);\nconsole.log(import.meta.env.STORYBOOK_DATA_KEY);',
    content:
      '<figure data-rehype-pretty-code-figure=""><pre class="Firefox Light" style="--shiki-dark:#abb2bf;--shiki-light:#939393;--shiki-dark-bg:#0F172A;--shiki-light-bg:#FFFFFF" tabindex="0" data-language="js" data-theme="one-dark-pro Firefox Light"><code data-language="js" data-theme="one-dark-pro Firefox Light" style="display: grid;"><span data-line=""><span style="--shiki-dark:#E5C07B;--shiki-light:#8000D7">console</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#058B00;--shiki-dark-font-style:italic">log</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">(</span><span style="--shiki-dark:#C678DD;--shiki-light:#DD00A9">import</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E06C75;--shiki-light:#E06C75">meta</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E5C07B;--shiki-light:#8000D7">env</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E06C75;--shiki-light:#E06C75">STORYBOOK_THEME</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">)</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#939393">;</span></span>\n<span data-line=""><span style="--shiki-dark:#E5C07B;--shiki-light:#8000D7">console</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#058B00;--shiki-dark-font-style:italic">log</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">(</span><span style="--shiki-dark:#C678DD;--shiki-light:#DD00A9">import</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E06C75;--shiki-light:#E06C75">meta</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E5C07B;--shiki-light:#8000D7">env</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E06C75;--shiki-light:#E06C75">STORYBOOK_DATA_KEY</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">)</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#939393">;</span></span></code></pre></figure>',
  },
  {
    language: 'js',
    renderer: 'react',
    tabTitle: 'Story File',
    raw: 'console.log(process.env.STORYBOOK_THEME);',
    content:
      '<figure data-rehype-pretty-code-figure=""><pre class="Firefox Light" style="--shiki-dark:#abb2bf;--shiki-light:#939393;--shiki-dark-bg:#0F172A;--shiki-light-bg:#FFFFFF" tabindex="0" data-language="js" data-theme="one-dark-pro Firefox Light"><code data-language="js" data-theme="one-dark-pro Firefox Light" style="display: grid;"><span data-line=""><span style="--shiki-dark:#E5C07B;--shiki-light:#8000D7">console</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#058B00;--shiki-dark-font-style:italic">log</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">(</span><span style="--shiki-dark:#E5C07B;--shiki-light:#8000D7">process</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E06C75;--shiki-light:#E06C75">env</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">.</span><span style="--shiki-dark:#E06C75;--shiki-light:#E06C75">STORYBOOK_THEME</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4A4A4F">)</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#939393">;</span></span></code></pre></figure>',
  },
];

export const fakeAddon: Addon = {
  type: 'Addon',
  name: '@storybook/addon-a11y',
  displayName: 'Accessibility',
  description: 'Test component compliance with web accessibility standards',
  icon: 'https://user-images.githubusercontent.com/18172605/204546704-6db6380e-4f2f-424d-bcd4-d6e168234469.svg',
  authors: [
    {
      username: 'domyen',
      gravatarUrl:
        '//www.gravatar.com/avatar/a7c0aa21a99fd9b8e009d5b197221ada?s=200',
    },
    {
      username: 'kasperpeulen',
      gravatarUrl:
        '//www.gravatar.com/avatar/1be49f9ea6f801adf0681747955c1cde?s=200',
    },
    {
      username: 'valentinpalkovic',
      gravatarUrl:
        '//www.gravatar.com/avatar/27161f0ed1a81f73d54e94a59da70d92?s=200',
    },
    {
      username: 'jreinhold',
      gravatarUrl:
        '//www.gravatar.com/avatar/3128aefb1caad963bd21abbc7ee5c417?s=200',
    },
    {
      username: 'kylegach',
      gravatarUrl:
        '//www.gravatar.com/avatar/28a66f4048a77929c4884abc8b7b8997?s=200',
    },
    {
      username: 'ndelangen',
      gravatarUrl:
        '//www.gravatar.com/avatar/537eed32d6998089dd5aa6a7e6ea2691?s=200',
    },
    {
      username: 'shilman',
      gravatarUrl:
        '//www.gravatar.com/avatar/081cff21c8a5cecb08863f55fbf30b80?s=200',
    },
    {
      username: 'tmeasday',
      gravatarUrl:
        '//www.gravatar.com/avatar/9a4c135ce6e37b086dd365f790187f3c?s=200',
    },
    {
      username: 'ghengeveld',
      gravatarUrl:
        '//www.gravatar.com/avatar/83ec35edc3a149d5b4aba24e00119395?s=200',
    },
    {
      username: 'winkervsbecks',
      gravatarUrl:
        '//www.gravatar.com/avatar/dc3909557c0f933a066fe5faea796fdf?s=200',
    },
    {
      username: 'yannbf',
      gravatarUrl:
        '//www.gravatar.com/avatar/a182edc3f5451ebb49551208e3305c39?s=200',
    },
  ],
  weeklyDownloads: 1602651,
  verified: 'official',
  verifiedCreator: null,
  compatibility: [
    {
      name: 'angular',
      displayName: 'Angular',
      icon: '/frameworks/logo-angular.svg',
    },
    {
      name: 'ember',
      displayName: 'Ember',
      icon: '/frameworks/logo-ember.svg',
    },
    {
      name: 'html',
      displayName: 'HTML',
      icon: '/frameworks/logo-html.svg',
    },
    {
      name: 'marko',
      displayName: 'Marko',
      icon: '/frameworks/logo-marko.svg',
    },
    {
      name: 'mithril',
      displayName: 'Mithril',
      icon: '/frameworks/logo-mithril.svg',
    },
    {
      name: 'preact',
      displayName: 'Preact',
      icon: '/frameworks/logo-preact.svg',
    },
    {
      name: 'rax',
      displayName: 'Rax',
      icon: '/frameworks/logo-rax.png',
    },
    {
      name: 'react',
      displayName: 'React',
      icon: '/frameworks/logo-react.svg',
    },
    {
      name: 'riot',
      displayName: 'Riot',
      icon: '/frameworks/logo-riot.svg',
    },
    {
      name: 'svelte',
      displayName: 'Svelte',
      icon: '/frameworks/logo-svelte.svg',
    },
    {
      name: 'vue',
      displayName: 'Vue',
      icon: '/frameworks/logo-vue.svg',
    },
    {
      name: 'web-components',
      displayName: 'Web Components',
      icon: '/frameworks/logo-web-components.svg',
    },
  ],
  status: 'default',
  publishedAt: 1718645382328,
  repositoryUrl: 'https://github.com/storybookjs/storybook',
  homepageUrl:
    'https://github.com/storybookjs/storybook/tree/next/code/addons/a11y',
  npmUrl: 'https://www.npmjs.com/package/@storybook/addon-a11y',
  tags: [
    {
      name: 'A11y',
      link: '/addons/tag/a11y/',
    },
    {
      name: 'Accessibility',
      link: '/addons/tag/accessibility/',
    },
    {
      name: 'Valid',
      link: '/addons/tag/valid/',
    },
    {
      name: 'Verify',
      link: '/addons/tag/verify/',
    },
    {
      name: '✅ Test',
      link: '/addons/tag/test/',
    },
  ],
  readme:
    "<h1>storybook-addon-a11y</h1>\n<p>This Storybook addon can be helpful to make your UI components more accessible.</p>\n<p><a href=\"https://storybook.js.org/docs/react/api/frameworks-feature-support\">Framework Support</a></p>\n<p><img src=\"https://raw.githubusercontent.com/storybookjs/storybook/next/code/addons/a11y/docs/screenshot.png\" alt=\"Screenshot\"></p>\n<h2>Getting started</h2>\n<p>First, install the addon.</p>\n<pre><code class=\"language-sh\">$ yarn add @storybook/addon-a11y --dev\n</code></pre>\n<p>Add this line to your <code>main.js</code> file (create this file inside your Storybook config directory if needed).</p>\n<pre><code class=\"language-js\">export default {\n  addons: ['@storybook/addon-a11y'],\n};\n</code></pre>\n<p>And here's a sample story file to test the addon:</p>\n<pre><code class=\"language-js\">import React from 'react';\n\nexport default {\n  title: 'button',\n};\n\nexport const Accessible = () => &#x3C;button>Accessible button&#x3C;/button>;\n\nexport const Inaccessible = () => (\n  &#x3C;button style={{ backgroundColor: 'red', color: 'darkRed' }}>Inaccessible button&#x3C;/button>\n);\n</code></pre>\n<h2>Handling failing rules</h2>\n<p>When Axe reports accessibility violations in stories, there are multiple ways to handle these failures depending on your needs.</p>\n<h3>Story-level overrides</h3>\n<p>At the Story level, override rules using <code>parameters.a11y.config.rules</code>.</p>\n<pre><code class=\"language-js\">export const InputWithoutAutofill = () => &#x3C;input type=\"text\" autocomplete=\"nope\" />;\n\nInputWithoutAutofill.parameters = {\n  a11y: {\n    // Avoid doing this, as it will fully disable all accessibility checks for this story.\n    disable: true,\n\n    // Instead, override rules 👇\n    // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)\n    config: {\n      rules: [\n        {\n          // You can exclude some elements from failing a specific rule:\n          id: 'autocomplete-valid',\n          selector: '*:not([autocomplete=\"nope\"])',\n        },\n        {\n          // You can also signify that a violation will need to be fixed in the future\n          // by overriding the result of a rule to return \"Needs Review\"\n          // rather than \"Violation\" if the rule fails:\n          id: 'landmark-complementary-is-top-level',\n          reviewOnFail: true,\n        },\n      ],\n    },\n  },\n};\n</code></pre>\n<p>Alternatively, you can disable specific rules in a Story:</p>\n<pre><code class=\"language-js\">export const Inaccessible = () => (\n  &#x3C;button style={{ backgroundColor: 'red', color: 'darkRed' }}>Inaccessible button&#x3C;/button>\n);\nInaccessible.parameters = {\n  a11y: {\n    config: {\n      rules: [{ id: 'color-contrast', enabled: false }],\n    },\n  },\n};\n</code></pre>\n<p>Tip: clearly explain in a comment why a rule was overridden, it’ll help you and your team trace back why certain violations aren’t being reported or need to be addressed. For example:</p>\n<pre><code class=\"language-js\">MyStory.parameters = {\n  a11y: {\n    config: {\n      rules: [\n        {\n          // Allow `autocomplete=\"nope\"` on form elements,\n          // a workaround to disable autofill in Chrome.\n          // @link https://bugs.chromium.org/p/chromium/issues/detail?id=468153\n          id: 'autocomplete-valid',\n          selector: '*:not([autocomplete=\"nope\"])',\n        },\n        {\n          // @fixme Color contrast of subdued text fails, as raised in issue #123.\n          id: 'color-contrast',\n          reviewOnFail: true,\n        },\n      ],\n    },\n  },\n};\n</code></pre>\n<h3>Global overrides</h3>\n<p>When you want to ignore an accessibility rule or change its settings across all stories, set <code>parameters.a11y.config.rules</code> in your Storybook’s <code>preview.ts</code> file. This can be particularly useful for ignoring false positives commonly reported by Axe.</p>\n<pre><code class=\"language-ts\">// .storybook/preview.ts\n\nexport const parameters = {\n  a11y: {\n    config: {\n      rules: [\n        {\n          // This tells Axe to run the 'autocomplete-valid' rule on selectors\n          // that match '*:not([autocomplete=\"nope\"])' (all elements except [autocomplete=\"nope\"]).\n          // This is the safest way of ignoring a violation across all stories,\n          // as Axe will only ignore very specific elements and keep reporting\n          // violations on other elements of this rule.\n          id: 'autocomplete-valid',\n          selector: '*:not([autocomplete=\"nope\"])',\n        },\n        {\n          // To disable a rule across all stories, set `enabled` to `false`.\n          // Use with caution: all violations of this rule will be ignored!\n          id: 'autocomplete-valid',\n          enabled: false,\n        },\n      ],\n    },\n  },\n};\n</code></pre>\n<h3>Disabling checks</h3>\n<p>If you wish to entirely disable <code>a11y</code> checks for a subset of stories, you can control this with story parameters:</p>\n<pre><code class=\"language-js\">export const MyNonCheckedStory = () => &#x3C;SomeComponent />;\nMyNonCheckedStory.parameters = {\n  // Avoid doing this, as it fully disables all accessibility checks for this story,\n  // and consider the techniques described above.\n  a11y: { disable: true },\n};\n</code></pre>\n<h2>Parameters</h2>\n<p>For more customizability use parameters to configure <a href=\"https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axeconfigure\">aXe options</a>.\nYou can override these options <a href=\"https://storybook.js.org/docs/react/configure/features-and-behavior#per-story-options\">at story level too</a>.</p>\n<pre><code class=\"language-js\">import React from 'react';\nimport { storiesOf, addDecorator, addParameters } from '@storybook/react';\n\nexport default {\n  title: 'button',\n  parameters: {\n    a11y: {\n      // optional selector which element to inspect\n      element: '#storybook-root',\n      // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)\n      config: {},\n      // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)\n      options: {},\n      // optional flag to prevent the automatic check\n      manual: true,\n    },\n  },\n};\n\nexport const accessible = () => &#x3C;button>Accessible button&#x3C;/button>;\n\nexport const inaccessible = () => (\n  &#x3C;button style={{ backgroundColor: 'red', color: 'darkRed' }}>Inaccessible button&#x3C;/button>\n);\n</code></pre>\n<h2>Automate accessibility tests with test runner</h2>\n<p>The test runner does not apply any rules that you have set on your stories by default. You can configure the runner to correctly apply the rules by <a href=\"https://storybook.js.org/docs/writing-tests/accessibility-testing#automate-accessibility-tests-with-test-runner\">following the guide on the Storybook docs</a>.</p>\n<h2>Roadmap</h2>\n<ul>\n<li>Make UI accessible</li>\n<li>Show in story where violations are.</li>\n<li>Add more example tests</li>\n<li>Add tests</li>\n<li>Make CI integration possible</li>\n</ul>\n",
};

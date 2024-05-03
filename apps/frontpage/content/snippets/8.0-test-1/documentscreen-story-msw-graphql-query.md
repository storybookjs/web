```ts filename="YourPage.stories.ts" renderer="angular" language="ts"
import { moduleMetadata } from '@storybook/angular';

import type { Meta, StoryObj } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { graphql } from 'msw';

import { DocumentScreen } from './YourPage.component';
import { DocumentList } from './DocumentList.component';
import { DocumentHeader } from './DocumentHeader.component';
import { PageLayout } from './PageLayout.component';

import { MockGraphQLModule } from './mock-graphql.module';

const meta: Meta<DocumentScreen> = {
  component: DocumentScreen,
  decorators: [
    moduleMetadata({
      declarations: [DocumentList, DocumentHeader, PageLayout],
      imports: [CommonModule, HttpClientModule, MockGraphQLModule],
    }),
  ],
};

export default meta;

//👇The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};

type Story = StoryObj<DocumentScreen>;

export const MockedSuccess: Story = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(ctx.data(TestData));
      }),
    ],
  },
};

export const MockedError: Story = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.errors([
            {
              message: 'Access denied',
            },
          ]),
        );
      }),
    ],
  },
};
```

```js filename="YourPage.stories.js|jsx" renderer="react" language="js"
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { graphql } from 'msw';

import { DocumentScreen } from './YourPage';

const mockedClient = new ApolloClient({
  uri: 'https://your-graphql-endpoint',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

//👇The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};

export default {
  component: DocumentScreen,
  decorators: [
    (Story) => (
      <ApolloProvider client={mockedClient}>
        <Story />
      </ApolloProvider>
    ),
  ],
};

export const MockedSuccess = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(ctx.data(TestData));
      }),
    ],
  },
};

export const MockedError = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.errors([
            {
              message: 'Access denied',
            },
          ]),
        );
      }),
    ],
  },
};
```

```ts filename="YourPage.stories.ts|tsx" renderer="react" language="ts-4-9"
import type { Meta, StoryObj } from '@storybook/react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { graphql } from 'msw';

import { DocumentScreen } from './YourPage';

const mockedClient = new ApolloClient({
  uri: 'https://your-graphql-endpoint',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

//👇The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};
const meta = {
  component: DocumentScreen,
  decorators: [
    (Story) => (
      <ApolloProvider client={mockedClient}>
        <Story />
      </ApolloProvider>
    ),
  ],
} satisfies Meta<typeof DocumentScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MockedSuccess: Story = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.data({
            allFilms: {
              films,
            },
          })
        );
      }),
    ],
  },
};

export const MockedError: Story = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.errors([
            {
              message: 'Access denied',
            },
          ])
        );
      }),
    ],
  },
};
```

```ts filename="YourPage.stories.ts|tsx" renderer="react" language="ts"
import type { Meta, StoryObj } from '@storybook/react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { graphql } from 'msw';

import { DocumentScreen } from './YourPage';

const mockedClient = new ApolloClient({
  uri: 'https://your-graphql-endpoint',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

//👇The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};
const meta: Meta<typeof DocumentScreen> = {
  component: DocumentScreen,
  decorators: [
    (Story) => (
      <ApolloProvider client={mockedClient}>
        <Story />
      </ApolloProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SampleComponent>;

export const MockedSuccess: Story = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.data({
            allFilms: {
              films,
            },
          })
        );
      }),
    ],
  },
};

export const MockedError: Story = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.errors([
            {
              message: 'Access denied',
            },
          ])
        );
      }),
    ],
  },
};
```

```js filename="YourPage.stories.js" renderer="svelte" language="js"
import { graphql } from 'msw';

import DocumentScreen from './YourPage.svelte';
import MockApolloWrapperClient from './MockApolloWrapperClient.svelte';

export default {
  component: DocumentScreen,
  decorators: [() => MockApolloWrapperClient],
};

//👇The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};

export const MockedSuccess = {
  render: () => ({
    Component: DocumentScreen,
  }),
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(ctx.data(TestData));
      }),
    ],
  },
};

export const MockedError = {
  render: () => ({
    Component: DocumentScreen,
  }),
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.errors([
            {
              message: 'Access denied',
            },
          ]),
        );
      }),
    ],
  },
};
```

```ts filename="YourPage.stories.ts" renderer="svelte" language="ts-4-9"
import type { Meta, StoryObj } from '@storybook/svelte';

import { graphql } from 'msw';

import DocumentScreen from './YourPage.svelte';
import MockApolloWrapperClient from './MockApolloWrapperClient.svelte';

const meta = {
  component: DocumentScreen,
  decorators: [() => MockApolloWrapperClient],
} satisfies Meta<typeof DocumentScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

//👇The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};

export const MockedSuccess: Story = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(ctx.data(TestData));
      }),
    ],
  },
};

export const MockedError: Story = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.errors([
            {
              message: 'Access denied',
            },
          ]),
        );
      }),
    ],
  },
};
```

```ts filename="YourPage.stories.ts" renderer="svelte" language="ts"
import type { Meta, StoryObj } from '@storybook/svelte';

import { graphql } from 'msw';

import DocumentScreen from './YourPage.svelte';
import MockApolloWrapperClient from './MockApolloWrapperClient.svelte';

const meta: Meta<typeof DocumentScreen> = {
  component: DocumentScreen,
  decorators: [() => MockApolloWrapperClient],
};

export default meta;
type Story = StoryObj<typeof meta>;

//👇The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};

export const MockedSuccess: Story = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(ctx.data(TestData));
      }),
    ],
  },
};

export const MockedError: Story = {
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.errors([
            {
              message: 'Access denied',
            },
          ]),
        );
      }),
    ],
  },
};
```

```js filename="YourPage.stories.js" renderer="vue" language="js"
import DocumentScreen from './YourPage.vue';

import WrapperComponent from './ApolloWrapperClient.vue';

import { graphql } from 'msw';

export default {
  component: DocumentScreen,
};

//👇The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const MockedSuccess = {
  render: () => ({
    components: { DocumentScreen, WrapperComponent },
    template: '<WrapperComponent><DocumentScreen /></WrapperComponent>',
  }),
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(ctx.data(TestData));
      }),
    ],
  },
};

export const MockedError = {
  render: () => ({
    components: { DocumentScreen, WrapperComponent },
    template: '<WrapperComponent><DocumentScreen /></WrapperComponent>',
  }),
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.errors([
            {
              message: 'Access denied',
            },
          ]),
        );
      }),
    ],
  },
};
```

```ts filename="YourPage.stories.ts" renderer="vue" language="ts-4-9"
import { graphql } from 'msw';

import type { Meta, StoryObj } from '@storybook/vue3';

import DocumentScreen from './YourPage.vue';

import WrapperComponent from './ApolloWrapperClient.vue';

const meta = {
  component: DocumentScreen,
} satisfies Meta<typeof DocumentScreen>;

//👇The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const MockedSuccess: Story = {
  render: () => ({
    components: { DocumentScreen, WrapperComponent },
    template: '<WrapperComponent><DocumentScreen /></WrapperComponent>',
  }),
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(ctx.data(TestData));
      }),
    ],
  },
};

export const MockedError: Story = {
  render: () => ({
    components: { DocumentScreen, WrapperComponent },
    template: '<WrapperComponent><DocumentScreen /></WrapperComponent>',
  }),
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.errors([
            {
              message: 'Access denied',
            },
          ]),
        );
      }),
    ],
  },
};
```

```ts filename="YourPage.stories.ts" renderer="vue" language="ts"
import { graphql } from 'msw';

import type { Meta, StoryObj } from '@storybook/vue3';

import DocumentScreen from './YourPage.vue';

import WrapperComponent from './ApolloWrapperClient.vue';

const meta: Meta<typeof DocumentScreen> = {
  component: DocumentScreen,
};

//👇The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};

export default meta;
type Story = StoryObj<typeof DocumentScreen>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const MockedSuccess: Story = {
  render: () => ({
    components: { DocumentScreen, WrapperComponent },
    template: '<WrapperComponent><DocumentScreen /></WrapperComponent>',
  }),
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(ctx.data(TestData));
      }),
    ],
  },
};

export const MockedError: Story = {
  render: () => ({
    components: { DocumentScreen, WrapperComponent },
    template: '<WrapperComponent><DocumentScreen /></WrapperComponent>',
  }),
  parameters: {
    msw: [
      graphql.query('AllInfoQuery', (req, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.errors([
            {
              message: 'Access denied',
            },
          ]),
        );
      }),
    ],
  },
};
```


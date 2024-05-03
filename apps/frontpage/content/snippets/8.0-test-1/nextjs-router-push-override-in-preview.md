```js filename=".storybook/preview.js" renderer="react" language="js"
export default {
  // ...
  parameters: {
    // ...
    nextjs: {
      router: {
        push(...args) {
          // Custom logic can go here
          // This logs to the Actions panel
          action('nextRouter.push')(...args);
          // Return whatever you want here
          return Promise.resolve(true);
        },
      },
    },
  },
};
```

```ts filename=".storybook/preview.ts" renderer="react" language="ts"
import { Preview } from '@storybook/react';

const preview: Preview = {
  // ...
  parameters: {
    // ...
    nextjs: {
      router: {
        push(...args) {
          // Custom logic can go here
          // This logs to the Actions panel
          action('nextRouter.push')(...args);
          // Return whatever you want here
          return Promise.resolve(true);
        },
      },
    },
  },
};

export default preview;
```


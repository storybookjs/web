![Storybook Web Light](github-light.png#gh-light-mode-only)
![Storybook Web Dark](github-dark.png#gh-dark-mode-only)

Welcome to the new home for Storybook's main website and documentation. This project is still in progress but will soon replace the existing platform. It is mainly built around Next.js, Tailwind, Turborepo and obviously Storybook ✌️

## Monorepo

This project is structured around [Turborepo](https://turbo.build/repo). This doesn't include all projects just yet but we are importing all the pieces together slowly. Here are the main components of it:

- `apps/frontpage` - Main website + Docs
- `packages/utils` - Any functions useful across apps
- `packages/ui` - Component library across apps

## Main commands

#### `npm install`

> Install all dependencies

#### `npx turbo fetch-docs`

> Fetch docs from the monorepo

#### `npx turbo generate-redirects`

> Generate redirects file

#### `npx turbo dev`

> Run all apps locally

#### `npx turbo build`

> Build all apps locally

#### `npm run clean`

> Clean the monorepo. You'll have to install dependencies again after running this command with `npm install`

## Connect with us!

- Tweeting via [@storybookjs](https://twitter.com/storybookjs)
- Blogging at [storybook.js.org](https://storybook.js.org/blog/) and [Medium](https://medium.com/storybookjs)
- Chatting on [Discord](https://discord.gg/storybook)
- Videos and streams at [YouTube](https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg)

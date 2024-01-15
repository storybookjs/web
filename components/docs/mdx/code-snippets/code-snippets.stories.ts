import type { Meta, StoryObj } from "@storybook/react";
import { CodeSnippets } from ".";

const meta = {
  title: "Code Snippets",
  component: CodeSnippets,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // parameters: {
  //   // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
  //   layout: 'fullscreen',
  // },
} satisfies Meta<typeof CodeSnippets>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    paths: ["common/api-doc-block-controls-parameter.js.mdx"],
  },
};

// export const LoggedIn: Story = {
//   // args: {
//   //   // user: {
//   //   //   name: 'Jane Doe',
//   //   // },
//   // },
// };

// export const LoggedOut: Story = {};

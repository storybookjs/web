import type { Meta, StoryObj } from "@storybook/react";
import { Pre } from ".";

const meta = {
  title: "Pre",
  component: Pre,
  tags: ["autodocs"],
} satisfies Meta<typeof Pre>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: `import { useState } from "react";`,
  },
};

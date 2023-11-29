import type { Metadata } from "next";
import { Header } from "@/components/header/header";
import { Fragment } from "react";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Storybook",
  description:
    "Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It's open source and free.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Header variant="docs" />
      {children}
      <Footer />
    </Fragment>
  );
}

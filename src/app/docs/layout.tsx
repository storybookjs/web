import type { Metadata } from "next";
import { Header } from "@/components/header/header";
import { Fragment } from "react";
import { Footer } from "@/components/footer/footer";
import Image from "next/image";

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
      <Image
        src="/bubbles.png"
        alt="Storybook Docs"
        width={1800}
        height={339}
        className="w-full absolute top-0 left-0 -z-10"
      />
      {children}
      <Footer />
    </Fragment>
  );
}

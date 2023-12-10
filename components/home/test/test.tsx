import { FC } from "react";
import Link from "next/link";
import { Accessibility, Code, Eye, Interact, Pixel, Projects } from "./icons";
import { Testimonial } from "../testimonial";
import { IllustratedFeatureList } from "../illustrated-feature-list";
import { LogoAirbnb } from "./logo-airbnb";
import { cn, container } from "@/lib/utils";

const features = [
  {
    icon: <Eye />,
    title: "Spot test",
    description: "Stories are tests you can debug in dev and QA.",
    link: {
      label: "Learn about UI tests",
      href: "/docs/writing-tests/introduction",
    },
    media: "/home/test/homepage-spot-testing-lg.mp4",
    poster: "/home/test/homepage-spot-testing-poster-lg.jpg",
  },
  {
    icon: <Pixel />,
    title: "Visual test appearance",
    description: "Pinpoint UI changes down to the pixel.",
    link: {
      label: "Learn about visual tests",
      href: "/docs/writing-tests/visual-testing",
    },
    media: "/home/test/homepage-visual-testing-lg.mp4",
    poster: "/home/test/homepage-visual-testing-poster-lg.jpg",
  },
  {
    icon: <Interact />,
    title: "Interaction test behavior",
    description: "Simulate user behavior and assert in the browser.",
    link: {
      label: "Learn about interaction tests",
      href: "/docs/writing-tests/interaction-testing",
    },
    media: "/home/test/homepage-interaction-testing-lg.mp4",
    poster: "/home/test/homepage-interaction-testing-poster-lg.jpg",
  },
  {
    icon: <Accessibility />,
    title: "Accessibility tests",
    description: "Check stories for WCAG and ARIA issues.",
    link: {
      label: "Learn about accessibility tests",
      href: "/docs/writing-tests/accessibility-testing",
    },
    media: "/home/test/homepage-accessibility-testing-lg.mp4",
    poster: "/home/test/homepage-accessibility-testing-poster-lg.jpg",
  },
  {
    icon: <Code />,
    title: "Snapshot test markup",
    description: "Detect regressions in DOM markup.",
    link: {
      label: "Learn about snapshot tests",
      href: "/docs/writing-tests/snapshot-testing",
    },
    media: "/home/test/homepage-snapshot-testing-lg.mp4",
    poster: "/home/test/homepage-snapshot-testing-poster-lg.jpg",
  },
  {
    icon: <Projects />,
    title: "Reuse tests in other test tools",
    description: "Write stories once to reuse across your test suite.",
    link: {
      label: "Learn about importing stories in tests",
      href: "/docs/writing-tests/stories-in-unit-tests",
    },
    media: "/home/test/homepage-reuse-testing-lg.mp4",
    poster: "/home/test/homepage-reuse-testing-poster-lg.jpg",
  },
];

export const Test: FC = () => {
  return (
    <div className="pt-12 border-b border-zinc-600 sm:pt-20 md:pt-28">
      {features.map((feature) => (
        <Link
          key={feature.title}
          rel="preload"
          as="video"
          href={feature.media}
        />
      ))}
      <div
        className={cn(
          container,
          "lg:px-8 text-white md:flex justify-between gap-20"
        )}
      >
        <h2 className="flex-1 text-4xl md:text-[56px]/[70px] font-bold">
          Test UIs with less effort and no flake
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            Stories capture the “known good” states of UI components.
            They&apos;re a pragmatic, reproducible way to keep track of UI edge
            cases. Reuse stories to power automated tests
          </p>
        </div>
      </div>
      <IllustratedFeatureList features={features} bgColor="#FDDD9C" />
      <Testimonial
        text="“The tool we use for editing UI is Storybook. It is the perfect
            place to make sure your work aligns with designs to the pixel across
            breakpoints.”"
        avatarUrl="https://avatars2.githubusercontent.com/u/1247751?s=100&v=4"
        name="Adam Neary"
        jobTitle="Tech lead"
        logo={<LogoAirbnb />}
      />
    </div>
  );
};

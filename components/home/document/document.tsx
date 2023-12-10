import { FC } from "react";
import Link from "next/link";
import { Branch, Document as Doc, Overlap, Search } from "./icons";
import { Testimonial } from "../testimonial";
import { IllustratedFeatureList } from "../illustrated-feature-list";
import { LogoGitlab } from "./logo-gitlab";
import { cn, container } from "@/lib/utils";

const features = [
  {
    icon: <Search />,
    title: "Find any component or page in your app",
    description: "Storybook is a single source of truth for UI.",
    link: {
      label: "Learn about search",
      href: "/docs/get-started/browse-stories#sidebar-and-canvas",
    },
    media: "/home/document/homepage-search-stories-lg.mp4",
    poster: "/home/document/homepage-search-stories-poster-lg.jpg",
  },
  {
    icon: <Doc />,
    title: "Generate UI docs automatically",
    description: "Write Markdown and build custom docs.",
    link: {
      label: "Learn about docs addon",
      href: "/docs/writing-docs/introduction",
    },
    media: "/home/document/homepage-component-document-lg.mp4",
    poster: "/home/document/homepage-component-document-poster-lg.jpg",
  },
  {
    icon: <Overlap />,
    title: "Reuse components across pages and apps",
    description: "Every story is a use case that you can reuse.",
    link: {
      label: "Learn about reuse",
      href: "/docs/get-started/browse-stories#use-stories-to-build-uis",
    },
    media: "/home/document/homepage-reuse-components-across-apps-lg.mp4",
    poster:
      "/home/document/homepage-reuse-components-across-apps-poster-lg.jpg",
  },
  {
    icon: <Branch />,
    title: "Track component history and versions",
    description: "QA unexpected bugs by going back in time.",
    link: {
      label: "Learn about versioning",
      href: "/docs/react/sharing/publish-storybook#versioning-and-history",
    },
    media: "/home/document/homepage-component-history-lg.mp4",
    poster: "/home/document/homepage-component-history-poster-lg.jpg",
  },
];

export const Document: FC = () => {
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
          Document UI for your team to reuse
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            Storybook brings together UI, examples, and documentation in one
            place. That helps your team adopt existing UI patterns.
          </p>
        </div>
      </div>
      <IllustratedFeatureList
        features={features}
        alignment="right"
        bgColor="#c3eeaf"
      />
      <Testimonial
        text="“Storybook has made developing components more streamlined by allowing us to easily include technical documentation within our design system!”"
        avatarUrl="https://avatars0.githubusercontent.com/u/3028593?s=460&v=4"
        name="Taurie Davis"
        jobTitle="Author of Building Design Systems"
        logo={<LogoGitlab />}
      />
    </div>
  );
};

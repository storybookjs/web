"use client";

import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Community } from "@/components/home/social-validation/community";
import { cn, container, smallContainer } from "@/lib/utils";
import {
  DiscordIcon,
  GithubIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@storybook/icons";
import { Fragment } from "react";

export default function Page() {
  return (
    <Fragment>
      <Header variant="system" />
      <div className="w-full h-10 border-b border-zinc-200">
        <div
          className={cn(container, "h-full flex justify-between items-center")}
        >
          <div className="flex h-full">
            <a className="flex items-center px-[15px] h-full shadow-[0_-3px_0_0_inset] font-bold text-sm text-blue-500 shadow-blue-500">
              Get involved
            </a>
            <a
              href="/blog"
              className="flex items-center px-[15px] h-full font-bold text-sm text-zinc-400 transition-all hover:-translate-y-px hover:text-blue-500"
            >
              Blog
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div>Join the community:</div>
            <a
              href="https://github.com/storybookjs"
              target="_blank"
              aria-label="Github"
            >
              <GithubIcon />
            </a>
            <a
              href="https://discord.gg/storybook"
              target="_blank"
              aria-label="Discord"
            >
              <DiscordIcon />
            </a>
            <a
              href="https://twitter.com/storybookjs"
              target="_blank"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </a>
            <a
              href="https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg"
              target="_blank"
              aria-label="Youtube"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>
      <main className={cn(smallContainer)}>
        <div className="lg:px-8 md:flex justify-between gap-20">
          <h2 className="flex-1 text-4xl md:text-[56px]/[70px] font-bold">
            Meet world-class frontend devs
          </h2>
          <div className="flex-1 pt-4">
            <p className="mb-6 leading-7">
              The top frontend engineering teams rely on Storybook to ship
              world-changing products. Join our open source community to learn
              new techniques and get support.
            </p>
            <div className="flex gap-8 items-center">
              {/* <Button variant="outlineHome" rounded="full" jumpOnHover asChild>
              <Link href="/community/">Get involved</Link>
            </Button>
            <div className="min-w-0 flex items-center flex-row-reverse">
              {contributors.map((image) => (
                <Image
                  className="block w-10 h-10 rounded-full -ml-1 last:ml-0 odd:none sm:odd:block"
                  loading="lazy"
                  width={40}
                  height={40}
                  key={image}
                  src={image}
                  alt=""
                />
              ))}
            </div> */}
            </div>
          </div>
        </div>
        <Community />
      </main>
      <Footer />
    </Fragment>
  );
}

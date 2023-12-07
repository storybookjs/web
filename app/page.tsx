"use client";

import { Hero } from "@/components/home/hero";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Develop } from "@/components/home/develop/develop";
import { StickyNav } from "@/components/home/sticky-nav";
import { useMemo, useRef } from "react";
import { useInView } from "framer-motion";
import { Test } from "@/components/home/test/Test";

export default function Home() {
  const developRef = useRef(null);
  const developInView = useInView(developRef, { margin: "0px 0px -100% 0px" });

  const testRef = useRef(null);
  const testInView = useInView(testRef);

  const documentRef = useRef(null);
  const documentInView = useInView(documentRef);

  const shareRef = useRef(null);
  const shareInView = useInView(shareRef);

  const automateRef = useRef(null);
  const automateInView = useInView(automateRef);

  const whoRef = useRef(null);
  const whoInView = useInView(whoRef);

  const activeSection = useMemo(() => {
    if (whoInView) return "who";
    if (automateInView) return "automate";
    if (shareInView) return "share";
    if (documentInView) return "document";
    if (testInView) return "test";
    if (developInView) return "develop";
    return null;
  }, [
    developInView,
    testInView,
    documentInView,
    shareInView,
    automateInView,
    whoInView,
  ]);

  return (
    <div className="bg-[#181C22]">
      <Header variant="home" />
      <Hero />
      <StickyNav isVisible={!!activeSection} activeSection={activeSection} />
      <div style={{ contain: "paint" }} ref={developRef}>
        <Develop />
      </div>
      <div ref={testRef}>
        <Test />
      </div>
      <div ref={documentRef}>
        {/* <Document docs={docs} id="document" /> */}
      </div>
      <div ref={shareRef}>{/* <Share docs={docs} id="share" /> */}</div>
      <div style={{ contain: "paint" }} ref={automateRef}>
        {/* <Automate docs={docs} id="automate" /> */}
      </div>
      <div ref={whoRef}>
        {/* <SocialValidation
          docs={docs}
          projects={projects}
          storybooks={storybooks}
          id="who"
          twitterFollowerCount={twitterFollowerCount}
          discordMemberCount={discordMemberCount}
          githubContributorCount={githubContributorCount}
          youTubeSubscriberCount={youTubeSubscriberCount}
        /> */}
      </div>
      <Footer variant="home" />
    </div>
  );
}

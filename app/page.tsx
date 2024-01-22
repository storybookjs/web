"use client";

import { Hero } from "@/components/home/hero/hero";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Develop } from "@/components/home/develop/develop";
import { StickyNav } from "@/components/home/sticky-nav/sticky-nav";
import { useMemo, useRef } from "react";
import { useInView } from "framer-motion";
import { Test } from "@/components/home/test/test";
import { Document } from "@/components/home/document/document";
import { Share } from "@/components/home/share/share";
import { Automate } from "@/components/home/automate/automate";
import { SocialValidation } from "@/components/home/social-validation/social-validation";

export default function Page() {
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
    <div className="bg-[#181C22]" id="page-top">
      <Header variant="home" />
      <Hero />
      <StickyNav isVisible={!!activeSection} activeSection={activeSection} />
      <div style={{ contain: "paint" }} ref={developRef} id="develop">
        <Develop />
      </div>
      <div ref={testRef} id="test">
        <Test />
      </div>
      <div ref={documentRef} id="document">
        <Document />
      </div>
      <div ref={shareRef} id="share">
        <Share />
      </div>
      <div style={{ contain: "paint" }} ref={automateRef} id="automate">
        <Automate />
      </div>
      <div ref={whoRef} id="who">
        <SocialValidation />
      </div>
      <Footer variant="home" />
    </div>
  );
}

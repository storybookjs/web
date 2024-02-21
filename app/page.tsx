"use client";

import { Hero } from "@/components/home/hero2";
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
    <div className="bg-[#0d1026] relative" id="page-top">
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

      {/* Background circles and texture */}
      <div className="absolute rounded-full bg-[radial-gradient(closest-side_at_50%_50%,_rgba(255,71,133,1),_rgba(255,71,133,0)),url('/home/texture.svg')] w-[500px] h-[500px] top-[-300px] left-[-160px] z-[2] min-[600px]:w-[700px] min-[600px]:h-[700px] min-[960px]:w-[928px] min-[960px]:h-[928px] min-[960px]:top-[-500px] min-[960px]:left-[-100px] min-[1440px]:w-[1100px] min-[1440px]:h-[1100px] min-[1440px]:top-[-720px] min-[1440px]:left-[4%] min-[2200px]:left-[14%]" />

      <div className="absolute rounded-full bg-[radial-gradient(closest-side_at_50%_50%,_rgba(252,81,31,1),_rgba(252,81,31,0)),url('/home/texture.svg')] opacity-80 w-[400px] h-[400px] top-[-220px] left-[200px] z-[1] min-[600px]:w-[600px] min-[600px]:h-[600px] min-[600px]:top-[-260px] min-[600px]:left-[360px] min-[960px]:w-[740px] min-[960px]:h-[740px] min-[960px]:top-[-420px] min-[960px]:left-[480px] min-[1440px]:left-[40%] min-[2200px]:left-[44%]" />

      <div className="absolute rounded-full bg-[radial-gradient(closest-side_at_50%_50%,_rgba(71,145,255,1),_rgba(252,81,31,0)),url('/home/texture.svg')] opacity-70 w-[600px] h-[600px] top-[160px] left-[200px] z-[1] min-[600px]:top-[220px] min-[600px]:left-[400px] min-[960px]:w-[1192px] min-[960px]:h-[1192px] min-[960px]:top-[210px] min-[960px]:left-[560px] min-[1440px]:left-[40%]" />
    </div>
  );
}

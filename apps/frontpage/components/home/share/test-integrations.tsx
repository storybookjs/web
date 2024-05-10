import React from "react";
import { motion } from "framer-motion";
import * as snippets from "./embed-snippets";
import { Code } from "./code";
import { IntegrationsCarousel } from "./integrations-carousel";

const testIntegrations = [
  {
    index: 1,
    name: "Jest",
    image: "/home/share/jest.svg",
    color: "#99424F",
    media: <Code code={snippets.jest} fileName="UserCard.test.js" />,
  },
  {
    index: 2,
    name: "Testing Library",
    image: "/home/share/testing-lib.png",
    color: "#E3F3FF",
    media: (
      <Code code={snippets.testingLibrary} fileName="RangePicker.test.js" />
    ),
  },
  {
    index: 3,
    name: "Cypress",
    image: "/home/share/cypress.svg",
    color: "#3C3C3C",
    media: <Code code={snippets.cypress} fileName="SearchInput.spec.js" />,
  },
  {
    index: 4,
    name: "Jasmine",
    image: "/home/share/jasmine.svg",
    color: "#8A4182",
    media: <Code code={snippets.jasmine} fileName="delete-customer.spec.js" />,
  },
];

export const TestIntegrations = React.forwardRef<HTMLImageElement>((_, ref) => {
  return (
    <div className="relative w-full md:col-[2/3]">
      <IntegrationsCarousel
        className="w-full grid md:-w-[125%]"
        integrations={testIntegrations}
      />
      <motion.img
        alt=""
        className="block absolute top-0 left-0 w-full select-none pointer-events-none"
        height="244"
        ref={ref}
        src="/home/share/time-frame-picker.svg"
        style={{ opacity: 0 }}
        width="458"
      />
    </div>
  );
});

TestIntegrations.displayName = "TestIntegrations";

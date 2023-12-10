import React from "react";
import { motion } from "framer-motion";
import * as snippets from "./embed-snippets";
import { CodeExample } from "./code-example";
import { IntegrationsCarousel } from "./integrations-carousel";

const testIntegrations = [
  {
    index: 1,
    name: "Jest",
    image: "/home/share/jest.svg",
    color: "#99424F",
    media: (
      <CodeExample language="jsx" fileName="UserCard.test.js">
        {snippets.jest}
      </CodeExample>
    ),
  },
  {
    index: 2,
    name: "Testing Library",
    image: "/home/share/testing-lib.png",
    color: "#E3F3FF",
    media: (
      <CodeExample language="jsx" fileName="RangePicker.test.js">
        {snippets.testingLibrary}
      </CodeExample>
    ),
  },
  {
    index: 3,
    name: "Cypress",
    image: "/home/share/cypress.svg",
    color: "#3C3C3C",
    media: (
      <CodeExample language="jsx" fileName="SearchInput.spec.js">
        {snippets.cypress}
      </CodeExample>
    ),
  },
  {
    index: 4,
    name: "Jasmine",
    image: "/home/share/jasmine.svg",
    color: "#8A4182",
    media: (
      <CodeExample language="javascript" fileName="delete-customer.spec.js">
        {snippets.jasmine}
      </CodeExample>
    ),
  },
];

export const TestIntegrations = React.forwardRef<HTMLImageElement>((_, ref) => {
  return (
    <div className="relative w-full md:col-[2/3]">
      <IntegrationsCarousel
        integrations={testIntegrations}
        className="w-full grid md:-w-[125%]"
      />
      <motion.img
        className="block absolute top-0 left-0 w-full select-none pointer-events-none"
        src="/home/share/time-frame-picker.svg"
        alt=""
        ref={ref}
        width="458"
        height="244"
        style={{ opacity: 0 }}
      />
    </div>
  );
});

TestIntegrations.displayName = "TestIntegrations";

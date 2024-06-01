import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import * as snippets from './embed-snippets';
import { Code } from './code';
import { IntegrationsCarousel } from './integrations-carousel';
import jest from './images/jest.svg';
import testingLib from './images/testing-lib.png';
import cypress from './images/cypress.svg';
import jasmine from './images/jasmine.svg';
import timeFramePicker from './images/time-frame-picker.svg';

const testIntegrations = [
  {
    index: 1,
    name: 'Jest',
    image: jest,
    color: '#99424F',
    media: <Code code={snippets.jest} fileName="UserCard.test.js" />,
  },
  {
    index: 2,
    name: 'Testing Library',
    image: testingLib,
    color: '#E3F3FF',
    media: (
      <Code code={snippets.testingLibrary} fileName="RangePicker.test.js" />
    ),
  },
  {
    index: 3,
    name: 'Cypress',
    image: cypress,
    color: '#3C3C3C',
    media: <Code code={snippets.cypress} fileName="SearchInput.spec.js" />,
  },
  {
    index: 4,
    name: 'Jasmine',
    image: jasmine,
    color: '#8A4182',
    media: <Code code={snippets.jasmine} fileName="delete-customer.spec.js" />,
  },
];

export const TestIntegrations = forwardRef<HTMLImageElement>((_, ref) => {
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
        src={timeFramePicker}
        style={{ opacity: 0 }}
        width="458"
      />
    </div>
  );
});

TestIntegrations.displayName = 'TestIntegrations';

import type { FC } from 'react';
import React from 'react';
import { Container, Button } from '@repo/ui';
import Image from 'next/image';
import AutomateSvg from '../share/images/automate.svg';

export const Automate: FC = () => {
  return (
    <div className="border-b border-zinc-600 py-12 sm:py-20 md:pt-28">
      <Container>
        <h2 className="flex-1 text-center text-4xl font-bold text-white md:text-[56px]/[70px]">
          Automate UI workflows
        </h2>
        <p className="mx-auto mb-0 mt-5 max-w-[510px] text-center text-white md:mt-2">
          Add Storybook as a CI step so every pull request runs the same
          checks, whether a developer or an agent opened it. Your team ships
          faster with less manual work.
        </p>
          <Button
            asChild
            className="mt-5 mx-auto inline-flex max-w-[280px]"
            jumpOnHover
            rounded="full"
            variant="outlineHome"
          >
            <a href="/tutorials/ui-testing-handbook/react/en/automate/">
              Learn how to set up Storybook in CI
            </a>
          </Button>
        <Image src={AutomateSvg} alt="Automate" className="mx-auto mt-16" />
      </Container>
    </div>
  );
};

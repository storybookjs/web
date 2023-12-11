import React, { FC } from "react";
import { cn, container } from "@/lib/utils";
import { FeatureStep } from "./feature-step";
import { MergeIcon } from "@storybook/icons";
import { Publish } from "./publish";
import { UITests } from "./ui-tests/ui-tests";
import { UIReview } from "./ui-review";
import { MergeAndShip } from "./merge-and-ship";

export const Automate: FC = () => {
  return (
    <div className="py-12 border-b border-zinc-600 sm:py-20 md:pt-28">
      <div className={cn(container)}>
        <h2 className="flex-1 text-4xl md:text-[56px]/[70px] text-center font-bold text-white">
          Automate UI workflows
        </h2>
        <p className="text-white mt-5 mb-0 text-center max-w-[510px] mx-auto md:mt-2">
          Add Storybook as a CI step to automate the UI development workflow.
          That helps you and your team ship faster with less manual work.
        </p>
      </div>
      <div className={cn(container)}>
        <FeatureStep
          title="Publish Storybook"
          description="Publish Storybook online to collaborate on UI implementation with developers, designers, and PMs. Your teammates can see work without needing to spin up a dev environment."
          href="/docs/react/sharing/publish-storybook/"
          linkLabel="Publish Storybook for your team"
        />
        <Publish />
        <FeatureStep
          title="UI Tests"
          description="Test every facet of your UI: interaction, visual, accessibility, and snapshot, in CI to detect UI bugs down to the component."
          href="/docs/react/writing-tests/test-runner"
          linkLabel="Auto-detect UI bugs"
        />
        <UITests />
        <FeatureStep
          title="UI Review"
          description="Request feedback from teammates to verify UI implementation. Discuss UI changes together then assign reviewers for sign off."
          href="/docs/react/sharing/publish-storybook#review-with-your-team"
          linkLabel="Review with your team"
        />
        <UIReview />
        <FeatureStep
          icon={<MergeIcon size={24} />}
          title="Merge and ship"
          description="Each stage of the UI development lifecycle is tracked by a pull request check. Pass all checks to get certainty that your work is ready for production."
          href="https://storybook.js.org/tutorials/ui-testing-handbook/react/en/automate/"
          linkLabel=" Integrate with Git version control"
          logoBgColor="bg-purple-500"
        />
        <MergeAndShip />
      </div>
    </div>
  );
};

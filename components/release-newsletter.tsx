import { FC } from "react";
import { NewsletterForm } from "./newsletter-form/form";

export const ReleaseNewsletter: FC = () => {
  return (
    <div className="border-t border-t-zinc-200 pt-6 mt-6">
      <div className="text-xl mb-1">Join the mailing list</div>
      <div className="text-md text-zinc-500 mb-6">
        Get news, free tutorials, and Storybook tips emailed to you.
      </div>
      <NewsletterForm variant="system" />
    </div>
  );
};

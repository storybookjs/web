import { FC, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CrossIcon, PlayIcon } from "@storybook/icons";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const Video: FC = () => {
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <Dialog.Root open={openVideo} onOpenChange={setOpenVideo}>
      <Dialog.Trigger asChild>
        <button
          className="flex items-center justify-center border border-white px-6 h-12 rounded-full text-white text-md font-bold gap-3"
          onClick={() => setOpenVideo(true)}
        >
          <PlayIcon />
          Watch video
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-32px)] max-w-4xl translate-x-[-50%] translate-y-[-50%] shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <AspectRatio ratio={16 / 9}>
            <iframe
              title="Storybook intro video"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/p-LFh5Y89eM?autoplay=1&rel=0&amp;showinfo=0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="chromatic-ignore"
            />
          </AspectRatio>
          <Dialog.Close asChild>
            <button
              className="absolute -top-8 -right-8 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <CrossIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

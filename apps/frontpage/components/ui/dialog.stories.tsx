import { expect, userEvent, within } from 'storybook/test';
import preview from '../../.storybook/preview';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white"
          type="button"
        >
          Open dialog
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm">Form fields go here.</div>
        <DialogFooter>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white"
            type="button"
          >
            Save changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const meta = preview.meta({
  title: 'UI/Dialog',
  component: DialogExample,
  parameters: { layout: 'centered' },
});

export const Closed = meta.story({});

export const Open = meta.story({
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));
    const body = within(document.body);
    await expect(
      await body.findByRole('dialog', { name: 'Edit profile' }),
    ).toBeInTheDocument();
  },
});

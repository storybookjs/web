'use server';

import { z } from 'zod';

export async function sendFeedback(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    feedback: z.string().min(1),
    reaction: z.string(),
  });

  const parse = schema.safeParse({
    feedback: formData.get('feedback'),
    reaction: formData.get('reaction'),
  });

  if (!parse.success) {
    return { message: 'Failed' };
  }

  const data = parse.data;

  console.log(data);

  return { message: 'Your feedback has been received!' };
}

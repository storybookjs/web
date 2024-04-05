"use server";

import { z } from "zod";

export async function saveNewsletter(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    email: z.string().email(),
  });
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: "Invalid email address",
    };
  }

  const data = validatedFields.data;

  const formdata = new FormData();
  formdata.append("u", "06a6fce3ab1327784d4342396");
  formdata.append("id", "18b5cea6e6");
  formdata.append("MERGE0", data.email);

  try {
    await fetch("https://storybook.us18.list-manage.com/subscribe/post", {
      method: "POST",
      body: formdata,
    });

    return { message: "ok" };
  } catch (e) {
    return { message: "Failed to add email" };
  }
}

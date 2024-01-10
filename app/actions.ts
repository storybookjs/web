"use server";

import { renderers } from "@/docs-renderers";
import { cookies } from "next/headers";

export async function setVersionCookie(version: string) {
  cookies().set("sb-docs-version", version);
}

export async function setRendererCookie(formData?: FormData) {
  const hasRenderer = cookies().has("sb-docs-renderer");

  const renderer = formData?.get("renderer") as string;

  if (renderer) {
    cookies().set("sb-docs-renderer", renderer);
    return;
  }

  if (hasRenderer) return;

  cookies().set("sb-docs-renderer", renderers[0].id);
}

"use server";

import { languages } from "@/docs-languages";
import { packageManagers } from "@/docs-package-managers";
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

export async function setLanguageCookie(formData?: FormData) {
  const hasLanguage = cookies().has("sb-docs-language");

  const language = formData?.get("language") as string;

  if (language) {
    cookies().set("sb-docs-language", language);
    return;
  }

  if (hasLanguage) return;

  cookies().set("sb-docs-language", languages[0].id);
}

export async function setPackageManagerCookie(formData?: FormData) {
  const hasPM = cookies().has("sb-docs-package-manager");
  const packageManager = formData?.get("packageManager") as string;

  if (packageManager) {
    cookies().set("sb-docs-package-manager", packageManager);
    return;
  }

  if (hasPM) return;

  cookies().set("sb-docs-package-manager", packageManagers[0].id);
}

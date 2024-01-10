"use server";

import { cookies } from "next/headers";

export async function setVersionCookie(version: string) {
  cookies().set("sb-docs-version", version);
}

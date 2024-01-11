'use server';

import type { Args } from '@storybook/react';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const cookieName = 'sbSessionId';

type SessionId = string;
const args: Record<SessionId, Args> = {};

function getSessionId() {
  return cookies().get(cookieName)?.value;
}

export async function getArgs(storyId: string): Promise<Args> {
  const sessionId = await getSessionId();
  if (!sessionId) return {};
  return args[sessionId]?.[storyId] || {};
}

export async function setArgs(previewPath: string, storyId: string, newArgs: any) {
  revalidatePath(`/${previewPath}/${storyId}`);

  let sessionId = getSessionId();
  if (!sessionId) {
    sessionId = Math.random().toString();
    cookies().set(cookieName, sessionId);
  }

  console.log(`[${sessionId}]: setting '${storyId}' args:`, { newArgs });
  args[sessionId] ||= {};
  args[sessionId][storyId] = newArgs;
}

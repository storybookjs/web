import crypto from 'node:crypto';
import type { NextRequest } from 'next/server';

const sentryEnvelopeUrl = `https://o4507096816484352.ingest.sentry.io/api/4507096819892224/envelope/?sentry_key=${process.env.SENTRY_KEY ?? ''}&sentry_version=7`;

function flatten(
  obj: Record<string, unknown>,
  acc: Record<string, unknown> = {},
  prefix = '',
) {
  Object.entries(obj).forEach(([key, value]) => {
    const p = (prefix ? `${prefix}.${key}` : key)
      .replaceAll('@', 'at_')
      .replaceAll('/', 'slash_');
    if (typeof value === 'object' && value !== null) {
      try {
        flatten(value as Record<string, unknown>, acc, p);
      } catch (e) {
        //
      }
    } else if (typeof value === 'string' && value.includes('\n')) {
      acc[p] = `...${value.split('\n')[0]}...`;
    } else if (value) {
      acc[p] = value;
    }
  });
  return acc;
}

function getEnvironment(storybookVersion: string) {
  if (storybookVersion.includes('alpha')) return 'alpha';
  if (storybookVersion.includes('beta')) return 'beta';
  if (storybookVersion.includes('rc')) return 'rc';
  if (storybookVersion.includes('canary')) return 'canary';
  return 'latest';
}

export async function POST(request: NextRequest) {
  const { headers, method } = request;
  const body = await request.text();
  const received: {
    eventType: string;
    context: { storybookVersion: string; anonymousId: string };
    payload: { error: { message: string }; errorHash: string };
  } = JSON.parse(body);

  if (received.eventType === 'error') {
    const now = new Date().toISOString();
    const eventId = crypto.randomUUID().replace(/-/g, '');

    const envelopeHeader = {
      event_id: eventId,
      sent_at: now,
      sdk: { name: 'custom.fetch.sender', version: '1.0' },
    };

    const itemHeader = { type: 'event' };
    const payload = {
      event_id: eventId,
      release: received.context.storybookVersion,
      user: { id: received.context.anonymousId },
      timestamp: now,
      environment: getEnvironment(received.context.storybookVersion),
      level: 'error',
      platform: 'javascript',
      tags: flatten(received),
      message: {
        formatted:
          received.payload.error.message ||
          received.payload.errorHash ||
          'Unknown error',
      },
    };

    const envelope = [
      JSON.stringify(envelopeHeader),
      JSON.stringify(itemHeader),
      JSON.stringify(payload),
    ].join('\n');

    await fetch(sentryEnvelopeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-sentry-envelope' },
      body: envelope,
    });
  }

  // we send the request forward to https://us-central1-storybook-warehouse.cloudfunctions.net/storybook-event-log-production-event-log
  const res = await fetch(
    'https://us-central1-storybook-warehouse.cloudfunctions.net/storybook-event-log-production-event-log',
    {
      method,
      body,
      headers,
    },
  );

  return new Response(await res.text(), {
    status: res.status,
  });
}

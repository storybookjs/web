import crypto from 'node:crypto';
import type { NextRequest } from 'next/server';

const sentryEnvelopeUrl = `https://o4507096816484352.ingest.sentry.io/api/4507096819892224/envelope/?sentry_key=${process.env.SENTRY_KEY ?? ''}&sentry_version=7`;

function flatten(
  obj: Record<string, unknown>,
  acc: Record<string, unknown> = {},
  prefix = '',
) {
  Object.entries(obj).forEach(([key, value]) => {
    let p: string = (prefix ? `${prefix}.${key}` : key)
      .replaceAll('@', '_at_')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- we know it's a string
      .replaceAll('/', '_slash_');

    if (p.startsWith('_')) {
      p = p.slice(1);
    }

    if (typeof value === 'object' && value !== null) {
      try {
        flatten(value as Record<string, unknown>, acc, p);
      } catch (e) {
        //
      }
    } else if (value && typeof value === 'string' && value.includes('\n')) {
      acc[p] =
        `...${value.split('\n').find((line) => line.trim().length > 0) ?? ''}...`;
    } else if (value) {
      acc[p] = value;
    }
  });
  return acc;
}

function getEnvironment(storybookVersion: string) {
  if (!storybookVersion) {
    return 'unknown';
  }
  if (storybookVersion.includes('alpha')) return 'prerelease';
  if (storybookVersion.includes('beta')) return 'prerelease';
  if (storybookVersion.includes('rc')) return 'prerelease';
  if (storybookVersion.startsWith('0.0.0')) return 'canary';
  if (storybookVersion.includes('canary')) return 'canary';
  return 'latest';
}

export async function POST(request: NextRequest) {
  const { headers, method } = request;
  const body = await request.text();

  const received: TelemetryEvent = JSON.parse(body);

  const requests = [];

  requests.push(
    fetch(
      'https://us-central1-storybook-warehouse.cloudfunctions.net/storybook-event-log-production-event-log',
      {
        method,
        body,
        headers,
      },
    ),
  );

  if (received.eventType === 'error') {
    requests.push(forwardToSentry(received));
  }

  if (received.payload?.userAgent) {
    requests.push(forwardToPlausible(received, headers));
  }

  const responses = await Promise.allSettled(requests);
  responses.forEach((res) => {
    if (res.status === 'rejected') {
      // eslint-disable-next-line no-console -- we want to log the error
      console.error('Forwarding error', res.reason);
    }
  });

  const res = responses[0];
  if (res.status === 'rejected') {
    const reason = (res.reason ? res.reason : 'unknown') as string;
    return new Response(reason, {
      status: 500,
    });
  }

  return new Response(await res.value.text(), {
    status: res.value.status,
  });
}

interface TelemetryEvent {
  eventType: string;
  context: {
    storybookVersion?: string;
    anonymousId: string;
    userSince: string;
    cliVersion?: string;
  };
  payload: {
    eventType?: string;
    category?: string;
    metadataErrorMessage?: string;
    code?: string;
    step?: string;
    error: {
      message: string;
      stack?: string;
      data?: {
        errors: {
          location: ErrorLocation;
          text: string;
        }[];
      };
    };
    userAgent?: string;
    isNewUser?: boolean;
    timeSinceInit?: number;
    errorHash: string;
    name: string;
  };
  metadata: {
    userSince: string;
    storybookVersion: string;
    builder: string;
    renderer: string;
    framework?: {
      name: string;
    };
  };
}

interface SentryStackFrame {
  filename: string;
  function?: string;
  lineno?: number;
  colno?: number;
  in_app?: boolean;
}

async function forwardToSentry(received: TelemetryEvent) {
  const now = new Date().toISOString();
  const eventId = crypto.randomUUID().replace(/-/g, '');

  const envelopeHeader = {
    event_id: eventId,
    sent_at: now,
    sdk: { name: 'custom.fetch.sender', version: '1.1' },
  };

  const fingerprint = getFingerPrint(received);

  const itemHeader = { type: 'event' };
  const version =
    received?.context?.storybookVersion ??
    received?.metadata?.storybookVersion ??
    received?.context?.cliVersion;
  const payload = {
    event_id: eventId,
    release: version ?? 'unknown',

    // anonymized
    user: { id: received?.metadata?.userSince?.toString() ?? 'unknown' },

    timestamp: now,
    environment: getEnvironment(version),
    level: 'error',
    platform: 'javascript',
    tags: flatten({ ...(received ?? {}) }),
    fingerprint,

    exception: {
      values: [
        {
          type: received?.payload?.name ?? 'CustomError',
          value:
            received?.payload?.error?.message ??
            received?.payload?.name ??
            received?.payload?.errorHash ??
            'Unknown error',
          stacktrace: received?.payload?.error?.stack
            ? {
                frames: parseStackTrace(received?.payload?.error?.stack ?? ''),
              }
            : undefined,
        },
      ],
    },
    message: {
      message: received?.payload?.error?.message,
      formatted:
        received?.payload?.error?.message ??
        received?.payload?.metadataErrorMessage ??
        received?.payload?.name ??
        received?.payload?.errorHash ??
        'Unknown error',
    },
  };

  const envelope = [
    JSON.stringify(envelopeHeader),
    JSON.stringify(itemHeader),
    JSON.stringify(payload),
  ].join('\n');

  return fetch(sentryEnvelopeUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-sentry-envelope' },
    body: envelope,
  });
}

async function forwardToPlausible(received: TelemetryEvent, headers: Headers) {
  const ip = headers.get('x-forwarded-for') ?? headers.get('x-real-ip');
  const { userAgent, step, isNewUser, timeSinceInit } = received.payload ?? {};

  let name = received.eventType;

  // FIXME: want a more general way to handle this
  if (name === 'preview-first-load') {
    if (isNewUser) {
      name = 'new-user-first-load';
    } else if (timeSinceInit) {
      name = 'init-first-load';
    }
    // skip logging for non-init preview loads
    return new Response(null, { status: 204 });
  } else if (step) {
    name = `${name} - ${step}`;
  }

  const { builder, renderer, framework, storybookVersion } =
    received.metadata ?? {};

  const props = {
    builder,
    renderer,
    framework: framework?.name,
    storybookVersion,
  };

  return fetch('https://plausible.io/api/event', {
    method: 'POST',
    headers: {
      'User-Agent': userAgent!,
      'Content-Type': 'application/json',
      'X-Forwarded-For': ip ?? '127.0.0.1',
    },
    body: JSON.stringify({
      name,
      props,
      url: 'https://storybook.js.org/event-log',
      domain: 'storybook.js.org',
    }),
  });
}

function getFingerPrint(received: TelemetryEvent) {
  if (typeof received?.payload?.category === 'string') {
    return [`fp-${received.payload.name}`];
  }

  if (typeof received?.payload?.code === 'string') {
    return [
      received?.payload?.eventType ?? 'unknown',
      received?.payload?.code ?? 'unknown',
      received?.payload?.name ?? 'unknown',
    ];
  }

  return [`fp-${received.payload.errorHash}`];
}

function parseStackTrace(stackString?: string | null): SentryStackFrame[] {
  if (!stackString) return [];

  const lines = stackString.split('\n').slice(1); // skip "Error: ..." line if present
  const frames: SentryStackFrame[] = [];

  for (const line of lines) {
    // Case 1: function + file + line + col
    // eslint-disable-next-line prefer-named-capture-group -- 🤷
    const fnMatch = /at (.+?) \((.+):(\d+):(\d+)\)/.exec(line);
    // Case 2: file + line + col (no function)
    // eslint-disable-next-line prefer-named-capture-group -- 🤷
    const fileMatch = /at (.+):(\d+):(\d+)/.exec(line);

    if (fnMatch) {
      const [, fn, file, lineNum, colNum] = fnMatch;
      frames.push({
        filename: file,
        function: fn,
        lineno: Number(lineNum),
        colno: Number(colNum),
        in_app: true,
      });
    } else if (fileMatch) {
      const [, file, lineNum, colNum] = fileMatch;
      frames.push({
        filename: file,
        function: '<unknown>',
        lineno: Number(lineNum),
        colno: Number(colNum),
        in_app: true,
      });
    } else {
      frames.push({
        filename: line.trim(),
        function: '<unknown>',
        in_app: true,
      });
    }
  }

  return frames;
}

interface ErrorLocation {
  file?: string;
  line?: number;
  column?: number;
  length?: number;
  lineText?: string;
}

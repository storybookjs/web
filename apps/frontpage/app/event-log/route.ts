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
  if (storybookVersion.includes('alpha')) return 'alpha';
  if (storybookVersion.includes('beta')) return 'beta';
  if (storybookVersion.includes('rc')) return 'rc';
  if (storybookVersion.startsWith('0.0.0')) return 'canary';
  if (storybookVersion.includes('canary')) return 'canary';
  return 'latest';
}

export async function POST(request: NextRequest) {
  const { headers, method } = request;
  const body = await request.text();

  const received: TelemetryEvent = JSON.parse(body);

  if (received.eventType === 'error') {
    try {
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
                    frames: parseStackTrace(
                      received?.payload?.error?.stack ?? '',
                    ),
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

      await fetch(sentryEnvelopeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-sentry-envelope' },
        body: envelope,
      });
    } catch (e) {
      // eslint-disable-next-line no-console -- we want to log the error
      console.error('Failed to send event to Sentry', e);
    }
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
    errorHash: string;
    name: string;
  };
  metadata: {
    userSince: string;
    storybookVersion: string;
  };
}

interface SentryStackFrame {
  filename: string;
  function?: string;
  lineno?: number;
  colno?: number;
  in_app?: boolean;
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
    const fnMatch = line.match(/at (.+?) \((.+):(\d+):(\d+)\)/);
    // Case 2: file + line + col (no function)
    // eslint-disable-next-line prefer-named-capture-group -- 🤷
    const fileMatch = line.match(/at (.+):(\d+):(\d+)/);

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

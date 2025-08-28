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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- we know it's a string
      .replaceAll('/', 'slash_');
    if (typeof value === 'object' && value !== null) {
      try {
        flatten(value as Record<string, unknown>, acc, p);
      } catch (e) {
        //
      }
    } else if (value && typeof value === 'string' && value.includes('\n')) {
      acc[p] = `...${value.split('\n')[0]}...`;
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
  if (storybookVersion.includes('canary')) return 'canary';
  return 'latest';
}

export async function POST(request: NextRequest) {
  const { headers, method } = request;
  const body = await request.text();
  const received: {
    eventType: string;
    context: {
      storybookVersion?: string;
      anonymousId: string;
      userSince: string;
      cliVersion?: string;
    };
    payload: {
      category?: string;
      code?: string;
      error: {
        message: string;
        stack?: string;
        data?: { errors: { location: ErrorLocation; text: string }[] };
      };
      errorHash: string;
      name: string;
    };
    metadata: { userSince: string; storybookVersion: string };
  } = JSON.parse(body);

  if (received.eventType === 'error') {
    try {
      const now = new Date().toISOString();
      const eventId = crypto.randomUUID().replace(/-/g, '');

      const envelopeHeader = {
        event_id: eventId,
        sent_at: now,
        sdk: { name: 'custom.fetch.sender', version: '1.1' },
      };

      const itemHeader = { type: 'event' };
      const payload = {
        event_id: eventId,
        release:
          received?.context?.storybookVersion ??
          received?.context?.cliVersion ??
          'unknown',
        user: { id: received?.metadata?.userSince?.toString() ?? 'unknown' },
        timestamp: now,
        environment: getEnvironment(
          received?.context?.storybookVersion ??
            received?.metadata?.storybookVersion ??
            received?.context?.cliVersion,
        ),
        level: 'error',
        platform: 'javascript',
        tags: flatten(received ?? {}),
        fingerprint: received?.payload?.errorHash
          ? [received.payload.errorHash]
          : undefined,

        exception: {
          values: [
            {
              type: received?.payload?.name ?? 'CustomError',
              value:
                received?.payload?.error?.message ||
                received?.payload?.name ||
                received?.payload?.errorHash ||
                'Unknown error',
              stacktrace: {
                frames: parseStackTrace(received?.payload?.error?.stack ?? ''),
              },
            },
          ],
        },
        message: {
          formatted:
            received?.payload?.error?.message ||
            received?.payload?.name ||
            received?.payload?.errorHash ||
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

interface SentryStackFrame {
  filename: string;
  function?: string;
  lineno?: number;
  colno?: number;
  in_app?: boolean;
}

export function parseStackTrace(
  stackString?: string | null,
): SentryStackFrame[] {
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

// function buildFrameFromLocation(loc: ErrorLocation): SentryStackFrame {
//   return {
//     filename: loc.file ?? '<unknown>',
//     function: '<unknown>',
//     lineno: loc.line,
//     colno: loc.column,
//     in_app: true,
//     context_line: loc.lineText,
//   };
// }

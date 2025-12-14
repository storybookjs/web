import { usePlausible } from 'next-plausible';
import { usePostHog } from 'posthog-js/react';

export function useAnalytics() {
  const plausible = usePlausible();
  const posthog = usePostHog();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic event properties
  function track(eventName: string, properties?: Record<string, any>) {
    plausible(eventName, { props: properties });
    posthog.capture(eventName, properties);
  }

  return track;
}

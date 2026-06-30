/**
 * Side-effect module: client-only, production-only initialization (Sentry).
 * Imported once from __root.tsx. Listed in package.json "sideEffects" so the
 * production build does not tree-shake it away.
 */
import * as Sentry from '@sentry/react';
import useUserStore from '@app/zustand/user';

if (typeof window !== 'undefined') {
  // Client-only polyfill for the `scrollend` event (used by carousels/snap UIs).
  import('@af-utils/scrollend-polyfill');
  // The user store uses skipHydration (SSR-safe); rehydrate it from localStorage now.
  useUserStore.persist.rehydrate();
}

if (import.meta.env.PROD && typeof window !== 'undefined') {
  Sentry.init({
    dsn: 'https://f236c855f25740bcba54f33469b35452@o117731.ingest.us.sentry.io/5991642',
    environment: `quizz-du-berger-${import.meta.env.VITE_ENV}`,
    sendDefaultPii: true,
    release: __VITE_BUILD_ID__,
    integrations: [Sentry.browserTracingIntegration()],
    maxValueLength: 10000,
    normalizeDepth: 10,
    tracesSampleRate: 0.05,
    ignoreErrors: [
      'Network request failed',
      'NetworkError',
      'withrealtime/messaging',
      'AbortError: The operation was aborted',
      'TypeError: cancelled',
      'TypeError: annulé',
    ],
  });
}

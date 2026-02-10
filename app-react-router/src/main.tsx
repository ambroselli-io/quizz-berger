import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
  BrowserRouter,
} from 'react-router';
import * as Sentry from '@sentry/react';
import App from './App.tsx';

import '@af-utils/scrollend-polyfill';
import { ErrorBoundary } from 'react-error-boundary';
import UnexpectedError from './components/UnexpectedError.tsx';
import { capture } from './services/sentry.ts';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'https://02c1b85c288d3b0775948e03c4db725c@o117731.ingest.us.sentry.io/4508444404416512',
    environment: `quizz-du-berger-${import.meta.env.VITE_ENV}`,
    release: __VITE_BUILD_ID__,
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary
        FallbackComponent={UnexpectedError}
        onError={(error, componentStack) => {
          capture(error, { extra: { componentStack } });
        }}
        onReset={() => {
          window.location.href = '/';
        }}
      >
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);

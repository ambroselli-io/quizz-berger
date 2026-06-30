import { createFileRoute, notFound } from '@tanstack/react-router';
import Stats from '@app/pages/Stats';

export const Route = createFileRoute('/stats')({
  beforeLoad: () => {
    // Dev-only route (mirrors the old `import.meta.env.DEV && <Route .../>` guard).
    if (!import.meta.env.DEV) throw notFound();
  },
  component: Stats,
});

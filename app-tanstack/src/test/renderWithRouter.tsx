import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

interface RenderOptions {
  path?: string;
  initialEntries?: string[];
}

/**
 * Renders a page component inside a minimal TanStack Router context (memory
 * history), mirroring the old react-router MemoryRouter test harness. The
 * component is the root route's element so its router hooks (useNavigate, Link,
 * useParams) resolve.
 */
export function renderWithRouter(node: ReactElement, options: RenderOptions = {}) {
  const { path = '/', initialEntries = [path] } = options;
  const rootRoute = createRootRoute({ component: () => node });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries }),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return render(<RouterProvider router={router as any} />);
}

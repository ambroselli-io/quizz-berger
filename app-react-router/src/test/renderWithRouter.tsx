import type { ReactElement } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { render } from '@testing-library/react';

interface RenderOptions {
  path?: string;
  initialEntries?: string[];
  routePattern?: string;
}

export function renderWithRouter(node: ReactElement, options: RenderOptions = {}) {
  const { path = '/', initialEntries = [path], routePattern = path } = options;
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path={routePattern} element={node} />
        <Route path="*" element={<div data-testid="catch-all" />} />
      </Routes>
    </MemoryRouter>,
  );
}

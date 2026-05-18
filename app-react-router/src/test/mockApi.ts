import { vi } from 'vitest';
import API from '@app/services/api';

type Json = unknown;
type RouteHandler = (args: { query?: Record<string, string>; body?: Record<string, unknown> }) => Json;

export interface MockRoutes {
  GET?: Record<string, Json | RouteHandler>;
  POST?: Record<string, Json | RouteHandler>;
  PUT?: Record<string, Json | RouteHandler>;
  DELETE?: Record<string, Json | RouteHandler>;
}

const resolve = (entry: Json | RouteHandler | undefined, args: Parameters<RouteHandler>[0]): Json => {
  if (entry === undefined) {
    throw new Error(`No mock for route ${args ? JSON.stringify(args) : ''}`);
  }
  return typeof entry === 'function' ? (entry as RouteHandler)(args) : entry;
};

export function mockApi(routes: MockRoutes) {
  const lookup = (method: keyof MockRoutes, path: string) => {
    const table = routes[method] ?? {};
    if (path in table) return table[path];
    // Allow dynamic-segment matching: e.g. registered "/user/:pseudo" matches "/user/alice"
    for (const pattern of Object.keys(table)) {
      if (!pattern.includes(':')) continue;
      const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '[^/]+') + '$');
      if (regex.test(path)) return table[pattern];
    }
    return undefined;
  };

  const makeMethodSpy = (method: keyof MockRoutes) =>
    vi.fn(async (args: { path?: string; query?: Record<string, string>; body?: Record<string, unknown> } = {}) => {
      const path = args.path ?? '';
      const entry = lookup(method, path);
      if (entry === undefined) {
        // Soft default: behave like the real API on unknown path — return ok: false
        return { ok: false };
      }
      return resolve(entry, { query: args.query, body: args.body });
    });

  const getSpy = makeMethodSpy('GET');
  const postSpy = makeMethodSpy('POST');
  const putSpy = makeMethodSpy('PUT');
  const deleteSpy = makeMethodSpy('DELETE');

  vi.spyOn(API, 'get').mockImplementation(getSpy as unknown as typeof API.get);
  vi.spyOn(API, 'post').mockImplementation(postSpy as unknown as typeof API.post);
  vi.spyOn(API, 'put').mockImplementation(putSpy as unknown as typeof API.put);
  vi.spyOn(API, 'delete').mockImplementation(deleteSpy as unknown as typeof API.delete);

  return { getSpy, postSpy, putSpy, deleteSpy };
}

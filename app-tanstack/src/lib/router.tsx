/**
 * React-Router-compatible routing shim backed by TanStack Router.
 *
 * The codebase used react-router's string-based `Link`/`useNavigate`/`useParams`.
 * Rather than rewrite every call site to TanStack's typed object API, this module
 * re-exports drop-in equivalents that accept plain string paths. Route files
 * (loaders, head(), notFound) use the real `@tanstack/react-router` API directly;
 * presentational components import from here.
 */
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import {
  Link as TanstackLink,
  Navigate as TanstackNavigate,
  useLocation as useTanstackLocation,
  useNavigate as useTanstackNavigate,
  useParams as useTanstackParams,
} from '@tanstack/react-router';

type AnyProps = Record<string, unknown>;
type LinkProps = { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

/** Link accepting a plain string `to` (e.g. `/candidat/marine-le-pen`). */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...rest }, ref) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TanstackLink ref={ref} to={to as any} {...(rest as any)} />;
});

/** useNavigate returning a function that accepts a string path or an options object. */
export function useNavigate() {
  const navigate = useTanstackNavigate();
  return (to: string | AnyProps, opts?: { replace?: boolean }) => {
    if (typeof to === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return navigate({ to, replace: opts?.replace } as any);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return navigate(to as any);
  };
}

/** useParams returning all params loosely (matches react-router's untyped usage). */
export function useParams<T = Record<string, string>>(): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (useTanstackParams as any)({ strict: false }) as T;
}

export const useLocation = useTanstackLocation;

/** Declarative redirect accepting a string `to`. */
export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TanstackNavigate to={to as any} replace={replace} />;
}

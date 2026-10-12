import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import API from '@app/services/api';

// Audience measurement without cookie or storage: the API turns IP + user-agent into a visitor id that changes every day.
// The referrer and the utm_* of the landing page are resent with every page of the visit, so pages can be filtered by source.
let visit: { referrer: string; utmSource: string | null; utmMedium: string | null; utmCampaign: string | null } | null = null;
let lastPath: string | null = null;

function trackPageView(path: string) {
  if (path === lastPath) return;
  lastPath = path;
  const isEntry = visit === null;
  if (!visit) {
    const params = new URLSearchParams(window.location.search);
    visit = {
      referrer: document.referrer,
      utmSource: params.get('utm_source') || params.get('ref'),
      utmMedium: params.get('utm_medium'),
      utmCampaign: params.get('utm_campaign'),
    };
  }
  const cameFromSite = visit.referrer.startsWith(window.location.origin);
  const body = JSON.stringify({ path, isEntry: isEntry && !cameFromSite, ...visit });
  const url = API.getUrl('/visit');
  // text/plain keeps the request "simple": no CORS preflight, and sendBeacon survives the page being closed.
  const blob = new Blob([body], { type: 'text/plain' });
  if (!navigator.sendBeacon?.(url, blob)) {
    fetch(url, { method: 'POST', body: blob, keepalive: true, credentials: 'omit' }).catch(() => {});
  }
}

export default function PageViewTracker() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => trackPageView(pathname), [pathname]);
  return null;
}

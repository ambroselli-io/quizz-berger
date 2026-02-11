import { useEffect } from 'react';
import { useLocation } from 'react-router';

const BASE_URL = 'https://www.quizz-du-berger.com';

export default function useCanonical() {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = `${BASE_URL}${pathname === '/' ? '' : pathname}`;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }, [pathname]);
}

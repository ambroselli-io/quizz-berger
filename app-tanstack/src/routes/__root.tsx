import type { ReactNode } from 'react';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  type ErrorComponentProps,
} from '@tanstack/react-router';
import appCss from '@app/tailwind.css?url';
import '@app/app-init';
import Header from '@app/components/Header';
import BottomTabBar from '@app/components/BottomTabBar';
import NotFound from '@app/components/NotFound';
import UnexpectedError from '@app/components/UnexpectedError';

const DEFAULT_TITLE = 'Le Quizz du Berger | Quel est votre candidat idéal ?';
const DEFAULT_DESCRIPTION =
  'Présidentielle 2027 - Répondez aux questions que vous voulez pour connaître le candidat qui pense comme vous. 21 thèmes, 119 questions, 24 candidats.';
const DEFAULT_OG_IMAGE = 'https://www.quizz-du-berger.com/og_1200_630.png';

const WEBAPP_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Le Quizz du Berger',
  url: 'https://www.quizz-du-berger.com',
  description:
    "Quiz politique pour l'élection présidentielle française 2027. Comparez vos idées avec 24 candidats sur 21 thèmes et 119 questions.",
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  inLanguage: 'fr',
  author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#111827' },
      { title: DEFAULT_TITLE },
      { name: 'description', content: DEFAULT_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.quizz-du-berger.com/' },
      { property: 'og:title', content: DEFAULT_TITLE },
      { property: 'og:description', content: DEFAULT_DESCRIPTION },
      { property: 'og:image', content: DEFAULT_OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: DEFAULT_TITLE },
      { name: 'twitter:description', content: DEFAULT_DESCRIPTION },
      { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/logo192.png' },
    ],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(WEBAPP_JSONLD) }],
  }),
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: () => (
    <Layout>
      <NotFound />
    </Layout>
  ),
});

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <Header />
      <main className="box-border flex grow flex-col max-lg:pb-16">{children}</main>
      <BottomTabBar />
    </div>
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <Layout>
        <Outlet />
      </Layout>
    </RootDocument>
  );
}

function RootErrorComponent({ reset }: ErrorComponentProps) {
  return (
    <RootDocument>
      <Layout>
        <UnexpectedError resetErrorBoundary={reset} />
      </Layout>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <HeadContent />
      </head>
      <body className="h-full">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

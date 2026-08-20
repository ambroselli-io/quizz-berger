import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import CandidaciesPage from '@app/pages/CandidaciesPage';
import CandidacyPage from '@app/pages/CandidacyPage';
import { renderWithRouter } from '@app/test/renderWithRouter';
import {
  timelineByMonth,
  declaredCount,
  withdrawnCandidacies,
  declaredCandidacies,
} from '@app/utils/candidacies';

// The pages are rendered outside their file route, so `useParams` has no route to read
// from. Feed it the slug the route would have matched.
const params: { candidateSlug?: string } = {};
vi.mock('@app/lib/router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@app/lib/router')>();
  return { ...actual, useParams: () => params };
});

describe('Qui est candidat (/qui-est-candidat-2027)', () => {
  it('renders the timeline with one dated item per declaration and per withdrawal', async () => {
    renderWithRouter(<CandidaciesPage />, { path: '/qui-est-candidat-2027' });

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /qui est candidat à la présidentielle 2027/i,
      }),
    ).toBeInTheDocument();

    // Every month of the timeline gets a heading, newest first.
    const monthHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(monthHeadings.length).toBe(timelineByMonth.length);
    expect(monthHeadings[0]).toHaveTextContent(timelineByMonth[0].label);

    // Every timeline item links to its own candidacy page.
    for (const item of timelineByMonth[0].items) {
      const links = screen.getAllByRole('link', {
        name: new RegExp(item.candidacy.candidate.pseudo),
      });
      expect(
        links.some((l) => l.getAttribute('href') === `/candidature/${item.candidacy.slug}`),
      ).toBe(true);
    }
  });

  it('shows the OUT tag exactly for the candidates who gave up', async () => {
    renderWithRouter(<CandidaciesPage />, { path: '/qui-est-candidat-2027' });
    await screen.findByRole('heading', { level: 1 });
    // One tag in the timeline, one in the "ils ne seront pas candidats" block.
    expect(screen.getAllByText('OUT').length).toBe(withdrawnCandidacies.length * 2);
    // One CANDIDAT tag per declaration event — Clémentine Autain declared before giving up,
    // so she has one too, further down the timeline than her withdrawal.
    const declarations = timelineByMonth.flatMap((m) => m.items).filter((i) => i.tag === 'CANDIDAT');
    expect(declarations.length).toBeGreaterThanOrEqual(declaredCount);
    expect(screen.getAllByText('CANDIDAT').length).toBe(declarations.length);
  });
});

describe('Une candidature (/candidature/{slug})', () => {
  it('renders the history of a withdrawal with its press sources', async () => {
    const darmanin = withdrawnCandidacies.find((c) => c.slug === 'gerald-darmanin');
    expect(darmanin).toBeDefined();

    params.candidateSlug = 'gerald-darmanin';
    renderWithRouter(<CandidacyPage />, { path: '/candidature/gerald-darmanin' });

    expect(
      await screen.findByRole('heading', { level: 1, name: /gérald darmanin, candidat en 2027/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('OUT').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/17 août 2026/).length).toBeGreaterThan(0);

    for (const source of darmanin!.events[0].sources) {
      const link = screen.getAllByRole('link', { name: source.label })[0];
      expect(link).toHaveAttribute('href', source.url);
    }

    // The quiz is always one click away.
    expect(
      screen.getAllByRole('link', { name: /le programme de gérald darmanin/i })[0],
    ).toHaveAttribute('href', '/candidat/gerald-darmanin');
  });

  it('agrees in gender for a declared candidate', async () => {
    expect(declaredCandidacies.find((c) => c.slug === 'segolene-royal')?.feminine).toBe(true);

    params.candidateSlug = 'segolene-royal';
    renderWithRouter(<CandidacyPage />, { path: '/candidature/segolene-royal' });

    expect(
      await screen.findByRole('heading', { level: 1, name: /ségolène royal, candidate en 2027/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/est candidate à l'élection présidentielle de 2027/),
    ).toBeInTheDocument();
  });
});

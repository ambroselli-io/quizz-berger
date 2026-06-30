import { describe, it, expect } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import Result from '@app/pages/Result';
import { renderWithRouter } from '@app/test/renderWithRouter';
import { mockApi } from '@app/test/mockApi';
import { pinnedCandidate, pinnedUserAnswers, allTestCandidates } from '@app/test/fixtures';
import { quizz, quizzQuestions } from '@app/utils/quizz';
import { getCandidatesScorePerThemes } from '@app/shared/utils/score';
import { getPodium } from '@app/shared/utils/podium';

const setupResult = () =>
  mockApi({
    POST: { '/user/me': { ok: false } },
    GET: {
      '/answer': { ok: true, data: pinnedUserAnswers },
      '/answer/candidates': { ok: true, data: allTestCandidates },
      '/answer/friends': { ok: true, data: [] },
    },
  });

describe('Result (/result)', () => {
  it('puts the pinned user at the top of the main podium with 100%', async () => {
    setupResult();

    renderWithRouter(<Result />, { path: '/result' });

    await waitFor(() => {
      expect(screen.getAllByText(pinnedCandidate.pseudo).length).toBeGreaterThan(0);
    });

    // The main <main> contains the global podium. Find it and assert pinned candidate is there at 100%.
    const mainPodium = document.querySelector('main') as HTMLElement;
    expect(mainPodium).not.toBeNull();
    expect(within(mainPodium).getAllByText(pinnedCandidate.pseudo).length).toBeGreaterThan(0);
    expect(within(mainPodium).getByText('100%')).toBeInTheDocument();
  });

  it('renders every candidate and locks their global percentages via snapshot', async () => {
    setupResult();

    renderWithRouter(<Result />, { path: '/result' });

    // Wait for candidates list to be populated (main podium has multiple pseudos).
    await waitFor(() => {
      const mainPodium = document.querySelector('main') as HTMLElement;
      expect(within(mainPodium).getAllByRole('link').length).toBeGreaterThan(1);
    });

    // Every candidate appears at least once in the page (main podium and/or filter list).
    for (const c of allTestCandidates) {
      const occurrences = screen.getAllByText(c.pseudo);
      expect(occurrences.length, `${c.pseudo} should be rendered somewhere`).toBeGreaterThan(0);
    }

    // Compute the expected podium percentages with the same algorithm the UI uses.
    // Snapshot makes any change to questions/scores/candidate-answers an explicit acknowledgement.
    const scored = getCandidatesScorePerThemes(
      pinnedUserAnswers as unknown as Parameters<typeof getCandidatesScorePerThemes>[0],
      allTestCandidates as unknown as Parameters<typeof getCandidatesScorePerThemes>[1],
      quizzQuestions as unknown as Parameters<typeof getCandidatesScorePerThemes>[2],
    );
    const podium = getPodium(scored);
    const expectedRanking = podium.map((step) => ({
      pseudos: [...step.pseudos].sort(),
      percent: step.percent,
    }));

    expect(expectedRanking).toMatchSnapshot();

    // Sanity: the pinned candidate is the top with 100%.
    expect(expectedRanking[0].pseudos).toContain(pinnedCandidate.pseudo);
    expect(expectedRanking[0].percent).toBe(100);
  });

  it('renders one per-theme podium for each answered theme', async () => {
    setupResult();

    renderWithRouter(<Result />, { path: '/result' });

    await waitFor(() => {
      expect(screen.getAllByText(pinnedCandidate.pseudo).length).toBeGreaterThan(0);
    });

    // Each themed podium uses the theme name as its <h3> title — see Podium.tsx.
    const answeredThemeIds = Array.from(new Set(pinnedUserAnswers.map((a) => a.themeId)));
    for (const themeId of answeredThemeIds) {
      const themeName = quizz.find((t) => t._id === themeId)?.fr;
      if (!themeName) continue;
      const headings = screen.getAllByRole('heading', { name: themeName });
      // Each answered theme gets a podium with its name as a heading.
      expect(headings.length, `Missing podium for theme "${themeName}"`).toBeGreaterThan(0);
    }
  });
});

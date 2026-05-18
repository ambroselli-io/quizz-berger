import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import Home from '@app/routes/Home';
import { renderWithRouter } from '@app/test/renderWithRouter';
import { mockApi } from '@app/test/mockApi';
import { slimOnboardingPodium, slimOnboardingUser, pinnedCandidate } from '@app/test/fixtures';
import { quizz, quizzQuestions } from '@app/utils/quizz';

describe('Home', () => {
  beforeEach(() => {
    // Stabilise the random theme ordering so assertions are deterministic.
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  it('renders the hero, podium, stats, and explorer with the expected dynamic counts', async () => {
    mockApi({
      GET: {
        '/answer/random/for-onboarding': { ok: true, data: slimOnboardingPodium, user: slimOnboardingUser },
        '/public/count': { ok: true, data: { countUsers: 100, countAnswers: 1000 } },
      },
    });

    renderWithRouter(<Home />);

    // Hero
    expect(screen.getByRole('heading', { level: 1, name: /qui est mon candidat\s+idéal/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /répondre au quizz/i })).toBeInTheDocument();
    expect(screen.getByText(/Répondez de façon/)).toBeInTheDocument();

    // "Comment ça marche ?"
    expect(screen.getByRole('heading', { level: 2, name: /comment ça marche/i })).toBeInTheDocument();

    // Themes summary line — derived from data, must update if quizz changes
    expect(screen.getByText(new RegExp(`${quizz.length}\\s+thèmes`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${quizzQuestions.length}\\s+questions`))).toBeInTheDocument();

    // Podium fed by the onboarding API
    await waitFor(() =>
      expect(screen.getByText(`Exemple: ${pinnedCandidate.pseudo}`)).toBeInTheDocument(),
    );
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();

    // Stats — counts are baseline + API-returned delta, formatted in French
    const expectedUsers = new Intl.NumberFormat('fr').format(207569 + 100);
    const expectedAnswers = new Intl.NumberFormat('fr').format(9721827 + 1000);
    await waitFor(() => {
      expect(document.body.textContent).toContain(expectedUsers);
      expect(document.body.textContent).toContain(expectedAnswers);
    });

    // Explorer section — at least one candidate link, one theme link, one comparer link
    const explorer = screen.getByRole('heading', { level: 2, name: /explorer la présidentielle 2027/i });
    expect(explorer).toBeInTheDocument();
    const explorerSection = explorer.closest('section') as HTMLElement;
    // At least one candidate chip
    expect(within(explorerSection).getAllByRole('link').length).toBeGreaterThan(5);
  });

  it('still renders without the onboarding podium if the API returns empty data', async () => {
    mockApi({
      GET: {
        '/answer/random/for-onboarding': { ok: true, data: [], user: null },
        '/public/count': { ok: false },
      },
    });

    renderWithRouter(<Home />);

    expect(screen.getByRole('heading', { level: 1, name: /qui est mon candidat\s+idéal/i })).toBeInTheDocument();
    // No "Exemple:" title since onboarding user is null
    await waitFor(() => {
      expect(screen.queryByText(/^Exemple:/)).not.toBeInTheDocument();
    });
  });
});

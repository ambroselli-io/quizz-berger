import { describe, it, expect } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import Themes from '@app/routes/Themes';
import { renderWithRouter } from '@app/test/renderWithRouter';
import { mockApi } from '@app/test/mockApi';
import { pinnedUserAnswers } from '@app/test/fixtures';
import { quizz } from '@app/utils/quizz';

const HIDDEN_THEME_ID = 'theme-6211242a3f15af68d035215d';

describe('Themes (/themes)', () => {
  it('renders every visible theme button with its question count and progress', async () => {
    mockApi({
      POST: { '/user/me': { ok: false } },
      GET: { '/answer': { ok: true, data: pinnedUserAnswers } },
    });

    renderWithRouter(<Themes />, { path: '/themes' });

    // Wait for the user answers to load so progress bars get populated.
    await waitFor(() => {
      const someButton = document.querySelector('button[data-themeid]');
      expect(someButton).not.toBeNull();
    });

    const visibleThemes = quizz.filter((t) => t._id !== HIDDEN_THEME_ID);

    for (const theme of visibleThemes) {
      const btn = document.querySelector(`button[data-themeid="${theme._id}"]`) as HTMLElement | null;
      expect(btn, `Theme button missing for ${theme._id}`).not.toBeNull();
      expect(btn!).toHaveTextContent(theme.fr);

      const answeredCount = pinnedUserAnswers.filter((a) => a.themeId === theme._id).length;
      const total = theme.questions.length;
      // Format used by ThemeButton.tsx:
      //   progress ? `${answered} / ${total}` : `${total} questions`
      const expected = answeredCount > 0 ? `${answeredCount} / ${total}` : `${total} questions`;
      expect(within(btn!).getByText(expected)).toBeInTheDocument();
    }
  });

  it('locks the visible theme list + per-theme question counts via snapshot', async () => {
    // This snapshot is the regression guard: any change to themes or per-theme
    // question counts in quizz-2027.json forces an explicit `vitest -u`.
    mockApi({
      POST: { '/user/me': { ok: false } },
      GET: { '/answer': { ok: true, data: [] } },
    });

    renderWithRouter(<Themes />, { path: '/themes' });

    await waitFor(() => {
      expect(document.querySelectorAll('button[data-themeid]').length).toBeGreaterThan(0);
    });

    const themeSummary = quizz
      .filter((t) => t._id !== HIDDEN_THEME_ID)
      .map((t) => ({ id: t._id, fr: t.fr, questionCount: t.questions.length }))
      .sort((a, b) => a.id.localeCompare(b.id));

    expect(themeSummary).toMatchSnapshot();

    // Also assert the button is disabled when no answers are present.
    const resultsBtn = screen.getByRole('button', { name: /choisissez votre 1/i });
    expect(resultsBtn).toBeDisabled();
  });
});

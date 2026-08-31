import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import PourQuiVoterPage from '@app/pages/PourQuiVoterPage';
import { renderWithRouter } from '@app/test/renderWithRouter';
import { candidatesCount, themeSlugMap } from '@app/utils/seo';
import { quizzQuestionsCount } from '@app/utils/quizz';

describe('Pour qui voter (/pour-qui-voter-2027)', () => {
  it('answers the question with the live counts and links every theme', async () => {
    renderWithRouter(<PourQuiVoterPage />, { path: '/pour-qui-voter-2027' });

    expect(
      await screen.findByRole('heading', { level: 1, name: /pour qui voter en 2027/i }),
    ).toBeInTheDocument();

    const shortAnswer = screen.getByText(/Réponse courte/i).closest('p');
    expect(shortAnswer).toHaveTextContent(`${quizzQuestionsCount} questions`);
    expect(shortAnswer).toHaveTextContent(`${candidatesCount} candidats`);

    for (const theme of themeSlugMap) {
      expect(screen.getByRole('link', { name: theme.fr })).toHaveAttribute('href', `/theme/${theme.slug}`);
    }

    expect(screen.getAllByRole('link', { name: /faire le test/i })[0]).toHaveAttribute('href', '/themes');
  });
});

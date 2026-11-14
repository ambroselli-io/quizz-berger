import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import Home from '@app/pages/Home';
import { renderWithRouter } from '@app/test/renderWithRouter';
import { mockApi } from '@app/test/mockApi';
import { quizz, quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import { quickQuizzCount, quickQuizzFirstQuestion } from '@app/utils/quick-quizz';
import { homeFaq } from '@app/utils/seo-light';
import { temoignages } from '@app/utils/temoignages';
import { chatModes } from '@app/content/chat-modes';

const navigateSpy = vi.hoisted(() => vi.fn());
vi.mock('@app/lib/router', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@app/lib/router')>()),
  useNavigate: () => navigateSpy,
}));

const quickCta = new RegExp(`Test rapide\\s:\\s${quickQuizzCount} questions, 3\\s+minutes`);
const trustLine = 'Gratuit, sans inscription, sans publicité. Vos réponses restent anonymes.';

const inlineQuestionSection = async () =>
  (await screen.findByRole('heading', { level: 2, name: quickQuizzFirstQuestion!.question.fr })).closest('section') as HTMLElement;

describe('Home', () => {
  beforeEach(() => {
    navigateSpy.mockClear();
  });

  it('renders the hero, the testimonials, the inline question, the AI modes, the video, the FAQ and the explorer', async () => {
    const { getSpy } = mockApi({});

    renderWithRouter(<Home />);

    // Hero: exactly one h1, the quick test first, the full test second
    const h1s = await screen.findAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/Quel candidat pense comme\s+vous\s+\?/);
    const quickLinks = screen.getAllByRole('link', { name: quickCta });
    expect(quickLinks).toHaveLength(2);
    for (const link of quickLinks) expect(link).toHaveAttribute('href', '/quiz-rapide');
    expect(
      screen.getByRole('link', {
        name: new RegExp(`Ou le test complet\\s:\\s${quizzQuestionsCount} questions sur ${quizzThemesCount} thèmes`),
      }),
    ).toHaveAttribute('href', '/themes');
    expect(screen.getAllByText(trustLine)).toHaveLength(2);
    expect(screen.getByRole('link', { name: /Connecte/ })).toHaveAttribute('href', '/login');
    expect(screen.queryByText(/Pas vous/)).not.toBeInTheDocument();

    // One real question under its theme banner, answered with buttons (never links: a click records an answer)
    const inline = await inlineQuestionSection();
    const theme = quizz.find((t) => t._id === quickQuizzFirstQuestion!.themeId)!;
    expect(within(inline).getByText(theme.fr)).toBeInTheDocument();
    const answerButtons = within(inline).getAllByRole('button');
    expect(answerButtons.map((b) => b.textContent)).toEqual(quickQuizzFirstQuestion!.question.answers);
    expect(within(inline).queryAllByRole('link')).toHaveLength(0);
    expect(screen.queryByText(/plutôt d'accord/)).not.toBeInTheDocument();

    // The AI modes, each linking to its own page
    const ai = screen.getByRole('heading', { level: 2, name: "Discuter avec l'IA" }).closest('section') as HTMLElement;
    for (const chatMode of chatModes) {
      expect(within(ai).getByRole('link', { name: new RegExp(chatMode.title) })).toHaveAttribute('href', `/ia/${chatMode.slug}`);
    }

    // "Comment ça marche ?": the video only, never autoplaying
    const howItWorks = screen.getByRole('heading', { level: 2, name: /comment ça marche/i }).closest('section') as HTMLElement;
    const video = howItWorks.querySelector('iframe') as HTMLIFrameElement;
    expect(video.getAttribute('src')).not.toMatch(/autoplay/);
    expect(video.getAttribute('allow')).not.toMatch(/autoplay/);
    expect(within(howItWorks).queryAllByRole('heading', { level: 3 })).toHaveLength(0);
    expect(within(howItWorks).queryAllByRole('button')).toHaveLength(0);

    // Where the candidates' answers come from
    const sources = screen
      .getByRole('heading', { level: 2, name: /D'où viennent les réponses des candidats/ })
      .closest('section') as HTMLElement;
    expect(within(sources).getByRole('link', { name: 'Nous écrire' })).toHaveAttribute('href', '/contact');

    // Nothing on the page waits for the API: no stats, no example podium
    expect(getSpy).not.toHaveBeenCalled();
    expect(screen.queryByText(/quizz effectués/)).not.toBeInTheDocument();

    // "Pour qui voter en 2027 ?" — the FAQ shown is the one serialised as FAQPage JSON-LD
    const pourQuiVoter = screen.getByRole('heading', { level: 2, name: /pour qui voter en 2027/i });
    const pourQuiVoterSection = pourQuiVoter.closest('section') as HTMLElement;
    for (const entry of homeFaq) {
      expect(within(pourQuiVoterSection).getByRole('heading', { level: 4, name: entry.question })).toBeInTheDocument();
    }
    const aboutLinks = within(pourQuiVoterSection).getAllByRole('link', { name: 'Qui sommes-nous' });
    expect(aboutLinks.length).toBeGreaterThan(0);
    for (const link of aboutLinks) expect(link).toHaveAttribute('href', '/qui-sommes-nous');
    expect(within(pourQuiVoterSection).queryByText(/voter utile/)).not.toBeInTheDocument();

    // Explorer section, after the FAQ
    const explorer = screen.getByRole('heading', { level: 2, name: /explorer la présidentielle 2027/i });
    expect(pourQuiVoter.compareDocumentPosition(explorer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const explorerSection = explorer.closest('section') as HTMLElement;
    expect(within(explorerSection).getAllByRole('link').length).toBeGreaterThan(5);

    // Testimonials and the final call to action
    const testimonials = screen.getByRole('heading', { level: 2, name: 'Ils ont apprécié' });
    expect(testimonials.compareDocumentPosition(inline) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(inline.compareDocumentPosition(ai) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(ai.compareDocumentPosition(howItWorks) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect((testimonials.closest('section') as HTMLElement).querySelectorAll('figure')).toHaveLength(temoignages.length);
    expect(screen.queryByText(/JE T'AIME/)).not.toBeInTheDocument();
    const firstCard = (testimonials.closest('section') as HTMLElement).querySelector('figure') as HTMLElement;
    expect(within(firstCard).getByText(temoignages[0].figcaption)).toBeInTheDocument();
    expect(within(firstCard).getByText('novembre 2026')).toBeInTheDocument();
    const finalCta = screen.getByRole('heading', { level: 2, name: 'Faire le test' }).closest('section') as HTMLElement;
    expect(within(finalCta).getByRole('link', { name: quickCta })).toHaveAttribute('href', '/quiz-rapide');
  });

  it('sends a click on an inline answer to the quick test, carrying the answer index', async () => {
    mockApi({});

    renderWithRouter(<Home />);

    fireEvent.click(within(await inlineQuestionSection()).getAllByRole('button')[2]);
    expect(navigateSpy).toHaveBeenCalledWith({ to: '/quiz-rapide', search: { reponse: 2 } });
  });

  it('never renders an empty heading', async () => {
    mockApi({});

    renderWithRouter(<Home />);

    expect(await screen.findAllByRole('heading', { level: 1 })).toHaveLength(1);
    for (const heading of screen.getAllByRole('heading')) {
      expect(heading.textContent?.trim()).not.toBe('');
    }
  });
});

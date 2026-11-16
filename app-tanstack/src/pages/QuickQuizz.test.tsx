import { describe, it, expect, beforeEach } from 'vitest';
import { waitFor } from '@testing-library/react';
import QuickQuizz from '@app/pages/QuickQuizz';
import { renderWithRouter } from '@app/test/renderWithRouter';
import { mockApi } from '@app/test/mockApi';
import useUserStore from '@app/zustand/user';
import { quickQuizzFirstQuestion } from '@app/utils/quick-quizz';

const first = quickQuizzFirstQuestion!;
const answerPosts = (postSpy: ReturnType<typeof mockApi>['postSpy']) =>
  postSpy.mock.calls.map(([args]) => args).filter((args) => args?.path === '/answer');

describe('QuickQuizz (/quiz-rapide)', () => {
  beforeEach(() => {
    useUserStore.getState().setUser(null);
  });

  it('records the answer picked on the home page before handing over', async () => {
    const { postSpy } = mockApi({
      POST: {
        '/user/me': { ok: true, user: { _id: 'u1' } },
        '/answer': { ok: true, data: { themeId: first.themeId, questionId: first.question._id, answerIndex: 2 } },
      },
      GET: { '/answer': { ok: true, data: [] } },
    });

    renderWithRouter(<QuickQuizz />, { path: '/quiz-rapide?reponse=2' });

    await waitFor(() => expect(answerPosts(postSpy)).toHaveLength(1));
    expect(answerPosts(postSpy)[0]?.body).toEqual({
      userId: 'u1',
      themeId: first.themeId,
      questionId: first.question._id,
      answerIndex: 2,
      isImportant: false,
    });
  });

  it('replaces an existing answer and keeps its "important" flag', async () => {
    const { postSpy } = mockApi({
      POST: { '/user/me': { ok: true, user: { _id: 'u1' } }, '/answer': { ok: true, data: {} } },
      GET: {
        '/answer': {
          ok: true,
          data: [{ themeId: first.themeId, questionId: first.question._id, answerIndex: 0, isImportant: true }],
        },
      },
    });

    renderWithRouter(<QuickQuizz />, { path: '/quiz-rapide?reponse=1' });

    await waitFor(() => expect(answerPosts(postSpy)).toHaveLength(1));
    expect(answerPosts(postSpy)[0]?.body).not.toHaveProperty('isImportant');
    expect(answerPosts(postSpy)[0]?.body).toMatchObject({ answerIndex: 1 });
  });

  it.each(['/quiz-rapide', `/quiz-rapide?reponse=${first.question.answers.length}`, '/quiz-rapide?reponse=abc'])(
    'records nothing for %s',
    async (path) => {
      const { getSpy, postSpy } = mockApi({
        POST: { '/user/me': { ok: true, user: { _id: 'u1' } } },
        GET: { '/answer': { ok: true, data: [] } },
      });

      renderWithRouter(<QuickQuizz />, { path });

      await waitFor(() => expect(getSpy.mock.calls.some(([args]) => args?.path === '/answer')).toBe(true));
      await new Promise((resolve) => setTimeout(resolve, 20));
      expect(answerPosts(postSpy)).toHaveLength(0);
    },
  );
});

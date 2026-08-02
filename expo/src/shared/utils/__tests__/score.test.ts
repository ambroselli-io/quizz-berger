import { getCandidatesScorePerThemes } from '~/shared/utils/score';
import { getPodium } from '~/shared/utils/podium';
import { flattenQuestions } from '~/utils/quizz';
import bundledQuizz from '~/shared/quizz-2027.json';
import candidatesAnswers from '~/shared/candidates-answers.json';
import type { Answer, CandidateAnswer, QuizzTheme } from '~/types/quizz';

const themes = bundledQuizz as QuizzTheme[];
const quizzQuestions = flattenQuestions(themes);
const candidates = candidatesAnswers as unknown as CandidateAnswer[];

const answersOf = (pseudo: string): Answer[] => {
  const candidate = candidates.find((c) => c.pseudo === pseudo);
  if (!candidate) throw new Error(`unknown candidate ${pseudo}`);
  return candidate.answers.map((answer) => ({ ...answer }));
};

describe('getCandidatesScorePerThemes', () => {
  it('gives a candidate 100% against their own answers', () => {
    const pseudo = candidates[0].pseudo;
    const scores = getCandidatesScorePerThemes(answersOf(pseudo), candidates, quizzQuestions);
    const self = scores.find((c) => c.pseudo === pseudo)!;

    expect(Math.round((self.total / self.totalMax) * 100)).toBe(100);
  });

  it('ranks the candidate you agree with first', () => {
    const pseudo = candidates[0].pseudo;
    const scores = getCandidatesScorePerThemes(answersOf(pseudo), candidates, quizzQuestions);

    expect(scores[0].pseudo).toBe(pseudo);
  });

  it('scores every candidate, sorted by descending total', () => {
    const scores = getCandidatesScorePerThemes(answersOf(candidates[0].pseudo), candidates, quizzQuestions);

    expect(scores).toHaveLength(candidates.length);
    const totals = scores.map((c) => c.total);
    expect([...totals].sort((a, b) => b - a)).toEqual(totals);
  });

  it('never awards more than 5 points per answered question', () => {
    const answers = answersOf(candidates[0].pseudo);
    const scores = getCandidatesScorePerThemes(answers, candidates, quizzQuestions);

    for (const candidate of scores) {
      for (const theme of candidate.scorePerThemes) {
        expect(theme.score).toBeLessThanOrEqual(theme.max);
        expect(theme.percent).toBeGreaterThanOrEqual(0);
        expect(theme.percent).toBeLessThanOrEqual(100);
      }
    }
  });

  it('only scores the themes the user answered', () => {
    const themeId = themes.find((theme) => theme.questions.length)!._id;
    const answers = answersOf(candidates[0].pseudo).filter((a) => a.themeId === themeId);
    const scores = getCandidatesScorePerThemes(answers, candidates, quizzQuestions);

    expect(scores[0].scorePerThemes.map((t) => t.themeId)).toEqual([themeId]);
  });

  it('ignores answers to questions that no longer exist', () => {
    const answers = [
      ...answersOf(candidates[0].pseudo),
      { themeId: 'theme-gone', questionId: 'question-gone', answerIndex: 0 },
    ];
    const scores = getCandidatesScorePerThemes(answers, candidates, quizzQuestions);
    const self = scores.find((c) => c.pseudo === candidates[0].pseudo)!;

    expect(self.scorePerThemes.find((t) => t.themeId === 'theme-gone')?.score).toBe(0);
    expect(scores[0].pseudo).toBe(candidates[0].pseudo);
  });
});

describe('getPodium', () => {
  it('puts the highest percentage on the first step', () => {
    const scores = getCandidatesScorePerThemes(answersOf(candidates[0].pseudo), candidates, quizzQuestions);
    const podium = getPodium(scores);

    expect(podium[0].percent).toBe(100);
    expect(podium[0].pseudos).toContain(candidates[0].pseudo);
  });

  it('groups people who share the same total onto one step', () => {
    const podium = getPodium([
      { id: 'a', pseudo: 'Alice', picture: 'a.png', color: '#000', total: 10, totalMax: 20 },
      { id: 'b', pseudo: 'Bob', picture: 'b.png', color: '#111', total: 10, totalMax: 20 },
      { id: 'c', pseudo: 'Carol', picture: 'c.png', color: '#222', total: 20, totalMax: 20 },
    ]);

    expect(podium).toHaveLength(2);
    expect(podium[0].pseudos).toEqual(['Carol']);
    expect(podium[1].pseudos).toEqual(['Alice', 'Bob']);
  });

  it('does not divide by zero when nobody has answered', () => {
    const podium = getPodium([
      { id: 'a', pseudo: 'Alice', picture: 'a.png', color: '#000', total: 0, totalMax: 0 },
    ]);

    expect(podium[0].percent).toBe(0);
    expect(podium[0].height).toBe(0);
  });
});

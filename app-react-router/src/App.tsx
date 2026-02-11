import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import * as Sentry from '@sentry/react';
import Header from './components/Header';
import Home from './routes/Home';
import Login from './routes/Login';
import Themes from './routes/Themes';
import Question from './routes/Question';
import ResultIndex from './routes/ResultIndex';
import Result from './routes/Result';
import AllQuestions from './routes/AllQuestions';
import Stats from './routes/Stats';
import Communique from './routes/Communique';
import ThemePage from './routes/ThemePage';
import CandidatePage from './routes/CandidatePage';
import QuestionPolitiquePage from './routes/QuestionPolitiquePage';
import ComparaisonPage from './routes/ComparaisonPage';
import BlogIndex from './routes/BlogIndex';
import BlogArticle from './routes/BlogArticle';
import useCanonical from './hooks/useCanonical';

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

function App() {
  const { pathname } = useLocation();
  useCanonical();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex h-full flex-col bg-white">
      <Header />
      <main className="box-border flex grow flex-col">
        <SentryRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/question/:themeId/:questionId" element={<Question />} />
          <Route path="/result" element={<ResultIndex />} />
          <Route path="/result/:userPseudo" element={<Result />} />
          <Route path="/all-questions" element={<AllQuestions />} />
          <Route path="/all-questions/:candidatePseudo" element={<AllQuestions />} />
          {import.meta.env.DEV && <Route path="/stats" element={<Stats />} />}
          <Route path="/communique/2022-03-26" element={<Communique />} />
          <Route path="/theme/:themeSlug" element={<ThemePage />} />
          <Route path="/candidat/:candidateSlug" element={<CandidatePage />} />
          <Route path="/question-politique/:questionSlug" element={<QuestionPolitiquePage />} />
          <Route path="/comparer/:pairSlug" element={<ComparaisonPage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
        </SentryRoutes>
      </main>
    </div>
  );
}

export default App;

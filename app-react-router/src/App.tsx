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

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

function App() {
  const { pathname } = useLocation();

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
        </SentryRoutes>
      </main>
    </div>
  );
}

export default App;

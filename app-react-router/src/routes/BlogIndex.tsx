import { Link } from 'react-router';
import Footer from '@app/components/Footer';
import { articles } from '@app/content/articles';

export default function BlogIndex() {
  return (
    <>
      <title>Blog — Le Quizz du Berger | Présidentielle 2027</title>
      <meta name="description" content="Articles sur l'élection présidentielle 2027 : candidats, programmes, thèmes politiques, comparatifs et analyses." />

      <div className="flex flex-col items-center bg-white">
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 font-[Merriweather] text-3xl font-bold">Blog — Présidentielle 2027</h1>
            <p className="text-lg text-white/80">
              Analyses, positions des candidats et décryptages pour l'élection présidentielle 2027.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group rounded-lg border border-gray-200 p-6 no-underline transition hover:shadow-md"
              >
                {article.tag && (
                  <span className="mb-2 inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    {article.tag}
                  </span>
                )}
                <h2 className="mb-2 text-lg font-bold text-quizz-dark group-hover:text-blue-700">
                  {article.title}
                </h2>
                <p className="text-sm leading-relaxed text-gray-600">{article.excerpt}</p>
                <p className="mt-3 text-xs text-gray-400">{article.date}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">Trouvez votre candidat idéal</h2>
          <p className="mb-8 text-white/80">21 thèmes, 119 questions, 24 candidats.</p>
          <Link
            to="/themes"
            className="inline-block rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black no-underline hover:bg-yellow-300"
          >
            Faire le quiz
          </Link>
        </section>

        <Footer />
      </div>
    </>
  );
}

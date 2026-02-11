import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import Footer from '@app/components/Footer';
import { articles } from '@app/content/articles';

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = useMemo(() => articles.find((a) => a.slug === slug), [slug]);

  if (!article) return <Navigate to="/blog" replace />;

  return (
    <>
      <title>{`${article.title} | Le Quizz du Berger`}</title>
      <meta name="description" content={article.excerpt} />
      {article.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article.schema) }} />
      )}

      <div className="flex flex-col items-center bg-white">
        <section className="w-full bg-quizz-dark px-5 py-16 text-white">
          <div className="mx-auto max-w-3xl">
            <Link to="/blog" className="mb-4 inline-block text-sm text-yellow-400 no-underline hover:underline">
              ← Blog
            </Link>
            <h1 className="mb-4 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              {article.title}
            </h1>
            <p className="text-sm text-white/60">{article.date}</p>
          </div>
        </section>

        <article className="mx-auto w-full max-w-3xl px-5 py-12 [&_a]:text-blue-600 [&_a]:underline [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-[Merriweather] [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-quizz-dark [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-quizz-dark [&_li]:mb-2 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-6 [&_p]:leading-relaxed [&_p]:text-gray-700 [&_strong]:text-quizz-dark [&_table]:mb-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-200 [&_td]:p-3 [&_td]:text-sm [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:p-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

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

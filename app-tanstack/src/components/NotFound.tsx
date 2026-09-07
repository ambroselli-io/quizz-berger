import { useLocation } from '@app/lib/router';

export default function NotFound() {
  const location = useLocation();
  return (
    <main role="main" id="content">
      <div className="mx-auto max-w-2xl px-5 py-16">
        <h1 className="mb-4 font-[Merriweather] text-3xl font-bold text-quizz-dark">Page non trouvée</h1>
        <p className="mb-2 text-lg text-gray-600">Erreur 404</p>
        <p className="mb-6 leading-relaxed text-gray-700">
          La page <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">{location.pathname}</code> est
          introuvable. Elle a peut-être été déplacée ou supprimée.
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          <a
            href="/"
            className="rounded-full bg-quizz-dark px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-gray-800"
          >
            Page d'accueil
          </a>
          <a
            href="/contact"
            className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-quizz-dark no-underline hover:bg-gray-50"
          >
            Nous contacter
          </a>
        </div>

        <nav aria-label="Plan du site">
          <h2 className="mb-3 font-[Merriweather] text-lg font-bold text-quizz-dark">Où chercher</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700 [&_a]:text-blue-700 [&_a]:underline">
            <li><a href="/themes">Répondre au quizz</a> — choisir un thème et commencer</li>
            <li><a href="/candidats">Tous les candidats</a> — les 37 candidats et leurs positions</li>
            <li><a href="/sujets">Sujets brûlants</a> — les questions d'actualité</li>
            <li><a href="/comparer">Comparer deux candidats</a> — accords et désaccords</li>
            <li><a href="/blog">Blog</a> — articles d'analyse politique</li>
            <li><a href="/qui-sommes-nous">Qui sommes-nous</a> — méthode et auteurs</li>
            <li><a href="/sitemap.xml">Plan du site (XML)</a></li>
            <li><a href="/llms.txt">llms.txt</a> — index structuré pour agents IA</li>
          </ul>
        </nav>
      </div>
    </main>
  );
}

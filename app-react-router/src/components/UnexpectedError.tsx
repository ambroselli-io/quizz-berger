import { useLocation } from 'react-router';

export default function UnexpectedError({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  const location = useLocation();
  return (
    <main role="main" id="content">
      <div className="container mx-auto px-4">
        <div className="my-12 md:my-16 grid place-items-center">
          <div className="py-0 w-full md:w-1/2">
            <h1 className="text-4xl font-bold">Erreur inattendue</h1>
            <p className="text-sm font-bold mb-3">Erreur 500</p>
            <p className="text-sm mb-5">
              Désolé, le service rencontre un problème, nous travaillons pour le résoudre le plus rapidement
              possible.
            </p>
            <p className="text-xl mb-3">Essayez de rafraîchir la page ou bien ressayez plus tard.</p>
            <ul className="flex flex-col md:flex-row gap-4">
              <li>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700"
                  onClick={resetErrorBoundary}
                >
                  Page d'accueil
                </button>
              </li>
              <li>
                <a
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-sm hover:bg-blue-50 inline-block"
                  href={`mailto:arnaud@ambroselli.io?subject=Erreur 500&body=Bonjour, je rencontre une erreur 500 sur la page suivante : ${location.pathname}`}
                >
                  Contactez-nous
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

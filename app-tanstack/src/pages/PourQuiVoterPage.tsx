import { Link } from '@app/lib/router';
import { candidatesCount, themeSlugMap } from '@app/utils/seo';
import { quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import { declaredCount, withdrawnCount } from '@app/utils/candidacies';
import Footer from '@app/components/Footer';

export default function PourQuiVoterPage() {
  return (
    <>
      <div className="flex flex-col items-center bg-white">
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              Pour qui voter en 2027&nbsp;?
            </h1>
            <p className="text-lg leading-relaxed text-white/80">
              Personne ne peut répondre à votre place. Mais un test politique peut vous dire lequel
              des {candidatesCount} candidats à la présidentielle 2027 pense comme vous, sujet par
              sujet, à partir de vos propres réponses.
            </p>
            <Link
              to="/themes"
              className="mt-8 inline-block rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black no-underline hover:bg-yellow-300"
            >
              Faire le test
            </Link>
            <p className="mt-4 text-sm text-white/60">
              Gratuit, sans inscription, {quizzQuestionsCount} questions sur {quizzThemesCount} thèmes
            </p>
          </div>
        </section>

        <article className="mx-auto w-full max-w-3xl px-5 py-12 leading-relaxed text-quizz-dark">
          <p className="mb-8 text-lg">
            <strong>Réponse courte&nbsp;:</strong> pour savoir pour qui voter à la présidentielle
            2027, comparez vos idées aux positions des candidats plutôt que leurs slogans. Le Quizz
            du Berger pose {quizzQuestionsCount} questions concrètes sur {quizzThemesCount} thèmes,
            avec 3 à 6 réponses possibles par question. Vous répondez à celles qui vous intéressent,
            l'algorithme classe les {candidatesCount} candidats du plus proche au plus éloigné de
            vos réponses. Le résultat est donné globalement et thème par thème.
          </p>

          <h2 className="mb-4 mt-10 font-[Merriweather] text-2xl font-bold">
            Comment le test vous aide à choisir
          </h2>
          <ol className="mb-8 list-decimal space-y-3 pl-6">
            <li>
              <strong>Vous répondez aux questions que vous voulez.</strong> Retraites, santé, sécurité,
              immigration, écologie, Europe, impôts : {quizzThemesCount} thèmes, dans l'ordre qui vous
              plaît. Cinq questions suffisent pour un premier classement, {quizzQuestionsCount} pour
              un résultat précis.
            </li>
            <li>
              <strong>Chaque réponse est comparée à celle de chaque candidat.</strong> Une réponse
              identique vaut 5 points, une réponse proche 2 à 4 points, une réponse opposée 0.
              Les réponses des candidats viennent de leurs programmes, de leurs déclarations et de
              leurs votes.
            </li>
            <li>
              <strong>Vous lisez le classement thème par thème.</strong> Un candidat peut être votre
              premier choix sur l'économie et le dernier sur l'immigration. C'est là que le test
              devient utile : il montre les accords que vous ne soupçonniez pas.
            </li>
          </ol>

          <h2 className="mb-4 mt-10 font-[Merriweather] text-2xl font-bold">
            Qui sont les candidats en 2027&nbsp;?
          </h2>
          <p className="mb-4">
            À ce jour, {declaredCount} personnes ont déclaré leur candidature et {withdrawnCount} y
            ont renoncé. Le test compare vos réponses à {candidatesCount} candidats, déclarés ou
            pressentis. Ceux qui ont abandonné restent dans le classement avec une mention, parce
            que se comparer à eux reste instructif.
          </p>
          <ul className="mb-8 list-disc space-y-2 pl-6">
            <li>
              <Link to="/qui-est-candidat-2027">Qui est candidat en 2027 ?</Link> : la liste à jour,
              avec les dates et les sources.
            </li>
            <li>
              <Link to="/candidats">Tous les candidats</Link> : les positions de chacun sur les{' '}
              {quizzThemesCount} thèmes.
            </li>
            <li>
              <Link to="/sondages-presidentielle-2027">Les sondages</Link> : les moyennes mensuelles
              du premier tour.
            </li>
          </ul>

          <h2 className="mb-4 mt-10 font-[Merriweather] text-2xl font-bold">
            Voter pour un programme ou voter utile&nbsp;?
          </h2>
          <p className="mb-4">
            Les deux questions sont différentes et le test ne tranche que la première : quel candidat
            défend les positions les plus proches des vôtres. Le vote utile dépend des sondages et de
            la configuration du second tour, qui bougent jusqu'au dernier jour. Beaucoup d'électeurs
            font les deux : ils identifient d'abord leur candidat le plus proche, puis regardent les
            sondages pour décider. Commencer par le fond évite de voter contre quelqu'un sans savoir
            pour quoi on vote.
          </p>
          <p className="mb-8">
            Pour comparer directement deux candidats, question par question, utilisez le{' '}
            <Link to="/comparer">comparateur de candidats</Link>. Pour voir toutes les positions sur
            un même sujet, le <Link to="/comparateur-programmes-2027">comparateur de programmes</Link>.
          </p>

          <h2 className="mb-4 mt-10 font-[Merriweather] text-2xl font-bold">
            Les {quizzThemesCount} thèmes du test
          </h2>
          <ul className="mb-8 flex flex-wrap gap-2">
            {themeSlugMap.map((theme) => (
              <li key={theme.themeId}>
                <Link
                  to={`/theme/${theme.slug}`}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-quizz-dark no-underline hover:bg-gray-50"
                >
                  {theme.fr}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mb-4 mt-10 font-[Merriweather] text-2xl font-bold">Questions fréquentes</h2>
          <h3 className="mb-2 mt-6 font-bold">Le test est-il gratuit&nbsp;?</h3>
          <p className="mb-4">
            Oui, gratuit et sans inscription. Le code est open-source. Créer un pseudo est facultatif
            et sert seulement à retrouver vos résultats ou à les comparer avec ceux de vos amis.
          </p>
          <h3 className="mb-2 mt-6 font-bold">Combien de temps prend le test&nbsp;?</h3>
          <p className="mb-4">
            Cinq minutes pour un premier classement sur un ou deux thèmes. Comptez trente à quarante
            minutes pour répondre aux {quizzQuestionsCount} questions.
          </p>
          <h3 className="mb-2 mt-6 font-bold">Les candidats ont-ils répondu eux-mêmes&nbsp;?</h3>
          <p className="mb-4">
            Non. Leurs réponses sont établies à partir de leurs programmes officiels, de leurs
            déclarations publiques et de leurs votes. Chaque page candidat détaille ses réponses,
            question par question, pour que vous puissiez les vérifier.
          </p>
          <h3 className="mb-2 mt-6 font-bold">Le test est-il neutre&nbsp;?</h3>
          <p className="mb-8">
            Chaque question propose plusieurs réponses concrètes, chacune étant une position
            défendue par au moins un candidat, plutôt qu'un pour ou contre. Le test ne classe pas les
            candidats sur un axe gauche-droite et ne recommande personne : il calcule une distance
            entre vos réponses et les leurs. La méthode est décrite sur la page{' '}
            <Link to="/qui-sommes-nous">Qui sommes-nous</Link>.
          </p>

          <div className="mt-10 text-center">
            <Link
              to="/themes"
              className="inline-block rounded-full bg-quizz-dark px-8 py-3 font-semibold text-white no-underline hover:bg-black"
            >
              Faire le test politique 2027
            </Link>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}

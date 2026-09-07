import { Link } from '@app/lib/router';
import { quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import { candidatesCount } from '@app/utils/seo';

export default function QuiSommesNous() {
  return (
    <div className="flex flex-col items-center justify-center overflow-y-scroll bg-white px-2.5 py-10">
      <main className="max-w-[65ch] [&_a]:underline [&_h1]:mt-16 [&_h1]:mb-16 [&_h1]:text-center [&_h2]:mt-12 [&_h2]:mb-8 [&_h2]:text-center [&_li]:mb-2 [&_p]:mb-8 [&_p]:text-justify [&_p]:font-sans [&_p]:leading-relaxed [&_ul]:mb-8 [&_ul]:list-disc [&_ul]:pl-6">
        <h1 className="font-[Merriweather] text-3xl font-bold text-quizz-dark">Qui sommes-nous&nbsp;?</h1>

        <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Le projet</h2>
        <p>
          Le Quizz du Berger est un test politique <b>gratuit</b> et <b>sans inscription obligatoire</b> pour
          l'élection présidentielle française de 2027. Le visiteur répond aux questions qu'il veut parmi{' '}
          {quizzQuestionsCount} questions réparties sur {quizzThemesCount} thèmes. Un algorithme compare
          ses réponses à celles de {candidatesCount} candidats et les classe du plus proche au plus éloigné de
          ses idées. L'objectif est de montrer que la politique n'est pas en noir et blanc, et d'encourager
          chacun à réfléchir à ses propres convictions.
        </p>

        <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">L'équipe</h2>
        <p>
          Le Quizz du Berger a été designé par <b>Clint</b> et développé par <b>Roméo Vincent</b> et{' '}
          <b>Arnaud Ambroselli</b>, dans le but d'encourager les gens à conforter ou remettre en question
          leurs idées politiques. Le projet est <b>associatif</b> et n'a aucun but lucratif.
        </p>

        <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Comment sont rédigées les questions</h2>
        <p>
          Les questions et réponses ont été soigneusement rédigées par les étudiants d'
          <b>
            <a href="https://interface-juniorconseil.com" target="_blank" rel="noreferrer">
              Interface Junior Conseil, la Junior Entreprise de Science Po Toulouse
            </a>
          </b>
          . Ils ont aussi répondu au quizz «&nbsp;à la place des candidats&nbsp;», en se basant sur leurs
          programmes respectifs. Pour 2027, les réponses des candidats sont mises à jour sur la base de
          leurs programmes officiels, déclarations publiques et votes passés.
        </p>

        <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Neutralité</h2>
        <p>
          Pour atteindre une plus grande neutralité du quizz, il y avait des étudiants de droite et de
          gauche. Ils ont réalisé un travail analytique de qualité, que vous pouvez consulter librement en{' '}
          <a href="/Analyse_Quizz_du_Berger.pdf" target="_blank" rel="noreferrer">
            cliquant ici
          </a>
          . Chaque question propose entre 3 et 6 réponses concrètes, et non un simple pour ou contre.
          Le score de proximité entre deux réponses est défini dans une matrice symétrique, ce qui évite
          de favoriser un bord politique.
        </p>

        <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Open-source et contact</h2>
        <p>
          Ce projet est entièrement open-source. Si vous souhaitez y participer, venez{' '}
          <a target="_blank" rel="noreferrer" href="https://github.com/ambroselli-io/quizz-berger">
            le faire sur GitHub
          </a>
          . Pour toute question ou remarque, consultez notre page{' '}
          <Link to="/contact">Contact</Link>.
        </p>
      </main>
    </div>
  );
}

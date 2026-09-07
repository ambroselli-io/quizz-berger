import { Link } from '@app/lib/router';

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center overflow-y-scroll bg-white px-2.5 py-10">
      <main className="max-w-[65ch] [&_a]:underline [&_h1]:mt-16 [&_h1]:mb-16 [&_h1]:text-center [&_h2]:mt-12 [&_h2]:mb-8 [&_h2]:text-center [&_li]:mb-2 [&_p]:mb-8 [&_p]:text-justify [&_p]:font-sans [&_p]:leading-relaxed [&_ul]:mb-8 [&_ul]:list-disc [&_ul]:pl-6">
        <h1 className="font-[Merriweather] text-3xl font-bold text-quizz-dark">Nous contacter</h1>

        <p>
          Le Quizz du Berger est un projet <b>associatif</b>, <b>gratuit</b> et{' '}
          <a href="https://github.com/ambroselli-io/quizz-berger" target="_blank" rel="noreferrer">
            open-source
          </a>
          . Nous répondons à toutes les questions sur le fonctionnement du quizz, les réponses attribuées aux
          candidats et la méthodologie.
        </p>

        <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Par e-mail</h2>
        <p>
          Écrivez-nous à{' '}
          <a href="mailto:contact@quizz-du-berger.com">contact@quizz-du-berger.com</a>. Nous traitons chaque
          message et répondons sous quelques jours.
        </p>

        <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Ce que vous pouvez nous signaler</h2>
        <ul>
          <li>
            <b>Une erreur dans les réponses d'un candidat</b> — si vous pensez qu'une réponse ne reflète pas la
            position publique d'un candidat, envoyez-nous le lien vers la source (programme, déclaration,
            vote) et nous corrigerons.
          </li>
          <li>
            <b>Un problème technique</b> — décrivez ce que vous avez fait, ce que vous attendiez et ce qui
            s'est passé. Une capture d'écran aide.
          </li>
          <li>
            <b>Une suggestion</b> — un thème manquant, une question mal formulée, une fonctionnalité utile :
            toute idée est bienvenue.
          </li>
          <li>
            <b>Une demande liée à vos données personnelles</b> — conformément au RGPD, vous pouvez demander
            l'accès, la rectification ou la suppression de vos données. Consultez notre{' '}
            <Link to="/confidentialite">politique de confidentialité</Link> pour le détail.
          </li>
        </ul>

        <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Pour les candidats et les partis</h2>
        <p>
          Si vous êtes candidat ou représentant d'un parti politique et que les réponses affichées en votre nom
          ne correspondent pas à votre position, contactez-nous à l'adresse ci-dessus. Nous corrigerons les
          réponses sur la base de vos sources officielles.
        </p>

        <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Contribuer au projet</h2>
        <p>
          Le code source est public. Pour signaler un bug ou proposer une amélioration technique, ouvrez une
          issue ou une pull request sur{' '}
          <a href="https://github.com/ambroselli-io/quizz-berger" target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>

        <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Éditeur du site</h2>
        <p>
          Arnaud Ambroselli — développeur indépendant, Paris, France.
          <br />
          Hébergement&nbsp;:{' '}
          <a href="https://www.clever-cloud.com" target="_blank" rel="noreferrer">
            Clever Cloud
          </a>{' '}
          (Nantes, France).
        </p>
      </main>
    </div>
  );
}

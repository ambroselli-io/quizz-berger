export default function QuiSommesNous() {
  return (
    <>
      <title>Qui sommes-nous ? | Le Quizz du Berger</title>
      <meta name="description" content="Découvrez l'équipe derrière le Quizz du Berger : un projet open-source pour encourager la réflexion politique." />
      <div className="flex flex-col items-center justify-center overflow-y-scroll bg-white px-2.5 py-10">
        <main className="max-w-[65ch] [&_a]:underline [&_h1]:mt-16 [&_h1]:mb-16 [&_h1]:text-center [&_h2]:mt-12 [&_h2]:mb-8 [&_h2]:text-center [&_p]:mb-8 [&_p]:text-justify [&_p]:font-sans [&_p]:leading-relaxed">
          <h1 className="font-[Merriweather] text-3xl font-bold text-quizz-dark">Qui sommes-nous&nbsp;?</h1>
          <p>
            Le Quizz du Berger a été designé par <b>Clint</b> et développé par <b>Roméo Vincent</b> et{' '}
            <b>Arnaud Ambroselli</b>, dans le but d'encourager les gens à conforter ou remettre en question leurs idées
            politiques.
          </p>
          <p>
            Les questions et réponses ont été soigneusement rédigées par les étudiants d'
            <b>
              <a href="https://interface-juniorconseil.com" target="_blank" rel="noreferrer">
                Interface Junior Conseil, la Junior Entreprise de Science Po Toulouse
              </a>
            </b>
            . Ils ont aussi répondu au quizz "à la place des candidats", en se basant sur leurs programmes respectifs.
          </p>
          <p>
            Pour atteindre une plus grande neutralité du quizz, il y avait des étudiants de droite et de gauche. Ils ont
            realisé un travail analytique de qualité, que vous pouvez consulter librement en{' '}
            <a href="/Analyse_Quizz_du_Berger.pdf" target="_blank" rel="noreferrer">
              cliquant ici
            </a>
            .
          </p>
          <p>
            Ce projet est open-source, si vous souhaitez y participer, venez{' '}
            <a target="_blank" rel="noreferrer" href="https://github.com/ambroselli-io/quizz-berger">
              le faire sur GitHub
            </a>
            .
          </p>
        </main>
      </div>
    </>
  );
}

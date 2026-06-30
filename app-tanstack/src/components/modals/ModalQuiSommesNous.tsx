interface ModalQuiSommesNousProps {
  isActive: boolean;
  onClose: () => void;
}

const ModalQuiSommesNous = ({ isActive, onClose }: ModalQuiSommesNousProps) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/70" onClick={onClose}>
      <div
        className="flex max-h-[80vh] max-w-[1000px] flex-1 flex-col rounded-[50px] bg-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between text-black">
          <h2 className="font-[Merriweather] text-xl font-bold">Qui sommes nous ?</h2>
          <button onClick={onClose} className="h-[15px] w-[15px] cursor-pointer border-none bg-[url(/cross.svg)] bg-cover" />
        </div>
        <div className="overflow-auto pt-4 text-black [&_a]:underline">
          <p>
            Le Quizz du Berger a été designé par <b>Clint</b> et développé par <b>Roméo Vincent</b> et{' '}
            <b>Arnaud Ambroselli</b>, dans le but d'encourager les gens à conforter ou remettre en question leurs idées
            politiques.
            <br /><br />
            Les questions et réponses ont été soigneusement rédigées par les étudiants d'
            <b>
              <a href="https://interface-juniorconseil.com" target="_blank" rel="noreferrer">
                Interface Junior Conseil, la Junior Entreprise de Science Po Toulouse
              </a>
            </b>
            . Ils ont aussi répondu au quizz "à la place des candidats", en se basant sur leurs programmes respectifs.
            <br />
            Pour atteindre une plus grande neutralité du quizz, il y avait des étudiants de droite et de gauche. Ils ont
            realisé un travail analytique de qualité, que vous pouvez consulter librement en{' '}
            <a href="/Analyse_Quizz_du_Berger.pdf" target="_blank" rel="noreferrer">
              cliquant ici
            </a>
            <br /><br />
            Ce projet est open-source, si vous souhaitez y participer, venez{' '}
            <a target="_blank" rel="noreferrer" href="https://github.com/ambroselli-io/quizz-berger">
              le faire sur GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalQuiSommesNous;

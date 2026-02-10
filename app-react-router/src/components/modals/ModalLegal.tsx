interface ModalLegalProps {
  isActive: boolean;
  onClose: () => void;
}

const ModalLegal = ({ isActive, onClose }: ModalLegalProps) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/70" onClick={onClose}>
      <div
        className="flex max-h-[80vh] max-w-[1000px] flex-1 flex-col rounded-[50px] bg-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between text-black">
          <h2 className="font-[Merriweather] text-xl font-bold">
            Informations générales
            <br />
            Mentions Légales
          </h2>
          <button onClick={onClose} className="h-[15px] w-[15px] cursor-pointer border-none bg-[url(/cross.svg)] bg-cover" />
        </div>
        <div className="overflow-auto pt-4 text-black [&_a]:underline">
          <p>
            Le Quizz du Berger a été designé par Clint et développé par Roméo Vincent et Arnaud Ambroselli, dans le but
            d'encourager les gens à conforter ou remettre en question leurs idées politiques.
            <br /><br />
            Toutes les réponses des utilisateurs sont <strong>anonymes</strong>. Nous enregistrons anonymement
            (c'est-à-dire qu'il est <strong>physiquement impossible</strong> de faire un lien quelconque entre vous, votre
            ordinateur et les réponses que vous donnez) en base de donnée votre parcours dans un seul but statistique de
            voir combien de personnes ont participé au quizz : vous pouvez vous y opposer en nous contactant via le
            formulaire de contact disponible sur le site. Vous avez aussi l'option de pouvoir partager un lien vers vos
            résultats, pour en discuter avec vos amis par exemple : un pseudonyme et un mot de passe seront alors requis
            pour que vous puissiez accéder quand vous voulez à votre Quizz. Si vous perdez votre mot de passe, n'ayant
            aucun email ou numéro de téléphone associé à votre compte, il nous sera impossible de vous donner accès à
            votre Quizz.
            <br /><br />
            Notre action n'a aucun but lucratif, elle est même une perte financière sèche et assumée.
            <br /><br />
            Nous essayons du mieux possible aussi de garder une neutralité vis à vis des candidats, des questions et des
            réponses. Si vous avez une remarque à faire sur un aspect quelconque du Quizz - contenu des questions,
            réponses des candidats, ou même design -, nous serions heureux d'avoir vos retours : n'hésitez pas à nous
            contacter.
            <br /><br />
            Si vous êtes vous-même candidat ou un parti politique et que les réponses que nous avons affiché en votre nom
            ne vous conviennent pas, contactez-nous aussi, nous serons heureux de faire les modifications que vous
            souhaitez.
            <br /><br />
            Ce projet est open-source, si vous souhaitez y participer, venez{' '}
            <a target="_blank" rel="noreferrer" href="https://github.com/ambroselli-io/quizz-berger">
              le faire sur GitHub
            </a>
            <br /><br />
            Le site, le serveur et la base de donnée en MongoDB sont hébergés chez{' '}
            <a href="https://www.clever-cloud.com/about/" target="_blank" rel="noreferrer">
              Clever-cloud
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalLegal;

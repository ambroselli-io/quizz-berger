import { useState } from 'react';
import { Link } from '@app/lib/router';
import Logo from './Logo';
import ModalLegal from './modals/ModalLegal';
import useUser from '@app/hooks/useUser';

const Footer = () => {
  const [showLegalModal, setShowLegalModal] = useState(false);
  const { user } = useUser();

  return (
    <div className="hidden w-full bg-quizz-dark px-10 py-10 text-white lg:block">
      <div className="mx-auto w-full max-w-[1024px]">
        <div className="flex items-start justify-between gap-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <Link to="/"><Logo height={32} width={32} /></Link>
              <Link to="/" className="ml-2.5 font-[Merriweather] text-xl font-bold">Le Quizz du Berger</Link>
            </div>
            <p className="max-w-xs text-xs text-gray-400">
              Fais des candidats tes moutons.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Explorer</p>
            {user?.isLoggedIn && <Link to="/result" className="text-sm text-gray-300 hover:text-white">Mes résultats</Link>}
            <Link to="/all-questions" className="text-sm text-gray-300 hover:text-white">Toutes les questions</Link>
            <Link to="/candidats" className="text-sm text-gray-300 hover:text-white">Tous les candidats</Link>
            <Link to="/partis" className="text-sm text-gray-300 hover:text-white">Tous les partis</Link>
            <Link to="/sujets" className="text-sm text-gray-300 hover:text-white">Tous les sujets</Link>
            <Link to="/comparer" className="text-sm text-gray-300 hover:text-white">Comparer les candidats</Link>
            <Link to="/comparateur-programmes-2027" className="text-sm text-gray-300 hover:text-white">Comparateur de programmes</Link>
            <Link to="/sondages-presidentielle-2027" className="text-sm text-gray-300 hover:text-white">Sondages 2027</Link>
            <Link to="/qui-est-candidat-2027" className="text-sm text-gray-300 hover:text-white">Qui est candidat ?</Link>
            <Link to="/pour-qui-voter-2027" className="text-sm text-gray-300 hover:text-white">Pour qui voter en 2027 ?</Link>
            <Link to="/blog" className="text-sm text-gray-300 hover:text-white">Blog</Link>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">À propos</p>
            <Link to="/qui-sommes-nous" className="text-sm text-gray-300 hover:text-white">Qui sommes-nous ?</Link>
            <Link to="/soutenir" className="text-sm text-gray-300 hover:text-white">Soutenir le projet</Link>
            <Link to="/stats" className="text-sm text-gray-300 hover:text-white">Statistiques</Link>
            <Link to="/contact" className="text-sm text-gray-300 hover:text-white">Nous contacter</Link>
            <button onClick={() => setShowLegalModal(true)} className="cursor-pointer border-none bg-transparent p-0 text-left text-sm text-gray-300 hover:text-white">Mentions légales</button>
            <Link to="/confidentialite" className="text-sm text-gray-300 hover:text-white">Confidentialité</Link>
            <a target="_blank" rel="noreferrer" href="https://github.com/ambroselli-io/quizz-berger" className="text-sm text-gray-300 hover:text-white">Open-source</a>
          </div>
        </div>
      </div>

      <ModalLegal isActive={showLegalModal} onClose={() => setShowLegalModal(false)} />
    </div>
  );
};

export default Footer;

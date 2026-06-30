import { useState } from 'react';
import { Link } from '@app/lib/router';
import Logo from './Logo';
import ModalContact from './modals/ModalContact';
import ModalLegal from './modals/ModalLegal';

const Footer = () => {
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

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
              Trouvez le candidat le plus proche de vos idées pour la présidentielle 2027.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Explorer</p>
            <Link to="/candidats" className="text-sm text-gray-300 hover:text-white">Tous les candidats</Link>
            <Link to="/sujets" className="text-sm text-gray-300 hover:text-white">Tous les sujets</Link>
            <Link to="/comparer" className="text-sm text-gray-300 hover:text-white">Comparer les candidats</Link>
            <Link to="/blog" className="text-sm text-gray-300 hover:text-white">Blog</Link>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">À propos</p>
            <Link to="/qui-sommes-nous" className="text-sm text-gray-300 hover:text-white">Qui sommes-nous ?</Link>
            <button onClick={() => setShowContactModal(true)} className="cursor-pointer border-none bg-transparent p-0 text-left text-sm text-gray-300 hover:text-white">Nous contacter</button>
            <button onClick={() => setShowLegalModal(true)} className="cursor-pointer border-none bg-transparent p-0 text-left text-sm text-gray-300 hover:text-white">Mentions légales</button>
            <a target="_blank" rel="noreferrer" href="https://github.com/ambroselli-io/quizz-berger" className="text-sm text-gray-300 hover:text-white">Open-source</a>
          </div>
        </div>
      </div>

      <ModalLegal isActive={showLegalModal} onClose={() => setShowLegalModal(false)} />
      <ModalContact isActive={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>
  );
};

export default Footer;

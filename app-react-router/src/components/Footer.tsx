import { useState } from 'react';
import { Link } from 'react-router';
import Logo from './Logo';
import ModalContact from './modals/ModalContact';
import ModalLegal from './modals/ModalLegal';

const Footer = () => {
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="hidden h-[120px] w-full items-center bg-quizz-dark px-10 text-white lg:flex">
      <div className="mx-auto flex h-full w-full max-w-[1024px] items-center justify-between">
        <div className="flex items-center">
          <Link to="/"><Logo height={32} width={32} /></Link>
          <Link to="/" className="ml-2.5 font-[Merriweather] text-xl font-bold">Le Quizz du Berger</Link>
        </div>
        <ul className="flex items-center gap-10">
          <li className="cursor-pointer list-none text-sm text-gray-400">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="cursor-pointer list-none text-sm text-gray-400">
            <a target="_blank" rel="noreferrer" href="https://github.com/ambroselli-io/quizz-berger">Open-source</a>
          </li>
          <li className="cursor-pointer list-none text-sm text-gray-400" onClick={() => setShowContactModal(true)}>Nous contacter</li>
          <li className="cursor-pointer list-none text-sm text-gray-400" onClick={() => setShowLegalModal(true)}>Mentions légales</li>
          <li className="list-none text-sm text-gray-400">
            <Link to="/qui-sommes-nous">Qui sommes-nous ?</Link>
          </li>
        </ul>
      </div>

      <ModalLegal isActive={showLegalModal} onClose={() => setShowLegalModal(false)} />
      <ModalContact isActive={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>
  );
};

export default Footer;

import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@app/components/ui/sheet';
import Logo from './Logo';
import QuizzButton from './QuizzButton';
import ModalContact from './modals/ModalContact';
import ModalLegal from './modals/ModalLegal';
import ModalQuiSommesNous from './modals/ModalQuiSommesNous';
import useUser from '@app/hooks/useUser';

const Header = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showQuiSommesNousModal, setShowQuiSommesNousModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavItem = ({ href, children, exact }: { href: string; children: React.ReactNode; exact?: boolean }) => {
    const active = exact ? location.pathname === href : location.pathname.startsWith(href);
    return (
      <li className={`flex h-20 cursor-pointer items-center justify-center text-gray-400 ${active ? 'border-t-[3px] border-yellow-400 text-white' : ''}`}>
        <Link to={href} className="w-full text-center">{children}</Link>
      </li>
    );
  };

  return (
    <>
      <nav className="fixed z-[99] h-20 w-screen bg-quizz-dark px-10 max-lg:h-[60px] max-lg:px-5">
        <div className="mx-auto flex h-full items-center justify-between">
          <div className="flex items-center">
            <Link to="/"><Logo height={32} width={32} /></Link>
            <Link to="/" className="ml-2.5 font-[Merriweather] text-xl font-bold text-white max-lg:hidden">Le Quizz du Berger</Link>
          </div>
          <ul className="flex h-full items-center gap-10 text-[0.8rem] font-medium text-white max-lg:hidden">
            <NavItem href="/" exact>Accueil</NavItem>
            {import.meta.env.DEV && <NavItem href="/stats">Stats</NavItem>}
            <NavItem href="/all-questions">Voir toutes les questions</NavItem>
            <NavItem href="/themes"><QuizzButton>Quizz</QuizzButton></NavItem>
            {user?.isLoggedIn && <NavItem href="/result">Résultats</NavItem>}
            <li className="flex h-20 cursor-pointer items-center text-gray-400"><span onClick={() => setShowContactModal(true)}>Nous contacter</span></li>
            {user?.isLoggedIn ? (
              <li className="flex h-20 cursor-pointer items-center text-gray-400" onClick={logout}><span>{user?.pseudo ? 'Se déconnecter' : 'Recommencer'}</span></li>
            ) : (
              <NavItem href="/login">Se connecter</NavItem>
            )}
          </ul>

          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="cursor-pointer border-none bg-transparent"><img src="/burgerNav.svg" alt="menu" width={30} height={30} /></button>
              </SheetTrigger>
              <SheetContent side="right" className="w-screen border-none bg-quizz-dark p-0 text-white">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex items-center gap-2.5 p-5">
                  <Logo height={32} width={32} />
                  <span className="font-[Merriweather] text-xl font-bold">Le Quizz du Berger</span>
                </div>
                <nav className="flex flex-col">
                  {[
                    { label: 'Accueil', href: '/' },
                    { label: 'Voir toutes les questions', href: '/all-questions' },
                  ].map(({ label, href }) => (
                    <Link key={href} to={href} onClick={() => setMobileOpen(false)} className="px-8 py-4">{label}</Link>
                  ))}
                  <Link to="/themes" onClick={() => setMobileOpen(false)} className="px-8 py-4"><QuizzButton>Quizz</QuizzButton></Link>
                  {user?.isLoggedIn && <Link to="/result" onClick={() => setMobileOpen(false)} className="px-8 py-4">Résultats</Link>}
                  {user?.isLoggedIn ? (
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="cursor-pointer border-none bg-transparent px-8 py-4 text-left text-white">{user?.pseudo ? 'Se déconnecter' : 'Recommencer'}</button>
                  ) : (
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="px-8 py-4">Se connecter</Link>
                  )}
                  <button onClick={() => { setShowContactModal(true); setMobileOpen(false); }} className="cursor-pointer border-none bg-transparent px-8 py-4 text-left text-white">Nous contacter</button>
                  <button onClick={() => { setShowLegalModal(true); setMobileOpen(false); }} className="cursor-pointer border-none bg-transparent px-8 py-4 text-left text-white">Mentions légales</button>
                  <button onClick={() => { setShowQuiSommesNousModal(true); setMobileOpen(false); }} className="cursor-pointer border-none bg-transparent px-8 py-4 text-left text-white">Qui sommes nous ?</button>
                  <a target="_blank" rel="noreferrer" href="https://github.com/ambroselli-io/quizz-berger" className="px-8 py-4">Open-source</a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      <div className="h-20 shrink-0 max-lg:h-[60px]" />

      <ModalLegal isActive={showLegalModal} onClose={() => setShowLegalModal(false)} />
      <ModalQuiSommesNous isActive={showQuiSommesNousModal} onClose={() => setShowQuiSommesNousModal(false)} />
      <ModalContact isActive={showContactModal} onClose={() => setShowContactModal(false)} />
    </>
  );
};

export default Header;

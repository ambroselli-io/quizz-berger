import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Home, Play, ListChecks, BarChart3, MoreHorizontal, LogIn, LogOut, Mail, Scale, Users, Github, BookOpen } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@app/components/ui/sheet';
import ModalContact from './modals/ModalContact';
import ModalLegal from './modals/ModalLegal';
import useUser from '@app/hooks/useUser';

const BottomTabBar = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);

  const tabs = [
    { label: 'Accueil', icon: Home, href: '/', exact: true },
    { label: 'Quizz', icon: Play, href: '/themes' },
    { label: 'Questions', icon: ListChecks, href: '/all-questions' },
    ...(user?.isLoggedIn ? [{ label: 'Resultats', icon: BarChart3, href: '/result' }] : []),
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? location.pathname === href : location.pathname.startsWith(href);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
        {tabs.map(({ label, icon: Icon, href, exact }) => (
          <Link
            key={href}
            to={href}
            className={`flex flex-1 flex-col items-center gap-0.5 pt-1.5 text-[0.6rem] ${isActive(href, exact) ? 'text-yellow-500' : 'text-gray-500'}`}
          >
            <Icon size={22} />
            <span>{label}</span>
          </Link>
        ))}
        <button
          onClick={() => setMoreOpen(true)}
          className={`flex flex-1 cursor-pointer flex-col items-center gap-0.5 border-none bg-transparent pt-1.5 text-[0.6rem] ${moreOpen ? 'text-yellow-500' : 'text-gray-500'}`}
        >
          <MoreHorizontal size={22} />
          <span>Plus</span>
        </button>
      </div>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="bottom" className="z-[60] rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)]">
          <SheetTitle className="sr-only">Plus</SheetTitle>
          <nav className="flex flex-col gap-1 py-2">
            {user?.isLoggedIn ? (
              <button
                onClick={() => { logout(); setMoreOpen(false); }}
                className="flex cursor-pointer items-center gap-3 rounded-lg border-none bg-transparent px-4 py-3 text-left text-base text-gray-700 active:bg-gray-100"
              >
                <LogOut size={20} />
                {user?.pseudo ? 'Se deconnecter' : 'Recommencer'}
              </button>
            ) : (
              <Link to="/login" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100">
                <LogIn size={20} />
                Se connecter
              </Link>
            )}
            <Link to="/blog" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100">
              <BookOpen size={20} />
              Blog
            </Link>
            <button
              onClick={() => { setShowContactModal(true); setMoreOpen(false); }}
              className="flex cursor-pointer items-center gap-3 rounded-lg border-none bg-transparent px-4 py-3 text-left text-base text-gray-700 active:bg-gray-100"
            >
              <Mail size={20} />
              Nous contacter
            </button>
            <button
              onClick={() => { setShowLegalModal(true); setMoreOpen(false); }}
              className="flex cursor-pointer items-center gap-3 rounded-lg border-none bg-transparent px-4 py-3 text-left text-base text-gray-700 active:bg-gray-100"
            >
              <Scale size={20} />
              Mentions legales
            </button>
            <Link to="/qui-sommes-nous" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100">
              <Users size={20} />
              Qui sommes-nous ?
            </Link>
            <a
              href="https://github.com/ambroselli-io/quizz-berger"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100"
            >
              <Github size={20} />
              Open-source
            </a>
          </nav>
        </SheetContent>
      </Sheet>

      <ModalContact isActive={showContactModal} onClose={() => setShowContactModal(false)} />
      <ModalLegal isActive={showLegalModal} onClose={() => setShowLegalModal(false)} />
    </>
  );
};

export default BottomTabBar;

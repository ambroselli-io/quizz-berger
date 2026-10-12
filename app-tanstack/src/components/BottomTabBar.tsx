import { useState } from 'react';
import { Link, useLocation } from '@app/lib/router';
import { Play, ListChecks, BarChart3, MoreHorizontal, LogIn, LogOut, Mail, Scale, Users, Github, BookOpen, UserSquare2, Layers, ArrowLeftRight, MessageCircle, Heart, LineChart } from 'lucide-react';
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
    { label: 'IA', icon: MessageCircle, href: '/ia' },
    { label: 'Quizz', icon: Play, href: '/themes' },
  ];

  const tabClassName = (active: boolean) =>
    `flex flex-1 cursor-pointer flex-col items-center gap-0.5 border-none bg-transparent pt-1.5 text-[0.6rem] ${active ? 'text-yellow-500' : 'text-gray-500'}`;

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
        {tabs.map(({ label, icon: Icon, href }) => (
          <Link key={href} to={href} className={tabClassName(isActive(href))}>
            <Icon size={22} />
            <span>{label}</span>
          </Link>
        ))}
        <button onClick={() => setShowContactModal(true)} className={tabClassName(showContactModal)}>
          <Mail size={22} />
          <span>Contact</span>
        </button>
        {user?.isLoggedIn ? (
          <button onClick={logout} className={tabClassName(false)}>
            <LogOut size={22} />
            <span>{user?.pseudo ? 'Déconnexion' : 'Recommencer'}</span>
          </button>
        ) : (
          <Link to="/login" className={tabClassName(isActive('/login'))}>
            <LogIn size={22} />
            <span>Connexion</span>
          </Link>
        )}
        <button onClick={() => setMoreOpen(true)} className={tabClassName(moreOpen)}>
          <MoreHorizontal size={22} />
          <span>Plus</span>
        </button>
      </div>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent
          side="bottom"
          overlayClassName="z-[100]"
          className="z-[100] max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)] [&>button:last-child]:p-2 [&>button:last-child>svg]:size-6"
        >
          <SheetTitle className="sr-only">Plus</SheetTitle>
          <nav className="flex flex-col gap-1 py-2">
            <Link to="/all-questions" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100">
              <ListChecks size={20} />
              Toutes les questions
            </Link>
            {user?.isLoggedIn && (
              <Link to="/result" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100">
                <BarChart3 size={20} />
                Mes résultats
              </Link>
            )}
            <Link to="/soutenir" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100">
              <Heart size={20} />
              Soutenir le projet
            </Link>
            <Link to="/stats" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100">
              <LineChart size={20} />
              Statistiques
            </Link>
            <Link to="/candidats" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100">
              <UserSquare2 size={20} />
              Tous les candidats
            </Link>
            <Link to="/sujets" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100">
              <Layers size={20} />
              Tous les sujets
            </Link>
            <Link to="/comparer" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100">
              <ArrowLeftRight size={20} />
              Comparer les candidats
            </Link>
            <Link to="/blog" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-gray-700 active:bg-gray-100">
              <BookOpen size={20} />
              Blog
            </Link>
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

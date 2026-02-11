import { cn } from '@app/lib/utils';

interface QuizzModalProps {
  title: string;
  isActive: boolean;
  onClose: () => void;
  center?: boolean;
  children: React.ReactNode;
}

const QuizzModal = ({ title, isActive, onClose, center = false, children }: QuizzModalProps) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[99] flex items-end justify-center bg-black/70 lg:items-center" onClick={onClose}>
      <div
        className="relative flex max-h-[85vh] w-full flex-col rounded-t-[30px] bg-white p-8 pb-10 lg:max-w-[700px] lg:rounded-[50px] lg:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-gray-100 lg:right-8 lg:top-8"
        >
          <img src="/cross.svg" alt="Fermer" className="h-3 w-3" />
        </button>
        <h1 className="mt-2 text-center font-[Merriweather] text-xl font-bold lg:mt-0">{title}</h1>
        <div className={cn('mt-6 flex flex-col max-lg:overflow-auto [&_button]:font-[Merriweather_Sans]', center && 'items-center text-center')}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default QuizzModal;

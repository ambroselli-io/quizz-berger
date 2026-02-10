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
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/70" onClick={onClose}>
      <div
        className="flex max-h-[85vh] max-w-[min(100vw,700px)] flex-1 flex-col rounded-[50px] bg-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center">
          <h1 className="max-w-[80%] text-center font-[Merriweather] text-xl font-bold">{title}</h1>
          <button
            onClick={onClose}
            className="absolute right-0 h-[15px] w-[15px] cursor-pointer border-none bg-[url(/cross.svg)] bg-cover"
          />
        </div>
        <div className={cn('mt-6 flex flex-col max-lg:overflow-auto [&_button]:font-[Merriweather_Sans]', center && 'items-center text-center')}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default QuizzModal;

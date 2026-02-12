import { SlidersHorizontal } from 'lucide-react';
import QuizzModal from './QuizzModal';

interface FilterProps {
  toggle: (value: boolean | ((prev: boolean) => boolean)) => void;
  isActive: boolean;
  title: string;
  hideTitle?: boolean;
  children: React.ReactNode;
}

const Filter = ({ toggle, isActive, children, title, hideTitle }: FilterProps) => (
  <>
    {!hideTitle && (
      <button
        onClick={() => toggle((show) => !show)}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 active:bg-gray-100"
      >
        <SlidersHorizontal size={14} />
        {title}
      </button>
    )}
    <QuizzModal title={title} isActive={isActive} onClose={() => toggle(false)} center>
      <div className="mb-5 flex max-w-[500px] flex-wrap gap-3">{children}</div>
    </QuizzModal>
  </>
);

export default Filter;

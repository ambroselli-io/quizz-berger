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
      <button onClick={() => toggle((show) => !show)} className="mr-4 cursor-pointer bg-transparent text-sm underline border-none">
        {title}
      </button>
    )}
    <QuizzModal title={title} isActive={isActive} onClose={() => toggle(false)} center>
      <div className="mb-5 flex max-w-[500px] flex-wrap gap-3">{children}</div>
    </QuizzModal>
  </>
);

export default Filter;

import { cn } from '@app/lib/utils';

interface QuizzButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  animate?: boolean;
}

const QuizzButton = ({ children, className, animate, ...props }: QuizzButtonProps) => (
  <button
    className={cn(
      'cursor-pointer rounded-full border-none bg-yellow-400 px-6 py-2.5 font-[Merriweather_Sans] text-black',
      animate && 'animate-pulse',
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default QuizzButton;

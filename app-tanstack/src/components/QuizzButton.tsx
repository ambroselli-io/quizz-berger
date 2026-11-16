import type { ComponentProps } from 'react';
import { cn } from '@app/lib/utils';
import { Link } from '@app/lib/router';

interface QuizzButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  animate?: boolean;
}

const quizzButtonClassName = (animate?: boolean, className?: string) =>
  cn(
    'cursor-pointer rounded-full border-none bg-yellow-400 px-6 py-2.5 font-[Merriweather_Sans] text-black',
    animate && 'animate-pulse',
    className,
  );

const QuizzButton = ({ children, className, animate, ...props }: QuizzButtonProps) => (
  <button className={quizzButtonClassName(animate, className)} {...props}>
    {children}
  </button>
);

/** Same look as QuizzButton, but a real link, so crawlers follow it. */
export const QuizzLink = ({ className, animate, ...props }: ComponentProps<typeof Link> & { animate?: boolean }) => (
  <Link
    className={quizzButtonClassName(animate, cn('inline-flex items-center justify-center no-underline', className))}
    {...props}
  />
);

export default QuizzButton;

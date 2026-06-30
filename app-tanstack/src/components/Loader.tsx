import { cn } from '@app/lib/utils';
import Logo from './Logo';

interface LoaderProps {
  isLoading: boolean;
  size?: string;
  withBackground?: boolean;
}

const Loader = ({ isLoading, size = '32px', withBackground = false }: LoaderProps) => {
  if (!withBackground) {
    return (
      <div className={cn('rounded-full border-none', isLoading && 'animate-spin')} style={{ height: size, width: size }}>
        <Logo style={{ height: size, width: size }} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-quizz-dark transition-opacity duration-250',
        isLoading ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div className="animate-spin" style={{ height: size, width: size }}>
        <Logo style={{ height: size, width: size }} />
      </div>
    </div>
  );
};

export default Loader;

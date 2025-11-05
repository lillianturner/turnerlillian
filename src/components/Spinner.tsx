import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export function Spinner({ size = 'md', className, label = 'Loading...' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center" role="status" aria-live="polite">
      <Loader2 
        className={cn('animate-spin text-primary', sizeClasses[size], className)} 
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

import { memo } from 'react';
import { LazyIframe } from './LazyIframe';

interface BorderVinesProps {
  className?: string;
}

export const BorderVines = memo(function BorderVines({ className = '' }: BorderVinesProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none -z-10 ${className}`}
    >
      <LazyIframe
        src="/processing-border/index.html"
        className="w-full h-full border-0"
        title="Border Vine Decoration"
        loadingClassName="bg-transparent"
        threshold={0.1}
      />
    </div>
  );
});

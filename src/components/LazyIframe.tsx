import { useEffect, useRef, useState } from 'react';

interface LazyIframeProps {
  src: string;
  className?: string;
  title: string;
  loadingClassName?: string;
  threshold?: number;
}

export function LazyIframe({ 
  src, 
  className = '', 
  title, 
  loadingClassName = 'animate-pulse bg-muted/20',
  threshold = 0.1 
}: LazyIframeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // For users who prefer reduced motion, load immediately but apply reduced animation styles
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { 
        threshold,
        rootMargin: '50px' // Start loading 50px before element enters viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [shouldLoad, threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && shouldLoad && (
        <div className={`absolute inset-0 ${loadingClassName}`} aria-hidden="true" />
      )}
      
      {/* Iframe - only render when shouldLoad is true */}
      {shouldLoad && (
        <iframe
          src={src}
          className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
          title={title}
          onLoad={handleLoad}
          loading="lazy"
        />
      )}
      
      {/* Fallback for when iframe hasn't loaded yet */}
      {!shouldLoad && (
        <div 
          className={`${className} ${loadingClassName}`} 
          aria-label={`Loading ${title}`}
        />
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY || window.pageYOffset;
      const footer = document.querySelector('footer');
      
      // Show button when scrolled down 300px
      let shouldShow = scrolled > 300;
      
      // Hide when footer is visible in viewport
      if (footer && shouldShow) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Hide when footer enters viewport (top of footer is visible)
        if (footerRect.top < windowHeight) {
          shouldShow = false;
        }
      }
      
      setIsVisible(shouldShow);
    };

    // Run on mount and scroll
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    window.addEventListener('resize', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateY(0) scale(1)' 
          : 'translateY(20px) scale(0.9)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="glass-button-primary btn-animate hover-glow w-14 h-14 rounded-full shadow-2xl"
        aria-label="Scroll back to top"
        aria-hidden={!isVisible}
      >
        <ArrowUp className="w-6 h-6" aria-hidden="true" />
      </Button>
    </div>
  );
}

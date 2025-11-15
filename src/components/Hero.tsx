import { useState } from 'react';
import { ArrowDown, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { LazyIframe } from './LazyIframe';

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden mt-22" 
      role="main" 
      aria-labelledby="hero-heading"
    >
      {/* Processing Sketch Background - Lazy Loaded */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <LazyIframe
          src="/processing-copy/index.html"
          className="w-full h-full border-0"
          title="Growing Vines Background"
          loadingClassName="animate-pulse bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"
          threshold={0}
        />
      </div>
      
      {/* Hover Detection Area - Matches glass circle size */}
      <div 
        className="absolute top-1/2 left-1/2 w-[78vmin] h-[78vmin] z-[5] cursor-default"
        style={{
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          pointerEvents: 'auto',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-hidden="true"
      />

      {/* Frosted Glass Circle Background - Visual Effect Only */}
      <div 
        className="absolute top-1/2 left-1/2 w-[78vmin] h-[78vmin] z-[5] cursor-default"
        style={{
          transform: isHovered 
            ? 'translate(-50%, -50%) scale(1.02)' 
            : 'translate(-50%, -50%) scale(1)',
          borderRadius: '50%',
          backdropFilter: isHovered ? 'blur(8px) saturate(160%)' : 'blur(6px) saturate(140%)',
          WebkitBackdropFilter: isHovered ? 'blur(8px) saturate(160%)' : 'blur(6px) saturate(140%)',
          background: 'rgba(255, 255, 255, 0.25)',
          border: '1.75px solid rgba(255, 255, 255, 0.5)',
          boxShadow: isHovered 
            ? 'inset 0 2px 6px rgba(255, 255, 255, 0.4), inset 0 -2px 6px rgba(0, 0, 0, 0.08), 0 12px 50px rgba(0, 0, 0, 0.18), 0 30px 80px rgba(0, 0, 0, 0.25)'
            : 'inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.15), 0 25px 70px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.7s ease-in-out',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-xl mx-auto text-center relative">
          
          {/* Content - Sized to fit within 70vmin circle */}
          <div 
            className="space-y-6 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="space-y-4">
              <div className="px-6 mx-auto">
                <p className="subheading text-primary text-lg mb-3" aria-label="Introduction">Lillian Turner</p>
                <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold">
                  UX Designer &
                  <span className="block hero-subtitle text-3xl md:text-4xl lg:text-5xl mt-2">Technical Communicator</span>
                </h1>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button 
                size="default"
                className="text-base px-6 py-2 glass-button-primary btn-animate hover-glow"
                onClick={() => {
                  const element = document.getElementById('ux-studies');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
              </Button>
              <Button 
                size="default"
                className="text-base px-6 py-2 glass-button-outline btn-animate"
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 justify-center" role="list" aria-label="Social media links">
              <Button 
                variant="orange" 
                size="icon" 
                className="w-10 h-10 shimmer-effect" 
                asChild
                aria-label="LinkedIn profile" 
                role="listitem"
              >
                <a href="https://linkedin.com/in/lillianturner" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
              </Button>
              <Button 
                variant="yellow" 
                size="icon" 
                className="w-10 h-10 shimmer-effect" 
                asChild
                aria-label="GitHub profile" 
                role="listitem"
              >
                <a href="https://github.com/lillianturner" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" aria-hidden="true" />
                </a>
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="w-10 h-10 shimmer-effect" 
                asChild
                aria-label="Email contact" 
                role="listitem"
              >
                <a href="mailto:hello@lillianturner.com">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
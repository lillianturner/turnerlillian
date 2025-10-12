import { ArrowDown, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

export function Hero() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToUXStudies = () => {
    setShowScrollIndicator(false);
    const element = document.getElementById('ux-studies');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-4 pb-16 lg:pt-8 lg:pb-20 relative hero-background" role="main" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 lg:space-y-10 lg:pt-0">
            <div className="space-y-5 lg:space-y-6">
              <p className="subheading text-primary text-lg mb-3" aria-label="Introduction">Lillian Turner</p>
              <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold">
                UX Designer &
                <span className="block hero-subtitle text-3xl md:text-4xl lg:text-5xl mt-2 lg:mt-3">Technical Communicator</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                I craft user-centered digital experiences and clear, compelling technical content 
                that bridges the gap between complex technology and human understanding.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
              <Button 
                size="lg" 
                className="text-lg px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground btn-animate hover-glow"
                onClick={() => {
                  const element = document.getElementById('ux-studies');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-3 border-2 border-primary text-primary hover:bg-primary/10 btn-animate"
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 lg:space-x-5" role="list" aria-label="Social media links">
              <a 
                href="https://www.linkedin.com/in/lillian-turner-79bb16226" 
                target="_blank" 
                rel="noopener noreferrer"
                role="listitem"
              >
                <Button variant="ghost" size="lg" className="w-12 h-12 lg:w-14 lg:h-14 glass-social-icon hover-scale-sm transition-all-smooth" aria-label="LinkedIn profile">
                  <Linkedin className="w-5 h-5 lg:w-6 lg:h-6 text-primary" aria-hidden="true" />
                </Button>
              </a>
              <a 
                href="https://github.com/turnerlillian" 
                target="_blank" 
                rel="noopener noreferrer"
                role="listitem"
              >
                <Button variant="ghost" size="lg" className="w-12 h-12 lg:w-14 lg:h-14 glass-social-icon hover-scale-sm transition-all-smooth" aria-label="GitHub profile">
                  <Github className="w-5 h-5 lg:w-6 lg:h-6 text-primary" aria-hidden="true" />
                </Button>
              </a>
              <a 
                href="mailto:turnerlillianc@gmail.com"
                role="listitem"
              >
                <Button variant="ghost" size="lg" className="w-12 h-12 lg:w-14 lg:h-14 glass-social-icon hover-scale-sm transition-all-smooth" aria-label="Email contact">
                  <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-primary" aria-hidden="true" />
                </Button>
              </a>
            </div>
          </div>

          {/* Professional Photo/Visual */}
          <div 
            className="relative flex justify-center items-center cursor-pointer" 
            role="button" 
            aria-label="Click to learn more about Lillian Turner"
            onClick={() => {
              const element = document.getElementById('about');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="aspect-square max-w-sm lg:max-w-md rounded-2xl lg:rounded-3xl flex items-center justify-center relative overflow-hidden hover-glow shimmer-effect">
              <img
                src="/pdfs/headshot.jpeg"
                alt="Lillian Turner - UX Designer & Technical Communicator"
                className="w-full h-full object-cover rounded-2xl lg:rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          showScrollIndicator 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToUXStudies}
          className="flex items-center justify-center w-14 h-14 rounded-full glass-button-primary btn-animate hover-glow transition-all duration-300"
          aria-label="Scroll to UX Case Studies"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
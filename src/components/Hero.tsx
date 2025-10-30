import { ArrowDown, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" role="main" aria-labelledby="hero-heading">
      {/* Processing Sketch Background */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-white">
        <iframe
          src="/turnerlillian/processing-copy/index.html"
          className="w-full h-full border-0"
          title="Growing Vines Background"
        />
      </div>
      
      {/* Frosted Glass Circle Background - Absolute Position Centered in Hero Section */}
      <div 
        className="absolute top-1/2 left-1/2 w-[78vmin] h-[78vmin] glass-card pointer-events-none z-[5]"
        style={{
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.25)',
          border: '2.5px solid rgba(255, 255, 255, 0.6)',
          boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.15), 0 25px 70px rgba(0, 0, 0, 0.2)',
        }}
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-xl mx-auto text-center relative">
          
          {/* Content - Sized to fit within 70vmin circle */}
          <div className="space-y-6 relative">
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
              <Button variant="ghost" size="default" className="w-10 h-10 glass-social-icon hover-scale-sm transition-all-smooth" aria-label="LinkedIn profile" role="listitem">
                <Linkedin className="w-5 h-5 text-primary" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="default" className="w-10 h-10 glass-social-icon hover-scale-sm transition-all-smooth" aria-label="GitHub profile" role="listitem">
                <Github className="w-5 h-5 text-primary" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="default" className="w-10 h-10 glass-social-icon hover-scale-sm transition-all-smooth" aria-label="Email contact" role="listitem">
                <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
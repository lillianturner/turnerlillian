import { ArrowDown, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-4 pb-16 lg:pt-8 lg:pb-20" role="main" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content */}
          <div className="space-y-8 lg:space-y-10 lg:pt-0">
            <div className="space-y-5 lg:space-y-6">
              <p className="subheading text-primary text-lg mb-3" aria-label="Introduction">Lillian Turner</p>
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold">
                UX Designer & 
                <span className="block text-primary">Technical Communicator</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                I craft user-centered digital experiences and clear, compelling technical content 
                that bridges the gap between complex technology and human understanding.
              </p>
            </div>

            {/* Personal Brand Statement */}
            <div className="glass-card-accent p-6 lg:p-7 rounded-xl border-l-4 border-l-accent">
              <p className="text-lg lg:text-xl italic font-light leading-relaxed">
                "Design is not just what it looks like and feels like. Design is how it works. 
                And how it's communicated defines how it's understood."
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
              <Button 
                size="lg" 
                className="text-lg px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => {
                  const element = document.getElementById('ux-studies');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                className="text-lg px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground"
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
              <Button variant="ghost" size="lg" className="w-12 h-12 lg:w-14 lg:h-14 glass-social-icon" aria-label="LinkedIn profile" role="listitem">
                <Linkedin className="w-5 h-5 lg:w-6 lg:h-6 text-primary" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="lg" className="w-12 h-12 lg:w-14 lg:h-14 glass-social-icon" aria-label="GitHub profile" role="listitem">
                <Github className="w-5 h-5 lg:w-6 lg:h-6 text-primary" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="lg" className="w-12 h-12 lg:w-14 lg:h-14 glass-social-icon" aria-label="Email contact" role="listitem">
                <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-primary" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Professional Photo/Visual */}
          <div className="relative" role="img" aria-label="Lillian Turner's professional brand logo">
            <div className="aspect-square rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#F3F4F6' }}>
              <div className="w-52 h-52 lg:w-60 lg:h-60 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#065F46' }}>
                <span className="text-6xl lg:text-7xl font-bold text-white" aria-hidden="true">LT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
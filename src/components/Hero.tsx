import { ArrowDown, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-4 pb-16 lg:pt-8 lg:pb-20" role="main" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 lg:space-y-10 lg:pt-0">
            <div className="space-y-5 lg:space-y-6">
              <p className="subheading text-primary text-lg mb-3" aria-label="Introduction">Lillian Turner</p>
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold">
                UX Designer &
                <span className="block text-primary text-3xl md:text-4xl lg:text-5xl mt-2 lg:mt-3">Technical Communicator</span>
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
                className="text-lg px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground btn-animate hover-glow"
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
              <Button variant="ghost" size="lg" className="w-12 h-12 lg:w-14 lg:h-14 glass-social-icon hover-scale-sm transition-all-smooth" aria-label="LinkedIn profile" role="listitem">
                <Linkedin className="w-5 h-5 lg:w-6 lg:h-6 text-primary" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="lg" className="w-12 h-12 lg:w-14 lg:h-14 glass-social-icon hover-scale-sm transition-all-smooth" aria-label="GitHub profile" role="listitem">
                <Github className="w-5 h-5 lg:w-6 lg:h-6 text-primary" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="lg" className="w-12 h-12 lg:w-14 lg:h-14 glass-social-icon hover-scale-sm transition-all-smooth" aria-label="Email contact" role="listitem">
                <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-primary" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Professional Photo/Visual */}
          <div className="relative flex justify-center items-center" role="img" aria-label="Professional headshot of Lillian Turner">
            <div className="aspect-square max-w-sm lg:max-w-md rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
              <img
                src="/pdfs/headshot.jpeg"
                alt="Lillian Turner - UX Designer & Technical Communicator"
                className="w-full h-full object-cover rounded-2xl lg:rounded-3xl"
                style={{
                  boxShadow: '0 25px 50px rgba(6, 95, 70, 0.2), 0 10px 20px rgba(6, 95, 70, 0.15), 0 4px 8px rgba(6, 95, 70, 0.1)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
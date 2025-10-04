import { ArrowDown, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="subheading text-primary text-lg mb-2">Professional Portfolio</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
                UX Designer & 
                <span className="block text-primary">Technical Communicator</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                I craft user-centered digital experiences and clear, compelling technical content 
                that bridges the gap between complex technology and human understanding.
              </p>
            </div>

            {/* Personal Brand Statement */}
            <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary">
              <p className="text-lg italic">
                "Design is not just what it looks like and feels like. Design is how it works. 
                And how it's communicated defines how it's understood."
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => {
                  const element = document.getElementById('ux-studies');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Professional Photo/Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#D4E6B5' }}>
              <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ backgroundColor: '#AFC97E' }}>
                <span className="text-6xl font-bold text-white">LT</span>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-xl" style={{ backgroundColor: '#FFDF64', opacity: 0.3 }}></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-xl" style={{ backgroundColor: '#E2D686', opacity: 0.2 }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Linkedin, Github, Mail, Heart, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 relative overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Lillian Turner</h3>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              UX Designer & Technical Writer passionate about creating meaningful digital experiences 
              through thoughtful design and clear communication.
            </p>
            <div className="flex space-x-4" role="list" aria-label="Social media links">
              <Button
                variant="orange"
                size="icon"
                className="w-10 h-10 shimmer-effect"
                asChild
                aria-label="LinkedIn profile"
                role="listitem"
              >
                <a 
                  href="https://linkedin.com/in/lillianturner" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
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
                <a 
                  href="https://github.com/lillianturner" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="w-10 h-10 shimmer-effect"
                asChild
                aria-label="Send email"
                role="listitem"
              >
                <a href="mailto:hello@lillianturner.com">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <nav>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-muted-foreground hover:text-foreground transition-colors focus:text-foreground focus:outline-none focus:underline">Home</a></li>
              <li><a href="#ux-studies" className="text-muted-foreground hover:text-foreground transition-colors focus:text-foreground focus:outline-none focus:underline">UX Case Studies</a></li>
              <li><a href="#tech-writing" className="text-muted-foreground hover:text-foreground transition-colors focus:text-foreground focus:outline-none focus:underline">Technical Writing</a></li>
              <li><a href="#design-gallery" className="text-muted-foreground hover:text-foreground transition-colors focus:text-foreground focus:outline-none focus:underline">Design Gallery</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors focus:text-foreground focus:outline-none focus:underline">About</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors focus:text-foreground focus:outline-none focus:underline">Contact</a></li>
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-3" aria-label="Services offered">
              <li className="text-muted-foreground">UX/UI Design</li>
              <li className="text-muted-foreground">User Research</li>
              <li className="text-muted-foreground">Technical Writing</li>
              <li className="text-muted-foreground">Content Strategy</li>
              <li className="text-muted-foreground">Design Systems</li>
              <li className="text-muted-foreground">API Documentation</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground mb-4 md:mb-0">
            <p>&copy; 2025 Lillian Turner. All rights reserved.</p>
            <p className="text-sm mt-1">
              Made with <Heart className="inline w-4 h-4" style={{ color: '#34A853' }} role="img" aria-label="heart" /> and lots of coffee
            </p>
          </div>
          
          <Button 
            onClick={scrollToTop}
            size="default"
            className="text-base px-6 py-2 glass-button-primary btn-animate hover-glow"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
}
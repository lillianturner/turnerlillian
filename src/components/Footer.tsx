import { Linkedin, Github, Mail, Heart, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#042F23' }} className="text-white py-16" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Lillian Turner</h3>
            <p className="text-white/80 leading-relaxed mb-6 max-w-md">
              UX Designer & Technical Writer passionate about creating meaningful digital experiences 
              through thoughtful design and clear communication.
            </p>
            <div className="flex space-x-4" role="list" aria-label="Social media links">
              <a 
                href="https://linkedin.com/in/lillianturner" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg glass-logo transition-transform duration-200 hover:scale-105"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                aria-label="LinkedIn profile"
                role="listitem"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://github.com/lillianturner" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg glass-logo transition-transform duration-200 hover:scale-105"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                aria-label="GitHub profile"
                role="listitem"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a 
                href="mailto:hello@lillianturner.com"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg glass-logo transition-transform duration-200 hover:scale-105"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                aria-label="Send email"
                role="listitem"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-white/80 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Home</a></li>
              <li><a href="#ux-studies" className="text-white/80 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">UX Case Studies</a></li>
              <li><a href="#tech-writing" className="text-white/80 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Technical Writing</a></li>
              <li><a href="#design-gallery" className="text-white/80 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Design Gallery</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">About</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Contact</a></li>
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3" aria-label="Services offered">
              <li className="text-white/80">UX/UI Design</li>
              <li className="text-white/80">User Research</li>
              <li className="text-white/80">Technical Writing</li>
              <li className="text-white/80">Content Strategy</li>
              <li className="text-white/80">Design Systems</li>
              <li className="text-white/80">API Documentation</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/80 mb-4 md:mb-0">
            <p>&copy; 2025 Lillian Turner. All rights reserved.</p>
            <p className="text-sm mt-1">
              Made with <Heart className="inline w-4 h-4" style={{ color: '#34A853' }} role="img" aria-label="heart" /> and lots of coffee
            </p>
          </div>
          
          <Button 
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0F172A]"
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
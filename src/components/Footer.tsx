import { Linkedin, Github, Mail, Heart, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#877B66' }} className="text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Lillian Turner</h3>
            <p className="text-white/80 leading-relaxed mb-6 max-w-md">
              UX Designer & Technical Writer passionate about creating meaningful digital experiences 
              through thoughtful design and clear communication.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/in/lillianturner" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
                style={{ backgroundColor: '#AFC97E' }}
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://github.com/lillianturner" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
                style={{ backgroundColor: '#E2D686' }}
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a 
                href="mailto:hello@lillianturner.com"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
                style={{ backgroundColor: '#FFDF64' }}
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="#ux-case-studies" className="text-white/80 hover:text-white transition-colors">UX Case Studies</a></li>
              <li><a href="#tech-writing" className="text-white/80 hover:text-white transition-colors">Technical Writing</a></li>
              <li><a href="#design-gallery" className="text-white/80 hover:text-white transition-colors">Design Gallery</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
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
              Made with <Heart className="inline w-4 h-4 text-red-400" /> and lots of coffee
            </p>
          </div>
          
          <Button 
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="text-white"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
}
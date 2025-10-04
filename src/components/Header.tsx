import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      // Trigger mobile menu animations
      const mobileLinks = document.querySelectorAll('.animate-on-load');
      mobileLinks.forEach((element) => {
        element.classList.remove('animate-on-load');
      });
    }
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'UX Case Studies', href: '#ux-studies' },
    { name: 'Technical Writing', href: '#tech-writing' },
    { name: 'Design Gallery', href: '#design-gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transition-all-smooth" aria-label="Lillian Turner - Home">
              <div className="w-10 h-10 glass-logo rounded-lg flex items-center justify-center mr-3">
                <span className="text-primary font-bold" aria-hidden="true">LT</span>
              </div>
              <span className="text-xl font-semibold">Lillian Turner</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-foreground/70 hover:text-foreground transition-all-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-4 py-2 hover:bg-primary/5 hover:backdrop-blur-sm group nav-link-glass"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 rounded-lg transition-all-smooth"></div>
              </a>
            ))}
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground btn-animate hover-glow ml-4"
              aria-label="Download Resume PDF"
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Resume
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="hover:bg-primary/10 transition-all-smooth hover-scale-sm"
            >
              <div className="relative w-5 h-5">
                <Menu 
                  className={`w-5 h-5 absolute transition-all-smooth ${isMenuOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'}`} 
                  aria-hidden="true" 
                />
                <X 
                  className={`w-5 h-5 absolute transition-all-smooth ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'}`} 
                  aria-hidden="true" 
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slide-up" id="mobile-menu">
            <nav className="flex flex-col space-y-2" role="navigation" aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative text-foreground/70 hover:text-foreground transition-all-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-4 py-3 hover:bg-primary/5 group animate-on-load animate-slide-in-left animate-delay-${Math.min((index + 1) * 100, 600)}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 rounded-lg transition-all-smooth"></div>
                </a>
              ))}
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground self-start btn-animate hover-glow animate-on-load animate-fade-in animate-delay-600 mt-4"
                aria-label="Download Resume PDF"
              >
                <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                Resume
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80; // Height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transition-all-smooth" 
              aria-label="Lillian Turner - Home"
            >
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
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-foreground/70 hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-4 py-2 group"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
            ))}
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 ml-4"
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
              className="hover:bg-primary/10 transition-colors duration-200"
            >
              <div className="relative w-5 h-5">
                <Menu 
                  className={`w-5 h-5 absolute transition-all duration-200 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} 
                  aria-hidden="true" 
                />
                <X 
                  className={`w-5 h-5 absolute transition-all duration-200 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} 
                  aria-hidden="true" 
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t" id="mobile-menu">
            <nav className="flex flex-col space-y-1" role="navigation" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/70 hover:text-foreground hover:bg-primary/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-4 py-3"
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              ))}
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 self-start mt-4"
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
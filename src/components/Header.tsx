import { useState, useEffect } from 'react';
import { Menu, X, Download, FileText, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { PDFViewer } from './PDFViewer';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<'resume' | 'cv' | null>(null);
  const [isPortfolioDropdownOpen, setIsPortfolioDropdownOpen] = useState(false);

  const documents = [
    {
      type: 'resume' as const,
      title: 'Resume - Lillian Turner',
      description: 'UX Designer & Technical Communicator',
      filePath: '/pdfs/lillian-turner-resume.md',
      downloadName: 'Lillian_Turner_Resume.md'
    },
    {
      type: 'cv' as const,
      title: 'CV - Lillian Turner',
      description: 'Curriculum Vitae - UX Designer & Technical Communicator',
      filePath: '/pdfs/lillian-turner-cv.md',
      downloadName: 'Lillian_Turner_CV.md'
    }
  ];

  const currentDocumentIndex = currentDocument ? documents.findIndex(doc => doc.type === currentDocument) : -1;

  const navigateToDocument = (direction: 'prev' | 'next') => {
    if (currentDocumentIndex === -1) return;

    const newIndex = direction === 'next'
      ? (currentDocumentIndex + 1) % documents.length
      : (currentDocumentIndex - 1 + documents.length) % documents.length;

    const newDoc = documents[newIndex];
    setCurrentDocument(newDoc.type);

    // Update modal states
    if (newDoc.type === 'resume') {
      setShowResumeModal(true);
      setShowCVModal(false);
    } else {
      setShowResumeModal(false);
      setShowCVModal(true);
    }
  };

  const handleDocumentKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateToDocument('prev');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateToDocument('next');
    } else if (e.key === 'Escape') {
      setShowResumeModal(false);
      setShowCVModal(false);
      setCurrentDocument(null);
    }
  };

  const openDocumentModal = (type: 'resume' | 'cv') => {
    setCurrentDocument(type);
    if (type === 'resume') {
      setShowResumeModal(true);
    } else {
      setShowCVModal(true);
    }
  };

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
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const portfolioItems = [
    { name: 'UX Case Studies', href: '#ux-studies' },
    { name: 'Technical Writing & Editing', href: '#tech-writing' },
    { name: 'Design Gallery', href: '#design-gallery' },
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
        <div className="flex items-center py-4">
          {/* Left side - Navigation */}
          <nav className="hidden md:flex items-center space-x-2 flex-1" role="navigation" aria-label="Main navigation">
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
            
            {/* Portfolio Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPortfolioDropdownOpen(!isPortfolioDropdownOpen)}
                className="relative text-foreground/70 hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-4 py-2 group flex items-center"
                aria-expanded={isPortfolioDropdownOpen}
                aria-haspopup="true"
              >
                <span className="relative z-10">Portfolio</span>
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isPortfolioDropdownOpen ? 'rotate-180' : ''}`} />
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              
              {/* Dropdown Menu */}
              {isPortfolioDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg z-50">
                  {portfolioItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        setIsPortfolioDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-primary/5 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Center - Brand Name */}
          <div className="flex items-center justify-center flex-1 md:flex-initial">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transition-all-smooth" 
              aria-label="Lillian Turner - Home"
            >
              <span className="text-xl font-semibold brand-name">LILLIAN TURNER</span>
            </a>
          </div>

          {/* Right side - Resume/CV Buttons */}
          <div className="hidden md:flex items-center space-x-2 flex-1 justify-end">
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 shimmer-effect"
              aria-label="View Resume"
              onClick={() => openDocumentModal('resume')}
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Resume
            </Button>
            <Button 
              size="sm" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-200 shimmer-effect"
              aria-label="View CV"
              onClick={() => openDocumentModal('cv')}
            >
              <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
              CV
            </Button>
          </div>

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
              
              {/* Portfolio Section in Mobile */}
              <div className="px-4 py-2 text-sm font-medium text-foreground/50">Portfolio</div>
              {portfolioItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/70 hover:text-foreground hover:bg-primary/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-6 py-3 ml-4"
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
                aria-label="View Resume"
                onClick={() => openDocumentModal('resume')}
              >
                <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                Resume
              </Button>
              <Button 
                size="sm" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-200 self-start mt-2"
                aria-label="View CV"
                onClick={() => openDocumentModal('cv')}
              >
                <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
                CV
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Resume Modal */}
      <Dialog open={showResumeModal} onOpenChange={(open) => {
        setShowResumeModal(open);
        if (!open) setCurrentDocument(null);
      }}>
        <DialogContent
          className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-7xl w-[95vw] h-[98vh] overflow-hidden flex flex-col"
          onKeyDown={handleDocumentKeyDown}
        >
          {/* Skip link for screen readers */}
          <a
            href="#document-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium z-50"
          >
            Skip to content
          </a>

          <DialogHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToDocument('prev')}
                  className="p-2 h-8 w-8"
                  aria-label={`Previous document: ${documents[(currentDocumentIndex - 1 + documents.length) % documents.length]?.title}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                <div className="text-sm text-muted-foreground" aria-live="polite">
                  {currentDocumentIndex + 1} of {documents.length}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToDocument('next')}
                  className="p-2 h-8 w-8"
                  aria-label={`Next document: ${documents[(currentDocumentIndex + 1) % documents.length]?.title}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-primary mt-4">Resume - Lillian Turner</DialogTitle>
            <DialogDescription>
              UX Designer & Technical Communicator
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              View or download my professional resume • Use arrow keys to navigate between documents
            </div>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/pdfs/lillian-turner-resume.md';
                link.download = 'Lillian_Turner_Resume.md';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Download Resume
            </Button>
          </div>
          <div className="flex-1 overflow-hidden" id="document-content">
            <iframe
              src="/pdfs/lillian-turner-resume.md"
              className="w-full h-full border-0 rounded-lg"
              title="Resume - Lillian Turner"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* CV Modal */}
      <Dialog open={showCVModal} onOpenChange={(open) => {
        setShowCVModal(open);
        if (!open) setCurrentDocument(null);
      }}>
        <DialogContent
          className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-7xl w-[95vw] h-[98vh] overflow-hidden flex flex-col"
          onKeyDown={handleDocumentKeyDown}
        >
          {/* Skip link for screen readers */}
          <a
            href="#document-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium z-50"
          >
            Skip to content
          </a>

          <DialogHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToDocument('prev')}
                  className="p-2 h-8 w-8"
                  aria-label={`Previous document: ${documents[(currentDocumentIndex - 1 + documents.length) % documents.length]?.title}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                <div className="text-sm text-muted-foreground" aria-live="polite">
                  {currentDocumentIndex + 1} of {documents.length}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToDocument('next')}
                  className="p-2 h-8 w-8"
                  aria-label={`Next document: ${documents[(currentDocumentIndex + 1) % documents.length]?.title}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-primary mt-4">CV - Lillian Turner</DialogTitle>
            <DialogDescription>
              UX Designer & Technical Communicator
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              View or download my professional CV • Use arrow keys to navigate between documents
            </div>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/pdfs/lillian-turner-cv.md';
                link.download = 'Lillian_Turner_CV.md';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Download CV
            </Button>
          </div>
          <div className="flex-1 overflow-hidden" id="document-content">
            <iframe
              src="/pdfs/lillian-turner-cv.md"
              className="w-full h-full border-0 rounded-lg"
              title="CV - Lillian Turner"
            />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
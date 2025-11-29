import { Hero } from './components/Hero';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LazyIframe } from './components/LazyIframe';
import { BackToTop } from './components/BackToTop';

export default function App() {
  return (
    <>
      <div className="min-h-screen relative">
        {/* Skip to main content link for accessibility */}
        <a 
          href="#about" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
      
      {/* Colorful blob background for entire page - Lazy Loaded */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <LazyIframe
          src="/processing-background/index.html"
          className="w-full h-full border-0"
          title="Colorful Background"
          loadingClassName="animate-pulse bg-gradient-to-br from-background via-muted/20 to-background"
          threshold={0}
        />
      </div>
      
      <div className="relative z-10">
        <main id="main-content">
          <Hero />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
    
    {/* Sticky Back to Top Button - Outside main container with inline styles for proper fixed positioning */}
    <BackToTop />
    </>
  );
}
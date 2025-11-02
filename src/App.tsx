import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UXCaseStudies } from './components/UXCaseStudies';
import { TechnicalWriting } from './components/TechnicalWriting';
import { DesignGallery } from './components/DesignGallery';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LazyIframe } from './components/LazyIframe';

export default function App() {
  return (
    <div className="min-h-screen relative">
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
        <Header />
        <main id="main-content">
          <Hero />
          <UXCaseStudies />
          <TechnicalWriting />
          <DesignGallery />
          <About />
          <Contact />
        </main>
      <Footer />
      </div>
    </div>
  );
}
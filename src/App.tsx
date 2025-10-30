import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UXCaseStudies } from './components/UXCaseStudies';
import { TechnicalWriting } from './components/TechnicalWriting';
import { DesignGallery } from './components/DesignGallery';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen relative">
      {/* Colorful blob background for entire page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <iframe
          src="/processing-background/index.html"
          className="w-full h-full border-0"
          title="Colorful Background"
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
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
    <div className="min-h-screen bg-background">
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
  );
}
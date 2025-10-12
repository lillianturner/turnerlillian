import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { PDFViewer } from './PDFViewer';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function TechnicalWriting() {
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const technicalWritingCases = [
    {
      id: 1,
      title: "Pacific Northwest X-Ray Website Usability Test Report",
      description: "Comprehensive usability testing report for a medical imaging company's website, identifying key user experience issues and providing actionable recommendations for improvement.",
      tags: ["Usability Testing", "Medical UX", "User Research", "Report Writing"],
      image: "/pdfs/PNWX.png",
      pdfUrl: "/pdfs/Pacific Northwest X-Ray Inc. Website Usability Test Report.pdf",
      type: "Usability Report"
    },
    {
      id: 2,
      title: "Poppin' Joe's Content Strategy & Style Guide",
      description: "Complete content strategy and style guide development for a local coffee shop, including brand voice guidelines, content calendar templates, and social media strategy.",
      tags: ["Content Strategy", "Brand Guidelines", "Style Guide", "Social Media"],
      image: "/pdfs/poppinjoes.png",
      pdfUrl: "/pdfs/poppin-joe-content-strategy.pdf",
      type: "Content Strategy"
    },
    {
      id: 3,
      title: "Poppin' Joe's Site Analysis Report",
      description: "Detailed analysis of a coffee shop's existing website, evaluating design effectiveness, user experience, and technical performance with specific improvement recommendations.",
      tags: ["Site Analysis", "Web Evaluation", "Technical Writing", "UX Audit"],
      image: "/pdfs/poppinjoes.png",
      pdfUrl: "/pdfs/poppin-joe-site-analysis.pdf",
      type: "Site Analysis"
    },
    {
      id: 4,
      title: "Suzanne Collins Author Website Design Report",
      description: "Comprehensive design analysis and report for the official website of bestselling author Suzanne Collins, evaluating visual design, user experience, and content organization.",
      tags: ["Design Analysis", "Author Website", "Visual Design", "UX Evaluation"],
      image: "/pdfs/SuzanneCollins.png",
      pdfUrl: "/pdfs/SCDesignReport.pdf",
      type: "Design Report"
    },
    {
      id: 5,
      title: "Suzanne Collins Heuristic Evaluation",
      description: "Expert heuristic evaluation of Suzanne Collins' author website using Nielsen's 10 usability heuristics, identifying specific usability issues and severity ratings.",
      tags: ["Heuristic Evaluation", "Usability Heuristics", "Expert Review", "UX Assessment"],
      image: "/pdfs/SuzanneCollins.png",
      pdfUrl: "/pdfs/SCHeuristicEvaluation.pdf",
      type: "Heuristic Evaluation"
    },
    {
      id: 6,
      title: "Suzanne Collins Component Compendium",
      description: "Detailed documentation of reusable UI components and design patterns identified from Suzanne Collins' website, including specifications and usage guidelines.",
      tags: ["Component Documentation", "UI Patterns", "Design Systems", "Technical Specs"],
      image: "/pdfs/SuzanneCollins.png",
      pdfUrl: "/pdfs/SCComps.pdf",
      type: "Component Compendium"
    }
  ];

  const openModal = (caseStudy: any) => {
    setSelectedCase(caseStudy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateCase('prev');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateCase('next');
    } else if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  const navigateCase = (direction: string) => {
    const currentIndex = technicalWritingCases.findIndex(c => c.id === selectedCase?.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % technicalWritingCases.length;
    } else {
      newIndex = currentIndex === 0 ? technicalWritingCases.length - 1 : currentIndex - 1;
    }
    setSelectedCase(technicalWritingCases[newIndex]);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateCase('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateCase('next');
      } else if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleGlobalKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isModalOpen, selectedCase]);

  return (
    <section id="tech-writing" className="py-20 bg-muted/50" aria-labelledby="tech-writing-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="subheading text-primary text-lg mb-4" role="text">Content Strategy, Documentation & Editing</p>
          <h2 id="tech-writing-heading" className="text-4xl font-bold mb-4">Technical Writing & Editing Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" role="text">
            I create clear, compelling content that bridges the gap between complex technology and human understanding.
            Through strategic writing and meticulous editing, I empower users, reduce support burden, and drive product adoption.
          </p>
        </div>

        {/* Writing Philosophy */}
        <aside className="glass-card-primary p-8 rounded-xl mb-16 max-w-4xl mx-auto" aria-labelledby="philosophy-heading">
          <h3 id="philosophy-heading" className="text-2xl font-semibold mb-4 text-center">My Writing & Editing Philosophy</h3>
          <blockquote className="text-lg text-muted-foreground text-center leading-relaxed">
            "Great technical writing and editing is invisible. It gets users to their destination without them noticing the journey.
            Every word should have a purpose, every sentence should move the reader forward, and every document should
            solve a real problem."
          </blockquote>
        </aside>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Technical writing and editing case studies">
          {technicalWritingCases.map((caseStudy) => (
            <article
              key={caseStudy.id}
              role="listitem"
              className="group glass-card rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary flex flex-col h-full card-interactive cursor-pointer"
              onClick={() => openModal(caseStudy)}
            >
              <div className="aspect-video glass-section flex items-center justify-center card-image overflow-hidden" role="img" aria-label={`Preview image for ${caseStudy.title}`}>
                <img
                  src={caseStudy.image}
                  alt={`Preview for ${caseStudy.title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold mb-3" id={`writing-title-${caseStudy.id}`}>{caseStudy.title}</h3>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full ml-2 flex-shrink-0">
                    {caseStudy.type}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 flex-grow" aria-describedby={`writing-title-${caseStudy.id}`}>{caseStudy.description}</p>
                <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Project tags">
                  {caseStudy.tags.slice(0, 3).map((tag: string, index: number) => (
                    <span key={index} role="listitem" className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-auto btn-animate hover-glow"
                  aria-label={`View writing and editing sample for ${caseStudy.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(caseStudy);
                  }}
                >
                  View Writing & Editing Sample
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Tools & Methodology */}
        <aside className="glass-card-accent p-8 rounded-xl" aria-labelledby="tools-heading">
          <h3 id="tools-heading" className="text-2xl font-semibold mb-6 text-center">Tools & Methodology</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium mb-4">Writing & Documentation Tools</h4>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Writing tools">
                {["Notion", "Confluence", "GitBook", "Markdown", "Figma", "Miro"].map((tool) => (
                  <span key={tool} role="listitem" className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Research & Analysis</h4>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Research methods">
                {["User Interviews", "Content Audits", "Analytics", "A/B Testing", "Heuristic Analysis"].map((method) => (
                  <span key={method} role="listitem" className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent
            className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-7xl w-[95vw] max-h-[90vh] flex flex-col z-50"
            onKeyDown={handleKeyDown}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Skip link for screen readers */}
            <a
              href="#modal-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium z-50"
            >
              Skip to content
            </a>

            <DialogHeader className="flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateCase('prev')}
                    className="p-2 h-8 w-8"
                    aria-label={`Previous writing and editing sample: ${technicalWritingCases[(technicalWritingCases.findIndex(c => c.id === selectedCase?.id) - 1 + technicalWritingCases.length) % technicalWritingCases.length]?.title}`}
                    disabled={technicalWritingCases.length <= 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                  <div className="text-sm text-muted-foreground" aria-live="polite">
                    {technicalWritingCases.findIndex(c => c.id === selectedCase?.id) + 1} of {technicalWritingCases.length}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateCase('next')}
                    className="p-2 h-8 w-8"
                    aria-label={`Next writing and editing sample: ${technicalWritingCases[(technicalWritingCases.findIndex(c => c.id === selectedCase?.id) + 1) % technicalWritingCases.length]?.title}`}
                    disabled={technicalWritingCases.length <= 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                <span>Use</span>
                <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">←</kbd>
                <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">→</kbd>
                <span>to navigate</span>
                <span className="mx-1">•</span>
                <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">ESC</kbd>
                <span>to close</span>
              </div>
              <DialogTitle id="modal-title" className="text-xl md:text-2xl pr-8 text-green-800">{selectedCase?.title}</DialogTitle>
              <DialogDescription id="modal-description" className="text-muted-foreground mt-2">
                {selectedCase?.description}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-scroll" id="modal-content">
              <div className="space-y-6">
                {/* Project Information */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3 text-lg">Project Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedCase?.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-lg">Key Deliverables</h4>
                      <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                        <li>Comprehensive technical documentation and analysis</li>
                        <li>User research and usability findings</li>
                        <li>Actionable recommendations for improvement</li>
                        <li>Professional presentation and reporting</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3 text-lg">Key Skills & Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCase?.tags.map((tag: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-lg">Writing Type</h4>
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                        {selectedCase?.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* PDF Viewer */}
                <div className="border-t pt-6">
                  <h4 className="text-xl md:text-2xl pr-8 text-green-800 font-semibold mb-4">Full Writing & Editing Sample</h4>
                  <PDFViewer
                    pdfUrl={selectedCase?.pdfUrl}
                    title={selectedCase?.title}
                    hideScrollIndicator={true}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { PDFViewer } from './PDFViewer';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { getAssetPath } from '../lib/utils';

export function TechnicalWriting() {
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const modalRef = useRef(null);

  const technicalWritingCases = [
    {
      id: 1,
      title: "Instruction Writing: Granny Square Crochet Pattern",
      description: "Detailed crochet pattern instructions for creating beautiful granny square designs, including step-by-step guidance, materials list, and variations for different skill levels.",
      tags: ["Instruction Writing", "Technical Writing", "Craft Instructions", "Pattern Design"],
      image: getAssetPath("pdfs/GrannySquarePic.png"),
      pdfUrl: getAssetPath("pdfs/GrannySquare.pdf"),
      type: ["Instruction Writing"]
    },
    {
      id: 2,
      title: "Memo Writing & Instruction Editing: Granny Square Pattern Refined for Intercultural Audiences",
      description: "Refined the first version of my instructional document, How to Crochet a Basic Granny Square, as part of a technical communication course. This second iteration focused on improving clarity, localization potential, and visual readability while maintaining an accessible, beginner-friendly tone.",
      tags: ["Technical Writing", "Localization", "Instruction Writing", "Cultural Adaptation"],
      image: getAssetPath("pdfs/Yarn.png"),
      pdfUrl: getAssetPath("pdfs/InterculturalGrannySquare.pdf"),
      type: ["Instruction Editing", "Memo Writing"]
    },
    {
      id: 3,
      title: "Poppin' Joe's Content Strategy & Style Guide",
      description: "Complete content strategy and style guide development for a local coffee shop, including brand voice guidelines, content calendar templates, and social media strategy.",
      tags: ["Content Strategy", "Brand Guidelines", "Style Guide", "Social Media"],
      image: getAssetPath("pdfs/poppinjoes.png"),
      pdfUrl: getAssetPath("pdfs/poppin-joe-content-strategy.pdf"),
      type: ["Content Strategy"]
    },
    {
      id: 4,
      title: "Poppin' Joe's Site Analysis Report",
      description: "Detailed analysis of a coffee shop's existing website, evaluating design effectiveness, user experience, and technical performance with specific improvement recommendations.",
      tags: ["Site Analysis", "Web Evaluation", "Technical Writing", "UX Audit"],
      image: getAssetPath("pdfs/poppinjoes.png"),
      pdfUrl: getAssetPath("pdfs/poppin-joe-site-analysis.pdf"),
      type: ["Site Analysis"]
    },
    {
      id: 5,
      title: "Suzanne Collins Author Website Design Report",
      description: "Comprehensive design analysis and report for the official website of bestselling author Suzanne Collins, evaluating visual design, user experience, and content organization.",
      tags: ["Design Analysis", "Author Website", "Visual Design", "UX Evaluation"],
      image: getAssetPath("pdfs/SuzanneCollins.png"),
      pdfUrl: getAssetPath("pdfs/SCDesignReport.pdf"),
      type: "Design Report"
    },
    {
      id: 6,
      title: "Suzanne Collins Heuristic Evaluation",
      description: "Expert heuristic evaluation of Suzanne Collins' author website using Nielsen's 10 usability heuristics, identifying specific usability issues and severity ratings.",
      tags: ["Heuristic Evaluation", "Usability Heuristics", "Expert Review", "UX Assessment"],
      image: getAssetPath("pdfs/SuzanneCollins.png"),
      pdfUrl: getAssetPath("pdfs/SCHeuristicEvaluation.pdf"),
      type: "Heuristic Evaluation"
    },
    {
      id: 7,
      title: "Suzanne Collins Component Compendium",
      description: "Detailed documentation of reusable UI components and design patterns identified from Suzanne Collins' website, including specifications and usage guidelines.",
      tags: ["Component Documentation", "UI Patterns", "Design Systems", "Technical Specs"],
      image: getAssetPath("pdfs/SuzanneCollins.png"),
      pdfUrl: getAssetPath("pdfs/SCComps.pdf"),
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

  // Reset scroll state when modal opens/closes or case changes
  useEffect(() => {
    setIsScrolledToBottom(false);
  }, [isModalOpen, selectedCase]);

  const toggleScroll = () => {
    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
      if (isScrolledToBottom) {
        modalContent.scrollTo({ top: 0, behavior: 'smooth' });
        setIsScrolledToBottom(false);
      } else {
        modalContent.scrollTo({ top: modalContent.scrollHeight, behavior: 'smooth' });
        setIsScrolledToBottom(true);
      }
    }
  };

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" role="list" aria-label="Technical writing and editing case studies">
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
                  className="w-full h-full object-contain"
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
                  aria-label={`View project documentation for ${caseStudy.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(caseStudy);
                  }}
                >
                  View Project Documentation
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Tools & Methodology */}
        <aside className="glass-card-accent p-8 rounded-xl mt-8" aria-labelledby="tools-heading">
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
                    aria-label={`Previous project documentation: ${technicalWritingCases[(technicalWritingCases.findIndex(c => c.id === selectedCase?.id) - 1 + technicalWritingCases.length) % technicalWritingCases.length]?.title}`}
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
                    aria-label={`Next project documentation: ${technicalWritingCases[(technicalWritingCases.findIndex(c => c.id === selectedCase?.id) + 1) % technicalWritingCases.length]?.title}`}
                    disabled={technicalWritingCases.length <= 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground btn-animate hover-glow h-9 px-5"
                    onClick={toggleScroll}
                    aria-label={isScrolledToBottom ? "Scroll to top" : "Scroll to bottom"}
                  >
                    {isScrolledToBottom ? "↑" : "↓"}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <DialogTitle id="modal-title" className="text-xl md:text-2xl text-green-800">{selectedCase?.title}</DialogTitle>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>Use</span>
                  <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">←</kbd>
                  <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">→</kbd>
                  <span>to navigate</span>
                  <span className="mx-1">•</span>
                  <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">ESC</kbd>
                  <span>to close</span>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-scroll" id="modal-content">
              <div className="space-y-6">
                {/* PDF Viewer - Above project information */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">Project Documentation</h4>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground btn-animate hover-glow whitespace-nowrap h-9 px-5"
                      onClick={() => window.open(selectedCase?.pdfUrl, '_blank')}
                      title="Open PDF in full screen"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 14l-9-9-9 9" />
                      </svg>
                      Full Screen
                    </Button>
                  </div>
                  <PDFViewer
                    pdfUrl={selectedCase?.pdfUrl}
                    useIframe={true}
                    hideOverlayButton={true}
                    hideScrollIndicator={true}
                  />
                </div>

                {/* Project Information - Below PDF viewer */}
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
                      <div className="flex flex-wrap gap-2">
                        {selectedCase?.type.map((type: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* CTA Section at Bottom */}
            <div className="flex-shrink-0 mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/30 -mx-6 px-6 py-4 -mb-6 rounded-b-xl">
              <div className="text-center sm:text-left">
                <h4 className="font-semibold text-base mb-1">Interested in similar work?</h4>
                <p className="text-sm text-muted-foreground">Let's discuss how I can help with your project</p>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground btn-animate hover-glow whitespace-nowrap h-9 px-5"
                onClick={() => {
                  setIsModalOpen(false);
                  setTimeout(() => {
                    const element = document.getElementById('contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Get In Touch
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
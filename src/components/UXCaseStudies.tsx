import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { PDFViewer } from './PDFViewer';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function UXCaseStudies() {
  const [showDownloadButton, setShowDownloadButton] = useState(true);
  const [showScrollDownButton, setShowScrollDownButton] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const caseStudies = [
    {
      title: "Poppin' Joe's Kettle Corn E-Commerce Website Redesign",
      description: "Redesigned the website for a beloved family brand by conducting a site analysis, creating a content strategy report, and developing a full editorial style guide. The project improved navigation, clarified brand voice, and established a cohesive, accessible digital presence.",
      tags: ["User Research", "Information Architecture", "Style Guide", "Brand Voice", "Accessibility"],
      image: "/pdfs/poppinjoes.png",
      pdfUrls: [
        "/pdfs/poppin-joe-site-analysis.pdf",
        "/pdfs/poppin-joe-content-strategy.pdf",
        "/pdfs/poppin-joe-style-guide.pdf"
      ],
      pdfTitles: [
        "Site Analysis Report",
        "Content Strategy Report",
        "Editorial Style Guide"
      ]
    },
    {
      title: "Pacific Northwest X-Ray Inc. Website Usability Test Report",
      description: "Conducted comprehensive usability testing for Pacific Northwest X-Ray Inc.'s website, identifying key user experience issues and providing actionable recommendations for improvement.",
      tags: ["Usability Testing", "User Research", "Healthcare UX", "Accessibility", "User Experience"],
      image: "/pdfs/PNWX.png",
      pdfUrl: "/pdfs/Pacific Northwest X-Ray Inc. Website Usability Test Report.pdf"
    },
    {
      title: "Rowlly Properties Case Study",
      description: "Designed and built a fully functional property management website for Rowlly Properties, focused on improving discoverability, usability, and accessibility for buyers, renters, and investors.",
      tags: ["UX Research", "UI Design", "Responsive Design", "Prototyping", "Real Estate"],
      image: "/pdfs/RowllyProperties.png",
      webUrl: "https://turnerlillian.github.io/refactored-goldfish/"
    },
    {
      title: "Charity: Water Fundraising Landing Page",
      description: "Developed a responsive fundraising landing page for charity: water as part of the Global Career Accelerator program. The page targeted Gen-Z donors and emphasized clear calls-to-action and mobile-first usability.",
      tags: ["HTML/CSS", "Responsive Design", "AI-Assisted Development", "GitHub Pages", "UX Best Practices"],
      image: "/pdfs/Blog_Charity-Water.png",
      webUrl: "https://lillianturner.github.io/CR-02-charity-water-lp/"
    },
    {
      title: "Suzanne Collins Website Heuristic Evaluation & Redesign",
      description: "Redesigned the official Suzanne Collins author website to improve usability, clarity, and modern appeal. This project began with a heuristic evaluation of the existing desktop and mobile site, followed by wireframe redesigns that focused on readability, navigation, and visual hierarchy.",
      tags: ["Heuristic Evaluation", "Website Redesign", "UX Research", "Visual Design", "Information Architecture"],
      image: "/pdfs/SuzanneCollins.png",
      pdfUrls: [
        "/pdfs/SCHeuristicEvaluation.pdf",
        "/pdfs/SCComps.pdf",
        "/pdfs/SCDesignReport.pdf"
      ],
      pdfTitles: [
        "Desktop & Mobile Heuristic Evaluation",
        "High-Fidelity Wireframes",
        "Website Redesign Explanation & Report"
      ]
    },
    {
      title: "Yale School of Art Website Homepage Redesign",
      description: "Redesigned the Yale School of Art website as part of a university UX project. While aware of the site's intentionally unconventional, wiki-like structure designed to reflect the school's experimental ethos, this redesign explored how the site's accessibility and usability could be improved without losing its creative identity.",
      tags: ["Website Redesign", "Institutional UX", "Wireframing", "Responsive Design", "Visual Hierarchy"],
      image: "/pdfs/YSAPicture.png",
      pdfUrls: [
        "/pdfs/YSABefore.pdf",
        "/pdfs/YSAWireframes.pdf",
        "/pdfs/YSAFinalMockup.pdf"
      ],
      pdfTitles: [
        "Homepage Before",
        "Homepage Redesign Rough Wireframes",
        "Homepage Redesign Final Mockup"
      ]
    }
  ];

  const [selectedStudy, setSelectedStudy] = useState<typeof caseStudies[0] | null>(null);

  const currentStudyIndex = selectedStudy ? caseStudies.findIndex(study => study.title === selectedStudy.title) : -1;

  const navigateToStudy = (direction: 'prev' | 'next') => {
    if (currentStudyIndex === -1) return;
    
    const newIndex = direction === 'next' 
      ? (currentStudyIndex + 1) % caseStudies.length
      : (currentStudyIndex - 1 + caseStudies.length) % caseStudies.length;
    
    setSelectedStudy(caseStudies[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateToStudy('prev');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateToStudy('next');
    } else if (e.key === 'Escape') {
      setSelectedStudy(null);
    }
  };

  const scrollToTop = () => {
    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
      modalContent.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const scrollToProjectDocs = () => {
    // Determine which section to scroll to based on the case study
    const isLivePreviewStudy = selectedStudy?.title === "Charity: Water Fundraising Landing Page" || 
                                selectedStudy?.title === "Rowlly Properties Case Study";
    
    const targetId = isLivePreviewStudy ? 'live-project-preview' : 'project-documentation';
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle scroll to hide/show buttons and track position
  useEffect(() => {
    const modalContent = document.getElementById('modal-content');
    
    if (!modalContent) return;

    const handleScroll = () => {
      // Hide download button while scrolling
      setShowDownloadButton(false);
      
      // Check if at top of modal (within 10px threshold)
      const isAtTop = modalContent.scrollTop <= 10;
      
      // Check if at bottom of modal (within 10px threshold)
      const isNearBottom = modalContent.scrollHeight - modalContent.scrollTop - modalContent.clientHeight <= 10;
      setIsAtBottom(isNearBottom);
      
      // Show scroll button if at top OR at bottom
      setShowScrollDownButton(isAtTop || isNearBottom);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Show download button again after scrolling stops (300ms delay)
      scrollTimeoutRef.current = setTimeout(() => {
        setShowDownloadButton(true);
      }, 300);
    };

    modalContent.addEventListener('scroll', handleScroll);
    
    return () => {
      modalContent.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [selectedStudy]);

  // Reset button visibility when modal opens
  useEffect(() => {
    if (selectedStudy) {
      setShowDownloadButton(true);
      setShowScrollDownButton(true);
      setIsAtBottom(false);
    }
  }, [selectedStudy]);

  return (
    <section id="ux-studies" className="py-20" aria-labelledby="ux-studies-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="subheading text-primary text-lg mb-4" role="text">User Experience Research & Design</p>
          <h2 id="ux-studies-heading" className="text-4xl font-bold mb-4">UX Case Studies</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" role="text">
            Real projects, real impact. Here's how I've helped businesses improve their user experience and achieve their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="UX case studies">
          {caseStudies.map((study, index) => (
            <article 
              key={index} 
              role="listitem" 
              className="group glass-card rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary flex flex-col h-full card-interactive cursor-pointer"
              onClick={() => setSelectedStudy(study)}
            >
              <div className="aspect-video glass-section flex items-center justify-center card-image overflow-hidden" role="img" aria-label={`Preview image for ${study.title}`}>
                <img src={study.image} alt={`Preview for ${study.title}`} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3" id={`study-title-${index}`}>{study.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow" aria-describedby={`study-title-${index}`}>{study.description}</p>
                <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Project tags">
                  {study.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} role="listitem" className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-auto btn-animate hover-glow" 
                  aria-label={`View case study for ${study.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStudy(study);
                  }}
                >
                  View Case Study
                </Button>
              </div>
            </article>
          ))}
        </div>

        <Dialog open={!!selectedStudy} onOpenChange={() => setSelectedStudy(null)}>
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
                    onClick={() => navigateToStudy('prev')}
                    className="p-2 h-8 w-8"
                    aria-label={`Previous case study: ${caseStudies[(currentStudyIndex - 1 + caseStudies.length) % caseStudies.length]?.title}`}
                    disabled={caseStudies.length <= 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                  <div className="text-sm text-muted-foreground" aria-live="polite">
                    {currentStudyIndex + 1} of {caseStudies.length}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateToStudy('next')}
                    className="p-2 h-8 w-8"
                    aria-label={`Next case study: ${caseStudies[(currentStudyIndex + 1) % caseStudies.length]?.title}`}
                    disabled={caseStudies.length <= 1}
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
              <DialogTitle id="modal-title" className="text-xl md:text-2xl pr-8 text-green-800">{selectedStudy?.title}</DialogTitle>
            </DialogHeader>

            {/* Sticky Download Button - Fixed to viewport, positioned above footer */}
            {(selectedStudy?.pdfUrls || selectedStudy?.pdfUrl) && (
              <div className={`fixed bottom-24 left-8 z-50 transition-opacity duration-300 ${showDownloadButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {selectedStudy?.pdfUrls && (
                  <Button
                    onClick={() => {
                      selectedStudy.pdfUrls?.forEach((url, index) => {
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = url.split('/').pop() || `document-${index + 1}.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      });
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow rounded-full h-12 px-5 flex items-center gap-2 btn-animate hover-glow"
                    title="Download all PDFs"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden sm:inline">Download All</span>
                    <span className="sm:hidden">All</span>
                  </Button>
                )}
                {selectedStudy?.pdfUrl && (
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = selectedStudy.pdfUrl || '';
                      link.download = selectedStudy.pdfUrl?.split('/').pop() || 'document.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow rounded-full h-12 px-5 flex items-center gap-2 btn-animate hover-glow"
                    title="Download PDF"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                )}
              </div>
            )}

            {/* Sticky Open in New Tab Button - Fixed to viewport, positioned above footer */}
            {selectedStudy?.webUrl && (
              <div className={`fixed bottom-24 left-8 z-50 transition-opacity duration-300 ${showDownloadButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <Button
                  onClick={() => window.open(selectedStudy.webUrl, '_blank')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow rounded-full h-12 px-5 flex items-center gap-2 btn-animate hover-glow"
                  title="Open project in new tab"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="hidden sm:inline">Open Project</span>
                  <span className="sm:hidden">Open</span>
                </Button>
              </div>
            )}

            {/* Sticky Open PDFs in New Tab Button - Fixed to viewport, positioned bottom right */}
            {(selectedStudy?.pdfUrls || selectedStudy?.pdfUrl) && (
              <div className={`fixed bottom-24 right-8 z-50 transition-opacity duration-300 ${showDownloadButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {selectedStudy?.pdfUrls && (
                  <Button
                    onClick={() => {
                      selectedStudy.pdfUrls?.forEach((url) => {
                        window.open(url, '_blank');
                      });
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow rounded-full h-12 px-5 flex items-center gap-2 btn-animate hover-glow"
                    title="Open all PDFs in new tabs"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="hidden sm:inline">Open PDFs</span>
                    <span className="sm:hidden">Open</span>
                  </Button>
                )}
                {selectedStudy?.pdfUrl && (
                  <Button
                    onClick={() => {
                      window.open(selectedStudy.pdfUrl, '_blank');
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow rounded-full h-12 px-5 flex items-center gap-2 btn-animate hover-glow"
                    title="Open PDF in new tab"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="hidden sm:inline">Open PDF</span>
                    <span className="sm:hidden">Open</span>
                  </Button>
                )}
              </div>
            )}

            {/* Scroll Button - Bottom center */}
            {showScrollDownButton && (
              <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300">
                <Button
                  onClick={() => {
                    if (isAtBottom) {
                      scrollToTop();
                    } else {
                      scrollToProjectDocs();
                    }
                    setShowScrollDownButton(false);
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all rounded-full h-12 w-12 p-0 flex items-center justify-center btn-animate hover-glow animate-gentle-bounce"
                  title={isAtBottom ? "Scroll to top" : "Scroll to Project Documentation"}
                  aria-label={isAtBottom ? "Scroll to top of modal" : "Scroll to Project Documentation section"}
                >
                  {isAtBottom ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                </Button>
              </div>
            )}

            <div className="flex-1 overflow-y-scroll" id="modal-content">
              {/* Special layout for Poppin Joe's with multiple PDFs */}
              {selectedStudy?.title === "Poppin' Joe's Kettle Corn E-Commerce Website Redesign" ? (
                <div className="space-y-6">
                  {/* Project Information - First */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Project Overview</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          This comprehensive redesign project focused on transforming Poppin' Joe's online presence through
                          strategic user research and content strategy. The work included detailed site analysis to identify
                          usability issues, development of a comprehensive content strategy to strengthen brand voice, and
                          creation of an editorial style guide to ensure consistent messaging across all touchpoints.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Deliverables</h4>
                                                <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                          <li>Gained hands-on experience in full-stack web development using React and Node.js</li>
                          <li>Learned to integrate complex features like property search and map functionality</li>
                          <li>Developed skills in responsive design and cross-device compatibility</li>
                          <li>Applied UX principles to create an intuitive real estate browsing experience</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Skills & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudy?.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Impact & Results</h4>
                        <ul className="text-muted-foreground space-y-2 text-sm list-disc pl-6">
                          <li>Improved site navigation and user flow clarity</li>
                          <li>Established consistent brand voice and messaging</li>
                          <li>Enhanced accessibility and user experience standards</li>
                          <li>Created scalable content framework for future growth</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* PDF Grid - Below project information */}
                  <div className="space-y-4">
                    <h4 id="project-documentation" className="font-semibold text-xl md:text-2xl text-green-800">Project Documentation</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                      {selectedStudy.pdfUrls?.map((pdfUrl, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm">{selectedStudy.pdfTitles?.[index] || `Document ${index + 1}`}</h5>
                            <Button
                              size="sm"
                              onClick={() => window.open(pdfUrl, '_blank')}
                              className="flex items-center gap-1 bg-green-800 hover:bg-green-700 text-white btn-animate hover-glow h-7 px-2 text-xs"
                              title="Open PDF in full screen"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 14l-9-9-9 9" />
                              </svg>
                              <span className="hidden sm:inline">Full Screen</span>
                            </Button>
                          </div>
                          <PDFViewer
                            pdfUrl={pdfUrl}
                            className="w-full flex-1"
                            useIframe={true}
                            hideOverlayButton={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : selectedStudy?.title === "Suzanne Collins Website Heuristic Evaluation & Redesign" ? (
                /* Special layout for Suzanne Collins - multiple PDFs like Poppin Joe's */
                <div className="space-y-6">
                  {/* Project Information - First */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Project Overview</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Redesigned the official Suzanne Collins author website to improve usability, clarity, and modern appeal. This project began with a heuristic evaluation of the existing desktop and mobile site, followed by wireframe redesigns that focused on readability, navigation, and visual hierarchy.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Deliverables</h4>
                        <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                          <li>Full heuristic evaluations for desktop and mobile versions of the site</li>
                          <li>Design report outlining usability findings and recommendations</li>
                          <li>Redesigned high-fidelity mockups for the homepage, About, Works, and Interviews pages</li>
                          <li>Updated color palette, typography, and navigation structure inspired by Sunrise on the Reaping cover art</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Skills & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudy?.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Impact & Results</h4>
                        <ul className="text-muted-foreground space-y-2 text-sm list-disc pl-6">
                          <li>Simplified a confusing three-column layout into clean, modern single-column designs</li>
                          <li>Improved site navigation by adding a search bar, events, and contact pages</li>
                          <li>Enhanced scannability and visual consistency across all pages</li>
                          <li>Strengthened my ability to turn heuristic feedback into design solutions and communicate design rationale through written documentation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* PDF Grid - Below project information */}
                  <div className="space-y-4">
                    <h4 id="project-documentation" className="font-semibold text-xl md:text-2xl text-green-800">Project Documentation</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                      {selectedStudy.pdfUrls?.map((pdfUrl, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm">{selectedStudy.pdfTitles?.[index] || `Document ${index + 1}`}</h5>
                            <Button
                              size="sm"
                              onClick={() => window.open(pdfUrl, '_blank')}
                              className="flex items-center gap-1 bg-green-800 hover:bg-green-700 text-white btn-animate hover-glow h-7 px-2 text-xs"
                              title="Open PDF in full screen"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 14l-9-9-9 9" />
                              </svg>
                              <span className="hidden sm:inline">Full Screen</span>
                            </Button>
                          </div>
                          <PDFViewer
                            pdfUrl={pdfUrl}
                            className="w-full flex-1"
                            useIframe={true}
                            hideOverlayButton={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : selectedStudy?.title === "Yale School of Art Website Homepage Redesign" ? (
                /* Special layout for Yale School of Art - multiple PDFs like Poppin Joe's */
                <div className="space-y-6">
                  {/* Project Information - First */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Project Overview</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Redesigned the Yale School of Art website as part of a university UX project. While aware of the site's intentionally unconventional, wiki-like structure designed to reflect the school's experimental ethos, this redesign explored how the site's accessibility and usability could be improved without losing its creative identity.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Deliverables</h4>
                        <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                          <li>Desktop and mobile redesigns focused on clarity, navigation, and readability</li>
                          <li>Low- and mid-fidelity wireframes refined through peer feedback</li>
                          <li>Final high-fidelity mockups demonstrating an improved visual hierarchy</li>
                          <li>Comparison analysis of the original site's layout and interaction model</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Skills & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudy?.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Impact & Results</h4>
                        <ul className="text-muted-foreground space-y-2 text-sm list-disc pl-6">
                          <li>Streamlined a cluttered, text-heavy layout into a clear, navigable experience</li>
                          <li>Maintained the site's creative spirit while emphasizing usability and cohesion</li>
                          <li>Strengthened skills in wireframing, responsive layout design, and critique integration</li>
                          <li>Deepened understanding of how institutional culture can influence UX decisions</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* PDF Grid - Below project information */}
                  <div className="space-y-4">
                    <h4 id="project-documentation" className="font-semibold text-xl md:text-2xl text-green-800">Project Documentation</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                      {selectedStudy.pdfUrls?.map((pdfUrl, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm">{selectedStudy.pdfTitles?.[index] || `Document ${index + 1}`}</h5>
                            <Button
                              size="sm"
                              onClick={() => window.open(pdfUrl, '_blank')}
                              className="flex items-center gap-1 bg-green-800 hover:bg-green-700 text-white btn-animate hover-glow h-7 px-2 text-xs"
                              title="Open PDF in full screen"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 14l-9-9-9 9" />
                              </svg>
                              <span className="hidden sm:inline">Full Screen</span>
                            </Button>
                          </div>
                          <PDFViewer
                            pdfUrl={pdfUrl}
                            className="w-full flex-1"
                            useIframe={true}
                            hideOverlayButton={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : selectedStudy?.title === "Charity: Water Fundraising Landing Page" ? (
                /* Special layout for Charity: Water - webpage preview */
                <div className="space-y-6">
                  {/* Project Information - First */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Project Overview</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Developed a responsive fundraising landing page for charity: water as part of the Global Career Accelerator program. The page targeted Gen-Z donors and emphasized clear calls-to-action and mobile-first usability.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Deliverables</h4>
                        <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                          <li>Fully coded HTML/CSS landing page for desktop and mobile</li>
                          <li>AI-assisted development using GitHub Copilot and ChatGPT</li>
                          <li>Applied UX best practices in hierarchy, responsiveness, and clarity</li>
                          <li>Final hosted project on GitHub Pages</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Skills & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudy?.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Impact & Results</h4>
                        <ul className="text-muted-foreground space-y-2 text-sm list-disc pl-6">
                          <li>Built a fully functional, responsive webpage from concept to deployment</li>
                          <li>Enhanced proficiency in HTML/CSS and responsive design</li>
                          <li>Strengthened AI collaboration and technical problem-solving skills</li>
                          <li>Improved prompt engineering and workflow efficiency through AI-assisted learning</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Webpage Preview - Below project information */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 id="live-project-preview" className="font-semibold text-xl md:text-2xl text-green-800">Live Project Preview</h4>
                      {/* Open in new tab button aligned with heading */}
                      <Button
                        size="sm"
                        onClick={() => window.open(selectedStudy.webUrl, '_blank')}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground btn-animate hover-glow"
                        title="Open webpage in new tab"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Open in New Tab
                      </Button>
                    </div>
                    <div className="w-full">
                      <iframe
                        src={selectedStudy.webUrl}
                        title="Charity: Water Fundraising Landing Page"
                        className="w-full h-96 border rounded-lg"
                        scrolling="auto"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ) : selectedStudy?.title === "Rowlly Properties Case Study" ? (
                /* Special layout for Rowlly Properties - webpage preview */
                <div className="space-y-6">
                  {/* Project Information - First */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Project Overview</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Created a modern, user-friendly property management website for Rowlly Properties that allows users to browse listings, view details, and contact agents. The design focused on accessibility, fast load times, and a smooth experience for buyers, renters, and investors.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Deliverables</h4>
                        <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                          <li>Fully functional, responsive website for desktop and mobile</li>
                          <li>Coded homepage, property listings, and agent contact pages</li>
                          <li>Integrated property filters, map views, and inquiry forms</li>
                          <li>Visual design inspired by leading real estate sites like Zillow and Redfin</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Skills & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudy?.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Impact & Results</h4>
                        <ul className="text-muted-foreground space-y-2 text-sm list-disc pl-6">
                          <li>Delivered a high-fidelity, fully responsive property website optimized for usability and performance</li>
                          <li>Improved user flow and filtering experience based on real user feedback</li>
                          <li>Strengthened UX/UI design, prototyping, and front-end development skills</li>
                          <li>Demonstrated ability to balance business goals (conversion, engagement) with user needs across multiple personas</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Webpage Preview - Below project information */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 id="live-project-preview" className="font-semibold text-xl md:text-2xl text-green-800">Live Project Preview</h4>
                      {/* Open in new tab button aligned with heading */}
                      <Button
                        size="sm"
                        onClick={() => window.open(selectedStudy.webUrl, '_blank')}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground btn-animate hover-glow"
                        title="Open webpage in new tab"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Open in New Tab
                      </Button>
                    </div>
                    <div className="w-full">
                      <iframe
                        src={selectedStudy.webUrl}
                        title="Rowlly Properties Case Study"
                        className="w-full h-96 border rounded-lg"
                        scrolling="auto"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Default layout for other case studies - matching Poppin Joe's structure */
                <div className="space-y-6">
                  {/* Project Information - First */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Project Overview</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {selectedStudy?.title === "Pacific Northwest X-Ray Inc. Website Usability Test Report" && (
                            "Conducted a usability test of Pacific Northwest X-Ray Inc.'s e-commerce site to assess how efficiently medical professionals could locate and purchase equipment. The study identified major pain points in navigation, product search, and ordering flow."
                          )}
                          {selectedStudy?.title === "Mobile Banking App" && (
                            "This mobile banking application redesign focused on creating a secure, intuitive, and accessible banking experience. The project addressed key pain points in mobile financial services, implementing biometric authentication, simplified navigation, and comprehensive accessibility features to serve users with diverse needs and abilities."
                          )}
                          {selectedStudy?.title === "Charity: Water Fundraising Landing Page" && (
                            "Developed a responsive fundraising landing page for charity: water as part of the Global Career Accelerator program. The page targeted Gen-Z donors and emphasized clear calls-to-action and mobile-first usability."
                          )}
                          {selectedStudy?.title === "Healthcare Patient Portal" && (
                            "This patient portal redesign addressed critical usability issues in healthcare technology, focusing on HIPAA compliance, accessibility standards, and intuitive navigation for patients managing their healthcare journey. The project involved collaboration with healthcare providers and extensive user testing with patients of varying technical proficiency."
                          )}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Deliverables</h4>
                        <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                          {selectedStudy?.title === "Pacific Northwest X-Ray Inc. Website Usability Test Report" && (
                            <>
                              <li>Usability test plan with three realistic task scenarios</li>
                              <li>Participant observations and timing data</li>
                              <li>Synthesized findings on navigation, search, and ordering issues</li>
                              <li>Actionable redesign recommendations for clearer structure and smoother checkout</li>
                            </>
                          )}
                          {selectedStudy?.title === "Mobile Banking App" && (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Biometric authentication flow with Face ID and Touch ID integration</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Simplified transaction interface with gesture-based navigation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Comprehensive accessibility features meeting WCAG 2.1 AA standards</span>
                              </li>
                            </>
                          )}
                          {selectedStudy?.title === "Charity: Water Fundraising Landing Page" && (
                            <>
                              <li>Fully coded HTML/CSS landing page for desktop and mobile</li>
                              <li>AI-assisted development using GitHub Copilot and ChatGPT</li>
                              <li>Applied UX best practices in hierarchy, responsiveness, and clarity</li>
                              <li>Final hosted project on GitHub Pages</li>
                            </>
                          )}
                          {selectedStudy?.title === "Healthcare Patient Portal" && (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>HIPAA-compliant user interface with secure data handling</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Simplified appointment scheduling with conflict resolution</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Accessible design supporting screen readers and assistive technologies</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Skills & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudy?.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Impact & Results</h4>
                        <ul className="text-muted-foreground space-y-2 text-sm list-disc pl-6">
                          {selectedStudy?.title === "Pacific Northwest X-Ray Inc. Website Usability Test Report" && (
                            <>
                              <li>Identified navigation and product-filtering barriers that slowed task completion</li>
                              <li>Provided data-driven redesign proposals to improve efficiency and clarity</li>
                              <li>Strengthened UX research and usability testing methodology skills</li>
                              <li>Demonstrated ability to translate qualitative findings into practical design recommendations</li>
                            </>
                          )}
                          {selectedStudy?.title === "Mobile Banking App" && (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>300% increase in mobile app adoption</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>95% user satisfaction rating</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Full accessibility compliance achieved</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>50% reduction in support tickets</span>
                              </li>
                            </>
                          )}
                          {selectedStudy?.title === "Charity: Water Fundraising Landing Page" && (
                            <>
                              <li>Built a fully functional, responsive webpage from concept to deployment</li>
                              <li>Enhanced proficiency in HTML/CSS and responsive design</li>
                              <li>Strengthened AI collaboration and technical problem-solving skills</li>
                              <li>Improved prompt engineering and workflow efficiency through AI-assisted learning</li>
                            </>
                          )}
                          {selectedStudy?.title === "Healthcare Patient Portal" && (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>70% increase in patient portal usage</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>HIPAA compliance maintained</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>95% accessibility score achieved</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>50% reduction in phone inquiries</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* PDF Grid - Below project information */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 id="project-documentation" className="font-semibold text-xl md:text-2xl text-green-800">Project Documentation</h4>
                      {/* Full screen button aligned with heading */}
                      <Button
                        size="sm"
                        onClick={() => window.open(selectedStudy?.pdfUrl || "", '_blank')}
                        className="flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white btn-animate hover-glow"
                        title="Open PDF in full screen"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 14l-9-9-9 9" />
                        </svg>
                        Full Screen
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:gap-6">
                      <PDFViewer
                        pdfUrl={selectedStudy?.pdfUrl || ""}
                        className="w-full"
                        useIframe={true}
                        hideOverlayButton={true}
                      />
                    </div>
                  </div>
                </div>
              )}
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
                  setSelectedStudy(null);
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

      {/* Mobile-only floating back to top button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 md:hidden bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-12 h-12 p-0 shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </section>
  );
}
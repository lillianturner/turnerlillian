import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { PDFViewer } from './PDFViewer';

export function UXCaseStudies() {
  const caseStudies = [
    {
      title: "Poppin' Joe's Kettle Corn E-Commerce Website Redesign",
      description: "Redesigned the website for a beloved family brand by conducting a site analysis, creating a content strategy report, and developing a full editorial style guide. The project improved navigation, clarified brand voice, and established a cohesive, accessible digital presence.",
      tags: ["User Research", "Information Architecture", "Style Guide", "Brand Voice", "Accessibility"],
      image: "/placeholder-ecommerce.jpg",
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
      title: "Mobile Banking App",
      description: "Designed an intuitive mobile banking experience focusing on security and accessibility.",
      tags: ["Mobile Design", "Accessibility", "Security UX", "User Flows"],
      image: "/placeholder-banking.jpg",
      pdfUrl: "/pdfs/mobile-banking-case-study.pdf"
    },
    {
      title: "SaaS Dashboard Interface",
      description: "Simplified complex data visualization for better user decision-making and workflow efficiency.",
      tags: ["Data Visualization", "Dashboard Design", "Information Architecture", "User Testing"],
      image: "/placeholder-saas.jpg",
      pdfUrl: "/pdfs/saas-dashboard-case-study.pdf"
    },
    {
      title: "Healthcare Patient Portal",
      description: "Streamlined patient access to medical records and appointment scheduling with HIPAA-compliant design.",
      tags: ["Healthcare UX", "Accessibility", "Information Security", "User Journey Mapping"],
      image: "/placeholder-healthcare.jpg",
      pdfUrl: "/pdfs/healthcare-portal-case-study.pdf"
    },
    {
      title: "Educational Learning Platform",
      description: "Enhanced student engagement and learning outcomes through gamification and adaptive UI design.",
      tags: ["EdTech", "Gamification", "Adaptive Design", "User Engagement"],
      image: "/placeholder-education.jpg",
      pdfUrl: "/pdfs/education-platform-case-study.pdf"
    },
    {
      title: "Travel Booking Website",
      description: "Optimized the booking flow to reduce cart abandonment by 40% with improved UX patterns.",
      tags: ["Conversion Optimization", "User Flows", "Mobile-First Design", "Usability Testing"],
      image: "/placeholder-travel.jpg",
      pdfUrl: "/pdfs/travel-booking-case-study.pdf"
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
              <div className="aspect-video glass-section flex items-center justify-center card-image" role="img" aria-label={`Preview image for ${study.title}`}>
                <span className="text-muted-foreground">Project Image</span>
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
            className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-7xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col z-50"
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
              <div className="flex items-center justify-between">
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
              <DialogTitle id="modal-title" className="text-xl md:text-2xl pr-8 mt-4 text-green-800">{selectedStudy?.title}</DialogTitle>
              <DialogDescription id="modal-description" className="text-sm md:text-base">
                {selectedStudy?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto" id="modal-content">
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
                        <ul className="text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Complete site analysis report identifying UX issues and improvement opportunities</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Content strategy framework with brand voice guidelines and messaging hierarchy</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Editorial style guide ensuring consistent tone and terminology across all content</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3">Key Skills & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudy?.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Impact & Results</h4>
                        <ul className="text-muted-foreground space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>Improved site navigation and user flow clarity</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>Established consistent brand voice and messaging</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>Enhanced accessibility and user experience standards</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>Created scalable content framework for future growth</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* PDF Grid - Below project information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-xl md:text-2xl text-green-800">Project Documentation</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                      {selectedStudy.pdfUrls?.map((pdfUrl, index) => (
                        <div key={index} className="flex flex-col">
                          <PDFViewer
                            pdfUrl={pdfUrl}
                            title={selectedStudy.pdfTitles?.[index] || `Document ${index + 1}`}
                            className="w-full flex-1"
                            useIframe={true}
                          />
                        </div>
                      ))}
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
                          {selectedStudy?.title === "Mobile Banking App" && (
                            "This mobile banking application redesign focused on creating a secure, intuitive, and accessible banking experience. The project addressed key pain points in mobile financial services, implementing biometric authentication, simplified navigation, and comprehensive accessibility features to serve users with diverse needs and abilities."
                          )}
                          {selectedStudy?.title === "SaaS Dashboard Interface" && (
                            "This comprehensive dashboard redesign transformed complex data visualization into clear, actionable insights. The project involved extensive user research with data analysts and business users to understand their workflows, pain points, and information needs, resulting in a streamlined interface that improved decision-making efficiency."
                          )}
                          {selectedStudy?.title === "Healthcare Patient Portal" && (
                            "This patient portal redesign addressed critical usability issues in healthcare technology, focusing on HIPAA compliance, accessibility standards, and intuitive navigation for patients managing their healthcare journey. The project involved collaboration with healthcare providers and extensive user testing with patients of varying technical proficiency."
                          )}
                          {selectedStudy?.title === "Educational Learning Platform" && (
                            "This educational platform redesign leveraged gamification principles and adaptive design to enhance student engagement and learning outcomes. The project involved extensive research with educators, students, and learning specialists to create an inclusive, motivating environment that supports diverse learning styles and abilities."
                          )}
                          {selectedStudy?.title === "Travel Booking Website" && (
                            "This travel booking website optimization focused on reducing cart abandonment and improving conversion rates through strategic UX improvements. The project involved comprehensive user journey mapping, A/B testing, and iterative design refinements to create a seamless booking experience."
                          )}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Deliverables</h4>
                        <ul className="text-muted-foreground space-y-2">
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
                          {selectedStudy?.title === "SaaS Dashboard Interface" && (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Interactive data visualization components with drill-down capabilities</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Customizable dashboard layouts with drag-and-drop functionality</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Advanced filtering and search capabilities for large datasets</span>
                              </li>
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
                          {selectedStudy?.title === "Educational Learning Platform" && (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Gamified learning modules with progress tracking and rewards</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Adaptive difficulty adjustment based on student performance</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Collaborative learning features with peer interaction tools</span>
                              </li>
                            </>
                          )}
                          {selectedStudy?.title === "Travel Booking Website" && (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Streamlined booking funnel reducing steps by 40%</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Progressive disclosure pattern for complex travel options</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Mobile-first responsive design with touch-optimized interactions</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3">Key Skills & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudy?.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Impact & Results</h4>
                        <ul className="text-muted-foreground space-y-2 text-sm">
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
                          {selectedStudy?.title === "SaaS Dashboard Interface" && (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>60% faster data insights generation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>85% user task completion rate</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>40% reduction in training time</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Enterprise-wide adoption achieved</span>
                              </li>
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
                          {selectedStudy?.title === "Educational Learning Platform" && (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>45% improvement in learning outcomes</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>80% student engagement increase</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Adaptive learning algorithm success</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Cross-platform accessibility achieved</span>
                              </li>
                            </>
                          )}
                          {selectedStudy?.title === "Travel Booking Website" && (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>35% increase in conversion rates</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>60% reduction in cart abandonment</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Mobile conversion parity achieved</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>25% increase in average order value</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* PDF Grid - Below project information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-xl md:text-2xl text-green-800">Project Documentation</h4>
                    <div className="grid grid-cols-1 gap-4 md:gap-6">
                      <PDFViewer
                        pdfUrl={selectedStudy?.pdfUrl || ""}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0 flex justify-between items-center pt-4 border-t">
              <div className="flex gap-2">
                {selectedStudy?.pdfUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(selectedStudy.pdfUrl, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </Button>
                )}
                {selectedStudy?.pdfUrls && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      selectedStudy.pdfUrls?.forEach(url => {
                        window.open(url, '_blank');
                      });
                    }}
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download All
                  </Button>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="sr-only">Keyboard navigation: </span>
                Use ← → arrow keys to navigate • ESC to close
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
import { useState, useEffect } from 'react';
import { Palette, Smartphone, Globe, Target, BarChart3, Zap, Eye, Layers, MousePointer } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

export function DesignGallery() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const designCategories = [
    {
      icon: <Palette className="w-12 h-12" />,
      title: "UI/UX Design",
      description: "Clean, intuitive interfaces that delight users and drive conversions.",
      projects: ["E-commerce Dashboard", "Healthcare App", "SaaS Platform"],
      glassClass: "glass-category-primary",
      detailedDescription: "I specialize in creating user-centered interfaces that balance aesthetics with functionality. My UI/UX design work focuses on understanding user needs, crafting intuitive navigation patterns, and ensuring accessibility for all users. I use design systems, user research, and iterative testing to create interfaces that not only look beautiful but also drive measurable business results.",
      skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Design Systems", "Accessibility"],
      tools: ["Figma", "Sketch", "Adobe XD", "InVision", "Principle", "Framer"]
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile Design",
      description: "Responsive, touch-first experiences optimized for mobile devices.",
      projects: ["Banking App", "Fitness Tracker", "Food Delivery"],
      glassClass: "glass-category-secondary",
      detailedDescription: "Mobile design requires a unique approach that prioritizes touch interactions, limited screen real estate, and context-aware experiences. I design mobile-first experiences that work seamlessly across different devices and screen sizes, with careful attention to gesture-based interactions, thumb-friendly layouts, and performance optimization.",
      skills: ["Mobile-First Design", "Touch Interactions", "Responsive Design", "iOS/Android Guidelines", "Performance Optimization"],
      tools: ["Figma", "Sketch", "Adobe XD", "InVision Studio", "Principle"]
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Web Applications",
      description: "Scalable web interfaces that work beautifully across all devices.",
      projects: ["CRM System", "Learning Platform", "Analytics Dashboard"],
      glassClass: "glass-category-neutral",
      detailedDescription: "Modern web applications require sophisticated interfaces that handle complex workflows while maintaining excellent user experience. I design scalable web applications that adapt to different user roles, data complexity, and interaction patterns. My work includes designing for performance, accessibility, and future growth.",
      skills: ["Complex UI Design", "Data Visualization", "Progressive Web Apps", "Scalable Design Systems", "Cross-Platform Compatibility"],
      tools: ["React", "Vue.js", "Angular", "Figma", "Sketch", "Adobe XD"]
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Brand Identity",
      description: "Cohesive visual systems that communicate brand values effectively.",
      projects: ["Tech Startup", "Wellness Brand", "Creative Agency"],
      glassClass: "glass-category-green",
      detailedDescription: "Brand identity goes beyond logos and color palettes—it's about creating a cohesive visual language that tells your brand story. I develop comprehensive brand systems that include typography, color palettes, iconography, and design guidelines that ensure consistency across all touchpoints while allowing for creative expression.",
      skills: ["Brand Strategy", "Visual Identity", "Typography", "Color Theory", "Brand Guidelines", "Style Guides"],
      tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Sketch", "InDesign"]
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Data Visualization",
      description: "Complex data transformed into clear, actionable insights.",
      projects: ["Sales Analytics", "User Behavior", "Performance Metrics"],
      glassClass: "glass-category-dark",
      detailedDescription: "Data visualization transforms complex information into understandable, actionable insights. I design dashboards and data interfaces that make it easy for users to understand trends, identify patterns, and make data-driven decisions. My approach combines information architecture with visual design to create interfaces that are both informative and intuitive.",
      skills: ["Information Architecture", "Data Design", "Dashboard Design", "Chart & Graph Design", "Interactive Data Visualization"],
      tools: ["Tableau", "D3.js", "Chart.js", "Figma", "Adobe Illustrator", "Sketch"]
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Interactive Prototypes",
      description: "High-fidelity prototypes that bring designs to life.",
      projects: ["AR Shopping", "Voice Interface", "Gesture Controls"],
      glassClass: "glass-category-secondary",
      detailedDescription: "Interactive prototypes bridge the gap between static designs and final products. I create high-fidelity prototypes that demonstrate complex interactions, user flows, and micro-interactions. These prototypes help stakeholders understand the user experience and make informed decisions about product development.",
      skills: ["Interaction Design", "Micro-interactions", "Animation", "User Flow Design", "Prototyping", "User Testing"],
      tools: ["Figma", "Principle", "Framer", "After Effects", "Protopie", "InVision Studio"]
    },
  ];

  const openModal = (category: any) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const navigateCategory = (direction: string) => {
    const currentIndex = designCategories.findIndex(c => c.title === selectedCategory?.title);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % designCategories.length;
    } else {
      newIndex = currentIndex === 0 ? designCategories.length - 1 : currentIndex - 1;
    }
    setSelectedCategory(designCategories[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateCategory('prev');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateCategory('next');
    } else if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  // Reset scroll state when modal opens/closes or category changes
  useEffect(() => {
    setIsScrolledToBottom(false);
  }, [isModalOpen, selectedCategory]);

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

  const designPrinciples = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "User-Centered",
      description: "Every design decision is driven by user needs and behaviors."
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Systematic",
      description: "Consistent design systems that scale across products and teams."
    },
    {
      icon: <MousePointer className="w-6 h-6" />,
      title: "Accessible",
      description: "Inclusive designs that work for users of all abilities."
    },
  ];

  return (
    <section id="design-gallery" className="py-20" aria-labelledby="design-gallery-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="subheading text-lg mb-4" role="text">Visual Design & User Experience</p>
          <h2 id="design-gallery-heading" className="text-4xl font-bold mb-4 text-yellow-foreground">Design Gallery</h2>
          <p className="text-xl text-yellow-foreground/70 max-w-3xl mx-auto" role="text">
            Visual storytelling through thoughtful interface design, cohesive branding, and innovative problem-solving. 
            I create digital experiences that are both beautiful and functional.
          </p>
        </div>

        {/* Design Philosophy */}
        <aside className="glass-card-yellow p-8 rounded-xl mb-16 max-w-4xl mx-auto hover-lift transition-all-smooth" aria-labelledby="philosophy-heading">
          <h3 id="philosophy-heading" className="text-2xl font-semibold mb-6 text-center text-yellow-foreground">Design Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-6" role="list" aria-label="Design principles">
            {designPrinciples.map((principle, index) => (
              <article key={index} role="listitem" className="text-center">
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 bg-yellow/30 text-yellow-foreground rounded-full mb-3"
                  role="img" 
                  aria-label={`${principle.title} icon`}
                >
                  {principle.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-yellow-foreground">{principle.title}</h4>
                <p className="text-sm text-yellow-foreground/60">{principle.description}</p>
              </article>
            ))}
          </div>
        </aside>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" role="list" aria-label="Design categories">
          {designCategories.map((category, index) => (
            <article key={index} role="listitem" className="group glass-card rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-yellow hover-lift transition-all-smooth cursor-pointer" onClick={() => openModal(category)}>
              <div className="p-8 glass-card-yellow" role="banner">
                <div className="text-yellow-foreground mb-4" role="img" aria-label={`${category.title} icon`}>{category.icon}</div>
                <h3 className="text-xl font-bold text-yellow-foreground" id={`category-title-${index}`}>{category.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-yellow-foreground/60 mb-4" aria-describedby={`category-title-${index}`}>{category.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-yellow-foreground">Featured Projects:</h4>
                  <ul className="space-y-1" aria-label="Projects in this category">
                    {category.projects.map((project, idx) => (
                      <li key={idx} className="flex items-center text-sm text-yellow-foreground/70">
                        <span className="w-1.5 h-1.5 bg-yellow rounded-full mr-2" role="presentation"></span>
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant="yellow"
                  className="w-full mt-4 focus:ring-2 focus:ring-yellow focus:ring-offset-2 btn-animate hover-glow"
                  aria-label={`View detailed information for ${category.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(category);
                  }}
                >
                  View Details
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Design Process */}
        <aside className="glass-card-yellow p-8 rounded-xl hover-lift transition-all-smooth" aria-labelledby="process-heading">
          <h3 id="process-heading" className="text-2xl font-semibold mb-6 text-center text-yellow-foreground">Design Process</h3>
          <div className="grid md:grid-cols-4 gap-6" role="list" aria-label="Design process steps">
            {[
              { step: "1", title: "Research", description: "Understanding users, market, and constraints" },
              { step: "2", title: "Ideation", description: "Exploring solutions through sketching and brainstorming" },
              { step: "3", title: "Design", description: "Creating high-fidelity mockups and prototypes" },
              { step: "4", title: "Test & Iterate", description: "Validating designs with real users and data" },
            ].map((phase, index) => (
              <article key={index} role="listitem" className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow/10 text-yellow-foreground rounded-full font-bold text-lg mb-3" role="img" aria-label={`Step ${phase.step}`}>
                  {phase.step}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-yellow-foreground">{phase.title}</h4>
                <p className="text-sm text-yellow-foreground/60">{phase.description}</p>
              </article>
            ))}
          </div>
        </aside>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-7xl w-[98vw] max-h-[96vh] flex flex-col z-[9999] bg-white design-gallery-modal"
          data-theme="yellow"
          onKeyDown={handleKeyDown}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* Skip link for screen readers */}
          <a
            href="#modal-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow text-yellow-foreground px-3 py-2 rounded-md text-sm font-medium z-50"
          >
            Skip to content
          </a>

          <DialogHeader className="flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateCategory('prev')}
                  className="p-2 h-8 w-8 text-yellow-foreground hover:text-yellow-600"
                  aria-label={`Previous design category: ${designCategories[(designCategories.findIndex(c => c.title === selectedCategory?.title) - 1 + designCategories.length) % designCategories.length]?.title}`}
                  disabled={designCategories.length <= 1}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                <div className="text-sm text-yellow-foreground" aria-live="polite">
                  {designCategories.findIndex(c => c.title === selectedCategory?.title) + 1} of {designCategories.length}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateCategory('next')}
                  className="p-2 h-8 w-8 text-yellow-foreground hover:text-yellow-600"
                  aria-label={`Next design category: ${designCategories[(designCategories.findIndex(c => c.title === selectedCategory?.title) + 1) % designCategories.length]?.title}`}
                  disabled={designCategories.length <= 1}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
                <Button
                  variant="yellow"
                  size="sm"
                  className="btn-animate hover-glow h-9 px-5"
                  onClick={toggleScroll}
                  aria-label={isScrolledToBottom ? "Scroll to top" : "Scroll to bottom"}
                >
                  {isScrolledToBottom ? "↑" : "↓"}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <DialogTitle id="modal-title" className="text-xl md:text-2xl text-yellow-foreground">{selectedCategory?.title}</DialogTitle>
              <div className="text-xs text-yellow-foreground/60 flex items-center gap-1">
                <span>Use</span>
                <kbd className="px-2 py-0.5 bg-yellow/10 text-yellow-foreground rounded text-xs font-mono">←</kbd>
                <kbd className="px-2 py-0.5 bg-yellow/10 text-yellow-foreground rounded text-xs font-mono">→</kbd>
                <span>to navigate</span>
                <span className="mx-1">•</span>
                <kbd className="px-2 py-0.5 bg-yellow/10 text-yellow-foreground rounded text-xs font-mono">ESC</kbd>
                <span>to close</span>
              </div>
            </div>
          </DialogHeader>

          <div 
            className="flex-1 overflow-y-scroll yellow-scrollbar" 
            id="modal-content"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(161, 98, 7, 0.8) rgba(251, 191, 36, 0.1)'
            }}
          >
            <div className="space-y-6">
              {/* Design Preview Section - Above project information */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg text-yellow-foreground">Design Category Preview</h4>
                  <Button
                    variant="yellow"
                    size="sm"
                    className="btn-animate hover-glow whitespace-nowrap h-9 px-5"
                    onClick={() => {
                      setIsModalOpen(false);
                      setTimeout(() => {
                        const element = document.getElementById('design-gallery');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    title="View full design gallery"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 14l-9-9-9 9" />
                    </svg>
                    Full Gallery
                  </Button>
                </div>
                <div className="bg-yellow/5 p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-yellow-foreground text-4xl" role="img" aria-label={`${selectedCategory?.title} icon`}>
                      {selectedCategory?.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-foreground mb-2">{selectedCategory?.title}</h3>
                      <p className="text-yellow-foreground/60">{selectedCategory?.description}</p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <h4 className="text-sm font-medium text-yellow-foreground">Featured Projects:</h4>
                    {selectedCategory?.projects.map((project: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-yellow rounded-full mr-2" role="presentation"></span>
                        <span className="text-yellow-foreground/80 text-sm">{project}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Information - Below design preview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-lg text-yellow-foreground">Project Overview</h4>
                    <p className="text-yellow-foreground/60 leading-relaxed">
                      {selectedCategory?.detailedDescription}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-lg text-yellow-foreground">Key Deliverables</h4>
                    <ul className="text-yellow-foreground/60 space-y-2 list-disc pl-6">
                      <li>Comprehensive design research and user analysis</li>
                      <li>High-fidelity mockups and interactive prototypes</li>
                      <li>Design system documentation and guidelines</li>
                      <li>User testing and iterative improvements</li>
                      <li>Cross-platform responsive design solutions</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-lg text-yellow-foreground">Key Skills & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory?.skills.map((skill: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-yellow/10 text-yellow-foreground rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-lg text-yellow-foreground">Design Type</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-yellow/15 text-yellow-foreground rounded-full text-sm">
                        {selectedCategory?.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* CTA Section at Bottom */}
          <div className="flex-shrink-0 mt-4 pt-4 border-t border-yellow/20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-yellow/5 -mx-6 px-6 py-4 -mb-6 rounded-b-xl">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-base mb-1 text-yellow-foreground">Interested in similar design work?</h4>
              <p className="text-sm text-yellow-foreground/60">Let's discuss how I can help with your project</p>
            </div>
            <Button
              variant="yellow"
              size="sm"
              className="btn-animate hover-glow whitespace-nowrap h-9 px-5"
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
    </section>
  );
}
import { Palette, Smartphone, Globe, Target, BarChart3, Zap, Eye, Layers, MousePointer } from 'lucide-react';
import { Button } from './ui/button';

export function DesignGallery() {
  const designCategories = [
    {
      icon: <Palette className="w-12 h-12" />,
      title: "UI/UX Design",
      description: "Clean, intuitive interfaces that delight users and drive conversions.",
      projects: ["E-commerce Dashboard", "Healthcare App", "SaaS Platform"],
      glassClass: "glass-category-primary",
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile Design",
      description: "Responsive, touch-first experiences optimized for mobile devices.",
      projects: ["Banking App", "Fitness Tracker", "Food Delivery"],
      glassClass: "glass-category-secondary",
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Web Applications",
      description: "Scalable web interfaces that work beautifully across all devices.",
      projects: ["CRM System", "Learning Platform", "Analytics Dashboard"],
      glassClass: "glass-category-neutral",
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Brand Identity",
      description: "Cohesive visual systems that communicate brand values effectively.",
      projects: ["Tech Startup", "Wellness Brand", "Creative Agency"],
      glassClass: "glass-category-green",
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Data Visualization",
      description: "Complex data transformed into clear, actionable insights.",
      projects: ["Sales Analytics", "User Behavior", "Performance Metrics"],
      glassClass: "glass-category-dark",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Interactive Prototypes",
      description: "High-fidelity prototypes that bring designs to life.",
      projects: ["AR Shopping", "Voice Interface", "Gesture Controls"],
      glassClass: "glass-category-secondary",
    },
  ];

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
          <p className="subheading text-primary text-lg mb-4" role="text">Visual Design & User Experience</p>
          <h2 id="design-gallery-heading" className="text-4xl font-bold mb-4">Design Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" role="text">
            Visual storytelling through thoughtful interface design, cohesive branding, and innovative problem-solving. 
            I create digital experiences that are both beautiful and functional.
          </p>
        </div>

        {/* Design Philosophy */}
        <aside className="glass-card-primary p-8 rounded-xl mb-16 max-w-4xl mx-auto" aria-labelledby="philosophy-heading">
          <h3 id="philosophy-heading" className="text-2xl font-semibold mb-6 text-center">Design Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-6" role="list" aria-label="Design principles">
            {designPrinciples.map((principle, index) => (
              <article key={index} role="listitem" className="text-center">
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-3"
                  role="img" 
                  aria-label={`${principle.title} icon`}
                >
                  {principle.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{principle.title}</h4>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </article>
            ))}
          </div>
        </aside>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" role="list" aria-label="Design categories">
          {designCategories.map((category, index) => (
            <article key={index} role="listitem" className="group glass-card rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary">
              <div className={`p-8 text-gray-900 ${category.glassClass}`} role="banner">
                <div className="text-gray-800 mb-4" role="img" aria-label={`${category.title} icon`}>{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900" id={`category-title-${index}`}>{category.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4" aria-describedby={`category-title-${index}`}>{category.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Featured Projects:</h4>
                  <ul className="space-y-1" aria-label="Projects in this category">
                    {category.projects.map((project, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" role="presentation"></span>
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Design Process */}
        <aside className="glass-card-accent p-8 rounded-xl" aria-labelledby="process-heading">
          <h3 id="process-heading" className="text-2xl font-semibold mb-6 text-center">Design Process</h3>
          <div className="grid md:grid-cols-4 gap-6" role="list" aria-label="Design process steps">
            {[
              { step: "1", title: "Research", description: "Understanding users, market, and constraints" },
              { step: "2", title: "Ideation", description: "Exploring solutions through sketching and brainstorming" },
              { step: "3", title: "Design", description: "Creating high-fidelity mockups and prototypes" },
              { step: "4", title: "Test & Iterate", description: "Validating designs with real users and data" },
            ].map((phase, index) => (
              <article key={index} role="listitem" className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-lg mb-3" role="img" aria-label={`Step ${phase.step}`}>
                  {phase.step}
                </div>
                <h4 className="text-lg font-semibold mb-2">{phase.title}</h4>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
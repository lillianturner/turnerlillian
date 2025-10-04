import { Palette, Smartphone, Globe, Target, BarChart3, Zap, Eye, Layers, MousePointer } from 'lucide-react';
import { Button } from './ui/button';

export function DesignGallery() {
  const designCategories = [
    {
      icon: <Palette className="w-12 h-12" />,
      title: "UI/UX Design",
      description: "Clean, intuitive interfaces that delight users and drive conversions.",
      projects: ["E-commerce Dashboard", "Healthcare App", "SaaS Platform"],
      color: "#AFC97E",
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile Design",
      description: "Responsive, touch-first experiences optimized for mobile devices.",
      projects: ["Banking App", "Fitness Tracker", "Food Delivery"],
      color: "#E2D686",
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Web Applications",
      description: "Scalable web interfaces that work beautifully across all devices.",
      projects: ["CRM System", "Learning Platform", "Analytics Dashboard"],
      color: "#FFDF64",
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Brand Identity",
      description: "Cohesive visual systems that communicate brand values effectively.",
      projects: ["Tech Startup", "Wellness Brand", "Creative Agency"],
      color: "#877B66",
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Data Visualization",
      description: "Complex data transformed into clear, actionable insights.",
      projects: ["Sales Analytics", "User Behavior", "Performance Metrics"],
      color: "#D4E6B5",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Interactive Prototypes",
      description: "High-fidelity prototypes that bring designs to life.",
      projects: ["AR Shopping", "Voice Interface", "Gesture Controls"],
      color: "#AFC97E",
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
    <section id="design-gallery" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="subheading text-primary text-lg mb-4">Visual Design & User Experience</p>
          <h2 className="text-4xl font-bold mb-4">Design Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Visual storytelling through thoughtful interface design, cohesive branding, and innovative problem-solving. 
            I create digital experiences that are both beautiful and functional.
          </p>
        </div>

        {/* Design Philosophy */}
        <div className="bg-card p-8 rounded-xl border mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">Design Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {designPrinciples.map((principle, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-3">
                  {principle.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{principle.title}</h4>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {designCategories.map((category, index) => (
            <div key={index} className="group bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-8 text-white" style={{ backgroundColor: category.color }}>
                <div className="text-white/90 mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Featured Projects:</h4>
                  <ul className="space-y-1">
                    {category.projects.map((project, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Process */}
        <div className="bg-card p-8 rounded-xl border">
          <h3 className="text-2xl font-semibold mb-6 text-center">Design Process</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Research", description: "Understanding users, market, and constraints" },
              { step: "2", title: "Ideation", description: "Exploring solutions through sketching and brainstorming" },
              { step: "3", title: "Design", description: "Creating high-fidelity mockups and prototypes" },
              { step: "4", title: "Test & Iterate", description: "Validating designs with real users and data" },
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-lg mb-3">
                  {phase.step}
                </div>
                <h4 className="text-lg font-semibold mb-2">{phase.title}</h4>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
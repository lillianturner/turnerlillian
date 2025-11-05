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
            <article key={index} role="listitem" className="group glass-card rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-yellow hover-lift transition-all-smooth">
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
    </section>
  );
}
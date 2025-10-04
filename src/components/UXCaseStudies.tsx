import { Button } from './ui/button';

export function UXCaseStudies() {
  const caseStudies = [
    {
      title: "E-commerce Platform Redesign",
      description: "Increased conversion rates by 35% through user-centered design and comprehensive usability testing.",
      tags: ["User Research", "Wireframing", "Prototyping", "A/B Testing"],
      image: "/placeholder-ecommerce.jpg"
    },
    {
      title: "Mobile Banking App",
      description: "Designed an intuitive mobile banking experience focusing on security and accessibility.",
      tags: ["Mobile Design", "Accessibility", "Security UX", "User Flows"],
      image: "/placeholder-banking.jpg"
    },
    {
      title: "SaaS Dashboard Interface",
      description: "Simplified complex data visualization for better user decision-making and workflow efficiency.",
      tags: ["Data Visualization", "Dashboard Design", "Information Architecture", "User Testing"],
      image: "/placeholder-saas.jpg"
    }
  ];

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
            <article key={index} role="listitem" className="group glass-card rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary flex flex-col h-full">
              <div className="aspect-video glass-section flex items-center justify-center" role="img" aria-label={`Preview image for ${study.title}`}>
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
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-auto" 
                  aria-label={`View case study for ${study.title}`}
                >
                  View Case Study
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
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
    <section id="ux-studies" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="subheading text-primary text-lg mb-4">User Experience Research & Design</p>
          <h2 className="text-4xl font-bold mb-4">UX Case Studies</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real projects, real impact. Here's how I've helped businesses improve their user experience and achieve their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Project Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{study.title}</h3>
                <p className="text-muted-foreground mb-4">{study.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  View Case Study
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
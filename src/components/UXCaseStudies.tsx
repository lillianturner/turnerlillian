import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

export function UXCaseStudies() {
  const caseStudies = [
    {
      title: "Poppin' Joe's Kettle Corn E-Commerce Website Redesign",
      description: "Redesigned the website for a beloved family brand by conducting a site analysis, creating a content strategy report, and developing a full editorial style guide. The project improved navigation, clarified brand voice, and established a cohesive, accessible digital presence.",
      tags: ["User Research", "Information Architecture", "Style Guide", "Brand Voice", "Accessibility"],
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
    },
    {
      title: "Healthcare Patient Portal",
      description: "Streamlined patient access to medical records and appointment scheduling with HIPAA-compliant design.",
      tags: ["Healthcare UX", "Accessibility", "Information Security", "User Journey Mapping"],
      image: "/placeholder-healthcare.jpg"
    },
    {
      title: "Educational Learning Platform",
      description: "Enhanced student engagement and learning outcomes through gamification and adaptive UI design.",
      tags: ["EdTech", "Gamification", "Adaptive Design", "User Engagement"],
      image: "/placeholder-education.jpg"
    },
    {
      title: "Travel Booking Website",
      description: "Optimized the booking flow to reduce cart abandonment by 40% with improved UX patterns.",
      tags: ["Conversion Optimization", "User Flows", "Mobile-First Design", "Usability Testing"],
      image: "/placeholder-travel.jpg"
    }
  ];

  const [selectedStudy, setSelectedStudy] = useState<typeof caseStudies[0] | null>(null);

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
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedStudy?.title}</DialogTitle>
              <DialogDescription>
                {selectedStudy?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Images */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center w-full">
                    <span className="text-muted-foreground">Project Preview Image</span>
                  </div>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center w-full">
                    <span className="text-muted-foreground">Additional Project Image</span>
                  </div>
                </div>

                {/* Right Column - Information */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Skills & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudy?.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Project Overview</h4>
                    <p className="text-muted-foreground">
                      This case study demonstrates my approach to user-centered design, focusing on research-driven solutions
                      that deliver measurable business impact. The project involved comprehensive user research, iterative
                      prototyping, and rigorous usability testing to ensure optimal user experience.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Key Achievements</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Increased conversion rates by 35%</li>
                      <li>• Improved user satisfaction scores</li>
                      <li>• Reduced task completion time</li>
                      <li>• Enhanced accessibility compliance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setSelectedStudy(null)}>Close</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
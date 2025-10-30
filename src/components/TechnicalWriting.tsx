import { FileText, Code, BookOpen, Lightbulb, Users, Target } from 'lucide-react';
import { Button } from './ui/button';

export function TechnicalWriting() {
  const writingSamples = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "User Guides & Documentation",
      description: "Clear, step-by-step guides that help users accomplish their goals efficiently.",
      examples: ["SaaS Onboarding Guide", "Mobile App Tutorial", "Feature Documentation"],
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "API Documentation",
      description: "Comprehensive developer resources with code examples and best practices.",
      examples: ["REST API Reference", "SDK Documentation", "Integration Guides"],
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Knowledge Base Articles",
      description: "Searchable, organized content that reduces support burden and empowers users.",
      examples: ["FAQ Collections", "Troubleshooting Guides", "Best Practices"],
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Process Documentation",
      description: "Detailed workflows and procedures that improve team efficiency.",
      examples: ["Standard Operating Procedures", "Workflow Documentation", "Training Materials"],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Content Strategy",
      description: "Strategic content planning that aligns with business goals and user needs.",
      examples: ["Content Audits", "Information Architecture", "User Journey Mapping"],
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Technical Blog Posts",
      description: "Engaging articles that explain complex concepts to diverse audiences.",
      examples: ["How-to Articles", "Feature Announcements", "Technical Tutorials"],
    },
  ];

  return (
    <section id="tech-writing" className="py-20 bg-muted/50" aria-labelledby="tech-writing-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="subheading text-primary text-lg mb-4" role="text">Content Strategy & Documentation</p>
          <h2 id="tech-writing-heading" className="text-4xl font-bold mb-4">Technical Writing Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" role="text">
            I create clear, compelling content that bridges the gap between complex technology and human understanding. 
            My writing empowers users, reduces support burden, and drives product adoption.
          </p>
        </div>

        {/* Writing Philosophy */}
        <aside className="glass-card-primary p-8 rounded-xl mb-16 max-w-4xl mx-auto" aria-labelledby="philosophy-heading">
          <h3 id="philosophy-heading" className="text-2xl font-semibold mb-4 text-center">My Writing Philosophy</h3>
          <blockquote className="text-lg text-muted-foreground text-center leading-relaxed">
            "Great technical writing is invisible. It gets users to their destination without them noticing the journey. 
            Every word should have a purpose, every sentence should move the reader forward, and every document should 
            solve a real problem."
          </blockquote>
        </aside>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" role="list" aria-label="Writing portfolio samples">
          {writingSamples.map((sample, index) => (
            <article key={index} role="listitem" className="group glass-card p-6 rounded-xl focus-within:ring-2 focus-within:ring-primary">
              <div className="text-primary mb-4" role="img" aria-label={`${sample.title} icon`}>{sample.icon}</div>
              <h3 className="text-xl font-semibold mb-3" id={`sample-title-${index}`}>{sample.title}</h3>
              <p className="text-muted-foreground mb-4" aria-describedby={`sample-title-${index}`}>{sample.description}</p>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Sample Work:</h4>
                <ul className="text-sm space-y-1" aria-label="Examples of work">
                  {sample.examples.map((example, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" role="presentation"></span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Tools & Methodology */}
        <aside className="glass-card-accent p-8 rounded-xl" aria-labelledby="tools-heading">
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
      </div>
    </section>
  );
}
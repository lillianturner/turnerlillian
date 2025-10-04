import { Heart, Coffee, Palette, BookOpen, Globe, Users, Award, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';

export function About() {
  const skills = [
    { category: "Design", items: ["User Experience Design", "Interface Design", "Design Systems", "Prototyping", "User Research"] },
    { category: "Writing", items: ["Technical Documentation", "Content Strategy", "API Documentation", "User Guides", "Blog Writing"] },
    { category: "Tools", items: ["Figma", "Sketch", "Notion", "Confluence", "React", "TypeScript"] },
    { category: "Methods", items: ["Design Thinking", "Agile/Scrum", "User Testing", "Information Architecture", "Content Audits"] },
  ];

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "User-Centered",
      description: "I believe great design starts with understanding real user needs and pain points."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Problem-Solving",
      description: "Every project is a puzzle to solve, combining creativity with analytical thinking."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Empathy-Driven",
      description: "Creating inclusive experiences that work for people of all backgrounds and abilities."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Continuous Learning",
      description: "Technology evolves rapidly, and I'm committed to growing with it."
    },
  ];

  const personalFacts = [
    { icon: <Coffee className="w-5 h-5" />, fact: "Powered by coffee and curiosity" },
    { icon: <Palette className="w-5 h-5" />, fact: "Love experimenting with new design trends" },
    { icon: <BookOpen className="w-5 h-5" />, fact: "Always reading about psychology and design" },
    { icon: <Award className="w-5 h-5" />, fact: "Certified in UX Design and Content Strategy" },
  ];

  return (
    <section id="about" className="py-20 bg-muted/50" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="subheading text-primary text-lg mb-4" role="text">Professional Background</p>
          <h2 id="about-heading" className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" role="text">
            I'm a passionate UX designer and technical communicator who believes that great design and clear communication 
            can transform how people interact with technology.
          </p>
        </div>
        
        {/* Main Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <article className="glass-card p-8 rounded-xl hover-lift transition-all-smooth" aria-labelledby="journey-heading">
                <h3 id="journey-heading" className="text-2xl font-semibold mb-4">My Journey</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  With over 5 years of experience in UX design and technical writing, I've helped startups and 
                  established companies create digital experiences that users actually love. My background in both 
                  design and communication gives me a unique perspective on how to bridge the gap between complex 
                  technology and human understanding.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I started my career in technical writing, where I learned the art of making complex information 
                  accessible. This foundation in clear communication naturally led me to UX design, where I could 
                  apply the same principles to visual and interactive experiences.
                </p>
              </article>
            </div>
            
            <div className="space-y-6">
              <article className="glass-card p-8 rounded-xl hover-lift transition-all-smooth" aria-labelledby="motivation-heading">
                <h3 id="motivation-heading" className="text-2xl font-semibold mb-4">What Drives Me</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I'm fascinated by the intersection of psychology, technology, and design. Every project is an 
                  opportunity to understand how people think, what they need, and how we can create solutions 
                  that feel almost invisible in their simplicity.
                </p>
                
                <div className="grid grid-cols-2 gap-4" role="list" aria-label="Personal facts">
                  {personalFacts.map((item, index) => (
                    <div key={index} role="listitem" className="flex items-center space-x-2 text-sm">
                      <div className="text-primary" role="img" aria-label={`${item.fact} icon`}>{item.icon}</div>
                      <span className="text-muted-foreground">{item.fact}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8" id="values-heading">Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-labelledby="values-heading">
            {values.map((value, index) => (
              <article key={index} role="listitem" className="glass-card p-6 rounded-xl text-center focus-within:ring-2 focus-within:ring-primary hover-lift transition-all-smooth">
                <div className="text-primary mb-4 flex justify-center" role="img" aria-label={`${value.title} icon`}>{value.icon}</div>
                <h4 className="text-lg font-semibold mb-3" id={`value-title-${index}`}>{value.title}</h4>
                <p className="text-sm text-muted-foreground" aria-describedby={`value-title-${index}`}>{value.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Skills & Expertise */}
        <aside className="glass-card-accent p-8 rounded-xl hover-lift transition-all-smooth" aria-labelledby="skills-heading">
          <h3 id="skills-heading" className="text-2xl font-semibold text-center mb-8">Skills & Expertise</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list" aria-label="Skill categories">
            {skills.map((skillGroup, index) => (
              <div key={index} role="listitem">
                <h4 className="text-lg font-semibold mb-4 text-primary" id={`skill-category-${index}`}>{skillGroup.category}</h4>
                <ul className="space-y-2" aria-labelledby={`skill-category-${index}`}>
                  {skillGroup.items.map((skill, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" role="presentation"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
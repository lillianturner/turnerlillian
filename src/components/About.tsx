import { Heart, Coffee, Palette, BookOpen, Globe, Users, Award, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { BorderVines } from './BorderVines';

export function About() {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <section id="about" className="pt-28 pb-20 relative" aria-labelledby="about-heading">
      {/* Pill-shaped Glass Container Background */}
      <div 
        className="absolute top-0 left-1/2 w-[80%] max-w-5xl h-64 z-0"
        style={{
          transform: 'translate(-50%, 25%)',
          borderRadius: '200px',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          background: 'rgba(255, 255, 255, 0.4)',
          border: '1.75px solid rgba(255, 255, 255, 0.6)',
          boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.1), 0 10px 40px rgba(0, 0, 0, 0.08), 0 25px 70px rgba(0, 0, 0, 0.12)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-32">
          <p className="subheading text-primary text-lg mb-4" role="text">Professional Background</p>
          <h2 id="about-heading" className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" role="text">
            I'm a passionate UX designer and technical communicator who believes that great design and clear communication 
            can transform how people interact with technology.
          </p>
        </div>
        
        {/* Main Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <article className="glass-card p-8 rounded-xl hover-lift transition-all-smooth" aria-labelledby="journey-heading">
            <h3 id="journey-heading" className="text-2xl font-semibold mb-4">My Journey</h3>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Hello! My name is Lillian, and I'm an accessible communicator based in Brooklyn, NY. I love transforming confusing, unclear, or overly complex communication (visual or verbal) into content that's easy for all users to digest. Inclusivity guides everything I create; I want all users - no matter their starting point - to feel confident and capable when interacting with my work.
              </p>
              <p>
                I graduated from Arizona State University in December 2025 with a B.S. in Technical Communication (User Experience concentration) and a 4.0 GPA. I'm excited to continue my studies in ASU's User Experience Master's program beginning August 2026!
              </p>
              
              {isExpanded && (
                <>
                  <p>
                    I have a background in technical theater (specifically lighting design) and interdisciplinary arts. Lighting design is about directing attention and creating atmosphere, directly paralleling UX's drive to guide users through experiences with clarity and intention. That blend of technical precision and creative problem-solving is what originally drew me to UX, and it continues to shape my design approach today.
                  </p>
                  <p>
                    I'm currently leading UX and UI efforts for a Markdown note-taking organization extension, where I focus on creating intuitive workflows and accessible, streamlined interfaces. In this role, I conduct comprehensive UX research to inform every design decision, collaborating closely with developers to bring those designs to life.
                  </p>
                  <p>
                    Previously, I worked as a Packaging and Graphics Intern at Rubies II L.L.C., the largest fancy-dress costume and accessories designer, manufacturer, and distributor in the world. I also interned with ArtX Gallery, which showcases creators working at the intersection of art and technology. Both roles gave me invaluable experience in visual communication and graphic design.
                  </p>
                  <p>
                    I aim to be a designer who champions accessibility not as a checklist, but as a creative challenge that makes everything I build better for everyone. I'm always excited to connect with people doing thoughtful work! Reach out anytime :)
                  </p>
                </>
              )}
            </div>
            
            <div className="flex justify-center">
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                size="default"
                className="mt-4 text-base px-6 py-2 glass-button-primary btn-animate hover-glow w-full"
                aria-expanded={isExpanded}
                aria-controls="journey-expanded-content"
              >
                {isExpanded ? (
                  <>
                    Read Less
                    <ChevronUp className="ml-2 w-4 h-4" />
                  </>
                ) : (
                  <>
                    Read More
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </article>
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
      
      {/* Decorative Border Vines */}
      <BorderVines className="opacity-40" />
    </section>
  );
}
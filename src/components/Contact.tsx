import { Button } from './ui/button';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/50" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="subheading text-primary text-lg mb-4">Get In Touch</p>
          <h2 id="contact-heading" className="text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to create something amazing? Let's discuss your project and how I can help bring your vision to life.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form className="glass-card p-8 rounded-xl space-y-6" aria-label="Contact form">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name <span className="text-red-500" aria-label="required">*</span></label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required
                aria-required="true"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary form-field transition-all-smooth" 
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email <span className="text-red-500" aria-label="required">*</span></label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                aria-required="true"
                aria-describedby="email-help"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary form-field transition-all-smooth" 
                placeholder="your.email@example.com"
              />
              <p id="email-help" className="text-sm text-muted-foreground mt-1">We'll never share your email with anyone else.</p>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message <span className="text-red-500" aria-label="required">*</span></label>
              <textarea 
                id="message" 
                name="message"
                rows={5} 
                required
                aria-required="true"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-vertical form-field transition-all-smooth" 
                placeholder="Tell me about your project or how I can help you..."
              ></textarea>
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground btn-animate hover-glow" aria-describedby="submit-help">
              Send Message
            </Button>
            <p id="submit-help" className="text-sm text-muted-foreground text-center">I typically respond within 24 hours.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
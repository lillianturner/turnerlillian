import { useState } from 'react';
import { Button } from './ui/button';
import { Spinner } from './Spinner';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      
      // TODO: Add actual form submission logic here
      // const formData = new FormData(e.currentTarget);
      // await submitContactForm(formData);
      
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      // Reset form after success
      e.currentTarget.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="subheading text-primary text-lg mb-4">Get In Touch</p>
          <h2 id="contact-heading" className="text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to create something amazing? Let's discuss your project and how I can help bring your vision to life.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form className="glass-card p-8 rounded-xl space-y-6" aria-label="Contact form" onSubmit={handleSubmit}>
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
            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground btn-animate hover-glow" 
              aria-describedby="submit-help"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" className="mr-2" label="Sending message..." />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
            
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center" role="alert">
                ✓ Message sent successfully! I'll respond within 24 hours.
              </div>
            )}
            
            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center" role="alert">
                ✗ Failed to send message. Please try again or email me directly at hello@lillianturner.com
              </div>
            )}
            
            <p id="submit-help" className="text-sm text-muted-foreground text-center">I typically respond within 24 hours.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
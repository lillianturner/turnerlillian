import { useState } from 'react';
import { Button } from './ui/button';
import { Spinner } from './Spinner';
import { BorderVines } from './BorderVines';

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
    <section id="contact" className="pt-28 pb-20 relative" aria-labelledby="contact-heading">
      {/* Translucent Lavender Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'rgba(210, 180, 230, 0.15)',
        }}
        aria-hidden="true"
      />
      
      {/* Pill-shaped Glass Container Background */}
      <div 
        className="absolute top-0 left-1/2 w-[80%] max-w-5xl h-64 z-[5]"
        style={{
          transform: 'translate(-50%, 25%)',
          borderRadius: '200px',
          backdropFilter: 'blur(10px) saturate(150%)',
          WebkitBackdropFilter: 'blur(10px) saturate(150%)',
          background: 'rgba(255, 255, 255, 0.4)',
          border: '1.75px solid rgba(255, 255, 255, 0.6)',
          boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.1), 0 10px 40px rgba(0, 0, 0, 0.08), 0 25px 70px rgba(0, 0, 0, 0.12)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-32">
          <p className="subheading text-primary text-lg mb-4">Get In Touch</p>
          <h2 id="contact-heading" className="text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to create something amazing? Let's discuss your project and how I can help bring your vision to life.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form 
            className="glass-card p-8 rounded-xl space-y-6" 
            aria-label="Contact form" 
            onSubmit={handleSubmit}
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
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
      
      {/* Decorative Border Vines */}
      <BorderVines className="opacity-40" />
    </section>
  );
}
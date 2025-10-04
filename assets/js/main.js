// Main JavaScript - Glass & Nature Fusion Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initGlassEffects();
    initContactForm();
    initSmoothScrolling();
    initMobileNavigation();
    initFloatingElements();
    initGalleryFilter();
});

// Navigation Functions
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile nav when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add staggered animation for grid items
                const gridItems = entry.target.querySelectorAll('.glass-card');
                gridItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-fadeInUp');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('scroll-reveal');
        observer.observe(section);
    });
    
    // Observe individual cards and elements
    const cards = document.querySelectorAll('.glass-card, .case-study-card, .comm-category');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Glass Effects and Interactions
function initGlassEffects() {
    // Add hover effects to glass cards
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add glassmorphism effect based on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelector('.glass-overlay').style.transform = `translateY(${rate}px)`;
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Random starting positions and animation delays
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 5;
        
        element.style.left = `${randomX}%`;
        element.style.top = `${randomY}%`;
        element.style.animationDelay = `${randomDelay}s`;
        
        // Add random size variations
        const randomSize = 6 + Math.random() * 8;
        element.style.width = `${randomSize}px`;
        element.style.height = `${randomSize}px`;
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await simulateFormSubmission(formData);
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                form.reset();
                
            } catch (error) {
                // Show error message
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }
        });
    }
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success/failure
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Submission failed'));
            }
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--glass-white-strong);
        backdrop-filter: var(--glass-backdrop-filter);
        border: var(--glass-border);
        border-radius: var(--border-radius-xl);
        padding: var(--space-4) var(--space-6);
        box-shadow: var(--glass-shadow);
        z-index: var(--z-toast);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform var(--transition-base);
    `;
    
    if (type === 'success') {
        notification.style.borderLeft = `4px solid var(--color-leafy-green)`;
    } else if (type === 'error') {
        notification.style.borderLeft = `4px solid var(--color-copper)`;
    } else {
        notification.style.borderLeft = `4px solid var(--color-electric-blue)`;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Handle close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Utility Functions

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for performance
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Get CSS custom property value
function getCSSCustomProperty(property) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(property).trim();
}

// Set CSS custom property
function setCSSCustomProperty(property, value) {
    document.documentElement.style.setProperty(property, value);
}

// Check if element is in viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(() => {
    // Add any scroll-dependent functionality here
    updateScrollProgress();
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Update scroll progress indicator
function updateScrollProgress() {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    setCSSCustomProperty('--scroll-progress', `${scrolled}%`);
}

// Initialize scroll progress
updateScrollProgress();

// Add CSS for scroll progress indicator
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: var(--scroll-progress, 0%);
        height: 3px;
        background: var(--gradient-accent);
        z-index: var(--z-fixed);
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(style);

// Add scroll progress element
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

// Preload images for better performance
function preloadImages() {
    const images = [
        'assets/images/profile-photo.jpg',
        'assets/images/case-study-1.jpg'
        // Add more images as needed
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);

// Add error handling for missing images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        // Replace with placeholder or hide
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
        e.target.alt = 'Image not found - placeholder displayed';
        console.warn(`Failed to load image: ${e.target.getAttribute('data-original-src') || 'unknown'}`);
    }
}, true);

// Performance Monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                console.log(`Page loaded in ${loadTime}ms`);
                
                // Track Core Web Vitals if available
                if ('PerformanceObserver' in window) {
                    const observer = new PerformanceObserver((list) => {
                        list.getEntries().forEach((entry) => {
                            console.log(`${entry.name}: ${entry.value}`);
                        });
                    });
                    observer.observe({entryTypes: ['measure']});
                }
            }, 0);
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Service Worker Registration for Offline Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Gallery Filter Function
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Add filtering class for animation
                item.classList.add('filtering');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 50);
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                    setTimeout(() => {
                        if (item.classList.contains('hide')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
                
                // Remove filtering class after animation
                setTimeout(() => {
                    item.classList.remove('filtering');
                }, 500);
            });
        });
    });
}

// Console welcome message
console.log(`
    🌿✨ Welcome to Lillian Turner's Portfolio! ✨🌿
    
    Built with Glass & Nature Fusion design system
    Featuring glassmorphism, organic shapes, and smooth interactions
    
    Design System Colors:
    • Primary: White, Charcoal, Cement Gray, Sage Gray
    • Accents: Leafy Green, Copper, Metallic Gold, Electric Blue
    
    Made with ❤️ and attention to detail
`);
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initLightbox();
    initContactForm();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.academic-card, .gallery-item, .contact-item, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-image');
            const caption = this.querySelector('h4').textContent;
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = caption;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (validateForm(data)) {
            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        }
    });
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject) {
        errors.push('Please select a subject');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message with at least 10 characters');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .notification-message {
            white-space: pre-line;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Close notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Initialize animations
function initAnimations() {
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = element.textContent.includes('%') ? '%' : 
                          element.textContent.includes('+') ? '+' : '';
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    };
    
    // Observe stat numbers for animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Hover effects for cards
    const cards = document.querySelectorAll('.academic-card, .gallery-item, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScroll = debounce(() => {
    // Scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #1B4B5A;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        body:not(.loaded)::after {
            content: '';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            border: 3px solid #F5E6B8;
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            z-index: 10000;
        }
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch-specific styles
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        .touch-device .gallery-item:hover .gallery-overlay {
            transform: translateY(0);
        }
        .touch-device .academic-card:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(touchStyle);
}


// Advanced Animations and Interactions

// Initialize advanced animations
function initAdvancedAnimations() {
    initScrollToTop();
    initSectionReveal();
    initImageReveal();
    initParticleEffect();
    initMagneticEffect();
    initTextAnimations();
}

// Scroll to top button
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Section reveal animations
function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.classList.add('section-reveal');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.academic-card, .gallery-item, .contact-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        revealObserver.observe(section);
    });
}

// Image reveal animations
function initImageReveal() {
    const images = document.querySelectorAll('.about-img, .admissions-img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 300);
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Enhanced particle effect
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            size: Math.random() * 3 + 1,
            speedY: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function updateParticles() {
        particles = particles.filter(particle => {
            particle.y -= particle.speedY;
            particle.x += particle.speedX;
            particle.opacity -= 0.002;
            return particle.y > -10 && particle.opacity > 0;
        });

        // Add new particles
        if (particles.length < 50 && Math.random() < 0.3) {
            particles.push(createParticle());
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = '#F5E6B8';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
}

// Magnetic effect for interactive elements
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .gallery-item, .academic-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Text animations
function initTextAnimations() {
    // Typewriter effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.borderRight = '2px solid #F5E6B8';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    heroSubtitle.style.borderRight = heroSubtitle.style.borderRight === '2px solid transparent' 
                        ? '2px solid #F5E6B8' 
                        : '2px solid transparent';
                }, 500);
            }
        }
        
        setTimeout(typeWriter, 2000);
    }

    // Animated counter for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.includes('%') ? '%' : 
                          stat.textContent.includes('+') ? '+' : '';
            
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 20);
        });
    };

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
}

// Enhanced form interactions
function initEnhancedFormInteractions() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Floating label effect
        const label = document.createElement('label');
        label.textContent = input.placeholder;
        label.style.cssText = `
            position: absolute;
            top: 50%;
            left: 1rem;
            transform: translateY(-50%);
            color: #999;
            pointer-events: none;
            transition: all 0.3s ease;
            background: white;
            padding: 0 0.5rem;
        `;
        
        input.parentNode.style.position = 'relative';
        input.parentNode.appendChild(label);
        input.placeholder = '';
        
        // Focus and blur events
        input.addEventListener('focus', () => {
            label.style.top = '0';
            label.style.fontSize = '0.8rem';
            label.style.color = '#1B4B5A';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.top = '50%';
                label.style.fontSize = '1rem';
                label.style.color = '#999';
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            label.style.top = '0';
            label.style.fontSize = '0.8rem';
            label.style.color = '#1B4B5A';
        }
    });
}

// Parallax scrolling effect
function initParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('.hero-image, .about-img, .admissions-img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.5;
            const yPos = -(rate / (index + 1));
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Mouse trail effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Remove existing trail elements
        document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
        
        // Create new trail elements
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                width: ${10 - index}px;
                height: ${10 - index}px;
                background: rgba(27, 75, 90, ${0.5 - index * 0.05});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${point.x}px;
                top: ${point.y}px;
                transform: translate(-50%, -50%);
                transition: all 0.1s ease;
            `;
            document.body.appendChild(trailElement);
            
            // Remove after animation
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.remove();
                }
            }, 500);
        });
    });
}

// Initialize all advanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a delay to ensure all elements are rendered
    setTimeout(() => {
        initAdvancedAnimations();
        initEnhancedFormInteractions();
        initParallaxScrolling();
        initMouseTrail();
    }, 100);
});

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor frame rate
    let lastTime = performance.now();
    let frameCount = 0;
    
    function checkPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Reduce animations if performance is poor
            if (fps < 30) {
                document.body.classList.add('reduced-motion');
                console.warn('Performance is low, reducing animations');
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkPerformance);
    }
    
    requestAnimationFrame(checkPerformance);
}

// Respect user's motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
}

// Initialize performance monitoring
initPerformanceMonitoring();


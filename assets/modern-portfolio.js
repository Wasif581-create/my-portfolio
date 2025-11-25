// Modern Portfolio JavaScript - Advanced Animations & Interactions

class ModernPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createParticles();
        this.setupCursor();
        this.setupScrollAnimations();
        this.setupThemeToggle();
        this.setupNavigation();
        this.setupPortfolioSwiper();
        this.hideLoadingScreen();
        this.init3DIconCloud();
    }

    // Loading Screen
    hideLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('loaded');
                setTimeout(() => {
                    const loadingScreen = document.getElementById('loadingScreen');
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none';
                    }
                }, 500);
            }, 2000);
        });
    }
    
    // Initialize 3D Icon Cloud
    init3DIconCloud() {
        // Wait for DOM to be fully loaded
        setTimeout(() => {
            new IconCloud3D('iconCloud');
        }, 500);
    }

    // Custom Cursor
    setupCursor() {
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursorFollower');
        
        if (!cursor || !cursorFollower) return;

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follower animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // Particle System
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                animation-duration: ${animationDuration}s;
                animation-delay: ${delay}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Stagger animations for children
                    const children = entry.target.querySelectorAll('[data-delay]');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => observer.observe(section));

        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Check for saved theme
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            body.classList.toggle('light-theme', savedTheme === 'light');
            this.updateThemeIcon(savedTheme === 'light');
        }

        themeToggle.addEventListener('click', () => {
            const isLight = body.classList.toggle('light-theme');
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            this.updateThemeIcon(isLight);
        });
    }

    updateThemeIcon(isLight) {
        const icon = document.querySelector('#themeToggle i');
        icon.className = isLight ? 'uil uil-sun' : 'uil uil-moon';
    }

    // Navigation
    setupNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Smooth scrolling and active link
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    
                    // Scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Portfolio Swiper
    setupPortfolioSwiper() {
        new Swiper('.portfolio-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            },
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 15,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            }
        });
    }

    // Event Listeners
    setupEventListeners() {
        // Smooth scroll for all internal links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Dynamic typing effect for hero title
        this.typeWriter();
        
        // Add hover effects to skill items
        this.setupSkillHovers();
        
        // Setup contact form interactions
        this.setupContactForm();
        
        // Setup stat counter animations
        this.setupStatCounters();
    }

    // Typing Effect
    typeWriter() {
        const titleName = document.querySelector('.title-name');
        if (!titleName) return;
        
        const text = titleName.textContent;
        titleName.textContent = '';
        titleName.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const type = () => {
            if (i < text.length) {
                titleName.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(() => {
                    titleName.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(type, 1500);
    }

    // Skill Hover Effects - Now handled entirely by CSS for consistency
    setupSkillHovers() {
        // CSS handles all hover effects for both themes
        // This function kept for potential future enhancements
    }

    // Contact Form
    setupContactForm() {
        const formInputs = document.querySelectorAll('.form-input');
        const contactForm = document.getElementById('contactForm');
        
        // Focus/blur effects for form inputs
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
        
        // Handle form submission
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Get form data
                const userName = document.getElementById('userName').value.trim();
                const userEmail = document.getElementById('userEmail').value.trim();
                const userMessage = document.getElementById('userMessage').value.trim();
                
                // Validate form data
                if (!userName || !userEmail || !userMessage) {
                    alert('Please fill in all fields before sending your message.');
                    return;
                }
                
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(userEmail)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                // Disable button while sending
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span>Sending...</span>';
                }
                
                // Send via Web3Forms using FormData (no mailto fallback)
                const WEB3FORMS_ACCESS_KEY = 'c50aae0686319e117adb446b4ad6e808';
                const fd = new FormData();
                fd.append('access_key', WEB3FORMS_ACCESS_KEY);
                fd.append('subject', `Portfolio Contact from ${userName}`);
                fd.append('name', userName);
                fd.append('email', userEmail);
                fd.append('message', userMessage);
                // Optional metadata for better deliverability
                fd.append('from_name', userName);
                fd.append('from_email', userEmail);
                
                try {
                    // Timeout to avoid hanging requests
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000);
                    const resp = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: { 'Accept': 'application/json' },
                        body: fd,
                        signal: controller.signal,
                        mode: 'cors'
                    });
                    clearTimeout(timeoutId);

                    const json = await resp.json();
                    console.log('Web3Forms response:', json);
                    if (json.success) {
                        alert('Thanks! Your message has been sent successfully.');
                        contactForm.reset();
                        // Remove focused classes
                        formInputs.forEach(input => {
                            input.parentElement.classList.remove('focused');
                        });
                    } else {
                        console.error('Web3Forms error:', json);
                        alert(`Send failed: ${json.message || 'Please try again later.'}`);
                    }
                } catch (err) {
                    console.error('Network error:', err);
                    alert('Network error. Please serve the site over HTTP (not file://), disable adblock/VPN, and try again.');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                }
            });
        }
    }

    // Stat Counter Animation
    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        
        const animateCounter = (element) => {
            const target = parseFloat(element.getAttribute('data-target'));
            const increment = target / 100; // Animation speed
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    
                    // Format the number based on target
                    if (target < 10) {
                        element.textContent = current.toFixed(2);
                    } else {
                        element.textContent = Math.ceil(current);
                    }
                    
                    requestAnimationFrame(updateCounter);
                } else {
                    // Final formatting
                    if (target < 10) {
                        element.textContent = target.toFixed(2) + '+';
                    } else {
                        element.textContent = Math.ceil(target) + '+';
                    }
                }
            };
            
            updateCounter();
        };
        
        // Intersection Observer for stat cards
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector('.stat-number[data-target]');
                    if (statNumber && !statNumber.classList.contains('animated')) {
                        statNumber.classList.add('animated');
                        setTimeout(() => {
                            animateCounter(statNumber);
                        }, 200);
                    }
                }
            });
        }, {
            threshold: 0.5
        });
        
        // Observe stat cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            statObserver.observe(card);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();
});

// Additional utility functions
const utils = {
    // Throttle function for performance
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },
    
    // Debounce function
    debounce: (func, wait, immediate) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
};

// Performance optimized scroll handler
window.addEventListener('scroll', utils.throttle(() => {
    // Add scroll-based animations here
    const scrolled = window.pageYOffset;
    
    // Update scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = scrolled > 100 ? '0' : '1';
    }
    
    // Parallax for floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const rate = (index + 1) * 0.1;
        element.style.transform = `translateY(${scrolled * rate}px)`;
    });
}, 16));

// Enhanced Card Interactions
class CardAnimations {
    constructor() {
        this.initCardAnimations();
    }
    
    initCardAnimations() {
        this.setupStatCardAnimations();
        this.setupContactCardAnimations();
        this.setupProjectCardAnimations();
    }
    
    setupStatCardAnimations() {
        const statCards = document.querySelectorAll('.stat-card');
        
        statCards.forEach((card, index) => {
            // Add staggered entrance animation
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Enhanced hover interactions
            card.addEventListener('mouseenter', () => {
                this.createRippleEffect(card);
            });
        });
    }
    
    setupContactCardAnimations() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach((card, index) => {
            // Add staggered entrance animation
            card.style.animationDelay = `${index * 0.15}s`;
            
            // Add click animation
            card.addEventListener('click', () => {
                card.style.transform = 'translateX(15px) scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });
    }
    
    setupProjectCardAnimations() {
        const projectCards = document.querySelectorAll('.project-card.modern-card');
        
        projectCards.forEach((card, index) => {
            // Enhanced 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
    
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(var(--primary-hue), 69%, 61%, 0.3)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// CSS for ripple effect (injected dynamically)
const rippleCSS = `
@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// 3D Icon Cloud Implementation
class IconCloud3D {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.icons = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.isAnimating = false;
        
        this.setupCanvas();
        this.createIcons();
        this.setupEventListeners();
        this.animate();
    }
    
    setupCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        this.canvas.width = rect.width;
        this.canvas.height = 500;
        
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = 200;
    }
    
    createIcons() {
        const iconSymbols = [
            { text: 'JS', color: '#F7DF1E' },
            { text: 'React', color: '#61DAFB' },
            { text: 'HTML', color: '#E34F26' },
            { text: 'CSS', color: '#1572B6' },
            { text: 'Java', color: '#ED8B00' },
            { text: 'Security', color: '#FF6B6B' },
            { text: 'Crypto', color: '#4ECDC4' },
            { text: 'Linux', color: '#FFA500' }
        ];
        
        iconSymbols.forEach((icon, index) => {
            const angle = (index / iconSymbols.length) * Math.PI * 2;
            const phi = Math.acos(-1 + (2 * index) / iconSymbols.length);
            const theta = Math.sqrt(iconSymbols.length * Math.PI) * phi;
            
            this.icons.push({
                x: this.radius * Math.cos(theta) * Math.sin(phi),
                y: this.radius * Math.sin(theta) * Math.sin(phi),
                z: this.radius * Math.cos(phi),
                originalX: this.radius * Math.cos(theta) * Math.sin(phi),
                originalY: this.radius * Math.sin(theta) * Math.sin(phi),
                originalZ: this.radius * Math.cos(phi),
                text: icon.text,
                color: icon.color,
                size: 1,
                opacity: 1
            });
        });
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = (e.clientX - rect.left - this.centerX) / this.canvas.width;
            this.mouseY = (e.clientY - rect.top - this.centerY) / this.canvas.height;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouseX = 0;
            this.mouseY = 0;
        });
        
        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }
    
    rotateIcons() {
        const rotationSpeed = 0.01;
        const mouseInfluence = 0.1;
        
        this.icons.forEach(icon => {
            // Auto rotation
            const autoRotationY = rotationSpeed;
            const autoRotationX = rotationSpeed * 0.5;
            
            // Mouse influence
            const mouseRotationY = this.mouseX * mouseInfluence;
            const mouseRotationX = this.mouseY * mouseInfluence;
            
            const totalRotationY = autoRotationY + mouseRotationY;
            const totalRotationX = autoRotationX + mouseRotationX;
            
            // Rotate around Y axis
            const cosY = Math.cos(totalRotationY);
            const sinY = Math.sin(totalRotationY);
            const tempX = icon.x * cosY - icon.z * sinY;
            const tempZ = icon.x * sinY + icon.z * cosY;
            icon.x = tempX;
            icon.z = tempZ;
            
            // Rotate around X axis
            const cosX = Math.cos(totalRotationX);
            const sinX = Math.sin(totalRotationX);
            const tempY = icon.y * cosX - icon.z * sinX;
            icon.z = icon.y * sinX + icon.z * cosX;
            icon.y = tempY;
        });
    }
    
    projectIcons() {
        this.icons.forEach(icon => {
            const perspective = 600;
            const projectedX = (icon.x * perspective) / (perspective + icon.z) + this.centerX;
            const projectedY = (icon.y * perspective) / (perspective + icon.z) + this.centerY;
            
            icon.projectedX = projectedX;
            icon.projectedY = projectedY;
            
            // Calculate size and opacity based on z position
            const scale = (perspective + icon.z) / perspective;
            icon.size = Math.max(0.3, scale * 0.8);
            icon.opacity = Math.max(0.3, scale);
        });
    }
    
    drawIcons() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Sort icons by z position (farthest first)
        const sortedIcons = [...this.icons].sort((a, b) => a.z - b.z);
        
        sortedIcons.forEach(icon => {
            this.ctx.save();
            
            this.ctx.globalAlpha = icon.opacity;
            this.ctx.fillStyle = icon.color;
            this.ctx.font = `bold ${32 * icon.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Add glow effect
            this.ctx.shadowColor = icon.color;
            this.ctx.shadowBlur = 20 * icon.size;
            
            this.ctx.fillText(icon.text, icon.projectedX, icon.projectedY);
            
            this.ctx.restore();
        });
    }
    
    animate() {
        this.rotateIcons();
        this.projectIcons();
        this.drawIcons();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize enhanced card animations
document.addEventListener('DOMContentLoaded', () => {
    new CardAnimations();
});

// Intersection Observer for enhanced animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for child elements
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe enhanced card containers
document.addEventListener('DOMContentLoaded', () => {
    const cardContainers = document.querySelectorAll('.about-stats, .contact-info, .portfolio-container');
    cardContainers.forEach(container => {
        // Initial state
        container.style.opacity = '0';
        container.style.transform = 'translateY(50px)';
        container.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Observe
        enhancedObserver.observe(container);
    });
});

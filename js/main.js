/**
 * ALL ABOUT DENTISTRY - Main JavaScript
 * Premium Dental Clinic Landing Page
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const backToTopBtn = document.getElementById('back-to-top');
    const testimonialCarousel = document.getElementById('testimonial-carousel');
    const testimonialDots = document.querySelectorAll('.testimonial__dot');
    const contactForm = document.getElementById('contact-form');

    // ============================================
    // Header Scroll Effect
    // ============================================
    function handleScroll() {
        const scrollPosition = window.scrollY;

        // Header background on scroll
        if (scrollPosition > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollPosition > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    }

    // ============================================
    // Mobile Navigation
    // ============================================
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ============================================
    // Smooth Scroll Navigation
    // ============================================
    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = header.offsetHeight;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ============================================
    // Testimonial Carousel
    // ============================================
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        const testimonials = testimonialCarousel.querySelectorAll('.testimonial');

        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });

        // Remove active from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current testimonial
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');

        currentTestimonial = index;
    }

    function nextTestimonial() {
        const testimonials = testimonialCarousel.querySelectorAll('.testimonial');
        const nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }

    function startTestimonialAutoplay() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function stopTestimonialAutoplay() {
        clearInterval(testimonialInterval);
    }

    // ============================================
    // Scroll Animations
    // ============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-fade-up');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Animate sections on scroll
    function initSectionAnimations() {
        const sections = document.querySelectorAll('section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });
    }

    // ============================================
    // Contact Form Validation
    // ============================================
    function validateForm(event) {
        event.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');

        let isValid = true;

        // Clear previous errors
        clearFormErrors();

        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        }

        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }

        // Validate phone (optional but must be valid if provided)
        if (phone.value.trim() && !isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            showFormSuccess();
            contactForm.reset();
        }

        return false;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
        return phoneRegex.test(phone);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = document.createElement('span');
        error.className = 'form-error';
        error.textContent = message;
        error.style.cssText = 'color: #E57373; font-size: 0.75rem; margin-top: 0.25rem; display: block;';
        formGroup.appendChild(error);
        input.style.borderColor = '#E57373';
    }

    function clearFormErrors() {
        const errors = document.querySelectorAll('.form-error');
        errors.forEach(error => error.remove());

        const inputs = contactForm.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }

    function showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div style="
                background-color: rgba(212, 165, 116, 0.1);
                border: 1px solid var(--color-accent);
                padding: 1rem;
                margin-bottom: 1rem;
                text-align: center;
                color: var(--color-accent);
            ">
                Thank you for your message! We'll be in touch soon.
            </div>
        `;

        contactForm.insertBefore(successMessage, contactForm.firstChild);

        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    // ============================================
    // Back to Top
    // ============================================
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ============================================
    // Hero Animation on Load
    // ============================================
    function initHeroAnimation() {
        const heroElements = document.querySelectorAll('.hero__content .animate-fade-up');

        setTimeout(() => {
            heroElements.forEach(element => {
                element.classList.add('animated');
            });
        }, 300);
    }

    // ============================================
    // Dark Header for Fullwidth Hero
    // ============================================
    function initDarkHeader() {
        const heroFullwidth = document.querySelector('.hero--fullwidth');
        if (heroFullwidth && header) {
            header.classList.add('header--dark');
        }
    }

    // ============================================
    // Initialize
    // ============================================
    function init() {
        // Initialize dark header if fullwidth hero exists
        initDarkHeader();

        // Scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Mobile navigation
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                smoothScrollTo(target);
                closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Testimonial carousel
        if (testimonialCarousel) {
            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showTestimonial(index);
                    stopTestimonialAutoplay();
                    startTestimonialAutoplay();
                });
            });

            // Pause autoplay on hover
            testimonialCarousel.addEventListener('mouseenter', stopTestimonialAutoplay);
            testimonialCarousel.addEventListener('mouseleave', startTestimonialAutoplay);

            // Start autoplay
            startTestimonialAutoplay();
        }

        // Contact form
        if (contactForm) {
            contactForm.addEventListener('submit', validateForm);
        }

        // Back to top button
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', scrollToTop);
        }

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    smoothScrollTo(href);
                }
            });
        });

        // Initialize animations
        initHeroAnimation();
        initScrollAnimations();
        initSectionAnimations();

        // Initial scroll check
        handleScroll();
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

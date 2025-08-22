// script.js - Main JavaScript for GrocerySync Feature Website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });



    // Button hover effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add loading animation for web app buttons
    const allButtons = document.querySelectorAll('button');
    const webAppButtons = Array.from(allButtons).filter(button =>
        button.textContent.includes('Launch GrocerySync') ||
        button.innerHTML.includes('Launch GrocerySync')
    );

    webAppButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = '<span>⏳</span> Loading...';
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = '<span>🛒🛒🛒</span> Access GrocerySync Web App';
                this.disabled = false;

                // Show a message that the web app is coming soon
                alert('🚀 GrocerySync Web App is coming soon!\n\nFor now, you can:\n• Bookmark this page\n• Check back later for updates\n• Share with your family when it launches!');

                // You can replace the alert with a redirect to your actual web app URL:
                // window.location.href = 'https://app.grocerysync.com';
            }, 2000);
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            // Toggle hamburger/close icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                // Show hamburger
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            } else {
                // Show X
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            }
        });
    }

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                // Reset to hamburger icon
                const icon = mobileMenuBtn?.querySelector('svg');
                if (icon) {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenuBtn && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            // Reset to hamburger icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (icon) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        }
    });

    // Performance optimizations
    // Lazy load images if any exist
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });

    // Add error handling for external resources
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('Failed to load image:', e.target.src);
            e.target.style.display = 'none';
        } else if (e.target.tagName === 'SCRIPT') {
            console.warn('Failed to load script:', e.target.src);
        }
    }, true);

    // Handle online/offline status
    window.addEventListener('online', function() {
        console.log('Connection restored');
        document.body.classList.remove('offline');
    });

    window.addEventListener('offline', function() {
        console.log('Connection lost');
        document.body.classList.add('offline');
    });

    // Add viewport height fix for mobile browsers
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Simple scroll animations - CSS only approach
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log('Intersection observer entry:', entry.target.tagName, entry.isIntersecting, entry.intersectionRatio);
                if (entry.isIntersecting) {
                    // Add scroll-visible class to trigger animations
                    entry.target.classList.add('scroll-visible');
                    console.log('✅ Animation triggered for:', entry.target.tagName, entry.target.className);
                    console.log('Element classes after animation:', entry.target.className);
                }
            });
        }, observerOptions);

        // Setup animations - hero animations only
        function setupAnimations() {
            console.log('Setting up hero animations only...');
            // No content animations - removed as requested
        }

        // Setup animations after DOM is ready
        setTimeout(setupAnimations, 100);

        // Check for elements already in view on page load - hero only
        function checkVisibleElements() {
            // No content animations to check - removed as requested
        }

        // Check for visible elements after animations are set up
        setTimeout(checkVisibleElements, 200);

        // Hero section animation (JavaScript only for this)
        function animateHero() {
            const heroSection = document.querySelector('section:first-of-type');
            const heroElements = heroSection.querySelectorAll('h1, p, .aurora-border');

            heroElements.forEach((element, index) => {
                // Set initial off-screen state
                element.style.opacity = '0';
                element.style.transform = index % 2 === 0 ? 'translateY(-80px)' : 'translateY(80px)';
                element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                // Animate in with stagger
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 300);
            });
        }

        // Animate hero section on page load
        setTimeout(animateHero, 300);

        // Fallback animations removed - no content animations as requested

        console.log('CSS-only scroll animations initialized');

        // Manual animation triggers removed - no content animations as requested

        // Test button removed - no content animations as requested
    }

    // Initialize scroll animations
    initScrollAnimations();

    console.log('GrocerySync website loaded successfully!');
});

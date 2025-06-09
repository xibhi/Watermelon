// Fixed and Enhanced JavaScript for Bug Hunting Toolkit
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== HAMBURGER MENU FIX =====
    const hamburgBtn = document.getElementById('hamburg-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const body = document.body;

    // Function to open mobile menu
    function openMobileMenu() {
        if (dropdownMenu) {
            dropdownMenu.classList.add('active');
            body.classList.add('menu-open');
        }
        if (hamburgBtn) {
            hamburgBtn.style.display = 'none';
        }
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        if (dropdownMenu) {
            dropdownMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
        if (hamburgBtn) {
            hamburgBtn.style.display = 'block';
        }
    }

    // Event listeners for hamburger menu
    if (hamburgBtn) {
        hamburgBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openMobileMenu();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Close menu when clicking on navigation links
    if (dropdownMenu) {
        const dropdownLinks = dropdownMenu.querySelectorAll('a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (dropdownMenu && dropdownMenu.classList.contains('active')) {
            const isClickInsideMenu = dropdownMenu.contains(event.target);
            const isClickOnHamburg = hamburgBtn && hamburgBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnHamburg) {
                closeMobileMenu();
            }
        }
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // ===== ENHANCED PROFESSIONAL TYPING EFFECT =====
   /* function createProfessionalTypingEffect() {
        const terminalHeader = document.querySelector('header h1');
        if (!terminalHeader) return;

        const originalText = terminalHeader.textContent.trim();
        terminalHeader.textContent = '';
        
        // Create typing container
        const typingContainer = document.createElement('div');
        typingContainer.classList.add('typing-container');
        terminalHeader.appendChild(typingContainer);

        // Add terminal prompt symbol
        const prompt = document.createElement('span');
        prompt.classList.add('terminal-prompt');
        prompt.textContent = '$ ';
        typingContainer.appendChild(prompt);

        // Create text span for the actual typing
        const textSpan = document.createElement('span');
        textSpan.classList.add('typed-text');
        typingContainer.appendChild(textSpan);

        // Create blinking cursor
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        cursor.textContent = '|';
        typingContainer.appendChild(cursor);

        // Enhanced typing animation
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        
        function typeWriter() {
            if (isPaused) return;

            const currentText = originalText.substring(0, charIndex);
            textSpan.textContent = currentText;

            if (!isDeleting && charIndex < originalText.length) {
                // Typing forward
                charIndex++;
                // Variable speed for more natural typing
                const speed = Math.random() * 100 + 50; // 50-150ms
                setTimeout(typeWriter, speed);
            } else if (!isDeleting && charIndex === originalText.length) {
                // Pause at the end
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    // Keep the final text and stop
                    cursor.classList.add('blink-final');
                }, 2000);
            }
        }

        // Start typing with initial delay
        setTimeout(typeWriter, 500);
    }

    // Call the professional typing effect
    createProfessionalTypingEffect(); */

    // ===== CUSTOM CURSOR SYSTEM =====
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update dot position immediately
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth animation for the outline circle
        function animateOutline() {
            const distX = mouseX - outlineX;
            const distY = mouseY - outlineY;
            
            outlineX += distX * 0.15;
            outlineY += distY * 0.15;
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateOutline);
        }

        animateOutline();

        // Enhanced hover effects
        const interactiveElements = document.querySelectorAll('a, button, .tool-item, .feature-card, .stat-card, [onclick]');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.classList.add('cursor-hover');
                cursorOutline.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('cursor-hover');
                cursorOutline.classList.remove('cursor-hover');
            });
        });

        // Click effects
        document.addEventListener('mousedown', () => {
            cursorDot.classList.add('cursor-click');
            cursorOutline.classList.add('cursor-click');
        });

        document.addEventListener('mouseup', () => {
            setTimeout(() => {
                cursorDot.classList.remove('cursor-click');
                cursorOutline.classList.remove('cursor-click');
            }, 150);
        });

        // Handle cursor visibility
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '0.8';
            cursorOutline.style.opacity = '0.3';
        });

        // Initialize cursor position
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
        outlineX = mouseX;
        outlineY = mouseY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
    }

    // ===== SCROLL ANIMATIONS =====
    // Enhanced scroll animation with Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animate-on-scroll');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Target elements for scroll animation
    const animatedElements = document.querySelectorAll('.tool-item, .feature-card, .stat-card');
    animatedElements.forEach(item => {
        observer.observe(item);
    });

    // ===== ENHANCED CARD HOVER EFFECTS =====
    const cards = document.querySelectorAll('.feature-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Create glow effect
            const glow = document.createElement('div');
            glow.classList.add('card-glow-effect');
            this.appendChild(glow);
            
            // Animate glow
            setTimeout(() => {
                glow.style.opacity = '1';
                glow.style.transform = 'scale(1.05)';
            }, 10);
            
            // Add access granted text for terminal feel
            const accessText = document.createElement('div');
            accessText.classList.add('access-granted');
            accessText.textContent = '> ACCESS GRANTED';
            this.appendChild(accessText);
            
            setTimeout(() => {
                accessText.style.opacity = '1';
                accessText.style.transform = 'translateY(0)';
            }, 200);
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove effects
            const glow = this.querySelector('.card-glow-effect');
            const accessText = this.querySelector('.access-granted');
            
            if (glow) {
                glow.style.opacity = '0';
                glow.style.transform = 'scale(1)';
                setTimeout(() => {
                    if (glow.parentNode === this) {
                        this.removeChild(glow);
                    }
                }, 300);
            }
            
            if (accessText) {
                accessText.style.opacity = '0';
                accessText.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (accessText.parentNode === this) {
                        this.removeChild(accessText);
                    }
                }, 300);
            }
        });
    });

    // ===== UPDATE FOOTER DATE =====
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        currentDateElement.textContent = `Last updated: ${now.toLocaleDateString('en-US', options)}`;
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
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

    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce scroll events
    let ticking = false;
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', updateOnScroll);

});
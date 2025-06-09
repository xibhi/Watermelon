// Add this to your existing JavaScript section or create a new <script> block
document.addEventListener('DOMContentLoaded', function() {
    // Existing watermelon seed code...
    
    // Scroll animation with Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Target all article cards for scroll animation
    document.querySelectorAll('.tool-item').forEach(item => {
        observer.observe(item);
    });
});

// Add this to your existing JavaScript code
document.addEventListener('click', () => {
    // Add click animation class
    cursorDot.classList.add('cursor-click');
    cursorOutline.classList.add('cursor-click');
    
    // Remove class after animation completes
    setTimeout(() => {
        cursorDot.classList.remove('cursor-click');
        cursorOutline.classList.remove('cursor-click');
    }, 500);
});

// Terminal typing effect for headers
const terminalHeader = document.querySelector('header h1');
const headerText = terminalHeader.textContent;
terminalHeader.textContent = '';

// Create a wrapper for the typing effect
const headerWrapper = document.createElement('span');
headerWrapper.classList.add('typing-effect');
terminalHeader.appendChild(headerWrapper);

// Add icon back to the header
const icon = document.createElement('i');
icon.className = 'fas fa-shield-alt';
headerWrapper.appendChild(icon);
headerWrapper.appendChild(document.createTextNode(' '));

// Typing effect
let i = 0;
const typingInterval = setInterval(() => {
    if (i < headerText.trim().length - 1) { // -1 to account for the icon
        headerWrapper.textContent += headerText.charAt(i + 1); // +1 to skip the icon
        headerWrapper.prepend(icon);
        i++;
    } else {
        clearInterval(typingInterval);
        // Add blinking cursor after typing
        const cursor = document.createElement('span');
        cursor.classList.add('blinking-cursor');
        headerWrapper.appendChild(cursor);
    }
}, 100);

// Add the scan line effect for a more terminal-like feel
const scan = document.querySelector('.scan-line');
if (!scan) {
    const scanLine = document.createElement('div');
    scanLine.classList.add('scan-line');
    document.body.appendChild(scanLine);
}

// Enhanced scroll animations with staggered effects
// Add this to your existing JavaScript
function setupStaggeredScrollAnimations() {
    // Create a new Intersection Observer
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation with delay based on index
                setTimeout(() => {
                    entry.target.classList.add('animate-on-scroll');
                }, index * 150); // 150ms delay between each animation
                
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Get all article cards in their DOM order
    const cards = Array.from(document.querySelectorAll('.tool-item'));
    
    // Observe each card
    cards.forEach(card => {
        staggerObserver.observe(card);
    });
    
    // Add hover glow effects to articles
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Create glow effect
            const glow = document.createElement('div');
            glow.classList.add('card-glow-effect');
            card.appendChild(glow);
            
            // Animate glow
            setTimeout(() => {
                glow.style.opacity = '1';
                glow.style.transform = 'scale(1.1)';
            }, 10);
            
            // Terminal "access granted" text effect
            const accessText = document.createElement('div');
            accessText.classList.add('access-text');
            accessText.textContent = 'ACCESS GRANTED';
            card.appendChild(accessText);
            
            setTimeout(() => {
                accessText.style.opacity = '1';
            }, 300);
            
            setTimeout(() => {
                accessText.style.opacity = '0';
            }, 1500);
        });
        
        card.addEventListener('mouseleave', () => {
            // Remove glow and access text
            const glow = card.querySelector('.card-glow-effect');
            const accessText = card.querySelector('.access-text');
            
            if (glow) {
                glow.style.opacity = '0';
                glow.style.transform = 'scale(1)';
                
                // Remove after animation completes
                setTimeout(() => {
                    if (glow.parentNode === card) {
                        card.removeChild(glow);
                    }
                }, 300);
            }
            
            if (accessText) {
                accessText.style.opacity = '0';
                setTimeout(() => {
                    if (accessText.parentNode === card) {
                        card.removeChild(accessText);
                    }
                }, 300);
            }
        });
    });
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Add staggered animations
    setupStaggeredScrollAnimations();
});

// Matrix digital rain animation
function createDigitalRain() {
    // Create rain container
    const rainContainer = document.createElement('div');
    rainContainer.classList.add('digital-rain');
    document.body.appendChild(rainContainer);
    
    // Matrix characters
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>?{}[]!@#$%^&*()_+-=';
    
    // Create columns of characters
    const numColumns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < numColumns; i++) {
        const column = document.createElement('div');
        column.classList.add('rain-column');
        
        // Random string length
        const length = 10 + Math.floor(Math.random() * 15);
        let columnText = '';
        
        for (let j = 0; j < length; j++) {
            columnText += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        column.textContent = columnText;
        
        // Random position and animation duration
        column.style.left = `${i * 20}px`;
        column.style.animationDuration = `${7 + Math.random() * 8}s`;
        column.style.animationDelay = `${Math.random() * 5}s`;
        
        rainContainer.appendChild(column);
    }
    
    // Only make the rain visible when scrolling
    let isScrolling;
    window.addEventListener('scroll', () => {
        rainContainer.style.opacity = '0.05';
        
        clearTimeout(isScrolling);
        
        isScrolling = setTimeout(() => {
            rainContainer.style.opacity = '0';
        }, 1500);
    });
}

// Add this to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Add digital rain effect
    createDigitalRain();
});

 // Get cursor elements
        const cursorDot = document.getElementById('cursor-dot');
        const cursorOutline = document.getElementById('cursor-outline');

        // Variables to store mouse position
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
            // Calculate the distance to move (creates the following effect)
            const distX = mouseX - outlineX;
            const distY = mouseY - outlineY;
            
            // Move outline towards mouse position (adjust 0.15 for different speeds)
            outlineX += distX * 0.15;
            outlineY += distY * 0.15;
            
            // Update outline position
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            // Continue animation
            requestAnimationFrame(animateOutline);
        }

        // Start the outline animation
        animateOutline();

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .hover-area, [onclick]');
        
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

        // Add click effects
        document.addEventListener('mousedown', () => {
            cursorDot.classList.add('cursor-click');
            cursorOutline.classList.add('cursor-click');
        });

        document.addEventListener('mouseup', () => {
            // Remove click classes after a short delay
            setTimeout(() => {
                cursorDot.classList.remove('cursor-click');
                cursorOutline.classList.remove('cursor-click');
            }, 150);
        });

        // Initialize cursor position
        document.addEventListener('DOMContentLoaded', () => {
            // Set initial position to center of screen
            mouseX = window.innerWidth / 2;
            mouseY = window.innerHeight / 2;
            outlineX = mouseX;
            outlineY = mouseY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            // Ensure cursor stays within bounds
            if (mouseX > window.innerWidth) mouseX = window.innerWidth;
            if (mouseY > window.innerHeight) mouseY = window.innerHeight;
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });

        // Show cursor when entering window
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '0.8';
            cursorOutline.style.opacity = '0.3';
        });

        // Alternative: Universal hover detection
document.addEventListener('mouseover', (e) => {
    const element = e.target;
    if (element.tagName === 'A' || element.tagName === 'BUTTON' || 
        element.classList.contains('demo-button') || 
        element.classList.contains('hover-area') ||
        element.hasAttribute('onclick')) {
        cursorDot.classList.add('cursor-hover');
        cursorOutline.classList.add('cursor-hover');
    }
});

document.addEventListener('mouseout', (e) => {
    cursorDot.classList.remove('cursor-hover');
    cursorOutline.classList.remove('cursor-hover');
});

// Complete Hamburger Menu Functionality - Add this to your scripts.js file

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu elements
    const hamburgBtn = document.getElementById('hamburg-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const body = document.body;

    // Function to open mobile menu
    function openMobileMenu() {
        dropdownMenu.classList.add('active');
        hamburgBtn.style.display = 'none';
        body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        dropdownMenu.classList.remove('active');
        hamburgBtn.style.display = 'block';
        body.style.overflow = 'auto'; // Restore scrolling
    }

    // Event listeners
    if (hamburgBtn) {
        hamburgBtn.addEventListener('click', openMobileMenu);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on navigation links
    const dropdownLinks = dropdownMenu.querySelectorAll('a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = dropdownMenu.contains(event.target);
        const isClickOnHamburg = hamburgBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburg && dropdownMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Existing code for other functionality...
    
    // Watermelon seed decoration
    const toolItems = document.querySelectorAll('.tool-item');
    
    // Add random "seeds" to each card
    toolItems.forEach(item => {
        const numSeeds = Math.floor(Math.random() * 5) + 3;
        
        for(let i = 0; i < numSeeds; i++) {
            const seed = document.createElement('div');
            seed.classList.add('seeds-decoration');
            
            // Random position within the card
            const topPos = Math.floor(Math.random() * 100);
            const leftPos = Math.floor(Math.random() * 90) + 5;
            
            seed.style.top = `${topPos}%`;
            seed.style.left = `${leftPos}%`;
            seed.style.transform = `rotate(${Math.random() * 45}deg)`;
            
            item.appendChild(seed);
        }
    });
    
    // Scroll animation with Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Target all article cards for scroll animation
    document.querySelectorAll('.tool-item').forEach(item => {
        observer.observe(item);
    });
    
    // Custom cursor animation
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Animate dot to follow cursor exactly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Animate outline with slight delay for trailing effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { 
            duration: 500,
            fill: 'forwards',
            easing: 'ease'
        });
    });
    
    // Add special effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .tool-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('cursor-hover');
            cursorOutline.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('cursor-hover');
            cursorOutline.classList.remove('cursor-hover');
        });
    });
    
    // Handle cursor when it leaves the window
    document.addEventListener('mouseout', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseover', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
    
    // Add terminal scan line effect
    const scanLine = document.createElement('div');
    scanLine.classList.add('scan-line');
    document.body.appendChild(scanLine);

    // Update current date in footer
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
});
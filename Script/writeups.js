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

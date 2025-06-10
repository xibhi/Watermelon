// Terminal Extensions - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CUSTOM CURSOR FUNCTIONALITY =====
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Variables to track cursor position
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move dot immediately
        if (cursorDot) {
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        }
    });
    
    // Smooth animation for cursor outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        if (cursorOutline) {
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
        }
        
        requestAnimationFrame(animateOutline);
    }
    
    if (cursorOutline) {
        animateOutline();
    }
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .tool-item, .mobile-menu-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (cursorDot) cursorDot.classList.add('cursor-hover');
            if (cursorOutline) cursorOutline.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            if (cursorDot) cursorDot.classList.remove('cursor-hover');
            if (cursorOutline) cursorOutline.classList.remove('cursor-hover');
        });
    });
    
    // ===== TERMINAL TYPING EFFECT =====
    const terminalText = document.querySelector('header h1');
    const descriptionText = document.querySelector('header p');
    const originalCommand = 'root@Penquin:~$ cat Extensions.txt';
    const descriptionContent = descriptionText ? descriptionText.textContent : '';
    
    if (terminalText) {
        // Create terminal structure
        const terminalContainer = document.createElement('div');
        terminalContainer.className = 'terminal-container';
        terminalContainer.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="terminal-btn close"></span>
                    <span class="terminal-btn minimize"></span>
                    <span class="terminal-btn maximize"></span>
                </div>
                <div class="terminal-title">kitty</div>
            </div>
            <div class="terminal-body">
                <div class="terminal-line">
                    <span class="terminal-prompt"></span>
                    <span class="blinking-cursor">|</span>
                </div>
                <div class="terminal-output" style="display: none;">
                    <div class="output-content"></div>
                    
                        <span class="terminal-prompt-new"> </span>

                    </div>
                </div>
            </div>
        `;
        
        // Replace the h1 and hide the p
        terminalText.parentNode.replaceChild(terminalContainer, terminalText);
        if (descriptionText) {
            descriptionText.style.display = 'none';
        }
        
        const promptSpan = terminalContainer.querySelector('.terminal-prompt');
        const cursor = terminalContainer.querySelector('.blinking-cursor');
        const terminalOutput = terminalContainer.querySelector('.terminal-output');
        const outputContent = terminalContainer.querySelector('.output-content');
        const newCursor = terminalContainer.querySelector('.blinking-cursor-new');
        
        let charIndex = 0;
        let isTyping = true;
        
        function typeCommand() {
            if (charIndex < originalCommand.length) {
                const char = originalCommand.charAt(charIndex);
                
                // Add special styling for different parts
                if (char === 'r' && charIndex === 0) {
                    promptSpan.innerHTML += '<span class="user-text">root</span>';
                    charIndex += 3; // Skip 'oot' (total 4 chars: r + oot = 4, but we already added 1)
                } else if (char === '@' && originalCommand.substring(0, charIndex).includes('root')) {
                    promptSpan.innerHTML += '<span class="at-symbol">@</span>';
                } else if (char === 'P' && originalCommand.substring(0, charIndex).includes('@')) {
                    promptSpan.innerHTML += '<span class="hostname">Penquin</span>';
                    charIndex += 6; // Skip 'enquin' (total 7 chars: P + enquin = 7, but we already added 1)
                } else if (char === ':' && originalCommand.substring(0, charIndex).includes('Penquin')) {
                    promptSpan.innerHTML += '<span class="colon">:</span>';
                } else if (char === '~' && originalCommand.substring(0, charIndex).includes(':')) {
                    promptSpan.innerHTML += '<span class="path">~</span>';
                } else if (char === '$' && originalCommand.substring(0, charIndex).includes('~')) {
                    promptSpan.innerHTML += '<span class="dollar">$</span>';
                } else if (char === ' ' && originalCommand.substring(0, charIndex).includes('$')) {
                    promptSpan.innerHTML += ' ';
                } else if (originalCommand.substring(charIndex).startsWith('cat')) {
                    promptSpan.innerHTML += '<span class="command">cat</span>';
                    charIndex += 2; // Skip 'at' (total 3 chars: c + at = 3, but we already added 1)
                } else if (char === ' ' && originalCommand.substring(0, charIndex).includes('cat')) {
                    promptSpan.innerHTML += ' ';
                } else if (originalCommand.substring(charIndex).startsWith('Extensions.txt')) {
                    promptSpan.innerHTML += '<span class="filename">Extensions.txt</span>';
                    charIndex += 13; // Skip remaining chars (total 14 chars: E + xtensions.txt = 14, but we already added 1)
                } else {
                    promptSpan.innerHTML += char;
                }
                
                charIndex++;
                
                // Random typing speed for more realistic effect
                const typingSpeed = Math.random() * 80 + 40;
                setTimeout(typeCommand, typingSpeed);
            } else {
                // Command typed, now show output after Enter effect
                setTimeout(() => {
                    cursor.style.display = 'none';
                    showTerminalOutput();
                }, 800);
            }
        }
        
        function showTerminalOutput() {
            terminalOutput.style.display = 'block';
            outputContent.innerHTML = '<div class="file-content">' + descriptionContent + '</div>';
            
            // Animate the output content
            let outputIndex = 0;
            const outputText = descriptionContent;
            outputContent.innerHTML = '<div class="file-content"><span class="output-text"></span></div>';
            const outputSpan = outputContent.querySelector('.output-text');
            
            function typeOutput() {
                if (outputIndex < outputText.length) {
                    outputSpan.textContent += outputText.charAt(outputIndex);
                    outputIndex++;
                    
                    // Faster typing for content
                    const outputSpeed = Math.random() * 20 + 10;
                    setTimeout(typeOutput, outputSpeed);
                } else {
                    // Content typed, show new prompt
                    setTimeout(() => {
                        if (newCursor) {
                            newCursor.style.animation = 'blinkCursor 1s infinite';
                        }
                        isTyping = false;
                    }, 500);
                }
            }
            
            setTimeout(typeOutput, 300);
        }
        
        // Start typing effect after a short delay
        setTimeout(() => {
            cursor.style.animation = 'none';
            cursor.textContent = '|';
            typeCommand();
        }, 1000);
    }
    
    // ===== MOBILE MENU FUNCTIONALITY =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenuBtn) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Create mobile menu structure
        mobileMenu.innerHTML = `
            <div class="mobile-menu-close">&times;</div>
            <ul class="mobile-menu-links">
                <li><a href="#home"><i></i>Home</a></li>
                <li><a href="#extensions"><i></i>Extensions</a></li>
                <li><a href="#writeups"><></i>Writeups</a></li>
            </ul>
        `;
        
        document.body.appendChild(mobileMenu);
        
        const mobileMenuClose = mobileMenu.querySelector('.mobile-menu-close');
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close mobile menu
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu when clicking on links
        const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu-links a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
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
    
    // Observe all tool items for scroll animations
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        observer.observe(item);
    });
    
    // ===== TERMINAL CURSOR BLINKING =====
    setInterval(() => {
        const cursor = document.querySelector('.blinking-cursor');
        if (cursor && !cursor.closest('.terminal-container')) {
            cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }
    }, 500);
    
    // ===== NAVBAR SCROLL EFFECT =====
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        const mobileMenu = document.querySelector('.mobile-menu');
        
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
        
        // Ctrl + K for quick search (future feature)
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            console.log('Quick search activated (feature coming soon)');
        }
    });
    
    // ===== PERFORMANCE OPTIMIZATION =====
    // Throttle resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalculate positions if needed
            if (window.innerWidth <= 768) {
                // Mobile optimizations
                if (cursorDot) cursorDot.style.display = 'none';
                if (cursorOutline) cursorOutline.style.display = 'none';
            } else {
                if (cursorDot) cursorDot.style.display = 'block';
                if (cursorOutline) cursorOutline.style.display = 'block';
            }
        }, 250);
    });
    
    // ===== CONSOLE EASTER EGG =====
    console.log(`
    ██████╗ ███████╗███╗   ██╗ ██████╗ ██╗   ██╗██╗███╗   ██╗
    ██╔══██╗██╔════╝████╗  ██║██╔═══██╗██║   ██║██║████╗  ██║
    ██████╔╝█████╗  ██╔██╗ ██║██║   ██║██║   ██║██║██╔██╗ ██║
    ██╔═══╝ ██╔══╝  ██║╚██╗██║██║▄▄ ██║██║   ██║██║██║╚██╗██║
    ██║     ███████╗██║ ╚████║╚██████╔╝╚██████╔╝██║██║ ╚████║
    ╚═╝     ╚══════╝╚═╝  ╚═══╝ ╚══▀▀═╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝
    
    🐧 Welcome to Penquin Terminal Extensions!
    🔍 Explore the security tools and happy hunting!
    
    Type 'help' for available commands... (just kidding, this is a webpage! 😄)
    `);
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== LOADING ANIMATION COMPLETE =====
    document.body.classList.add('loaded');
    
    console.log('🚀 Terminal Extensions loaded successfully!');
});

//Newly Addded

// Updated showTerminalOutput function to support scrolling text
function showTerminalOutput() {
    terminalOutput.style.display = 'block';
    
    // Create the file content with scrolling text
    outputContent.innerHTML = `
        <div class="file-content">
            <span class="output-text">${descriptionContent}</span>
        </div>
    `;
    
    // Get the output text element
    const outputSpan = outputContent.querySelector('.output-text');
    
    // Initially hide the text
    outputSpan.style.opacity = '0';
    
    // Show the text after a brief delay and start the animation
    setTimeout(() => {
        outputSpan.style.opacity = '1';
        // The CSS animation will handle the scrolling
    }, 300);
    
    // Show new cursor after the text is fully displayed
    setTimeout(() => {
        if (newCursor) {
            newCursor.style.animation = 'blinkCursor 1s infinite';
        }
        isTyping = false;
    }, 1000); // Reduced delay since we're not typing character by character
}

// Alternative version with fade-in effect (optional)
function showTerminalOutputWithFade() {
    terminalOutput.style.display = 'block';
    
    // Create the file content with scrolling text
    outputContent.innerHTML = `
        <div class="file-content">
            <span class="output-text">${descriptionContent}</span>
        </div>
    `;
    
    // Add fade-in animation
    const fileContent = outputContent.querySelector('.file-content');
    fileContent.style.opacity = '0';
    fileContent.style.transform = 'translateY(20px)';
    fileContent.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        fileContent.style.opacity = '1';
        fileContent.style.transform = 'translateY(0)';
    }, 300);
    
    // Show new cursor after animation
    setTimeout(() => {
        if (newCursor) {
            newCursor.style.animation = 'blinkCursor 1s infinite';
        }
        isTyping = false;
    }, 1000);
}
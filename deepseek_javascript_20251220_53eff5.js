// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('backToTop');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Change icon based on menu state
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .step, .resource-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.feature-card, .step, .resource-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Run animation on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Typewriter effect for code window
const codeLines = [
    "// Deploy to Vercel in 3 steps",
    "1. Push code to GitHub",
    "2. Import to Vercel", 
    "3. Your site is live!",
    "",
    "// It's really that simple",
    "const deploy = () => {",
    "  console.log('🚀 Website deployed!');",
    "  return 'Success!';",
    "}"
];

function typeWriter(element, lines, speed = 100) {
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';
    
    function type() {
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                currentLine += lines[lineIndex].charAt(charIndex);
                element.textContent = currentLine;
                charIndex++;
                setTimeout(type, speed);
            } else {
                currentLine += '\n';
                element.textContent = currentLine;
                lineIndex++;
                charIndex = 0;
                setTimeout(type, speed);
            }
        }
    }
    
    // Start typing after a delay
    setTimeout(() => {
        element.textContent = '';
        type();
    }, 1000);
}

// Initialize typewriter effect
window.addEventListener('DOMContentLoaded', () => {
    const codeElement = document.querySelector('.window-content code');
    if (codeElement) {
        typeWriter(codeElement, codeLines, 50);
    }
    
    // Add syntax highlighting classes
    setTimeout(() => {
        const codeText = codeElement.textContent;
        let highlightedCode = codeText
            .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
            .replace(/(console\.log|const|return)/g, '<span class="keyword">$1</span>')
            .replace(/(deploy)/g, '<span class="function">$1</span>')
            .replace(/(['"].*?['"])/g, '<span class="string">$1</span>');
        
        codeElement.innerHTML = highlightedCode;
    }, 6000);
});

// Add interactive feature to deploy button
document.querySelector('.deploy-button-container .btn').addEventListener('click', function(e) {
    if (!this.getAttribute('href').startsWith('http')) {
        e.preventDefault();
        
        // Create a fun confirmation message
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deploying...';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Successfully Deployed!';
            this.style.backgroundColor = '#10b981';
            
            // Reset after 3 seconds
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-external-link-alt"></i> Deploy on Vercel Now';
                this.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    }
});
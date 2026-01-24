// ============================================
// TITLE ANIMATION ON TRIPLE CLICK
// ============================================

class TitleAnimation {
    constructor() {
        this.clickCount = 0;
        this.clickTimeout = null;
        this.clickDelay = 750; // Time window for multiple clicks (ms)
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        // Find title elements based on page
        const titles = this.findTitles();
        
        titles.forEach(title => {
            if (title) {
                this.setupTripleClick(title);
            }
        });
    }

    findTitles() {
        const titles = [];
        
        // Landing page title
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) titles.push(mainTitle);
        
        // Games/Others page titles
        const projectsTitle = document.querySelector('.projects-main-title');
        if (projectsTitle) titles.push(projectsTitle);
        
        // Contact page title
        const contactTitle = document.querySelector('.contact-title');
        if (contactTitle) titles.push(contactTitle);
        
        return titles;
    }

    setupTripleClick(titleElement) {
        titleElement.addEventListener('click', (e) => {
            this.handleClick(titleElement, e);
        });
    }

    handleClick(titleElement, event) {
        // Clear previous timeout
        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
        }

        this.clickCount++;

        // Check if we have 3 or more clicks
        if (this.clickCount >= 3) {
            this.clickCount = 0;
            this.triggerAnimation(titleElement);
        } else {
            // Reset count after delay if no more clicks
            this.clickTimeout = setTimeout(() => {
                this.clickCount = 0;
            }, this.clickDelay);
        }
    }

    triggerAnimation(titleElement) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Store original HTML
        const originalHTML = titleElement.innerHTML;
        const originalText = titleElement.textContent || titleElement.innerText;
        
        // Split text into characters, preserving spaces and line breaks
        const letters = this.splitIntoLetters(originalHTML);
        
        // Wrap each letter in a span
        titleElement.innerHTML = letters.map((char, index) => {
            if (char === ' ') {
                return '<span class="title-letter-space"> </span>';
            } else if (char === '<br>') {
                return '<br>';
            } else if (char.trim() === '') {
                return char;
            } else {
                return `<span class="title-letter" data-index="${index}">${char}</span>`;
            }
        }).join('');
        
        // Get all letter spans
        const letterSpans = titleElement.querySelectorAll('.title-letter');
        
        // Apply random animations to each letter
        letterSpans.forEach((span, index) => {
            this.animateLetter(span, index);
        });
        
        // Reset after animation completes
        setTimeout(() => {
            titleElement.innerHTML = originalHTML;
            this.isAnimating = false;
        }, 2000); // Animation duration
    }

    splitIntoLetters(html) {
        // Simple approach: process HTML directly
        const letters = [];
        let inTag = false;
        let currentText = '';
        
        for (let i = 0; i < html.length; i++) {
            const char = html[i];
            
            if (char === '<') {
                inTag = true;
                // Check if it's a <br> tag
                if (html.substr(i, 4).toLowerCase() === '<br>') {
                    letters.push('<br>');
                    i += 3; // Skip the <br> tag
                    inTag = false;
                    continue;
                } else if (html.substr(i, 5).toLowerCase() === '<br/>') {
                    letters.push('<br>');
                    i += 4; // Skip the <br/> tag
                    inTag = false;
                    continue;
                }
            } else if (char === '>') {
                inTag = false;
                continue;
            }
            
            if (!inTag) {
                if (char === ' ') {
                    letters.push(' ');
                } else if (char.trim() !== '') {
                    letters.push(char);
                }
            }
        }
        
        return letters;
    }

    animateLetter(span, index) {
        // Random values for each property
        const randomSize = 0.5 + Math.random() * 1.5; // 0.5x to 2x
        const randomWeight = Math.floor(100 + Math.random() * 800); // 100 to 900
        const randomHue = Math.floor(Math.random() * 360); // 0 to 360
        const randomRotation = (Math.random() - 0.5) * 30; // -15deg to +15deg
        const randomSkewX = (Math.random() - 0.5) * 20; // -10deg to +10deg
        const randomSkewY = (Math.random() - 0.5) * 20; // -10deg to +10deg
        
        // Apply styles with transition
        span.style.display = 'inline-block';
        span.style.transition = 'all 0.3s ease';
        span.style.transform = `scale(${randomSize}) rotate(${randomRotation}deg) skew(${randomSkewX}deg, ${randomSkewY}deg)`;
        span.style.fontWeight = randomWeight;
        span.style.color = `hsl(${randomHue}, 70%, 60%)`;
        
        // Stagger animation start slightly
        setTimeout(() => {
            span.style.transition = 'all 0.5s ease';
        }, index * 10);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TitleAnimation();
});

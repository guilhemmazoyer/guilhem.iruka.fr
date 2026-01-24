// ============================================
// PAGE TRANSITIONS (Fade Simple)
// ============================================

class PageTransitions {
    constructor() {
        this.transitionOverlay = null;
        this.transitionDuration = 300; // ms
        this.init();
    }

    init() {
        // Create transition overlay element
        this.createOverlay();
        
        // Handle page load fade-in
        this.handlePageLoad();
        
        // Intercept all internal links
        this.interceptLinks();
    }

    createOverlay() {
        // Check if overlay already exists (created by inline script in head)
        this.transitionOverlay = document.querySelector('.page-transition-overlay');
        
        if (!this.transitionOverlay) {
            // Create overlay if it doesn't exist
            this.transitionOverlay = document.createElement('div');
            this.transitionOverlay.className = 'page-transition-overlay';
            this.transitionOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #000000;
                z-index: 10000;
                opacity: 0;
                pointer-events: none;
                transition: opacity ${this.transitionDuration}ms ease;
            `;
            document.body.appendChild(this.transitionOverlay);
        } else {
            // Ensure overlay is in body and has correct styles
            if (this.transitionOverlay.parentNode !== document.body) {
                document.body.appendChild(this.transitionOverlay);
            }
            // Ensure transition is set
            if (!this.transitionOverlay.style.transition.includes('opacity')) {
                this.transitionOverlay.style.transition = `opacity ${this.transitionDuration}ms ease`;
            }
        }
    }

    handlePageLoad() {
        // Fade in on page load (only if coming from internal navigation)
        const referrer = document.referrer;
        const currentDomain = window.location.origin;
        
        if (referrer && referrer.startsWith(currentDomain) && referrer !== window.location.href) {
            // Overlay should already be visible (created by inline script)
            // Just fade it out
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        if (this.transitionOverlay) {
                            this.transitionOverlay.style.opacity = '0';
                        }
                    }, 10);
                });
            });
        }
    }

    interceptLinks() {
        // Intercept clicks on all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            // Check if it's an internal link (same domain, not external, not anchor, not mailto/tel)
            try {
                const url = new URL(href, window.location.origin);
                const isInternal = url.origin === window.location.origin;
                const isAnchor = href.startsWith('#');
                const isExternalProtocol = href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http://') || href.startsWith('https://');
                
                // Only handle internal HTML page links
                if (isInternal && !isAnchor && !isExternalProtocol && (href.endsWith('.html') || (!href.includes('.') && href !== '#'))) {
                    // Close menu if open (to allow menu close handler to run first)
                    const menuOverlay = document.getElementById('menuOverlay');
                    if (menuOverlay && menuOverlay.classList.contains('active')) {
                        menuOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Prevent default navigation
                    e.preventDefault();
                    
                    // Start fade-out transition
                    this.fadeOut(() => {
                        // Navigate after fade-out completes
                        window.location.href = href;
                    });
                }
            } catch (error) {
                // Invalid URL, ignore
                return;
            }
        }, true); // Use capture phase to intercept before other handlers
    }

    fadeOut(callback) {
        this.transitionOverlay.style.opacity = '1';
        this.transitionOverlay.style.pointerEvents = 'auto';
        
        setTimeout(() => {
            if (callback) callback();
        }, this.transitionDuration);
    }
}

// Initialize page transitions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PageTransitions();
});


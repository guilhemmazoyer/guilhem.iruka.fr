// ============================================
// LOADING ANIMATION (Landing Page First Load)
// ============================================

class LoadingAnimation {
    constructor() {
        this.isFirstLoad = this.checkFirstLoad();
        this.body = document.body;
        
        if (this.isFirstLoad && this.body.classList.contains('page-home')) {
            this.init();
        } else {
            // Not first load - show everything immediately
            this.body.classList.add('loaded');
        }
    }

    checkFirstLoad() {
        // Check if coming from menu (referrer is from same domain)
        const referrer = document.referrer;
        const currentDomain = window.location.origin;
        
        // If referrer is from same domain and not empty, user came from menu
        if (referrer && referrer.startsWith(currentDomain) && referrer !== window.location.href) {
            return false;
        }
        
        // Check sessionStorage to see if already loaded in this session
        const hasLoaded = sessionStorage.getItem('landingPageLoaded');
        if (hasLoaded === 'true') {
            return false;
        }
        
        return true;
    }

    init() {
        // Hide all elements initially
        this.hideAllElements();
        
        // Set initial background state for animation
        this.setInitialBackground();
        
        // Disable scroll during animation
        this.disableScroll();
        
        // Wait for carousel to be ready, then start animation
        this.waitForCarouselReady().then(() => {
            this.startAnimation();
        });
    }

    hideAllElements() {
        // Hide header (will slide down from top - subtle movement)
        const header = document.querySelector('.header');
        if (header) {
            header.style.opacity = '0';
            header.style.visibility = 'hidden';
            header.style.transform = 'translateY(-5%)';
        }
        
        // Hide footer (will slide up from bottom - subtle movement)
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.style.opacity = '0';
            footer.style.visibility = 'hidden';
            footer.style.transform = 'translateY(5%)';
        }
        
        // Hide main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.visibility = 'hidden';
        }
        
        // Hide project info elements
        const projectInfo = document.querySelector('.project-info');
        if (projectInfo) {
            projectInfo.querySelectorAll('*').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateX(-20px)';
            });
        }
        
        // Hide main title
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) {
            mainTitle.style.opacity = '0';
        }
        
        // Hide scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
        }
    }

    setInitialBackground() {
        // Get target background color from first project
        let targetBgColor = '#1a1a1a'; // Default
        if (window.carouselInstance && window.carouselInstance.projects && window.carouselInstance.projects.length > 0) {
            const firstProject = window.carouselInstance.projects[0];
            if (firstProject.bgColor) {
                targetBgColor = firstProject.bgColor;
            }
        }
        
        // Set body to black initially
        this.body.style.backgroundColor = '#000000';
        
        // Store target color in CSS variable for ::before to use
        this.body.style.setProperty('--target-bg-color', targetBgColor);
        
        // Add class to trigger animation
        this.body.classList.add('background-animating');
        
        // After animation, set the background color on body directly
        setTimeout(() => {
            this.body.style.backgroundColor = targetBgColor;
        }, 1000);
    }

    disableScroll() {
        if (window.carouselInstance) {
            window.carouselInstance.isScrolling = true;
        }
    }

    enableScroll() {
        if (window.carouselInstance) {
            window.carouselInstance.isScrolling = false;
        }
    }

    waitForCarouselReady() {
        return new Promise((resolve) => {
            const checkCarousel = () => {
                if (window.carouselInstance && window.carouselInstance.carouselStack) {
                    const images = window.carouselInstance.carouselStack.querySelectorAll('.carousel-image');
                    if (images.length > 0) {
                        // Hide all images initially
                        images.forEach(img => {
                            img.style.opacity = '0';
                            img.style.visibility = 'hidden';
                        });
                        
                        // Wait for images to load
                        this.waitForImagesToLoad(images).then(() => {
                            resolve();
                        });
                    } else {
                        setTimeout(checkCarousel, 50);
                    }
                } else {
                    setTimeout(checkCarousel, 50);
                }
            };
            checkCarousel();
        });
    }

    waitForImagesToLoad(images) {
        return new Promise((resolve) => {
            let loadedCount = 0;
            const totalImages = images.length;
            
            if (totalImages === 0) {
                resolve();
                return;
            }
            
            images.forEach(img => {
                if (img.complete && img.naturalWidth > 0) {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        resolve();
                    }
                } else {
                    img.addEventListener('load', () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            resolve();
                        }
                    });
                    img.addEventListener('error', () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            resolve();
                        }
                    });
                }
            });
            
            // Timeout after 3 seconds
            setTimeout(() => resolve(), 3000);
        });
    }

    startAnimation() {
        // Step 1: Background reveal (0s - 1s) - animate body background
        this.body.classList.add('background-reveal-animate');
        
        // Step 2: Active card + info + title (starts at 0.75s, duration 0.5s)
        setTimeout(() => {
            this.showActiveCard();
        }, 750);
        
        // Step 3: Behind cards (starts at 1.1s, duration 1s)
        setTimeout(() => {
            this.showBehindCards();
        }, 1100);
        
        // Step 4: Rest of elements (starts at 1.8s, duration 0.3s)
        setTimeout(() => {
            this.showRestOfElements();
        }, 1800);
        
        // Complete animation (starts at 2.1s)
        setTimeout(() => {
            this.completeAnimation();
        }, 2100);
    }

    showActiveCard() {
        // Show main content first (parent container)
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.visibility = 'visible';
            mainContent.style.opacity = '1';
        }
        
        // Show active card
        const activeCard = document.querySelector('.carousel-image.active');
        if (activeCard) {
            activeCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.4s ease';
            activeCard.style.opacity = '1';
            activeCard.style.visibility = 'visible';
        }
        
        // Show project info with staggered animation
        const projectInfo = document.querySelector('.project-info');
        if (projectInfo) {
            const elements = projectInfo.querySelectorAll('*');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                }, index * 50);
            });
        }
        
        // Show main title at the same time as active card
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) {
            mainTitle.style.transition = 'opacity 0.5s ease';
            mainTitle.style.opacity = '1';
        }
    }

    showBehindCards() {
        // Show behind cards one by one with animation from center
        const behind1 = document.querySelector('.carousel-image.behind-1');
        const behind2 = document.querySelector('.carousel-image.behind-2');
        const behind3 = document.querySelector('.carousel-image.behind-3');
        
        const cards = [behind1, behind2, behind3].filter(card => card !== null);
        
        cards.forEach((card, index) => {
            // Determine final position based on class
            let finalTransform = '';
            let finalOpacity = '';
            
            if (card.classList.contains('behind-1')) {
                finalTransform = 'translateZ(-60px) scale(0.95) translateY(-40px)';
                finalOpacity = '0.85';
            } else if (card.classList.contains('behind-2')) {
                finalTransform = 'translateZ(-120px) scale(0.90) translateY(-80px)';
                finalOpacity = '0.7';
            } else if (card.classList.contains('behind-3')) {
                finalTransform = 'translateZ(-180px) scale(0.85) translateY(-120px)';
                finalOpacity = '0.55';
            }
            
            // Start from center (behind active card)
            card.style.transform = 'translateZ(-60px) scale(0.95) translateY(-40px)';
            card.style.opacity = '0';
            card.style.visibility = 'visible';
            card.style.transition = 'none';
            
            // Force reflow
            card.offsetHeight;
            
            // Animate to final position with delay
            setTimeout(() => {
                card.style.transition = 'opacity 1s ease, transform 1s ease, box-shadow 0.4s ease';
                card.style.opacity = finalOpacity;
                card.style.transform = finalTransform;
            }, index * 150);
        });
    }

    showRestOfElements() {
        // Show header with slide down animation (from top - subtle movement)
        const header = document.querySelector('.header');
        if (header) {
            // Position already set in hideAllElements() - just add transition and make visible
            header.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            header.style.opacity = '1';
            header.style.visibility = 'visible';
            
            // Animate to final position (from -5% to 0)
            requestAnimationFrame(() => {
                header.style.transform = 'translateY(0)';
            });
        }
        
        // Show footer with slide up animation (from bottom - subtle movement)
        const footer = document.querySelector('.footer');
        if (footer) {
            // Position already set in hideAllElements() - just add transition and make visible
            footer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            footer.style.opacity = '1';
            footer.style.visibility = 'visible';
            
            // Animate to final position (from 5% to 0)
            requestAnimationFrame(() => {
                footer.style.transform = 'translateY(0)';
            });
        }
        
        // Show scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.transition = 'opacity 0.25s ease';
            scrollIndicator.style.opacity = '1';
        }
        
        // Show music tooltip on first visit
        this.showMusicTooltip();
        
        // Mark page as loaded
        this.body.classList.add('loaded');
    }

    showMusicTooltip() {
        // Check if tooltip was already shown in this session (using sessionStorage)
        const tooltipShown = sessionStorage.getItem('musicTooltipShown');
        if (tooltipShown === 'true') {
            return; // Don't show tooltip if already shown in this session
        }
        
        const musicToggle = document.getElementById('musicToggle');
        if (!musicToggle) {
            return;
        }
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'music-tooltip';
        tooltip.innerHTML = `
            <div class="music-tooltip-text">Turn on the sound</div>
            <div class="music-tooltip-arrow"></div>
        `;
        
        // Append to body first
        document.body.appendChild(tooltip);
        
        // Force reflow to ensure element is in DOM before positioning
        tooltip.offsetHeight;
        
        // Position tooltip relative to music toggle button
        this.positionTooltip(tooltip, musicToggle);
        
        // Force another reflow to ensure initial styles are applied
        tooltip.offsetHeight;
        
        // Show tooltip with slide-down animation (like header) using CSS class
        requestAnimationFrame(() => {
            tooltip.classList.add('show');
        });
        
        // Close tooltip handlers
        const closeTooltip = () => {
            tooltip.classList.remove('show');
            tooltip.style.transform = 'translateX(-50%) translateY(10px)';
            setTimeout(() => {
                tooltip.remove();
            }, 300);
            sessionStorage.setItem('musicTooltipShown', 'true');
            
            // Remove event listeners
            document.removeEventListener('click', closeTooltip, true);
            document.removeEventListener('wheel', closeTooltip, true);
            document.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('scroll', closeTooltip, true);
        };
        
        const handleKeydown = (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
                e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                closeTooltip();
            }
        };
        
        // Add event listeners (use capture phase to catch events early)
        // Small delay to prevent immediate closing when tooltip appears
        setTimeout(() => {
            document.addEventListener('click', closeTooltip, true);
            document.addEventListener('wheel', closeTooltip, true);
            document.addEventListener('keydown', handleKeydown);
            window.addEventListener('scroll', closeTooltip, true);
        }, 300);
    }

    positionTooltip(tooltip, musicToggle) {
        // Get button position
        const buttonRect = musicToggle.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonBottom = buttonRect.bottom;
        
        // Position tooltip below the button
        // Only set position, let CSS handle transform and opacity
        tooltip.style.position = 'fixed';
        tooltip.style.left = `${buttonCenterX}px`;
        tooltip.style.top = `${buttonBottom + 15}px`;
        
        // Arrow styling is handled by CSS, no need to set inline styles
    }

    completeAnimation() {
        // Background color is already set on body and will persist
        // Remove animation classes (::before will be removed, body keeps its background)
        this.body.classList.remove('background-animating', 'background-reveal-animate');
        
        // Reset inline styles on all carousel images to allow CSS classes to work properly
        const images = document.querySelectorAll('.carousel-image');
        images.forEach(img => {
            img.style.opacity = '';
            img.style.visibility = '';
        });
        
        // Enable scroll
        this.enableScroll();
        
        // Mark as loaded in session
        sessionStorage.setItem('landingPageLoaded', 'true');
    }
}

// Initialize loading animation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for carousel to be initialized
    const initAnimation = () => {
        if (window.carouselInstance && window.carouselInstance.carouselStack) {
            new LoadingAnimation();
        } else {
            setTimeout(initAnimation, 50);
        }
    };
    initAnimation();
});

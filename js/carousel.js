// ============================================
// CAROUSEL HANDLER (Landing Page)
// ============================================

class Carousel {
    constructor() {
        this.projects = projects || [];
        this.currentIndex = 0;
        this.isScrolling = false;
        this.scrollThreshold = 50; // pixels to scroll before changing project
        this.clickHandler = null;
        this.keyboardHandler = null;
        
        // DOM elements
        this.carouselStack = document.getElementById('carouselStack');
        this.projectNumber = document.getElementById('projectNumber');
        this.projectTitle = document.getElementById('projectTitle');
        this.projectYear = document.getElementById('projectYear');
        this.projectGenre = document.getElementById('projectGenre');
        this.projectShortDescription = document.getElementById('projectShortDescription');
        this.footerBar = document.querySelector('.footer-bar');
        this.body = document.body;
        
        // Store instance globally for loading animation
        window.carouselInstance = this;
        
        // Initialize
        if (this.projects.length > 0) {
            this.init();
        }
    }

    init() {
        this.createImages();
        this.createFooterIndices();
        this.updateProject(0);
        this.setupScrollListener();
        this.setupSwipeListener();
        this.setupKeyboardListener();
    }

    createImages() {
        if (!this.carouselStack) return;
        
        this.carouselStack.innerHTML = '';
        
        // Create images for all projects
        this.projects.forEach((project, index) => {
            const img = document.createElement('img');
            img.src = project.image;
            img.alt = project.title || 'Project image';
            if(index<2){img.fetchPriority = "high"};
            img.className = 'carousel-image';
            img.dataset.index = index;
            
            // Click handler will be set in updateCarouselImages based on card position
            this.carouselStack.appendChild(img);
        });
    }

    createFooterIndices() {
        if (!this.footerBar) return;
        
        this.footerBar.innerHTML = '';
        
        this.projects.forEach((project, index) => {
            const indexElement = document.createElement('div');
            indexElement.className = 'project-index';
            indexElement.dataset.index = index;
            indexElement.style.cursor = 'pointer';
            if (index === 0) {
                indexElement.classList.add('active');
            }
            
            // Click handler to navigate to project
            indexElement.addEventListener('click', () => {
                this.updateProject(index);
            });
            
            const number = document.createElement('span');
            number.className = 'project-index-number';
            number.textContent = String(index + 1).padStart(2, '0');
            
            indexElement.appendChild(number);
            this.footerBar.appendChild(indexElement);
        });
    }

    updateProject(index) {
        if (index < 0 || index >= this.projects.length) return;
        
        this.currentIndex = index;
        const project = this.projects[index];
        
        // Update project info
        if (this.projectNumber) {
            this.projectNumber.textContent = String(index + 1).padStart(2, '0');
        }
        if (this.projectTitle) {
            this.projectTitle.textContent = project.title;
        }
        if (this.projectYear) {
            this.projectYear.textContent = project.year;
        }
        if (this.projectGenre) {
            this.projectGenre.textContent = project.genre;
        }
        if (this.projectShortDescription) {
            this.projectShortDescription.textContent = project.shortDescription || project.genre;
        }
        
        // Update background color
        if (project.bgColor) {
            this.body.style.backgroundColor = project.bgColor;
        }
        
        // Update carousel images
        this.updateCarouselImages();
        
        // Update footer indices
        this.updateFooterIndices();
    }

    updateCarouselImages() {
        const images = this.carouselStack.querySelectorAll('.carousel-image');
        const totalProjects = this.projects.length;
        
        // Calculate which images should be visible (current + next 3)
        const visibleIndices = [];
        visibleIndices.push(this.currentIndex); // Active card
        for (let i = 1; i <= 3; i++) {
            const nextIndex = (this.currentIndex + i) % totalProjects;
            visibleIndices.push(nextIndex);
        }
        
        images.forEach((img, index) => {
            // Remove all classes and reset styles
            img.classList.remove('active', 'behind-1', 'behind-2', 'behind-3', 'behind-4');
            img.style.opacity = '';
            img.style.transform = '';
            img.style.visibility = ''; // Reset visibility to allow CSS classes to work
            img.style.pointerEvents = '';
            img.style.cursor = '';
            
            if (index === this.currentIndex) {
                // Active card
                img.classList.add('active');
                img.style.cursor = 'pointer';
            } else if (visibleIndices.includes(index)) {
                // Card is one of the 3 behind
                const position = visibleIndices.indexOf(index);
                if (position > 0) {
                    img.classList.add(`behind-${position}`);
                    img.style.cursor = 'pointer';
                }
            } else {
                // Hide images that are not visible
                img.style.opacity = '0';
                img.style.pointerEvents = 'none';
            }
        });
        
        // Set up click handlers using event delegation on the stack
        this.setupClickHandlers();
    }
    
    setupClickHandlers() {
        // Remove old listener if exists
        if (this.clickHandler) {
            this.carouselStack.removeEventListener('click', this.clickHandler);
        }
        
        // Create new click handler
        this.clickHandler = (e) => {
            const img = e.target.closest('.carousel-image');
            if (!img) return;
            
            const clickedIndex = parseInt(img.dataset.index);
            const totalProjects = this.projects.length;
            
            // Calculate visible indices
            const visibleIndices = [];
            visibleIndices.push(this.currentIndex);
            for (let i = 1; i <= 3; i++) {
                const nextIndex = (this.currentIndex + i) % totalProjects;
                visibleIndices.push(nextIndex);
            }
            
            if (clickedIndex === this.currentIndex) {
                // Click on active card opens the link
                const project = this.projects[this.currentIndex];
                if (project.link) {
                    window.open(project.link, '_blank');
                }
            } else if (visibleIndices.includes(clickedIndex)) {
                // Click on behind card makes it the active one
                this.updateProject(clickedIndex);
            }
        };
        
        this.carouselStack.addEventListener('click', this.clickHandler);
    }

    updateFooterIndices() {
        const indices = this.footerBar.querySelectorAll('.project-index');
        indices.forEach((indexEl, i) => {
            if (i === this.currentIndex) {
                indexEl.classList.add('active');
            } else {
                indexEl.classList.remove('active');
            }
        });
    }

    setupScrollListener() {
        let scrollDelta = 0;
        let lastScrollTime = Date.now();
        
        window.addEventListener('wheel', (e) => {
            if (this.isScrolling) return;
            
            const now = Date.now();
            const timeDiff = now - lastScrollTime;
            
            // Reset delta if too much time has passed
            if (timeDiff > 200) {
                scrollDelta = 0;
            }
            
            scrollDelta += e.deltaY;
            lastScrollTime = now;
            
            if (Math.abs(scrollDelta) > this.scrollThreshold) {
                this.isScrolling = true;
                
                if (scrollDelta > 0) {
                    this.next();
                } else {
                    this.previous();
                }
                
                scrollDelta = 0;
                
                // Prevent scrolling for a short time
                setTimeout(() => {
                    this.isScrolling = false;
                }, 200);
            }
            
            // Prevent default scroll behavior
            e.preventDefault();
        }, { passive: false });
    }

    setupSwipeListener() {
        let touchStartY = 0;
        let touchEndY = 0;
        
        this.carouselStack.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        this.carouselStack.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });
        
        this.handleSwipe = () => {
            const swipeDistance = touchStartY - touchEndY;
            const minSwipeDistance = 50;
            
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    this.next();
                } else {
                    this.previous();
                }
            }
        };
    }

    setupKeyboardListener() {
        // Remove old listener if exists
        if (this.keyboardHandler) {
            window.removeEventListener('keydown', this.keyboardHandler);
        }
        
        // Create keyboard handler
        this.keyboardHandler = (e) => {
            // Handle numpad keys (1-9) for direct project navigation
            const numpadKeys = ['Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9'];
            const numpadIndex = numpadKeys.indexOf(e.code);
            if (numpadIndex !== -1) {
                const projectIndex = numpadIndex; // 0-8
                if (projectIndex < this.projects.length) {
                    e.preventDefault();
                    if (!this.isScrolling) {
                        this.isScrolling = true;
                        this.updateProject(projectIndex);
                        setTimeout(() => {
                            this.isScrolling = false;
                        }, 200);
                    }
                }
                return;
            }
            
            // Only handle arrow keys, regardless of focus
            if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
                e.preventDefault();
                if (!this.isScrolling) {
                    this.isScrolling = true;
                    this.next();
                    setTimeout(() => {
                        this.isScrolling = false;
                    }, 200);
                }
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                e.preventDefault();
                if (!this.isScrolling) {
                    this.isScrolling = true;
                    this.previous();
                    setTimeout(() => {
                        this.isScrolling = false;
                    }, 200);
                }
            }
        };
        
        // Add listener to window (works regardless of focus)
        window.addEventListener('keydown', this.keyboardHandler);
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.projects.length;
        this.updateProject(nextIndex);
    }

    previous() {
        const prevIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
        this.updateProject(prevIndex);
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on home page
    if (document.body.classList.contains('page-home')) {
        new Carousel();
    }
});


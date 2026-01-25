// ============================================
// MENU HOVER EFFECTS WITH RANDOM IMAGES
// ============================================

class MenuHover {
    constructor() {
        this.menuOverlay = document.getElementById('menuOverlay');
        this.menuNav = document.querySelector('.menu-nav');
        this.menuLinks = document.querySelectorAll('.menu-link');
        this.hoverImages = [];
        
        // Image categories mapping
        this.imageCategories = {
            'Home': null, // Will use projects data if available
            'Games': null, // Will use games data if available
            'Others': null, // Will use others data if available
            'Contact': null // No images for contact
        };
        
        this.init();
    }

    init() {
        if (!this.menuNav) return;
        
        // Don't initialize hover images on mobile (touch devices)
        if (window.innerWidth <= 768) {
            // Only setup fade effect for links, no images
            this.setupHoverEventsMobile();
            return;
        }
        
        // Load image data
        this.loadImageData();
        
        // Create container for hover images
        this.createImageContainer();
        
        // Setup hover events for each menu link
        this.setupHoverEvents();
    }

    setupHoverEventsMobile() {
        // Mobile version: only fade effect, no images
        this.menuLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Fade other links
                this.menuLinks.forEach(l => {
                    if (l !== link) {
                        l.style.opacity = '0.5';
                    }
                });
            });
            
            link.addEventListener('mouseleave', () => {
                // Reset opacity
                this.menuLinks.forEach(l => {
                    l.style.opacity = '';
                });
            });
        });
    }

    loadImageData() {
        // Load all image data regardless of current page
        // Try to load from all possible sources
        
        // Try to load projects (for Home)
        if (typeof projects !== 'undefined' && projects.length > 0) {
            this.imageCategories['Home'] = projects.map(p => p.image || p.thumbnail).filter(img => img);
        }
        
        // Try to load games (for Games)
        if (typeof games !== 'undefined' && games.length > 0) {
            this.imageCategories['Games'] = games.map(g => g.thumbnail || g.image).filter(img => img);
        }
        
        // Try to load others (for Others)
        if (typeof others !== 'undefined' && others.length > 0) {
            this.imageCategories['Others'] = others.map(o => o.thumbnail || o.image).filter(img => img);
        }
        
    }

    createImageContainer() {
        // Create container for hover images (outside menu-nav to avoid overlap)
        const container = document.createElement('div');
        container.className = 'menu-hover-images';
        container.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        this.menuOverlay.appendChild(container);
        this.imageContainer = container;
    }

    setupHoverEvents() {
        this.menuLinks.forEach(link => {
            const linkText = link.textContent.trim();
            const images = this.imageCategories[linkText];
            
            link.addEventListener('mouseenter', () => {
                this.handleMouseEnter(link, images);
            });
            
            link.addEventListener('mouseleave', () => {
                this.handleMouseLeave();
            });
        });
    }

    getFixedPositions() {
        // 8 fixed positions well distributed on the right side of screen
        // Positions are fixed percentages (will be converted to pixels)
        // X values are shifted by +0.1
        const positions = [
            { x: 0.49, y: 0.58 },  // Position 1
            { x: 0.495, y: 0.42 }, // Position 2
            { x: 0.68, y: 0.73 }, // Position 3
            { x: 0.70, y: 0.59 },  // Position 4
            { x: 0.69, y: 0.41 }, // Position 5
            { x: 0.71, y: 0.25 }, // Position 6
            { x: 0.86, y: 0.61 },  // Position 7
            { x: 0.87, y: 0.39 }, // Position 8
        ];
        
        // Convert percentages to pixel values based on current screen size
        return positions.map(pos => ({
            x: pos.x * window.innerWidth,
            y: pos.y * window.innerHeight
        }));
    }

    handleMouseEnter(link, images) {
        // Fade other links (always, even if no images)
        this.menuLinks.forEach(l => {
            if (l !== link) {
                l.style.opacity = '0.5';
            }
        });
        
        // Only create images if available
        if (!images || images.length === 0) return;
        
        // Get fixed positions
        const fixedPositions = this.getFixedPositions();
        
        // Create 3-5 random images (no duplicates)
        const numImages = Math.min(Math.floor(Math.random() * 3) + 3, images.length, fixedPositions.length);
        const usedPositions = [];
        const usedImages = []; // Track used images to avoid duplicates
        
        // Shuffle images array to get random selection
        const shuffledImages = [...images].sort(() => Math.random() - 0.5);
        // Shuffle positions array to get random selection
        const shuffledPositions = [...fixedPositions].sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            const randomImage = shuffledImages[i]; // Use shuffled array to avoid duplicates
            usedImages.push(randomImage);
            img.src = randomImage;
            img.className = 'menu-hover-image';
            img.alt = ''; // Decorative images don't need alt text
            
            // Get random size and rotation
            const minWidth = 250;
            const maxWidth = 450;
            const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
            const aspectRatio = 16 / 9;
            const height = Math.floor(width / aspectRatio);
            const rotation = (Math.random() - 0.5) * 50; // -25 to +25 degrees
            
            // Use shuffled position (no duplicates)
            const position = shuffledPositions[i];
            usedPositions.push(position);
            
            // Center the image on the position point
            const x = position.x - width / 2;
            const y = position.y - height / 2;
            
            img.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${width}px;
                height: ${height}px;
                object-fit: cover;
                opacity: 0;
                transform: rotate(${rotation}deg) scale(0.8);
                transition: opacity 0.3s ease, transform 0.3s ease;
                border-radius: 8px;
                pointer-events: none;
            `;
            
            this.imageContainer.appendChild(img);
            this.hoverImages.push(img);
            
            // Animate in
            requestAnimationFrame(() => {
                img.style.opacity = '1';
                img.style.transform = `rotate(${rotation}deg) scale(1)`;
            });
        }
    }

    handleMouseLeave() {
        // Reset other links opacity
        this.menuLinks.forEach(link => {
            link.style.opacity = '';
        });
        
        // Remove all hover images with animation
        this.hoverImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transform += ' scale(0.8)';
            setTimeout(() => {
                if (img.parentNode) {
                    img.parentNode.removeChild(img);
                }
            }, 300);
        });
        
        // Clear the array
        this.hoverImages = [];
        
        // Clear the container
        if (this.imageContainer) {
            this.imageContainer.innerHTML = '';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MenuHover();
});


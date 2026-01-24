// ============================================
// PROJECTS GRID HANDLER (Games/Others Pages)
// ============================================

class ProjectsGrid {
    constructor() {
        this.currentPage = this.detectPage();
        this.projects = this.loadProjects();
        this.backgroundImages = [];
        this.currentBackgroundIndex = 0;
        
        // DOM elements
        this.projectsGrid = document.getElementById('projectsGrid');
        this.backgroundSlideshow = document.getElementById('backgroundSlideshow');
        
        if (this.projects && this.projects.length > 0) {
            this.init();
        }
    }

    detectPage() {
        const body = document.body;
        if (body.classList.contains('page-games')) {
            return 'games';
        } else if (body.classList.contains('page-others')) {
            return 'others';
        }
        return null;
    }

    loadProjects() {
        if (this.currentPage === 'games' && typeof games !== 'undefined') {
            return games;
        } else if (this.currentPage === 'others' && typeof others !== 'undefined') {
            return others;
        }
        return [];
    }

    init() {
        this.createBackgroundSlideshow();
        this.createProjectsGrid();
        this.startBackgroundRotation();
        this.setupGlobalScroll();
    }

    createBackgroundSlideshow() {
        if (!this.backgroundSlideshow) return;
        
        // Extract images from projects for background
        this.backgroundImages = this.projects
            .map(project => project.thumbnail || project.image)
            .filter(img => img);
        
        if (this.backgroundImages.length === 0) return;
        
        // Create image elements
        this.backgroundImages.forEach((imageSrc, index) => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = 'Background';
            img.className = index === 0 ? 'active' : '';
            this.backgroundSlideshow.appendChild(img);
        });
    }

    setupGlobalScroll() {
        // Allow scrolling from anywhere on the page, not just the body
        // This ensures scroll works even when mouse is over other elements
        window.addEventListener('wheel', (e) => {
            const body = document.body;
            // Only handle on games/others pages
            if (!body.classList.contains('page-games') && 
                !body.classList.contains('page-others')) {
                return;
            }
            
            // Don't interfere if scrolling an element that has its own scroll
            const target = e.target;
            if (target && (target.scrollHeight > target.clientHeight || 
                          target.closest('.menu-overlay'))) {
                return;
            }
            
            // Propagate scroll to body
            const currentScroll = body.scrollTop;
            const maxScroll = body.scrollHeight - body.clientHeight;
            
            // Only prevent default if we're not at the limits
            if ((e.deltaY > 0 && currentScroll < maxScroll) ||
                (e.deltaY < 0 && currentScroll > 0)) {
                e.preventDefault();
                body.scrollTop += e.deltaY;
            }
        }, { passive: false });
    }

    startBackgroundRotation() {
        if (this.backgroundImages.length <= 1) return;
        
        setInterval(() => {
            const images = this.backgroundSlideshow.querySelectorAll('img');
            if (images.length === 0) return;
            
            images[this.currentBackgroundIndex].classList.remove('active');
            this.currentBackgroundIndex = (this.currentBackgroundIndex + 1) % images.length;
            images[this.currentBackgroundIndex].classList.add('active');
        }, 8000); // Change every 8 seconds
    }

    getToolIconPath(toolId) {
        const base = 'assets/icons/tools/';
        return base + toolId + '.png';
    }

    formatToolLabel(toolId) {
        const labels = { csharp: 'C#', godot: 'Godot', unity: 'Unity', blender: 'Blender', figma: 'Figma', placeholder: 'Tool' };
        return labels[toolId] || toolId.charAt(0).toUpperCase() + toolId.slice(1);
    }

    createProjectsGrid() {
        if (!this.projectsGrid) return;
        
        this.projectsGrid.innerHTML = '';
        
        this.projects.forEach(project => {
            const card = document.createElement('a');
            card.href = project.link || '#';
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.className = 'project-card';
            
            const image = document.createElement('img');
            image.src = project.thumbnail || project.image;
            image.alt = project.title || 'Project image';
            image.className = 'project-card-image';
            image.loading = 'lazy'; // Lazy loading for better performance
            
            const overlay = document.createElement('div');
            overlay.className = 'project-card-overlay';
            
            const info = document.createElement('div');
            info.className = 'project-card-info';
            
            const title = document.createElement('div');
            title.className = 'project-card-title';
            title.textContent = project.title;
            
            const year = document.createElement('div');
            year.className = 'project-card-year';
            year.textContent = project.year;
            
            info.appendChild(title);
            info.appendChild(year);
            overlay.appendChild(info);
            
            if (project.tools && project.tools.length > 0) {
                const tools = document.createElement('div');
                tools.className = 'project-card-tools';
                tools.setAttribute('aria-label', 'Outils utilisés');
                project.tools.forEach((toolId) => {
                    const icon = document.createElement('img');
                    icon.src = this.getToolIconPath(toolId);
                    icon.alt = toolId;
                    icon.title = this.formatToolLabel(toolId);
                    icon.className = 'project-card-tool-icon';
                    icon.loading = 'lazy';
                    icon.onerror = () => {
                        // Fallback to placeholder if icon doesn't exist
                        icon.src = this.getToolIconPath('placeholder');
                        icon.onerror = null; // Prevent infinite loop
                    };
                    tools.appendChild(icon);
                });
                overlay.appendChild(tools);
            }
            
            card.appendChild(image);
            card.appendChild(overlay);
            
            this.projectsGrid.appendChild(card);
        });
    }
}

// Initialize projects grid when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on games or others pages
    if (document.body.classList.contains('page-games') || 
        document.body.classList.contains('page-others')) {
        new ProjectsGrid();
    }
});


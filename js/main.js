// ============================================
// MAIN JAVASCRIPT
// ============================================

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.menu-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (menuClose) {
    menuClose.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close menu when clicking on a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Toggle menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay) {
        const isMenuOpen = menuOverlay.classList.contains('active');
        if (isMenuOpen) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
});

// Live Time Update (Paris timezone)
function updateTime() {
    const timeElement = document.getElementById('footerTime');
    if (timeElement) {
        // Get current time in Paris timezone
        const now = new Date();
        const parisTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Paris"}));
        const hours = String(parisTime.getHours()).padStart(2, '0');
        const minutes = String(parisTime.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes} France`;
    }
}

// Update time every minute
updateTime();
setInterval(updateTime, 60000);



// ============================================
// TITLE ANIMATION ON TRIPLE CLICK
// ============================================

class TitleMenuInteraction {
    constructor() {        
        this.init();
    }

    init() {
        // Find title elements based on page
        const titles = this.findTitles();
        
        titles.forEach(title => {
            if (title) {
                this.setupClick(title);
            }
        });
    }

    findTitles() {
        const titles = [];
        
        // Page title
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) titles.push(pageTitle);
        
        // Menu title
        const menuTitle = document.querySelector('#menuTitle');
        if (menuTitle) titles.push(menuTitle);
        
        return titles;
    }

    setupClick(titleElement) {
        titleElement.addEventListener('click', (e) => {
            this.handleClick(titleElement, e);
        });
    }

    handleClick(titleElement, event) {
        this.triggerAnimation();
    }

    triggerAnimation() {
        if (menuOverlay) {
            const isMenuOpen = menuOverlay.classList.contains('active');
            if (isMenuOpen) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    new TitleMenuInteraction();
});